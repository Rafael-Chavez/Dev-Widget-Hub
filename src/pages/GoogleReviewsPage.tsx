import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

interface SearchResult {
  id: string;
  name: string;
  address: string;
  placeId: string;
  rating: number;
  totalReviews: number;
}

interface Settings {
  businessName: string;
  businessAddress: string;
  googleMapsUrl: string;
  googlePlaceId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

const GoogleReviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'style'>('content');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<Settings>({
    businessName: 'My Awesome Business',
    businessAddress: '',
    googleMapsUrl: 'https://maps.app.goo.gl/YdDK8L',
    googlePlaceId: '',
    averageRating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: '1',
        author: 'Sarah Johnson',
        rating: 5,
        date: '2 weeks ago',
        text: 'Absolutely fantastic service! The team went above and beyond to ensure everything was perfect. Highly recommend to anyone looking for quality work.',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff'
      },
      {
        id: '2',
        author: 'Michael Chen',
        rating: 5,
        date: '1 month ago',
        text: 'Best experience I\'ve had in years. Professional, courteous, and incredibly efficient. Will definitely be coming back!',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff'
      }
    ]
  });

  // Initialize Google Maps API
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Google Maps API key not configured. Using demo mode.');
      return;
    }

    if ((window as any).google && (window as any).google.maps) {
      initializeGoogleMaps();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    (window as any).initGoogleMaps = () => {
      initializeGoogleMaps();
    };

    script.onerror = () => {
      setFetchError('Failed to load Google Maps. Using demo mode.');
    };

    document.head.appendChild(script);

    return () => {
      delete (window as any).initGoogleMaps;
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeGoogleMaps = () => {
    autocompleteService.current = new google.maps.places.AutocompleteService();

    if (mapDivRef.current) {
      const map = new google.maps.Map(mapDivRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 1
      });
      placesService.current = new google.maps.places.PlacesService(map);
    }

    setGoogleLoaded(true);
  };

  const searchBusinesses = async () => {
    if (!searchQuery.trim()) {
      setFetchError('Please enter a business name or address');
      return;
    }

    setIsLoading(true);
    setFetchError('');
    setSearchResults([]);
    setShowSearchResults(false);

    try {
      if (googleLoaded && autocompleteService.current && placesService.current) {
        const request: google.maps.places.AutocompletionRequest = {
          input: searchQuery,
          types: ['establishment']
        };

        autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const results: SearchResult[] = [];
            let processed = 0;

            predictions.slice(0, 5).forEach((prediction, index) => {
              const detailsRequest: google.maps.places.PlaceDetailsRequest = {
                placeId: prediction.place_id,
                fields: ['name', 'formatted_address', 'rating', 'user_ratings_total', 'place_id']
              };

              placesService.current!.getDetails(detailsRequest, (place, detailsStatus) => {
                if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && place) {
                  results.push({
                    id: place.place_id || `${index}`,
                    name: place.name || prediction.description,
                    address: place.formatted_address || '',
                    placeId: place.place_id || '',
                    rating: place.rating || 0,
                    totalReviews: place.user_ratings_total || 0
                  });
                }

                processed++;
                if (processed === predictions.slice(0, 5).length) {
                  setSearchResults(results);
                  setShowSearchResults(true);
                  setIsLoading(false);
                }
              });
            });
          } else {
            setFetchError('No results found');
            setIsLoading(false);
          }
        });
      } else {
        setFetchError('Google Maps API not loaded. Please refresh the page.');
        setIsLoading(false);
      }
    } catch (error) {
      setFetchError('Failed to search businesses. Please try again.');
      setIsLoading(false);
    }
  };

  const selectBusiness = (result: SearchResult) => {
    setSettings({
      ...settings,
      businessName: result.name,
      businessAddress: result.address,
      googlePlaceId: result.placeId
    });
    setSearchQuery(result.name);
    setShowSearchResults(false);
    fetchGoogleReviews(result);
  };

  const fetchGoogleReviews = async (selectedBusiness?: SearchResult) => {
    setIsLoading(true);
    setFetchError('');

    try {
      const placeId = selectedBusiness?.placeId || settings.googlePlaceId;

      if (googleLoaded && placesService.current && placeId) {
        const request: google.maps.places.PlaceDetailsRequest = {
          placeId: placeId,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'formatted_address']
        };

        placesService.current.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const googleReviews: Review[] = (place.reviews || []).map((review, index) => ({
              id: `${Date.now()}-${index}`,
              author: review.author_name,
              rating: review.rating || 0,
              date: review.relative_time_description,
              text: review.text,
              avatar: review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=3b82f6&color=fff`
            }));

            setSettings(prevSettings => ({
              ...prevSettings,
              businessName: place.name || selectedBusiness?.name || prevSettings.businessName,
              businessAddress: place.formatted_address || selectedBusiness?.address || '',
              googlePlaceId: placeId,
              averageRating: place.rating || 0,
              totalReviews: place.user_ratings_total || 0,
              reviews: googleReviews.length > 0 ? googleReviews : prevSettings.reviews
            }));

            setIsLoading(false);
          } else {
            setFetchError('Failed to fetch place details');
            setIsLoading(false);
          }
        });
      } else {
        setFetchError('Google Maps API not loaded or no Place ID provided.');
        setIsLoading(false);
      }
    } catch (error) {
      setFetchError('Failed to fetch reviews. Please try again.');
      setIsLoading(false);
    }
  };

  const generateEmbedCode = (): string => {
    const reviewsData = settings.reviews.map(review => ({
      author: review.author,
      rating: review.rating,
      date: review.date,
      text: review.text,
      avatar: review.avatar
    }));

    return `<!-- Google Reviews Widget -->
<div id="google-reviews-container"></div>
<script>
(function() {
  const config = ${JSON.stringify({
    businessName: settings.businessName,
    averageRating: settings.averageRating,
    totalReviews: settings.totalReviews,
    reviews: reviewsData
  }, null, 2)};

  // Widget initialization code here
})();
</script>`;
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-['Inter',sans-serif]">
      {/* Hidden div for Google Maps PlacesService */}
      <div ref={mapDivRef} style={{ display: 'none' }} />

      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">ReviewStudio</span>
        </div>
        <nav className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Dashboard
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
            Publish Widget
          </button>
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar Configuration */}
        <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto p-6 flex flex-col gap-8" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Back Button */}
          <section>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span className="text-sm font-semibold">Back to Dashboard</span>
            </button>

            {/* Tab Navigation */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'content'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'layout'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('layout')}
              >
                Layout
              </button>
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'style'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('style')}
              >
                Style
              </button>
            </div>
          </section>

          {/* Search Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connect Source</h3>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Search Business</label>
              <div className="relative">
                <input
                  className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3 pl-10"
                  placeholder="e.g. Brooklyn Museum, New York"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchBusinesses()}
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={searchBusinesses}
              disabled={isLoading}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              {isLoading ? 'Searching...' : 'Search Google'}
            </button>

            {showSearchResults && searchResults.length > 0 && (
              <div className="mt-4 border border-slate-200 rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="w-full text-left p-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
                    onClick={() => selectBusiness(result)}
                  >
                    <div className="font-semibold text-sm text-slate-900">{result.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{result.address}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-xs text-slate-600">
                        {result.rating} ({result.totalReviews} reviews)
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {fetchError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                {fetchError}
              </div>
            )}
          </section>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Or Enter Manually</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Manual Config */}
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Google Maps URL</label>
              <input
                className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                type="text"
                value={settings.googleMapsUrl}
                onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>

            {/* Help Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fillRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">How to get URL?</p>
                  <ul className="text-[11px] text-blue-700 space-y-1 list-disc pl-3">
                    <li>Search for business on Google Maps</li>
                    <li>Click the "Share" button</li>
                    <li>Copy and paste the short link above</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Place ID (Advanced)</label>
              <input
                className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3 font-mono text-[11px]"
                placeholder="ChIJOwg_06VPwokRYv534QaPC8g"
                type="text"
                value={settings.googlePlaceId}
                onChange={(e) => setSettings({ ...settings, googlePlaceId: e.target.value })}
              />
            </div>
          </section>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Live Preview Container */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
              <div className="w-12"></div>
            </div>

            <div className="p-12">
              {/* Widget Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{settings.businessName}</h1>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-4xl font-black text-slate-900">{settings.averageRating.toFixed(1)}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 fill-current ${i < Math.floor(settings.averageRating) ? '' : 'text-slate-200'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium">Based on {settings.totalReviews} reviews</p>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {settings.reviews.map((review) => (
                  <article key={review.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                        {review.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{review.author}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400 text-[10px]">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
                  </article>
                ))}
              </div>

              {/* Interaction Button */}
              <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-200">
                  Write a Review
                </button>
              </div>
            </div>
          </div>

          {/* Embed Code Section */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Embed Code</h2>
                  <p className="text-sm text-slate-500">Copy and paste this code into your website to display your Google reviews.</p>
                </div>
                <button
                  className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
                  onClick={copyEmbedCode}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Copy to Clipboard
                </button>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-xs leading-relaxed overflow-x-auto relative group">
                <pre className="text-slate-300">
                  <code>{generateEmbedCode()}</code>
                </pre>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default GoogleReviewsPage;

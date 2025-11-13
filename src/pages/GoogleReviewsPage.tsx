import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@googlemaps/js-api-loader';
import './GoogleReviewsPage.css';

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
  layout: 'grid' | 'list' | 'carousel' | 'masonry' | 'slider' | 'badge';
  maxReviews: number;
  minRating: number;
  showAvatar: boolean;
  showDate: boolean;
  showBusinessInfo: boolean;
  showReviewButton: boolean;
  reviewButtonText: string;
  reviewButtonUrl: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  cardBgColor: string;
  starColor: string;
  borderRadius: number;
  spacing: number;
  columns: number;
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
    googleMapsUrl: '',
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
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=4285f4&color=fff'
      },
      {
        id: '2',
        author: 'Michael Chen',
        rating: 5,
        date: '1 month ago',
        text: 'Best experience I\'ve had in years. Professional, courteous, and incredibly efficient. Will definitely be coming back!',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=34a853&color=fff'
      },
      {
        id: '3',
        author: 'Emily Rodriguez',
        rating: 4,
        date: '1 month ago',
        text: 'Great quality and attention to detail. Very happy with the results and the customer service was excellent.',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=fbbc04&color=fff'
      },
      {
        id: '4',
        author: 'David Thompson',
        rating: 5,
        date: '2 months ago',
        text: 'Outstanding work from start to finish. They made the entire process seamless and stress-free. Cannot recommend highly enough!',
        avatar: 'https://ui-avatars.com/api/?name=David+Thompson&background=ea4335&color=fff'
      },
      {
        id: '5',
        author: 'Jennifer Park',
        rating: 5,
        date: '2 months ago',
        text: 'Exceeded all my expectations! The quality is top-notch and the service was impeccable.',
        avatar: 'https://ui-avatars.com/api/?name=Jennifer+Park&background=4285f4&color=fff'
      },
      {
        id: '6',
        author: 'Robert Williams',
        rating: 4,
        date: '3 months ago',
        text: 'Very satisfied with the outcome. Professional team and great communication throughout the process.',
        avatar: 'https://ui-avatars.com/api/?name=Robert+Williams&background=34a853&color=fff'
      }
    ],
    layout: 'grid',
    maxReviews: 6,
    minRating: 1,
    showAvatar: true,
    showDate: true,
    showBusinessInfo: true,
    showReviewButton: true,
    reviewButtonText: 'Write a Review',
    reviewButtonUrl: 'https://search.google.com/local/writereview',
    accentColor: '#4285f4',
    bgColor: '#ffffff',
    textColor: '#5f6368',
    cardBgColor: '#ffffff',
    starColor: '#fbbc04',
    borderRadius: 12,
    spacing: 20,
    columns: 3
  });

  // Initialize Google Maps API
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Google Maps API key not configured. Using demo mode.');
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.loadCallback((e) => {
      if (e) {
        console.error('Error loading Google Maps API:', e);
        setFetchError('Failed to load Google Maps. Using demo mode.');
      } else {
        // Initialize Autocomplete Service
        autocompleteService.current = new google.maps.places.AutocompleteService();

        // Initialize Places Service (requires a map div)
        if (mapDivRef.current) {
          const map = new google.maps.Map(mapDivRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 1
          });
          placesService.current = new google.maps.places.PlacesService(map);
        }

        setGoogleLoaded(true);
        console.log('Google Maps API loaded successfully');
      }
    });
  }, []);

  const addReview = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      author: 'New Reviewer',
      rating: 5,
      date: 'Just now',
      text: 'Write your review text here...',
      avatar: 'https://ui-avatars.com/api/?name=New+Reviewer&background=4285f4&color=fff'
    };
    setSettings({
      ...settings,
      reviews: [...settings.reviews, newReview]
    });
  };

  const removeReview = (id: string) => {
    if (settings.reviews.length <= 1) {
      alert('You must have at least one review');
      return;
    }
    setSettings({
      ...settings,
      reviews: settings.reviews.filter(review => review.id !== id)
    });
  };

  const updateReview = (id: string, field: keyof Review, value: string | number) => {
    setSettings({
      ...settings,
      reviews: settings.reviews.map(review =>
        review.id === id ? { ...review, [field]: value } : review
      )
    });
  };

  const searchBusinesses = async () => {
    // Validate input
    if (!searchQuery.trim()) {
      setFetchError('Please enter a business name or address');
      return;
    }

    setIsLoading(true);
    setFetchError('');
    setSearchResults([]);

    try {
      // Use Google Places API if loaded, otherwise fall back to demo
      if (googleLoaded && autocompleteService.current && placesService.current) {
        // Use Autocomplete Service to get predictions
        const request: google.maps.places.AutocompletionRequest = {
          input: searchQuery,
          types: ['establishment']
        };

        autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            // Get details for each prediction
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
            throw new Error('No results found');
          }
        });
      } else {
        // Fall back to demo mode
        const mockResults: SearchResult[] = [
          {
            id: '1',
            name: searchQuery,
            address: '200 Eastern Pkwy, Brooklyn, NY 11238, USA',
            placeId: 'ChIJOwg_06VPwokRYv534QaPC8g',
            rating: 4.7,
            totalReviews: 3542
          },
          {
            id: '2',
            name: `${searchQuery} - Main Branch`,
            address: '123 Main St, Brooklyn, NY 11201, USA',
            placeId: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
            rating: 4.5,
            totalReviews: 1205
          },
          {
            id: '3',
            name: `${searchQuery} Brooklyn Heights`,
            address: '456 Court St, Brooklyn, NY 11231, USA',
            placeId: 'ChIJPZDrEzBbwokRoNrpodC5P30',
            rating: 4.8,
            totalReviews: 856
          }
        ];

        setSearchResults(mockResults);
        setShowSearchResults(true);
        setIsLoading(false);
      }

      setFetchError('');
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
    // Now fetch the reviews for this business
    fetchGoogleReviews(result);
  };

  const fetchGoogleReviews = async (selectedBusiness?: SearchResult) => {
    setIsLoading(true);
    setFetchError('');

    try {
      const placeId = selectedBusiness?.placeId || settings.googlePlaceId;

      if (googleLoaded && placesService.current && placeId) {
        // Fetch real reviews from Google Places API
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
              avatar: review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=4285f4&color=fff`
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
            setFetchError('');
          } else {
            throw new Error('Failed to fetch place details');
          }
        });
      } else {
        // Fall back to demo mode
        const businessName = selectedBusiness?.name || settings.businessAddress || settings.businessName;
        const avgRating = selectedBusiness?.rating || settings.averageRating;
        const totalRevs = selectedBusiness?.totalReviews || settings.totalReviews;

        const sampleReviews: Review[] = [
          {
            id: Date.now().toString() + '1',
            author: 'Alex Martinez',
            rating: 5,
            date: '1 week ago',
            text: `Fantastic experience with ${businessName}! The service was outstanding and exceeded all my expectations. Highly recommend!`,
            avatar: 'https://ui-avatars.com/api/?name=Alex+Martinez&background=4285f4&color=fff'
          },
          {
            id: Date.now().toString() + '2',
            author: 'Lisa Wang',
            rating: 5,
            date: '2 weeks ago',
            text: 'Best in the area! Professional, friendly staff and excellent quality. Will definitely be back.',
            avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=34a853&color=fff'
          },
          {
            id: Date.now().toString() + '3',
            author: 'James Anderson',
            rating: 4,
            date: '3 weeks ago',
            text: 'Very good service overall. Quick response time and great attention to detail.',
            avatar: 'https://ui-avatars.com/api/?name=James+Anderson&background=fbbc04&color=fff'
          },
          {
            id: Date.now().toString() + '4',
            author: 'Maria Garcia',
            rating: 5,
            date: '1 month ago',
            text: 'Absolutely love this place! The quality is unmatched and the customer service is exceptional.',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ea4335&color=fff'
          },
          {
            id: Date.now().toString() + '5',
            author: 'Tom Wilson',
            rating: 5,
            date: '1 month ago',
            text: 'Outstanding! Everything was perfect from start to finish. Couldn\'t ask for better service.',
            avatar: 'https://ui-avatars.com/api/?name=Tom+Wilson&background=4285f4&color=fff'
          },
          {
            id: Date.now().toString() + '6',
            author: 'Rachel Kim',
            rating: 4,
            date: '2 months ago',
            text: 'Great experience. Professional team and high-quality results. Very satisfied!',
            avatar: 'https://ui-avatars.com/api/?name=Rachel+Kim&background=34a853&color=fff'
          }
        ];

        setSettings(prevSettings => ({
          ...prevSettings,
          businessName: businessName,
          reviews: sampleReviews,
          averageRating: avgRating,
          totalReviews: totalRevs
        }));

        setIsLoading(false);
        setFetchError('');
      }
    } catch (error) {
      setFetchError('Failed to fetch reviews. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className={`star filled ${size}`} style={{ color: settings.starColor }}>★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className={`star half ${size}`} style={{ color: settings.starColor }}>★</span>
        );
      } else {
        stars.push(
          <span key={i} className={`star empty ${size}`}>★</span>
        );
      }
    }
    return stars;
  };

  const filteredReviews = settings.reviews
    .filter(review => review.rating >= settings.minRating)
    .slice(0, settings.maxReviews);

  const generateEmbedCode = (): string => {
    const reviewsData = filteredReviews.map(review => ({
      author: review.author,
      rating: review.rating,
      date: review.date,
      text: review.text,
      avatar: review.avatar
    }));

    const scriptContent = `(function() {
    const config = ${JSON.stringify({
      businessName: settings.businessName,
      averageRating: settings.averageRating,
      totalReviews: settings.totalReviews,
      reviews: reviewsData,
      layout: settings.layout,
      showAvatar: settings.showAvatar,
      showDate: settings.showDate,
      showBusinessInfo: settings.showBusinessInfo,
      showReviewButton: settings.showReviewButton,
      reviewButtonText: settings.reviewButtonText,
      reviewButtonUrl: settings.reviewButtonUrl,
      accentColor: settings.accentColor,
      bgColor: settings.bgColor,
      textColor: settings.textColor,
      cardBgColor: settings.cardBgColor,
      starColor: settings.starColor,
      borderRadius: settings.borderRadius,
      spacing: settings.spacing,
      columns: settings.columns
    }, null, 2)};

    const container = document.getElementById('google-reviews-container');
    const widget = document.createElement('div');
    widget.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: ' + config.bgColor + '; padding: 40px 20px; border-radius: ' + config.borderRadius + 'px;';

    // Business Info Header
    if (config.showBusinessInfo) {
        const header = document.createElement('div');
        header.style.cssText = 'text-align: center; margin-bottom: 40px;';

        const businessName = document.createElement('h2');
        businessName.textContent = config.businessName;
        businessName.style.cssText = 'font-size: 32px; font-weight: 700; margin: 0 0 15px; color: #202124;';
        header.appendChild(businessName);

        const ratingContainer = document.createElement('div');
        ratingContainer.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;';

        const avgRating = document.createElement('span');
        avgRating.textContent = config.averageRating.toFixed(1);
        avgRating.style.cssText = 'font-size: 48px; font-weight: 700; color: #202124;';
        ratingContainer.appendChild(avgRating);

        const starsDiv = document.createElement('div');
        starsDiv.style.cssText = 'display: flex; gap: 2px;';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            star.style.cssText = 'font-size: 32px; color: ' + (i < Math.floor(config.averageRating) ? config.starColor : '#e0e0e0');
            starsDiv.appendChild(star);
        }
        ratingContainer.appendChild(starsDiv);
        header.appendChild(ratingContainer);

        const totalReviews = document.createElement('p');
        totalReviews.textContent = 'Based on ' + config.totalReviews + ' reviews';
        totalReviews.style.cssText = 'color: ' + config.textColor + '; font-size: 16px; margin: 0;';
        header.appendChild(totalReviews);

        widget.appendChild(header);
    }

    // Reviews Container
    const reviewsContainer = document.createElement('div');
    const layoutStyles = {
        grid: 'display: grid; grid-template-columns: repeat(' + config.columns + ', 1fr); gap: ' + config.spacing + 'px;',
        list: 'display: flex; flex-direction: column; gap: ' + config.spacing + 'px; max-width: 800px; margin: 0 auto;',
        masonry: 'display: grid; grid-template-columns: repeat(' + config.columns + ', 1fr); gap: ' + config.spacing + 'px; grid-auto-rows: 20px;',
        carousel: 'display: flex; gap: ' + config.spacing + 'px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px;',
        slider: 'display: flex; gap: ' + config.spacing + 'px; overflow-x: auto; scroll-snap-type: x mandatory;',
        badge: 'display: flex; flex-wrap: wrap; gap: ' + config.spacing + 'px; justify-content: center;'
    };
    reviewsContainer.style.cssText = layoutStyles[config.layout] || layoutStyles.grid;

    config.reviews.forEach(review => {
        const card = document.createElement('div');
        let cardStyle = 'background: ' + config.cardBgColor + '; border-radius: ' + config.borderRadius + 'px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;';

        if (config.layout === 'carousel' || config.layout === 'slider') {
            cardStyle += ' min-width: 350px; scroll-snap-align: start;';
        }
        if (config.layout === 'badge') {
            cardStyle += ' flex: 0 0 auto; max-width: 300px;';
        }

        card.style.cssText = cardStyle;
        card.onmouseenter = function() { this.style.transform = 'translateY(-4px)'; this.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; };
        card.onmouseleave = function() { this.style.transform = 'translateY(0)'; this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; };

        // Review Header
        const reviewHeader = document.createElement('div');
        reviewHeader.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 12px;';

        if (config.showAvatar) {
            const avatar = document.createElement('img');
            avatar.src = review.avatar;
            avatar.style.cssText = 'width: 48px; height: 48px; border-radius: 50%; object-fit: cover;';
            reviewHeader.appendChild(avatar);
        }

        const authorInfo = document.createElement('div');
        authorInfo.style.cssText = 'flex: 1;';

        const authorName = document.createElement('div');
        authorName.textContent = review.author;
        authorName.style.cssText = 'font-weight: 600; font-size: 16px; color: #202124; margin-bottom: 4px;';
        authorInfo.appendChild(authorName);

        const reviewMeta = document.createElement('div');
        reviewMeta.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        const stars = document.createElement('div');
        stars.style.cssText = 'display: flex; gap: 1px;';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            star.style.cssText = 'font-size: 16px; color: ' + (i < review.rating ? config.starColor : '#e0e0e0');
            stars.appendChild(star);
        }
        reviewMeta.appendChild(stars);

        if (config.showDate) {
            const date = document.createElement('span');
            date.textContent = '• ' + review.date;
            date.style.cssText = 'font-size: 14px; color: ' + config.textColor + ';';
            reviewMeta.appendChild(date);
        }

        authorInfo.appendChild(reviewMeta);
        reviewHeader.appendChild(authorInfo);
        card.appendChild(reviewHeader);

        // Review Text
        const reviewText = document.createElement('p');
        reviewText.textContent = review.text;
        reviewText.style.cssText = 'color: ' + config.textColor + '; font-size: 14px; line-height: 1.6; margin: 0;';
        card.appendChild(reviewText);

        reviewsContainer.appendChild(card);
    });

    widget.appendChild(reviewsContainer);

    // Review Button
    if (config.showReviewButton) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'text-align: center; margin-top: 40px;';

        const button = document.createElement('a');
        button.href = config.reviewButtonUrl;
        button.target = '_blank';
        button.textContent = config.reviewButtonText;
        button.style.cssText = 'display: inline-block; background: ' + config.accentColor + '; color: white; padding: 14px 32px; border-radius: ' + config.borderRadius + 'px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.2s;';
        button.onmouseenter = function() { this.style.transform = 'scale(1.05)'; this.style.opacity = '0.9'; };
        button.onmouseleave = function() { this.style.transform = 'scale(1)'; this.style.opacity = '1'; };

        buttonContainer.appendChild(button);
        widget.appendChild(buttonContainer);
    }

    container.appendChild(widget);
})();`;

    return '<!-- Google Reviews Widget -->\n<div id="google-reviews-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="google-reviews-page">
      {/* Hidden div for Google Maps PlacesService */}
      <div ref={mapDivRef} style={{ display: 'none' }} />

      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Google Reviews</h1>
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            Home
          </button>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'layout' ? 'active' : ''}`}
            onClick={() => setActiveTab('layout')}
          >
            Layout
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'content' && (
            <div className="tab-pane active">
              <div className="content-section fetch-reviews-section">
                <h3 className="section-title">Connect to Google Reviews</h3>
                <p className="section-description">
                  Search for your business to fetch live Google reviews automatically.
                </p>

                <div className="control-group search-input-container">
                  <label htmlFor="searchQuery">Search for Your Business</label>
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    placeholder="e.g., Brooklyn Museum, New York"
                    className="search-input"
                  />
                  <small className="input-hint">Enter business name and location</small>

                  <button
                    className="search-btn"
                    onClick={searchBusinesses}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Searching...
                      </>
                    ) : (
                      <>
                        <span>🔍</span>
                        Search
                      </>
                    )}
                  </button>

                  {showSearchResults && searchResults.length > 0 && (
                    <div className="search-results-dropdown">
                      {searchResults.map((result) => (
                        <div
                          key={result.id}
                          className="search-result-item"
                          onClick={() => selectBusiness(result)}
                        >
                          <div className="result-icon">📍</div>
                          <div className="result-info">
                            <div className="result-name">{result.name}</div>
                            <div className="result-address">{result.address}</div>
                            <div className="result-rating">
                              <span className="rating-stars">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      color: i < Math.floor(result.rating) ? '#fbbc04' : '#e0e0e0'
                                    }}
                                  >
                                    ★
                                  </span>
                                ))}
                              </span>
                              <span className="rating-text">
                                {result.rating} ({result.totalReviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="divider-text">
                  <span>Or enter manually</span>
                </div>

                <div className="control-group">
                  <label htmlFor="googleMapsUrl">Google Maps URL</label>
                  <input
                    type="text"
                    id="googleMapsUrl"
                    value={settings.googleMapsUrl}
                    onChange={(e) => setSettings({...settings, googleMapsUrl: e.target.value})}
                    placeholder="https://maps.app.goo.gl/YdDK8Lu5Jozk2ow36"
                  />
                  <small className="input-hint">Paste your Google Maps share link</small>
                </div>

                <div className="info-box">
                  <div className="info-icon">ℹ️</div>
                  <div className="info-content">
                    <strong>How to get your Google Maps link:</strong>
                    <ol>
                      <li>Search for your business on Google Maps</li>
                      <li>Click the "Share" button</li>
                      <li>Copy the short URL (e.g., https://maps.app.goo.gl/...)</li>
                      <li>Paste it above to fetch real reviews</li>
                    </ol>
                  </div>
                </div>

                <div className="control-group">
                  <label htmlFor="googlePlaceId">Google Place ID (Advanced)</label>
                  <input
                    type="text"
                    id="googlePlaceId"
                    value={settings.googlePlaceId}
                    onChange={(e) => setSettings({...settings, googlePlaceId: e.target.value})}
                    placeholder="ChIJOwg_06VPwokRYv534QaPC8g"
                  />
                  <small className="input-hint">
                    Optional: Find your Place ID at{' '}
                    <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer">
                      Google Place ID Finder
                    </a>
                  </small>
                </div>

                {fetchError && (
                  <div className="error-message">
                    {fetchError}
                  </div>
                )}

                <div className="alert-box">
                  <div className="alert-icon">⚠️</div>
                  <div className="alert-content">
                    <strong>Demo Mode:</strong> This currently shows sample reviews to demonstrate functionality.
                    To fetch real Google reviews in production, you'll need a Google Places API key.
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Business Information</h3>
                <div className="control-group">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    value={settings.businessName}
                    onChange={(e) => setSettings({...settings, businessName: e.target.value})}
                    placeholder="My Business"
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="averageRating">Average Rating</label>
                  <input
                    type="number"
                    id="averageRating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={settings.averageRating}
                    onChange={(e) => setSettings({...settings, averageRating: parseFloat(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="totalReviews">Total Reviews</label>
                  <input
                    type="number"
                    id="totalReviews"
                    min="0"
                    value={settings.totalReviews}
                    onChange={(e) => setSettings({...settings, totalReviews: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Review Display Options</h3>
                <div className="control-group">
                  <label htmlFor="maxReviews">
                    <span className="control-label-text">Maximum Reviews</span>
                    <span className="control-value">{settings.maxReviews}</span>
                  </label>
                  <input
                    type="range"
                    id="maxReviews"
                    min="1"
                    max="12"
                    value={settings.maxReviews}
                    onChange={(e) => setSettings({...settings, maxReviews: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="minRating">
                    <span className="control-label-text">Minimum Rating</span>
                    <span className="control-value">{settings.minRating} stars</span>
                  </label>
                  <input
                    type="range"
                    id="minRating"
                    min="1"
                    max="5"
                    value={settings.minRating}
                    onChange={(e) => setSettings({...settings, minRating: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showAvatar}
                      onChange={(e) => setSettings({...settings, showAvatar: e.target.checked})}
                    />
                    <span>Show Avatars</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showDate}
                      onChange={(e) => setSettings({...settings, showDate: e.target.checked})}
                    />
                    <span>Show Review Dates</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showBusinessInfo}
                      onChange={(e) => setSettings({...settings, showBusinessInfo: e.target.checked})}
                    />
                    <span>Show Business Info Header</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Review Button</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showReviewButton}
                      onChange={(e) => setSettings({...settings, showReviewButton: e.target.checked})}
                    />
                    <span>Show "Write a Review" Button</span>
                  </label>
                </div>

                {settings.showReviewButton && (
                  <>
                    <div className="control-group">
                      <label htmlFor="reviewButtonText">Button Text</label>
                      <input
                        type="text"
                        id="reviewButtonText"
                        value={settings.reviewButtonText}
                        onChange={(e) => setSettings({...settings, reviewButtonText: e.target.value})}
                      />
                    </div>

                    <div className="control-group">
                      <label htmlFor="reviewButtonUrl">Button URL</label>
                      <input
                        type="text"
                        id="reviewButtonUrl"
                        value={settings.reviewButtonUrl}
                        onChange={(e) => setSettings({...settings, reviewButtonUrl: e.target.value})}
                        placeholder="https://g.page/r/..."
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="content-section">
                <h3 className="section-title">Reviews</h3>
                {settings.reviews.map((review, index) => (
                  <div key={review.id} className="review-item-card">
                    <div className="review-item-header">
                      <span className="review-number">Review {index + 1}</span>
                      {settings.reviews.length > 1 && (
                        <button className="remove-review" onClick={() => removeReview(review.id)}>×</button>
                      )}
                    </div>

                    <div className="control-group">
                      <label>Author Name</label>
                      <input
                        type="text"
                        value={review.author}
                        onChange={(e) => updateReview(review.id, 'author', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="control-group">
                      <label>Rating</label>
                      <select
                        value={review.rating}
                        onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value))}
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                    </div>

                    <div className="control-group">
                      <label>Date</label>
                      <input
                        type="text"
                        value={review.date}
                        onChange={(e) => updateReview(review.id, 'date', e.target.value)}
                        placeholder="2 weeks ago"
                      />
                    </div>

                    <div className="control-group">
                      <label>Review Text</label>
                      <textarea
                        value={review.text}
                        onChange={(e) => updateReview(review.id, 'text', e.target.value)}
                        placeholder="Write the review..."
                        rows={4}
                      />
                    </div>

                    <div className="control-group">
                      <label>Avatar URL</label>
                      <input
                        type="text"
                        value={review.avatar}
                        onChange={(e) => updateReview(review.id, 'avatar', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}

                <button className="add-review-btn" onClick={addReview}>
                  + Add Review
                </button>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Layout Style</h3>
                <div className="layout-options">
                  {(['grid', 'list', 'carousel', 'masonry', 'slider', 'badge'] as const).map((layout) => (
                    <button
                      key={layout}
                      className={`layout-option ${settings.layout === layout ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, layout})}
                    >
                      <div className="layout-icon">
                        {layout === 'grid' && '▦'}
                        {layout === 'list' && '☰'}
                        {layout === 'carousel' && '⇄'}
                        {layout === 'masonry' && '▣'}
                        {layout === 'slider' && '→'}
                        {layout === 'badge' && '◈'}
                      </div>
                      <span className="layout-name">{layout.charAt(0).toUpperCase() + layout.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {(settings.layout === 'grid' || settings.layout === 'masonry') && (
                <div className="content-section">
                  <h3 className="section-title">Grid Settings</h3>
                  <div className="control-group">
                    <label htmlFor="columns">
                      <span className="control-label-text">Columns</span>
                      <span className="control-value">{settings.columns}</span>
                    </label>
                    <input
                      type="range"
                      id="columns"
                      min="1"
                      max="4"
                      value={settings.columns}
                      onChange={(e) => setSettings({...settings, columns: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              )}

              <div className="content-section">
                <h3 className="section-title">Spacing</h3>
                <div className="control-group">
                  <label htmlFor="spacing">
                    <span className="control-label-text">Card Spacing</span>
                    <span className="control-value">{settings.spacing}px</span>
                  </label>
                  <input
                    type="range"
                    id="spacing"
                    min="8"
                    max="40"
                    value={settings.spacing}
                    onChange={(e) => setSettings({...settings, spacing: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Appearance</h3>
                <div className="control-group">
                  <label htmlFor="borderRadius">
                    <span className="control-label-text">Border Radius</span>
                    <span className="control-value">{settings.borderRadius}px</span>
                  </label>
                  <input
                    type="range"
                    id="borderRadius"
                    min="0"
                    max="30"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({...settings, borderRadius: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Colors</h3>
                <div className="control-group">
                  <label htmlFor="accentColor">Accent Color (Button)</label>
                  <input
                    type="color"
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="cardBgColor">Card Background Color</label>
                  <input
                    type="color"
                    id="cardBgColor"
                    value={settings.cardBgColor}
                    onChange={(e) => setSettings({...settings, cardBgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    type="color"
                    id="textColor"
                    value={settings.textColor}
                    onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="starColor">Star Color</label>
                  <input
                    type="color"
                    id="starColor"
                    value={settings.starColor}
                    onChange={(e) => setSettings({...settings, starColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="reviews-widget-preview" style={{ background: settings.bgColor }}>
            {settings.showBusinessInfo && (
              <div className="business-info">
                <h2>{settings.businessName}</h2>
                <div className="rating-display">
                  <span className="average-rating">{settings.averageRating.toFixed(1)}</span>
                  <div className="stars-large">
                    {renderStars(settings.averageRating, 'large')}
                  </div>
                </div>
                <p className="total-reviews">Based on {settings.totalReviews} reviews</p>
              </div>
            )}

            <div className={`reviews-container layout-${settings.layout}`} style={{ gap: `${settings.spacing}px` }}>
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card"
                  style={{
                    background: settings.cardBgColor,
                    borderRadius: `${settings.borderRadius}px`,
                    gridTemplateColumns: settings.layout === 'grid' ? `repeat(${settings.columns}, 1fr)` : undefined
                  }}
                >
                  <div className="review-header">
                    {settings.showAvatar && (
                      <img src={review.avatar} alt={review.author} className="reviewer-avatar" />
                    )}
                    <div className="reviewer-info">
                      <div className="reviewer-name">{review.author}</div>
                      <div className="review-meta">
                        <div className="review-stars">
                          {renderStars(review.rating)}
                        </div>
                        {settings.showDate && (
                          <span className="review-date" style={{ color: settings.textColor }}>
                            • {review.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="review-text" style={{ color: settings.textColor }}>
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            {settings.showReviewButton && (
              <div className="review-button-container">
                <a
                  href={settings.reviewButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-button"
                  style={{
                    background: settings.accentColor,
                    borderRadius: `${settings.borderRadius}px`
                  }}
                >
                  {settings.reviewButtonText}
                </a>
              </div>
            )}
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your Google reviews.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewsPage;

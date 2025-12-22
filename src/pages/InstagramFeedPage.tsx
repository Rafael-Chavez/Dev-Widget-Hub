import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstagramFeedPage.css';

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface ProfileSettings {
  username: string;
  displayName: string;
  bio: string;
  profilePicUrl: string;
  followers: string;
  following: string;
  postsCount: string;
  verified: boolean;
  accessToken: string;
  useAPI: boolean;
  source: 'account' | 'hashtag';
  accountInput: string;
  hashtagInput: string;
}

interface StyleSettings {
  layout: 'grid' | 'carousel';
  columns: number;
  spacing: number;
  borderRadius: number;
  showStats: boolean;
  bgColor: string;
  accentColor: string;
  textColor: string;
  maxPosts: number;
}

const InstagramFeedPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'posts' | 'style'>('profile');

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    username: 'yourcompany',
    displayName: 'Your Company',
    bio: 'Welcome to our Instagram feed! Follow us for updates.',
    profilePicUrl: '',
    followers: '10.5K',
    following: '250',
    postsCount: '342',
    verified: false,
    accessToken: '',
    useAPI: false,
    source: 'account',
    accountInput: '',
    hashtagInput: ''
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    layout: 'grid',
    columns: 3,
    spacing: 10,
    borderRadius: 8,
    showStats: true,
    bgColor: '#ffffff',
    accentColor: '#E1306C',
    textColor: '#262626',
    maxPosts: 9
  });

  useEffect(() => {
    // Load default posts
    const defaultPosts: Post[] = Array.from({ length: 9 }, (_, i) => ({
      id: `post-${i + 1}`,
      imageUrl: createPlaceholderImage(i + 1),
      likes: Math.floor(Math.random() * 1000) + 100,
      comments: Math.floor(Math.random() * 100) + 10
    }));
    setPosts(defaultPosts);

    // Create default profile pic
    setProfileSettings(prev => ({
      ...prev,
      profilePicUrl: createProfilePicture(prev.displayName)
    }));
  }, []);

  const extractUsername = (input: string): string => {
    // Remove whitespace
    const trimmed = input.trim();

    // If it's a URL, extract username
    if (trimmed.includes('instagram.com/')) {
      const match = trimmed.match(/instagram\.com\/([^/?#]+)/);
      return match ? match[1] : trimmed;
    }

    // Remove @ if present
    return trimmed.replace(/^@/, '');
  };

  const fetchByUsername = async (username: string) => {
    if (!username) {
      setError('Please enter an Instagram username or URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Try to fetch from Instagram's public endpoint
      // Note: This approach may be blocked by CORS in browser
      const response = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`);

      if (!response.ok) {
        throw new Error('Unable to fetch Instagram data. The account may be private or Instagram is blocking the request.');
      }

      const data = await response.json();
      const userData = data.graphql?.user || data.user;

      if (!userData) {
        throw new Error('Invalid response from Instagram');
      }

      // Update profile info
      setProfileSettings(prev => ({
        ...prev,
        username: username,
        displayName: userData.full_name || prev.displayName,
        bio: userData.biography || prev.bio,
        profilePicUrl: userData.profile_pic_url || prev.profilePicUrl,
        followers: formatNumber(userData.edge_followed_by?.count || 0),
        following: formatNumber(userData.edge_follow?.count || 0),
        postsCount: formatNumber(userData.edge_owner_to_timeline_media?.count || 0)
      }));

      // Extract posts
      const edges = userData.edge_owner_to_timeline_media?.edges || [];
      const instagramPosts: Post[] = edges.slice(0, 12).map((edge: any) => ({
        id: edge.node.id,
        imageUrl: edge.node.display_url || edge.node.thumbnail_src,
        likes: edge.node.edge_liked_by?.count || 0,
        comments: edge.node.edge_media_to_comment?.count || 0
      }));

      setPosts(instagramPosts);
      setError('');
    } catch (err: any) {
      setError(
        'Failed to fetch Instagram data. This method may be blocked by CORS restrictions. ' +
        'For reliable fetching, please use the Instagram API method with an access token, ' +
        'or embed the widget on your website where CORS won\'t be an issue.'
      );
      console.error('Instagram Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const fetchInstagramPosts = async () => {
    if (profileSettings.source === 'account') {
      const username = extractUsername(profileSettings.accountInput);
      await fetchByUsername(username);
      return;
    }

    if (profileSettings.source === 'hashtag') {
      setError('Hashtag fetching is coming soon! Please use account source for now.');
      return;
    }
  };

  const createPlaceholderImage = (num: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    const colors = ['#E1306C', '#C13584', '#833AB4', '#5851DB', '#405DE6'];
    gradient.addColorStop(0, colors[num % colors.length]);
    gradient.addColorStop(1, colors[(num + 1) % colors.length]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Post ${num}`, 200, 200);

    return canvas.toDataURL();
  };

  const createProfilePicture = (name: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#E1306C');
    gradient.addColorStop(1, '#833AB4');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.charAt(0).toUpperCase(), 100, 100);

    return canvas.toDataURL();
  };

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileSettings(prev => ({
          ...prev,
          profilePicUrl: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPost: Post = {
            id: Date.now().toString() + Math.random(),
            imageUrl: event.target?.result as string,
            likes: Math.floor(Math.random() * 1000) + 100,
            comments: Math.floor(Math.random() * 100) + 10
          };
          setPosts(prev => [newPost, ...prev]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const generateEmbedCode = (): string => {
    const postsData = posts.slice(0, styleSettings.maxPosts).map(post => ({
      image: post.imageUrl,
      likes: post.likes,
      comments: post.comments
    }));

    const scriptContent = `(function() {
    const config = {
        source: '${profileSettings.source}',
        accountInput: '${profileSettings.accountInput}',
        hashtagInput: '${profileSettings.hashtagInput}',
        profile: {
            username: '${profileSettings.username}',
            displayName: '${profileSettings.displayName}',
            bio: '${profileSettings.bio}',
            profilePic: '${profileSettings.profilePicUrl}',
            followers: '${profileSettings.followers}',
            following: '${profileSettings.following}',
            posts: '${profileSettings.postsCount}',
            verified: ${profileSettings.verified}
        },
        posts: ${JSON.stringify(postsData)},
        style: {
            layout: '${styleSettings.layout}',
            columns: ${styleSettings.columns},
            spacing: ${styleSettings.spacing},
            borderRadius: ${styleSettings.borderRadius},
            showStats: ${styleSettings.showStats},
            bgColor: '${styleSettings.bgColor}',
            accentColor: '${styleSettings.accentColor}',
            textColor: '${styleSettings.textColor}'
        }
    };

    async function fetchInstagramData() {
        // For now, just use the pre-configured posts
        // In production, you would implement server-side fetching
        return config.posts;
    }

    const container = document.getElementById('instagram-feed-container');
    const widget = document.createElement('div');
    widget.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: ' + config.style.bgColor + '; border-radius: ' + config.style.borderRadius + 'px; padding: 20px; max-width: 600px; margin: 0 auto;';

    async function renderWidget() {
        const postsToRender = await fetchInstagramData();

    // Profile Section
    const profileHTML = \`
        <div style="display: flex; align-items: center; margin-bottom: 20px; gap: 16px;">
            <img src="\${config.profile.profilePic}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid \${config.style.accentColor};">
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <h3 style="margin: 0; font-size: 20px; color: \${config.style.textColor};">\${config.profile.username}</h3>
                    \${config.profile.verified ? '<svg width="16" height="16" viewBox="0 0 40 40" fill="' + config.style.accentColor + '"><path d="M19.998.5l5.098 6.273 7.898 1.873-3.658 7.324 1.212 8.015-7.55-3.288-7.55 3.288 1.212-8.015-3.658-7.324 7.898-1.873L19.998.5zm0 6.018l-3.252 4.001-5.038 1.195 2.334 4.673-.773 5.115 4.815-2.096 4.815 2.096-.773-5.115 2.334-4.673-5.038-1.195-3.252-4.001z"></path></svg>' : ''}
                </div>
                <p style="margin: 0 0 8px; font-size: 14px; color: \${config.style.textColor};">\${config.profile.displayName}</p>
                <div style="display: flex; gap: 16px; font-size: 14px; color: \${config.style.textColor};">
                    <span><strong>\${config.profile.posts}</strong> posts</span>
                    <span><strong>\${config.profile.followers}</strong> followers</span>
                    <span><strong>\${config.profile.following}</strong> following</span>
                </div>
            </div>
        </div>
        <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.5; color: \${config.style.textColor};">\${config.profile.bio}</p>
    \`;

    widget.innerHTML = profileHTML;

    // Posts Grid
    const postsContainer = document.createElement('div');
    postsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(' + config.style.columns + ', 1fr); gap: ' + config.style.spacing + 'px;';

    postsToRender.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.style.cssText = 'position: relative; aspect-ratio: 1; overflow: hidden; border-radius: ' + config.style.borderRadius + 'px; cursor: pointer;';

        const img = document.createElement('img');
        img.src = post.image;
        img.alt = 'Instagram post';
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;';

        if (config.style.showStats) {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; gap: 20px; opacity: 0; transition: opacity 0.3s; color: white; font-weight: 600;';
            overlay.innerHTML = \`
                <span style="display: flex; align-items: center; gap: 6px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                    \${post.likes}
                </span>
                <span style="display: flex; align-items: center; gap: 6px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
                    \${post.comments}
                </span>
            \`;
            postDiv.appendChild(overlay);

            postDiv.onmouseenter = function() {
                img.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
            };
            postDiv.onmouseleave = function() {
                img.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            };
        }

        postDiv.appendChild(img);
        postsContainer.appendChild(postDiv);
    });

    widget.appendChild(postsContainer);
    container.appendChild(widget);

    // Add responsive styles
    if (!document.getElementById('instagram-feed-styles')) {
        const style = document.createElement('style');
        style.id = 'instagram-feed-styles';
        style.textContent = '@media (max-width: 768px) { #instagram-feed-container > div { max-width: 100% !important; } }';
        document.head.appendChild(style);
    }
    }

    renderWidget();
})();`;

    return '<!-- Instagram Feed Widget -->\n<div id="instagram-feed-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  const displayedPosts = posts.slice(0, styleSettings.maxPosts);

  return (
    <div className="instagram-feed-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Instagram Feed</h1>
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            Home
          </button>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Content Source</h3>
                <div className="control-group">
                  <label htmlFor="source">Source Type</label>
                  <select
                    id="source"
                    value={profileSettings.source}
                    onChange={(e) => setProfileSettings({...profileSettings, source: e.target.value as 'account' | 'hashtag'})}
                  >
                    <option value="account">Account</option>
                    <option value="hashtag">Hashtag</option>
                  </select>
                </div>

                {profileSettings.source === 'account' && (
                  <>
                    <div className="control-group">
                      <label htmlFor="accountInput">Instagram Username or URL</label>
                      <input
                        type="text"
                        id="accountInput"
                        value={profileSettings.accountInput}
                        onChange={(e) => setProfileSettings({...profileSettings, accountInput: e.target.value})}
                        placeholder="username or https://instagram.com/username"
                      />
                      <small style={{display: 'block', marginTop: '8px', color: '#666', fontSize: '12px'}}>
                        Enter a username (e.g., "natgeo") or paste an Instagram profile URL
                      </small>
                    </div>
                  </>
                )}

                {profileSettings.source === 'hashtag' && (
                  <>
                    <div className="control-group">
                      <label htmlFor="hashtagInput">Hashtag</label>
                      <input
                        type="text"
                        id="hashtagInput"
                        value={profileSettings.hashtagInput}
                        onChange={(e) => setProfileSettings({...profileSettings, hashtagInput: e.target.value})}
                        placeholder="travel"
                      />
                      <small style={{display: 'block', marginTop: '8px', color: '#666', fontSize: '12px'}}>
                        Enter a hashtag without the # symbol (e.g., "travel")
                      </small>
                    </div>
                  </>
                )}

                <button
                  className="upload-btn"
                  onClick={fetchInstagramPosts}
                  disabled={
                    loading ||
                    (profileSettings.source === 'account' && !profileSettings.accountInput.trim()) ||
                    (profileSettings.source === 'hashtag' && !profileSettings.hashtagInput.trim())
                  }
                  style={{width: '100%', marginTop: '10px'}}
                >
                  {loading ? 'Fetching Posts...' : 'Fetch Instagram Posts'}
                </button>

                {error && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#fee',
                    color: '#c33',
                    borderRadius: '4px',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {error}
                  </div>
                )}

                {!loading && !error && posts.length > 0 && (profileSettings.accountInput || profileSettings.hashtagInput) && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#efe',
                    color: '#363',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    ✅ Successfully loaded {posts.length} posts!
                  </div>
                )}

                <small style={{display: 'block', marginTop: '12px', color: '#666', fontSize: '12px', lineHeight: '1.5'}}>
                  ⚠️ Note: This method may be blocked by CORS in preview. It works when embedded on a website.
                </small>
              </div>

              <div className="content-section">
                <h3 className="section-title">Profile Picture</h3>
                <div className="profile-pic-upload">
                  <img
                    src={profileSettings.profilePicUrl}
                    alt="Profile"
                    className="profile-pic-preview"
                  />
                  <button
                    className="upload-btn"
                    onClick={() => document.getElementById('profilePicInput')?.click()}
                  >
                    Change Photo
                  </button>
                  <input
                    type="file"
                    id="profilePicInput"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={handleProfilePicUpload}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Profile Info</h3>
                <div className="control-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={profileSettings.username}
                    onChange={(e) => setProfileSettings({...profileSettings, username: e.target.value})}
                    placeholder="yourcompany"
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="displayName">Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    value={profileSettings.displayName}
                    onChange={(e) => setProfileSettings({...profileSettings, displayName: e.target.value})}
                    placeholder="Your Company"
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({...profileSettings, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={profileSettings.verified}
                      onChange={(e) => setProfileSettings({...profileSettings, verified: e.target.checked})}
                    />
                    <span>Verified Badge</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Stats</h3>
                <div className="stats-grid">
                  <div className="control-group">
                    <label htmlFor="postsCount">Posts</label>
                    <input
                      type="text"
                      id="postsCount"
                      value={profileSettings.postsCount}
                      onChange={(e) => setProfileSettings({...profileSettings, postsCount: e.target.value})}
                    />
                  </div>
                  <div className="control-group">
                    <label htmlFor="followers">Followers</label>
                    <input
                      type="text"
                      id="followers"
                      value={profileSettings.followers}
                      onChange={(e) => setProfileSettings({...profileSettings, followers: e.target.value})}
                    />
                  </div>
                  <div className="control-group">
                    <label htmlFor="following">Following</label>
                    <input
                      type="text"
                      id="following"
                      value={profileSettings.following}
                      onChange={(e) => setProfileSettings({...profileSettings, following: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="tab-pane active">
              <button
                className="add-post-btn"
                onClick={() => document.getElementById('postInput')?.click()}
              >
                + Add Post
              </button>
              <input
                type="file"
                id="postInput"
                accept="image/*"
                multiple
                style={{display: 'none'}}
                onChange={handlePostUpload}
              />

              <div className="content-section">
                <h3 className="section-title">Your Posts ({posts.length})</h3>
                <div className="posts-grid">
                  {posts.length === 0 ? (
                    <div className="empty-state"><p>No posts added yet</p></div>
                  ) : (
                    posts.map(post => (
                      <div key={post.id} className="post-grid-item">
                        <img src={post.imageUrl} alt="Post" />
                        <button className="remove-post" onClick={() => removePost(post.id)}>×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Layout</h3>
                <div className="control-group">
                  <label htmlFor="columns">
                    <span className="control-label-text">Columns</span>
                    <span className="control-value">{styleSettings.columns}</span>
                  </label>
                  <input
                    type="range"
                    id="columns"
                    min="2"
                    max="4"
                    value={styleSettings.columns}
                    onChange={(e) => setStyleSettings({...styleSettings, columns: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="spacing">
                    <span className="control-label-text">Spacing</span>
                    <span className="control-value">{styleSettings.spacing}px</span>
                  </label>
                  <input
                    type="range"
                    id="spacing"
                    min="0"
                    max="30"
                    value={styleSettings.spacing}
                    onChange={(e) => setStyleSettings({...styleSettings, spacing: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="maxPosts">
                    <span className="control-label-text">Max Posts</span>
                    <span className="control-value">{styleSettings.maxPosts}</span>
                  </label>
                  <input
                    type="range"
                    id="maxPosts"
                    min="3"
                    max="12"
                    value={styleSettings.maxPosts}
                    onChange={(e) => setStyleSettings({...styleSettings, maxPosts: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="borderRadius">
                    <span className="control-label-text">Border Radius</span>
                    <span className="control-value">{styleSettings.borderRadius}px</span>
                  </label>
                  <input
                    type="range"
                    id="borderRadius"
                    min="0"
                    max="30"
                    value={styleSettings.borderRadius}
                    onChange={(e) => setStyleSettings({...styleSettings, borderRadius: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={styleSettings.showStats}
                      onChange={(e) => setStyleSettings({...styleSettings, showStats: e.target.checked})}
                    />
                    <span>Show Likes & Comments on Hover</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Colors</h3>
                <div className="control-group">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={styleSettings.bgColor}
                    onChange={(e) => setStyleSettings({...styleSettings, bgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="accentColor">Accent Color</label>
                  <input
                    type="color"
                    id="accentColor"
                    value={styleSettings.accentColor}
                    onChange={(e) => setStyleSettings({...styleSettings, accentColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    type="color"
                    id="textColor"
                    value={styleSettings.textColor}
                    onChange={(e) => setStyleSettings({...styleSettings, textColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div
            className="instagram-widget-preview"
            style={{
              background: styleSettings.bgColor,
              borderRadius: `${styleSettings.borderRadius}px`
            }}
          >
            {/* Profile Section */}
            <div className="profile-section">
              <img
                src={profileSettings.profilePicUrl}
                alt="Profile"
                className="profile-pic"
                style={{ borderColor: styleSettings.accentColor }}
              />
              <div className="profile-info">
                <div className="profile-name">
                  <h3 style={{ color: styleSettings.textColor }}>{profileSettings.username}</h3>
                  {profileSettings.verified && (
                    <svg width="16" height="16" viewBox="0 0 40 40" fill={styleSettings.accentColor}>
                      <path d="M19.998.5l5.098 6.273 7.898 1.873-3.658 7.324 1.212 8.015-7.55-3.288-7.55 3.288 1.212-8.015-3.658-7.324 7.898-1.873L19.998.5z"/>
                    </svg>
                  )}
                </div>
                <p className="profile-display-name" style={{ color: styleSettings.textColor }}>
                  {profileSettings.displayName}
                </p>
                <div className="profile-stats" style={{ color: styleSettings.textColor }}>
                  <span><strong>{profileSettings.postsCount}</strong> posts</span>
                  <span><strong>{profileSettings.followers}</strong> followers</span>
                  <span><strong>{profileSettings.following}</strong> following</span>
                </div>
              </div>
            </div>
            <p className="profile-bio" style={{ color: styleSettings.textColor }}>
              {profileSettings.bio}
            </p>

            {/* Posts Grid */}
            <div
              className="posts-grid-preview"
              style={{
                gridTemplateColumns: `repeat(${styleSettings.columns}, 1fr)`,
                gap: `${styleSettings.spacing}px`
              }}
            >
              {displayedPosts.map(post => (
                <div
                  key={post.id}
                  className="post-item"
                  style={{ borderRadius: `${styleSettings.borderRadius}px` }}
                >
                  <img src={post.imageUrl} alt="Post" />
                  {styleSettings.showStats && (
                    <div className="post-overlay">
                      <span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {post.likes}
                      </span>
                      <span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your Instagram feed.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeedPage;

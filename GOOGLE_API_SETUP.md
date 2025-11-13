# Google Places API Setup Guide

This guide will help you set up the Google Places API for the Google Reviews widget.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Widget Hub")
4. Click "Create"

## Step 2: Enable the Places API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Places API"
3. Click on "Places API"
4. Click "Enable"

## Step 3: Create an API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API key"
3. Your API key will be generated
4. **IMPORTANT**: Click "Restrict Key" to secure it

## Step 4: Restrict Your API Key (Security Best Practice)

### Application Restrictions:
- For development: Select "HTTP referrers (web sites)"
- Add: `http://localhost:3000/*`
- For production: Add your domain (e.g., `https://yourdomain.com/*`)

### API Restrictions:
- Select "Restrict key"
- Check only: "Places API"

## Step 5: Add API Key to Your Project

1. Open the file: `widget-hub/.env`
2. Replace `your_api_key_here` with your actual API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyC_YOUR_ACTUAL_API_KEY_HERE
   ```
3. Save the file
4. Restart your development server

## Step 6: Test the Integration

1. Navigate to the Google Reviews widget page
2. Try searching for a business (e.g., "Starbucks New York")
3. You should see real search results from Google
4. Click on a result to fetch real reviews

## Pricing (Free Tier)

- **$200 free credit per month** from Google Cloud
- **Place Autocomplete**: $2.83 per 1,000 requests
- **Place Details**: $17 per 1,000 requests

### Example Monthly Usage (Free Tier):
- 100 searches/day × 30 days = 3,000 searches = ~$8.50
- 3,000 detail requests = ~$51
- **Total: ~$60/month** (covered by free $200 credit)

## Troubleshooting

### "Google Maps API key not configured"
- Make sure you've added your API key to `.env`
- Restart the development server after adding the key

### "Failed to load Google Maps"
- Check that Places API is enabled in Google Cloud Console
- Verify your API key restrictions allow `localhost:3000`
- Check browser console for detailed error messages

### "No results found"
- Try a more specific search query (include city/location)
- Verify your API key has Places API enabled
- Check you haven't exceeded API quotas

## Fallback Mode

If the API key is not configured or fails to load, the widget automatically falls back to **demo mode** with sample data. This allows you to:
- Preview the widget functionality
- Test the UI without API costs
- Demonstrate the widget to clients

## Monitoring API Usage

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Dashboard"
3. Click on "Places API"
4. View your quota usage and request metrics

## Need Help?

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

# Social Media Automation UI - Deployment Guide

This document provides instructions for deploying the Social Media Automation UI to your Netlify site.

## Overview

The Social Media Automation UI is a comprehensive frontend interface for your TikTok API integration. It includes:

- Dashboard for overview and quick actions
- Content creation interface
- Post scheduling system
- Analytics dashboard
- Settings management
- API testing tools

## Deployment Instructions

### 1. Prerequisites

- A Netlify account
- Your TikTok API integration already deployed to Netlify (as we accomplished earlier)
- TikTok API credentials (API Key and Social Media Token)

### 2. Deploy the UI

#### Option 1: Deploy via Netlify Dashboard

1. Extract the `social_media_ui.zip` file to your local machine
2. Log in to your Netlify account
3. Go to "Sites" and click "Add new site" > "Import an existing project"
4. Connect to your Git provider (GitHub, GitLab, etc.)
5. Upload the extracted files to a new or existing repository
6. Select the repository in Netlify
7. Configure the build settings:
   - Base directory: Leave blank or set to `/`
   - Build command: Leave blank (no build needed)
   - Publish directory: `public`
8. Click "Deploy site"

#### Option 2: Deploy via Netlify CLI

1. Extract the `social_media_ui.zip` file to your local machine
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Navigate to the extracted directory in your terminal
4. Run `netlify login` to authenticate
5. Run `netlify deploy` and follow the prompts
6. For the publish directory, enter `public`
7. Review the draft deployment
8. Run `netlify deploy --prod` to deploy to production

### 3. Configure API Endpoints

The UI is designed to work with your existing TikTok API endpoints. If your API is deployed at a different URL than the UI, you'll need to update the API endpoint URLs in the JavaScript files:

1. Open each JavaScript file in the `js` directory
2. Look for fetch calls to `/api/status`, `/api/tiktok/account`, and `/api/tiktok/post`
3. Replace these with the full URLs to your API endpoints

For example, if your API is deployed at `https://api.yourdomain.com`, change:
```javascript
fetch('/api/status')
```
to:
```javascript
fetch('https://api.yourdomain.com/api/status')
```

### 4. Testing the Deployment

After deployment, you should be able to access:

1. Dashboard: `https://yourdomain.netlify.app/`
2. Content Creation: `https://yourdomain.netlify.app/create.html`
3. Scheduling: `https://yourdomain.netlify.app/schedule.html`
4. Analytics: `https://yourdomain.netlify.app/analytics.html`
5. Settings: `https://yourdomain.netlify.app/settings.html`
6. API Testing: `https://yourdomain.netlify.app/test.html`

Use the API Testing page to verify that your TikTok API integration is working correctly.

## Customization

### Branding

To customize the branding:

1. Update the logo text in each HTML file (currently "BeatSocial")
2. Modify the color scheme in `css/styles.css`
3. Add your own logo image to the `images` directory and update the HTML files

### Adding Features

The UI is designed to be extensible. To add new features:

1. Create new HTML pages following the existing pattern
2. Add corresponding JavaScript files in the `js` directory
3. Update the navigation menus in all HTML files to include links to your new pages

## Troubleshooting

### API Connection Issues

If you're experiencing issues connecting to the API:

1. Check that your API endpoints are correctly configured in the JavaScript files
2. Verify that your API is properly deployed and accessible
3. Check for CORS issues (the API must allow requests from your UI domain)
4. Use the API Testing page to debug specific endpoint issues

### Mobile Responsiveness Issues

If you encounter issues with mobile responsiveness:

1. Check that `responsive.css` is properly linked in all HTML files
2. Test on various device sizes using browser developer tools
3. Adjust the media queries in `responsive.css` as needed

## Next Steps

Now that your Social Media Automation UI is deployed, consider:

1. Implementing user authentication
2. Adding more social media platform integrations
3. Enhancing the analytics with more detailed metrics
4. Setting up automated content generation using AI
5. Creating a content calendar view for better planning

For any questions or issues, please refer to the documentation or contact support.

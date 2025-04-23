# Netlify Functions Deployment Guide

This guide explains how to deploy the Social Media Automation API using Netlify Functions.

## Overview

This package uses Netlify Functions instead of Next.js API routes to ensure reliable API functionality. Netlify Functions are natively supported by Netlify and provide a more direct approach for serverless functions.

## What's Included

1. **Netlify Functions**:
   - `status.js` - Check API status and environment variables
   - `tiktok-account.js` - Get TikTok account information
   - `tiktok-post.js` - Post content to TikTok

2. **Frontend**:
   - Simple HTML/CSS/JS interface to interact with the API
   - Test forms for each API endpoint

3. **Configuration**:
   - `netlify.toml` with proper redirects and build settings
   - `package.json` with required dependencies

## Deployment Steps

1. **Upload to GitHub**:
   - Create a new repository or use an existing one
   - Upload all files from this package, maintaining the folder structure

2. **Connect to Netlify**:
   - Log in to Netlify (or create an account)
   - Click "New site from Git"
   - Select your GitHub repository
   - Use the default build settings (they're already configured in netlify.toml)

3. **Set Environment Variables**:
   - After initial deployment, go to Site settings > Environment variables
   - Add your environment variables:
     - TIKTOK_API_KEY
     - SOCIAL_MEDIA_TOKEN

4. **Deploy and Test**:
   - Netlify will automatically build and deploy your site
   - Once deployed, test the API endpoints:
     - `/api/status`
     - `/api/tiktok/account`
     - `/api/tiktok/post`

## API Endpoints

### Status
- **URL**: `/api/status`
- **Method**: GET
- **Description**: Check API status and environment variables

### TikTok Account
- **URL**: `/api/tiktok/account`
- **Method**: GET
- **Description**: Get TikTok account information

### TikTok Post
- **URL**: `/api/tiktok/post`
- **Method**: POST
- **Body**:
  ```json
  {
    "video_url": "https://example.com/video.mp4",
    "caption": "Your caption here",
    "hashtags": ["tag1", "tag2", "tag3"]
  }
  ```
- **Description**: Post content to TikTok

## Local Development

To run the application locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your environment variables:
   ```
   TIKTOK_API_KEY=your_api_key
   SOCIAL_MEDIA_TOKEN=your_api_secret
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Visit http://localhost:8888 to view your application

## Troubleshooting

If you encounter issues with your Netlify deployment:

1. **Function Errors**:
   - Check the function logs in Netlify dashboard
   - Verify your environment variables are set correctly

2. **Deployment Errors**:
   - Check the build logs for any errors
   - Make sure all files are uploaded correctly

3. **API Access Issues**:
   - Confirm your TikTok API credentials are valid
   - Check network requests in browser developer tools

## Next Steps for Social Media Automation

Once the API is working correctly, you can expand the system to include:

1. User input for niche selection and posting frequency
2. Content analysis and trend identification
3. Content creation with various asset types
4. Caption and hashtag generation
5. Automated scheduling and posting
6. Performance tracking and reporting

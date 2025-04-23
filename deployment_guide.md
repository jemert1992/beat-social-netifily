# Netlify Deployment Guide for TikTok API Integration

This guide provides step-by-step instructions for deploying your TikTok API integration to Netlify, an alternative hosting provider that should resolve the persistent deployment issues you've been experiencing with Vercel.

## Why Netlify?

After multiple failed attempts with Vercel, Netlify offers several advantages:
- More reliable deployment process for Next.js applications
- Better handling of API routes
- Straightforward environment variable configuration
- Excellent support for serverless functions

## Prerequisites

Before you begin, make sure you have:
- A GitHub account
- Your TikTok API credentials (TIKTOK_API_KEY and SOCIAL_MEDIA_TOKEN)

## Deployment Steps

### 1. Prepare Your Repository

1. Create a new GitHub repository (or use an existing one)
2. Upload all files from the provided package to your repository, maintaining the exact folder structure:
   ```
   /pages/index.js
   /pages/test.js
   /pages/api/status.js
   /pages/api/tiktok/account.js
   /pages/api/tiktok/post.js
   /package.json
   /next.config.js
   /netlify.toml
   ```

### 2. Sign Up for Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up for a free account (you can use your GitHub account for authentication)

### 3. Create a New Site

1. From your Netlify dashboard, click "New site from Git"
2. Select GitHub as your Git provider
3. Authorize Netlify to access your GitHub repositories
4. Select the repository containing your TikTok API integration

### 4. Configure Build Settings

The `netlify.toml` file in your package already contains the necessary build settings, but verify they appear correctly in the Netlify interface:
- Build command: `npm run build`
- Publish directory: `.next`

### 5. Set Environment Variables

1. After initial deployment, go to Site settings > Environment variables
2. Add your environment variables:
   - Key: `TIKTOK_API_KEY`, Value: Your TikTok API key
   - Key: `SOCIAL_MEDIA_TOKEN`, Value: Your TikTok API secret

### 6. Deploy Your Site

1. Click "Deploy site"
2. Wait for the build process to complete (this may take a few minutes)
3. Once deployed, Netlify will provide you with a URL (e.g., your-site-name.netlify.app)

### 7. Test Your Deployment

1. Visit your Netlify URL to confirm the frontend is working
2. Test the API endpoints:
   - `[your-netlify-url]/api/status` - Should return API status
   - `[your-netlify-url]/api/tiktok/account` - Should return TikTok account info (GET request)
   - `[your-netlify-url]/api/tiktok/post` - For posting to TikTok (POST request)

### 8. Set Up Your Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., justinemert.com)
4. Follow the instructions to configure your DNS settings

## Troubleshooting

If you encounter issues with your Netlify deployment:

1. **Build Failures**:
   - Check the build logs for specific errors
   - Verify your package.json has the correct dependencies
   - Make sure the Node.js version is set correctly in netlify.toml

2. **API Route Issues**:
   - Confirm environment variables are set correctly
   - Check Netlify Functions log for any errors
   - Verify the @netlify/plugin-nextjs plugin is installed

3. **404 Errors**:
   - Check that the redirects in netlify.toml are correct
   - Verify your pages directory structure matches exactly what's expected

## Local Development

To run the application locally:

1. Clone your repository
2. Create a `.env.local` file with your environment variables:
   ```
   TIKTOK_API_KEY=your_api_key
   SOCIAL_MEDIA_TOKEN=your_api_secret
   ```
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Visit http://localhost:3000 to view your application

## Need Further Assistance?

If you continue to experience deployment issues, Netlify offers excellent documentation and support:
- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Community Forum](https://community.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)

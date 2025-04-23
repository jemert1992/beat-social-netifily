# TikTok API Integration - README

This package contains a complete Next.js application with TikTok API integration, configured for deployment on Netlify.

## Features

- TikTok API integration with proper error handling
- API endpoints for posting content to TikTok and retrieving account information
- Environment variable configuration for secure credential management
- Responsive frontend interface
- Comprehensive deployment guide

## API Endpoints

- `/api/status` - Check API status and environment variable configuration
- `/api/tiktok/account` - Get TikTok account information (GET request)
- `/api/tiktok/post` - Post content to TikTok (POST request)

## Environment Variables

This application requires the following environment variables:

- `TIKTOK_API_KEY` - Your TikTok API key
- `SOCIAL_MEDIA_TOKEN` - Your TikTok API secret (using this name instead of TIKTOK_API_SECRET)

## Local Development

To run the application locally:

1. Clone the repository
2. Create a `.env.local` file with your environment variables
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Visit http://localhost:3000

## Deployment

For detailed deployment instructions, please refer to the included `deployment_guide.md` file.

## Folder Structure

```
/
├── pages/
│   ├── index.js - Main homepage
│   ├── test.js - Test page to verify routing
│   └── api/
│       ├── status.js - API status endpoint
│       └── tiktok/
│           ├── account.js - TikTok account info endpoint
│           └── post.js - TikTok posting endpoint
├── package.json - Dependencies and scripts
├── next.config.js - Next.js configuration
├── netlify.toml - Netlify-specific configuration
├── deployment_guide.md - Detailed deployment instructions
└── README.md - This file
```

## Troubleshooting

If you encounter any issues during deployment or usage, please refer to the troubleshooting section in the deployment guide.

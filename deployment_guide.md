# Netlify Functions Deployment Guide (Fixed Configuration)

This guide explains how to deploy the Social Media Automation API using Netlify Functions with the correct configuration to avoid build errors.

## What Was Fixed

The previous package had a configuration issue where the function source folder and the publish folder were set to the same directory, causing build failures. This updated package uses the correct directory structure and build configuration:

1. **Separate Source and Build Directories**:
   - Source functions are in `src/functions/`
   - Built functions are output to `functions/`
   - Frontend files are in `public/`

2. **Updated Build Configuration**:
   - Added `webpack.functions.js` for proper function bundling
   - Modified `package.json` to use `netlify-lambda` correctly
   - Updated `netlify.toml` to reference the correct directories

## Directory Structure

```
netlify_functions_fixed/
├── src/
│   └── functions/         # Source functions (development)
│       ├── status.js
│       ├── tiktok-account.js
│       └── tiktok-post.js
├── functions/             # Built functions (created during build)
├── public/                # Static frontend files
│   └── index.html
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
└── webpack.functions.js   # Webpack configuration for functions
```

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

## Understanding the Fixed Configuration

### package.json

The key change is in the build script:

```json
"scripts": {
  "build": "npm run build:functions",
  "build:functions": "netlify-lambda build src/functions --config ./webpack.functions.js"
}
```

This ensures that:
- Source functions are read from `src/functions/`
- Built functions are output to `functions/` (default output directory)
- Webpack configuration is used for proper bundling

### netlify.toml

```toml
[build]
  command = "npm run build"
  functions = "functions"
  publish = "public"
```

This configuration:
- Runs the build command that builds functions from source
- Specifies `functions` as the directory containing the built functions
- Specifies `public` as the directory containing static assets

### webpack.functions.js

```js
module.exports = {
  optimization: { minimize: false },
  externals: {
    'aws-sdk': 'aws-sdk'
  }
};
```

This configuration:
- Prevents minification for easier debugging
- Excludes aws-sdk from the bundle (it's provided by Netlify)

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

1. **Function Build Errors**:
   - Check the build logs in Netlify dashboard
   - Ensure the directory structure matches what's described in this guide
   - Verify that webpack.functions.js is properly configured

2. **Function Execution Errors**:
   - Check the function logs in Netlify dashboard
   - Verify your environment variables are set correctly

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

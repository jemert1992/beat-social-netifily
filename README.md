# AI Visual Generator - Netlify Integration

This package contains everything you need to add AI visual generation capabilities to your Netlify site.

## What's Included

- **Netlify Functions**: Ready-to-deploy serverless functions for AI image and video generation
- **Frontend Integration**: JavaScript code to integrate with your existing UI
- **Templates System**: Customizable templates for different content types and niches
- **Configuration Files**: Properly configured netlify.toml and package.json

## Quick Setup

1. **Extract this package** to your GitHub repository
2. **Add API keys** to your Netlify environment variables:
   - `STABILITY_API_KEY` - Get from stability.ai
   - `OPENAI_API_KEY` - Get from openai.com
3. **Include the JavaScript** in your content creation page:
   ```html
   <script src="/js/ai-visual-generator.js"></script>
   ```
4. **Deploy to Netlify** by pushing to your GitHub repository

## Directory Structure

- `/functions` - Netlify Functions for the backend API
- `/public/js` - Frontend JavaScript for UI integration
- `/data` - Template definitions and other data files
- `netlify.toml` - Netlify configuration
- `package.json` - Node.js dependencies

## Features

- **AI Image Generation**: Create custom images based on text prompts
- **AI Video Creation**: Generate videos with transitions and effects
- **Template System**: Apply branded templates to content
- **Variation Generation**: Create multiple variations of an image

## Getting API Keys

### Stability AI API Key
1. Go to stability.ai and create an account
2. Navigate to your account dashboard
3. Find the API Keys section and create a new key
4. Copy the key for use in your Netlify environment variables

### OpenAI API Key
1. Go to openai.com and create an account
2. Navigate to your API settings
3. Create a new API key
4. Copy the key for use in your Netlify environment variables

## Adding to Your Existing Site

This package is designed to integrate with your existing Netlify site. Simply:

1. Copy the files to your GitHub repository
2. Add the API keys to your Netlify environment variables
3. Include the JavaScript file in your content creation page
4. Deploy to Netlify

No additional configuration is needed - everything is set up to work out of the box.

## Customization

You can customize the templates by editing the `/data/templates.json` file. Each template defines:

- Visual style elements
- Text positioning
- Color schemes
- And more

## Support

If you need help with this integration, please contact the development team.

// Netlify Function for posting content to TikTok
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const { video_url, caption, hashtags } = requestBody;

    // Validate required fields
    if (!video_url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'No video URL provided' })
      };
    }

    // Get environment variables
    const apiKey = process.env.TIKTOK_API_KEY;
    const apiSecret = process.env.SOCIAL_MEDIA_TOKEN;

    if (!apiKey || !apiSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: 'API credentials not configured. Please set TIKTOK_API_KEY and SOCIAL_MEDIA_TOKEN environment variables.'
        })
      };
    }

    // Create headers with authentication
    const headers = {
      'X-API-KEY': apiKey,
      'X-API-SECRET': apiSecret,
      'Content-Type': 'application/json'
    };

    // Prepare request body
    const tiktokRequestBody = {
      video_url,
      caption: caption || '',
      hashtags: hashtags || []
    };

    // Make request to TikTok API
    const response = await axios.post('https://api.tiktok.com/v1/video/upload', tiktokRequestBody, { headers });

    // Return the response from TikTok API
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Successfully posted to TikTok',
        data: response.data
      })
    };
  } catch (error) {
    console.error('Error posting to TikTok:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: `Failed to post to TikTok: ${error.message}`,
        error: error.response?.data || error.message
      })
    };
  }
};

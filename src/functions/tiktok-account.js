// Netlify Function for TikTok account information
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
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

    // Make request to TikTok API
    const response = await axios.get('https://api.tiktok.com/v1/account/info', { headers });

    // Return the response from TikTok API
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Successfully retrieved TikTok account information',
        data: response.data
      })
    };
  } catch (error) {
    console.error('Error fetching TikTok account info:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: `Failed to get TikTok account information: ${error.message}`,
        error: error.response?.data || error.message
      })
    };
  }
};

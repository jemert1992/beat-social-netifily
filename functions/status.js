// Netlify Function for checking API status
exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  // Check if environment variables are set
  const apiKey = process.env.TIKTOK_API_KEY;
  const apiSecret = process.env.SOCIAL_MEDIA_TOKEN;

  // Return status information
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: 'Social Media Automation API is operational',
      environment: {
        tiktok_api_key_set: !!apiKey,
        social_media_token_set: !!apiSecret
      },
      endpoints: {
        status: '/.netlify/functions/status',
        tiktok_account: '/.netlify/functions/tiktok-account',
        tiktok_post: '/.netlify/functions/tiktok-post'
      },
      version: '1.0.0'
    })
  };
};

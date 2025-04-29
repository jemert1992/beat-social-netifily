// Netlify Function for video creation from images
const fetch = require('node-fetch');
require('dotenv').config();

// Main handler function
async function mainHandler(event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Method not allowed" })
      };
    }

    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Check for required fields
    if (!data.image_ids || !Array.isArray(data.image_ids) || data.image_ids.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Missing required field: image_ids (must be a non-empty array)" })
      };
    }

    // Get parameters with defaults
    const duration = data.duration || 15;
    const music = data.music || false;
    const transitions = data.transitions || 'fade';
    const effect = data.effect || 'none';
    
    // In a real implementation, we would use a video processing service or library
    // For this demo, we'll return a mock response
    
    // Generate a unique ID for the video
    const videoId = 'vid_' + Math.random().toString(36).substring(2, 10);
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        video: {
          id: videoId,
          url: `/videos/${videoId}.mp4`,
          thumbnail_url: `/videos/${videoId}_thumb.jpg`,
          duration: duration,
          transition: transitions,
          effect: effect,
          music: typeof music === 'string' ? music : (music ? 'default' : 'none')
        }
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Internal server error: " + error.message })
    };
  }
}

// Handle OPTIONS requests for CORS
exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }
  
  // For non-OPTIONS requests, call the main handler
  return mainHandler(event, context);
};

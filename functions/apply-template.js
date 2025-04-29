// Netlify Function for applying a template to an image or video
const templates = require('../data/templates.json');

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
    if (!data.content_id) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Missing required field: content_id" })
      };
    }
    
    if (!data.template_id) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Missing required field: template_id" })
      };
    }
    
    // Check if template exists
    if (!templates[data.template_id]) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Template not found" })
      };
    }
    
    const template = templates[data.template_id];
    const caption = data.caption || "Your caption here";
    const contentId = data.content_id;
    const contentType = template.type; // image or video
    
    // In a real implementation, we would apply the template to the content
    // For this demo, we'll return a mock response
    
    // Generate a unique ID for the templated content
    const templatedId = contentType === 'image' ? 
      'img_t_' + Math.random().toString(36).substring(2, 10) :
      'vid_t_' + Math.random().toString(36).substring(2, 10);
    
    // Return success response
    if (contentType === 'image') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          image: {
            id: templatedId,
            url: `/images/${templatedId}.png`,
            template_id: data.template_id,
            original_id: contentId
          }
        })
      };
    } else {
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
            id: templatedId,
            url: `/videos/${templatedId}.mp4`,
            thumbnail_url: `/videos/${templatedId}_thumb.jpg`,
            template_id: data.template_id,
            original_id: contentId
          }
        })
      };
    }
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

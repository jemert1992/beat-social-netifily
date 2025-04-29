// Netlify Function for getting available templates
const templates = require('../data/templates.json');

// Main handler function
async function mainHandler(event, context) {
  try {
    // Only allow GET requests
    if (event.httpMethod !== "GET") {
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

    // Parse query parameters
    const params = event.queryStringParameters || {};
    const templateType = params.type;
    const niche = params.niche;
    
    // Filter templates
    let filteredTemplates = [];
    
    for (const [templateId, template] of Object.entries(templates)) {
      // Apply type filter
      if (templateType && template.type !== templateType) {
        continue;
      }
      
      // Apply niche filter
      if (niche && template.niche !== niche && template.niche !== "general") {
        continue;
      }
      
      // Add template to filtered list
      filteredTemplates.push({
        id: templateId,
        name: template.name,
        type: template.type,
        niche: template.niche
      });
    }
    
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
        templates: filteredTemplates
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

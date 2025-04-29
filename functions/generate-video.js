// Netlify Function for generating a video directly from a prompt
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
    if (!data.prompt) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Missing required field: prompt" })
      };
    }

    // Get parameters with defaults
    const prompt = data.prompt;
    const duration = data.duration || 15;
    const music = data.music || false;
    const transitions = data.transitions || 'fade';
    const effect = data.effect || 'none';
    const numScenes = data.num_scenes || 5;
    
    // Get API keys from environment variables
    const stabilityApiKey = process.env.STABILITY_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!stabilityApiKey || !openaiApiKey) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "API keys not configured" })
      };
    }

    // Step 1: Generate scene descriptions using OpenAI
    let sceneDescriptions;
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are an expert at creating scene descriptions for video content. Your task is to break down a main video concept into individual scenes that flow together."
            },
            {
              role: "user",
              content: `Break down this video concept into ${numScenes} distinct scene descriptions that flow together to tell a story. Each scene should be described in a single sentence optimized for AI image generation: '${prompt}'`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!openaiResponse.ok) {
        const error = await openaiResponse.json();
        throw new Error(error.message || 'Error calling OpenAI API');
      }

      const openaiData = await openaiResponse.json();
      const sceneText = openaiData.choices[0].message.content.trim();
      
      // Parse the scene descriptions
      sceneDescriptions = [];
      for (const line of sceneText.split('\n')) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.match(/^\d+\.?$/) && !trimmedLine.startsWith('#')) {
          // Remove numbering if present
          const cleanLine = trimmedLine.includes('. ') ? trimmedLine.split('. ').slice(1).join('. ') : trimmedLine;
          sceneDescriptions.push(cleanLine);
        }
      }
      
      // Ensure we have the requested number of scenes
      while (sceneDescriptions.length < numScenes) {
        sceneDescriptions.push(`${prompt}, scene ${sceneDescriptions.length + 1}`);
      }
      
      // Limit to requested number of scenes
      sceneDescriptions = sceneDescriptions.slice(0, numScenes);
      
    } catch (error) {
      console.error('Error creating scene descriptions:', error);
      
      // Fallback to basic scene descriptions
      sceneDescriptions = [];
      if (numScenes === 1) {
        sceneDescriptions = [prompt];
      } else {
        for (let i = 0; i < numScenes; i++) {
          if (i === 0) {
            sceneDescriptions.push(`${prompt}, opening scene`);
          } else if (i === numScenes - 1) {
            sceneDescriptions.push(`${prompt}, final scene`);
          } else {
            sceneDescriptions.push(`${prompt}, scene ${i + 1}`);
          }
        }
      }
    }

    // Step 2: Generate images for each scene
    // In a real implementation, we would call the Stability API for each scene
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
          music: typeof music === 'string' ? music : (music ? 'default' : 'none'),
          scenes: sceneDescriptions
        },
        caption: prompt
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

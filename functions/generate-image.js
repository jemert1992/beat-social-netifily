// Netlify Function for image generation
const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async function(event, context) {
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

    // Get API key from environment variables
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "API key not configured" })
      };
    }

    // Prepare the prompt with style and niche enhancements
    let enhancedPrompt = data.prompt;
    const style = data.style || 'modern';
    const niche = data.niche || 'general';
    
    // Style presets
    const styles = {
      'modern': {
        prefix: 'Modern, clean, professional photo, ',
        suffix: ', high quality, detailed',
        negative: 'blurry, low quality, distorted'
      },
      'minimal': {
        prefix: 'Minimalist, simple, clean, ',
        suffix: ', high quality, elegant',
        negative: 'busy, cluttered, complex, low quality'
      },
      'vibrant': {
        prefix: 'Vibrant, colorful, energetic, ',
        suffix: ', high saturation, detailed',
        negative: 'dull, monochrome, low saturation'
      },
      'vintage': {
        prefix: 'Vintage, retro, nostalgic, ',
        suffix: ', film grain, analog',
        negative: 'modern, digital, clean'
      },
      'editorial': {
        prefix: 'Editorial, magazine style, professional, ',
        suffix: ', high fashion, detailed',
        negative: 'amateur, casual, low quality'
      }
    };

    // Niche enhancements
    const niches = {
      'fashion': ' fashion, style, clothing, outfit, model, ',
      'food': ' food, cuisine, dish, meal, delicious, ',
      'fitness': ' fitness, workout, exercise, healthy, athletic, ',
      'travel': ' travel, destination, landscape, adventure, ',
      'beauty': ' beauty, cosmetics, skincare, glamour, ',
      'tech': ' technology, gadget, device, modern, ',
      'general': ' '
    };

    // Apply style and niche to prompt
    const selectedStyle = styles[style] || styles['modern'];
    const nicheKeywords = niches[niche] || niches['general'];
    
    enhancedPrompt = selectedStyle.prefix + nicheKeywords + enhancedPrompt + selectedStyle.suffix;
    const negativePrompt = data.negative_prompt || selectedStyle.negative;

    // Prepare aspect ratio
    const aspectRatio = data.aspect_ratio || '9:16';
    let width, height;
    
    switch (aspectRatio) {
      case '1:1':
        width = 1024;
        height = 1024;
        break;
      case '4:5':
        width = 864;
        height = 1080;
        break;
      case '16:9':
        width = 1280;
        height = 720;
        break;
      case '9:16':
      default:
        width = 576;
        height = 1024;
        break;
    }

    // Call Stability AI API
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: enhancedPrompt,
            weight: 1
          },
          {
            text: negativePrompt,
            weight: -1
          }
        ],
        cfg_scale: 7,
        height: height,
        width: width,
        samples: 1,
        steps: 30
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Stability API error:', error);
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: error.message || 'Error calling Stability API' })
      };
    }

    const responseData = await response.json();
    
    // In a real implementation, we would save the image to a storage service
    // For this demo, we'll assume the image is saved and return a mock URL
    // In a production environment, you would use Netlify Large Media or another storage solution
    
    // Generate a unique ID for the image
    const imageId = 'img_' + Math.random().toString(36).substring(2, 10);
    
    // Get the base64 image data from the response
    const imageData = responseData.artifacts[0].base64;
    
    // Return success response with image data
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
          id: imageId,
          url: `/images/${imageId}.png`,
          base64: imageData,
          metadata: {
            prompt: data.prompt,
            style: style,
            niche: niche,
            aspect_ratio: aspectRatio
          }
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
};

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

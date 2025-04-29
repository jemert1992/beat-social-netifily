// AI Visual Generator integration for Netlify
// This script integrates with Netlify Functions for AI content generation

// API endpoint base URL - points to Netlify Functions
const API_BASE_URL = '/.netlify/functions';

// Initialize the AI Visual Generator integration
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the content creation page
    if (document.getElementById('content-form')) {
        // Add AI generation options to the UI
        addAIGenerationOptions();
        
        // Set up event listeners for AI generation
        setupAIGenerationListeners();
    }
});

// Add AI generation options to the content creation UI
function addAIGenerationOptions() {
    // Find the content URL input group
    const contentUrlGroup = document.getElementById('content-url').closest('.form-group');
    
    // Create AI generation options
    const aiGenerationOptions = document.createElement('div');
    aiGenerationOptions.className = 'form-group mt-3';
    aiGenerationOptions.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <label class="form-label">AI Content Generation</label>
            <button type="button" id="ai-generation-toggle" class="btn btn-sm btn-outline-primary">
                <i class="fas fa-magic"></i> Show Options
            </button>
        </div>
        <div id="ai-generation-options" class="card p-3 mb-3" style="display: none;">
            <div class="form-group">
                <label for="ai-prompt" class="form-label">Content Prompt</label>
                <textarea id="ai-prompt" class="form-control" placeholder="Describe the content you want to generate..."></textarea>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-content-type" class="form-label">Content Type</label>
                        <select id="ai-content-type" class="form-select">
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-niche" class="form-label">Content Niche</label>
                        <select id="ai-niche" class="form-select">
                            <option value="general">General</option>
                            <option value="fashion">Fashion</option>
                            <option value="food">Food</option>
                            <option value="fitness">Fitness</option>
                            <option value="travel">Travel</option>
                            <option value="beauty">Beauty</option>
                            <option value="tech">Tech</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-style" class="form-label">Visual Style</label>
                        <select id="ai-style" class="form-select">
                            <option value="modern">Modern</option>
                            <option value="minimal">Minimal</option>
                            <option value="vibrant">Vibrant</option>
                            <option value="vintage">Vintage</option>
                            <option value="editorial">Editorial</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-aspect-ratio" class="form-label">Aspect Ratio</label>
                        <select id="ai-aspect-ratio" class="form-select">
                            <option value="9:16">9:16 (TikTok)</option>
                            <option value="4:5">4:5 (Instagram)</option>
                            <option value="1:1">1:1 (Square)</option>
                            <option value="16:9">16:9 (Landscape)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="video-options" class="row mt-2" style="display: none;">
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-transition" class="form-label">Transition Effect</label>
                        <select id="ai-transition" class="form-select">
                            <option value="fade">Fade</option>
                            <option value="slide">Slide</option>
                            <option value="zoom">Zoom</option>
                            <option value="rotate">Rotate</option>
                            <option value="blur">Blur</option>
                            <option value="pixelate">Pixelate</option>
                            <option value="wipe">Wipe</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="ai-music" class="form-label">Background Music</label>
                        <select id="ai-music" class="form-select">
                            <option value="none">None</option>
                            <option value="upbeat">Upbeat</option>
                            <option value="emotional">Emotional</option>
                            <option value="relaxing">Relaxing</option>
                            <option value="energetic">Energetic</option>
                            <option value="cinematic">Cinematic</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group mt-2">
                <label for="ai-template" class="form-label">Apply Template</label>
                <select id="ai-template" class="form-select">
                    <option value="">None</option>
                    <!-- Templates will be loaded dynamically -->
                </select>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button type="button" id="ai-generate-variations" class="btn btn-outline-primary">
                    <i class="fas fa-random"></i> Generate Variations
                </button>
                <button type="button" id="ai-generate-content" class="btn btn-primary">
                    <i class="fas fa-magic"></i> Generate Content
                </button>
            </div>
        </div>
    `;
    
    // Insert AI generation options after content URL input
    contentUrlGroup.parentNode.insertBefore(aiGenerationOptions, contentUrlGroup.nextSibling);
    
    // Add generated content preview section
    const previewSection = document.createElement('div');
    previewSection.id = 'ai-generated-preview';
    previewSection.className = 'mt-3';
    previewSection.style.display = 'none';
    previewSection.innerHTML = `
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Generated Content</h3>
                <button type="button" id="ai-preview-close" class="btn btn-sm btn-outline-secondary">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="card-body">
                <div id="ai-preview-content" class="text-center mb-3">
                    <!-- Generated content will be displayed here -->
                </div>
                <div class="d-flex justify-content-between">
                    <button type="button" id="ai-regenerate" class="btn btn-outline-primary">
                        <i class="fas fa-sync"></i> Regenerate
                    </button>
                    <button type="button" id="ai-use-content" class="btn btn-success">
                        <i class="fas fa-check"></i> Use This Content
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Insert preview section after AI generation options
    aiGenerationOptions.parentNode.insertBefore(previewSection, aiGenerationOptions.nextSibling);
}

// Set up event listeners for AI generation
function setupAIGenerationListeners() {
    // Toggle AI generation options
    const toggleButton = document.getElementById('ai-generation-toggle');
    const optionsPanel = document.getElementById('ai-generation-options');
    
    toggleButton.addEventListener('click', function() {
        const isVisible = optionsPanel.style.display !== 'none';
        optionsPanel.style.display = isVisible ? 'none' : 'block';
        toggleButton.innerHTML = isVisible ? 
            '<i class="fas fa-magic"></i> Show Options' : 
            '<i class="fas fa-magic"></i> Hide Options';
    });
    
    // Toggle video-specific options based on content type
    const contentTypeSelect = document.getElementById('ai-content-type');
    const videoOptions = document.getElementById('video-options');
    
    contentTypeSelect.addEventListener('change', function() {
        videoOptions.style.display = this.value === 'video' ? 'flex' : 'none';
        
        // Load templates based on content type
        loadTemplates(this.value, document.getElementById('ai-niche').value);
    });
    
    // Load templates when niche changes
    const nicheSelect = document.getElementById('ai-niche');
    nicheSelect.addEventListener('change', function() {
        loadTemplates(contentTypeSelect.value, this.value);
    });
    
    // Generate content button
    const generateButton = document.getElementById('ai-generate-content');
    generateButton.addEventListener('click', generateContent);
    
    // Generate variations button
    const variationsButton = document.getElementById('ai-generate-variations');
    variationsButton.addEventListener('click', generateVariations);
    
    // Close preview button
    const closePreviewButton = document.getElementById('ai-preview-close');
    closePreviewButton.addEventListener('click', function() {
        document.getElementById('ai-generated-preview').style.display = 'none';
    });
    
    // Regenerate button
    const regenerateButton = document.getElementById('ai-regenerate');
    regenerateButton.addEventListener('click', generateContent);
    
    // Use content button
    const useContentButton = document.getElementById('ai-use-content');
    useContentButton.addEventListener('click', useGeneratedContent);
    
    // Load templates on initial load
    loadTemplates('image', 'general');
}

// Load templates based on content type and niche
function loadTemplates(contentType, niche) {
    const templateSelect = document.getElementById('ai-template');
    
    // Clear existing options except the first one
    while (templateSelect.options.length > 1) {
        templateSelect.remove(1);
    }
    
    // Show loading state
    const loadingOption = document.createElement('option');
    loadingOption.text = 'Loading templates...';
    loadingOption.disabled = true;
    templateSelect.add(loadingOption);
    
    // Fetch templates from API
    fetch(`${API_BASE_URL}/get-templates?type=${contentType}&niche=${niche}`)
        .then(response => response.json())
        .then(data => {
            // Remove loading option
            templateSelect.remove(templateSelect.options.length - 1);
            
            if (data.success && data.templates && data.templates.length > 0) {
                // Add templates to select
                data.templates.forEach(template => {
                    const option = document.createElement('option');
                    option.value = template.id;
                    option.text = template.name;
                    templateSelect.add(option);
                });
            } else {
                // Add no templates found option
                const noTemplatesOption = document.createElement('option');
                noTemplatesOption.text = 'No templates found';
                noTemplatesOption.disabled = true;
                templateSelect.add(noTemplatesOption);
            }
        })
        .catch(error => {
            console.error('Error loading templates:', error);
            
            // Remove loading option
            templateSelect.remove(templateSelect.options.length - 1);
            
            // Add error option
            const errorOption = document.createElement('option');
            errorOption.text = 'Error loading templates';
            errorOption.disabled = true;
            templateSelect.add(errorOption);
        });
}

// Generate content based on form inputs
function generateContent() {
    // Get form values
    const prompt = document.getElementById('ai-prompt').value;
    const contentType = document.getElementById('ai-content-type').value;
    const niche = document.getElementById('ai-niche').value;
    const style = document.getElementById('ai-style').value;
    const aspectRatio = document.getElementById('ai-aspect-ratio').value;
    const template = document.getElementById('ai-template').value;
    
    // Validate prompt
    if (!prompt) {
        alert('Please enter a content prompt');
        return;
    }
    
    // Show loading state
    const generateButton = document.getElementById('ai-generate-content');
    const originalButtonText = generateButton.innerHTML;
    generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateButton.disabled = true;
    
    // Prepare API endpoint and data
    let endpoint, requestData;
    
    if (contentType === 'image') {
        endpoint = '/generate-image';
        requestData = {
            prompt: prompt,
            niche: niche,
            style: style,
            aspect_ratio: aspectRatio
        };
    } else {
        endpoint = '/generate-video';
        const transition = document.getElementById('ai-transition').value;
        const music = document.getElementById('ai-music').value;
        
        requestData = {
            prompt: prompt,
            duration: 15,
            music: music !== 'none' ? music : false,
            transitions: transition,
            num_scenes: 5
        };
    }
    
    // Call API
    fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // Reset button state
        generateButton.innerHTML = originalButtonText;
        generateButton.disabled = false;
        
        if (data.success) {
            // If template is selected, apply it
            if (template) {
                applyTemplate(data, contentType, template, prompt);
            } else {
                // Show preview
                showGeneratedContent(data, contentType);
            }
        } else {
            alert(`Error generating content: ${data.error || 'Unknown error'}`);
        }
    })
    .catch(error => {
        console.error('Error generating content:', error);
        
        // Reset button state
        generateButton.innerHTML = originalButtonText;
        generateButton.disabled = false;
        
        alert(`Error generating content: ${error.message}`);
    });
}

// Apply template to generated content
function applyTemplate(data, contentType, templateId, caption) {
    // Show loading state
    const generateButton = document.getElementById('ai-generate-content');
    generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying Template...';
    generateButton.disabled = true;
    
    // Prepare request data
    const requestData = {
        content_id: contentType === 'image' ? data.image.id : data.video.id,
        template_id: templateId,
        caption: caption
    };
    
    // Call API
    fetch(`${API_BASE_URL}/apply-template`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(templateData => {
        // Reset button state
        generateButton.innerHTML = '<i class="fas fa-magic"></i> Generate Content';
        generateButton.disabled = false;
        
        if (templateData.success) {
            // Update data with templated content
            if (contentType === 'image') {
                data.image = templateData.image;
            } else {
                data.video = templateData.video;
            }
            
            // Show preview
            showGeneratedContent(data, contentType);
        } else {
            alert(`Error applying template: ${templateData.error || 'Unknown error'}`);
            
            // Show preview of original content
            showGeneratedContent(data, contentType);
        }
    })
    .catch(error => {
        console.error('Error applying template:', error);
        
        // Reset button state
        generateButton.innerHTML = '<i class="fas fa-magic"></i> Generate Content';
        generateButton.disabled = false;
        
        alert(`Error applying template: ${error.message}`);
        
        // Show preview of original content
        showGeneratedContent(data, contentType);
    });
}

// Generate variations of content
function generateVariations() {
    // Get form values
    const prompt = document.getElementById('ai-prompt').value;
    const contentType = document.getElementById('ai-content-type').value;
    
    // Only support image variations for now
    if (contentType !== 'image') {
        alert('Variations are currently only supported for images');
        return;
    }
    
    // Validate prompt
    if (!prompt) {
        alert('Please enter a content prompt');
        return;
    }
    
    // Show loading state
    const variationsButton = document.getElementById('ai-generate-variations');
    const originalButtonText = variationsButton.innerHTML;
    variationsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    variationsButton.disabled = true;
    
    // Get other form values
    const niche = document.getElementById('ai-niche').value;
    const style = document.getElementById('ai-style').value;
    const aspectRatio = document.getElementById('ai-aspect-ratio').value;
    
    // Prepare API endpoint and data
    const endpoint = '/generate-image-variations';
    const requestData = {
        prompt: prompt,
        niche: niche,
        style: style,
        aspect_ratio: aspectRatio,
        num_variations: 3
    };
    
    // Call API
    fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // Reset button state
        variationsButton.innerHTML = originalButtonText;
        variationsButton.disabled = false;
        
        if (data.success) {
            // Show variations
            showVariations(data.variations, prompt);
        } else {
            alert(`Error generating variations: ${data.error || 'Unknown error'}`);
        }
    })
    .catch(error => {
        console.error('Error generating variations:', error);
        
        // Reset button state
        variationsButton.innerHTML = originalButtonText;
        variationsButton.disabled = false;
        
        alert(`Error generating variations: ${error.message}`);
    });
}

// Show generated content in preview
function showGeneratedContent(data, contentType) {
    const previewContainer = document.getElementById('ai-preview-content');
    const previewSection = document.getElementById('ai-generated-preview');
    
    // Clear previous content
    previewContainer.innerHTML = '';
    
    // Create content element based on type
    if (contentType === 'image') {
        // Check if we have base64 data
        if (data.image.base64) {
            const image = document.createElement('img');
            image.src = `data:image/png;base64,${data.image.base64}`;
            image.alt = 'Generated image';
            image.className = 'img-fluid';
            image.dataset.id = data.image.id;
            image.dataset.url = data.image.url;
            
            previewContainer.appendChild(image);
        } else {
            // Fallback to URL
            const image = document.createElement('img');
            image.src = data.image.url.startsWith('http') ? data.image.url : window.location.origin + data.image.url;
            image.alt = 'Generated image';
            image.className = 'img-fluid';
            image.dataset.id = data.image.id;
            image.dataset.url = data.image.url;
            
            previewContainer.appendChild(image);
        }
    } else {
        // For video, we'll need to handle it differently since we can't easily display base64 videos
        const video = document.createElement('video');
        video.src = data.video.url.startsWith('http') ? data.video.url : window.location.origin + data.video.url;
        video.controls = true;
        video.autoplay = true;
        video.muted = true;
        video.className = 'img-fluid';
        video.dataset.id = data.video.id;
        video.dataset.url = data.video.url;
        
        previewContainer.appendChild(video);
    }
    
    // Add caption
    const caption = document.createElement('p');
    caption.className = 'mt-2';
    caption.textContent = data.caption || '';
    previewContainer.appendChild(caption);
    
    // Show preview section
    previewSection.style.display = 'block';
    
    // Store content data for later use
    previewSection.dataset.contentType = contentType;
    previewSection.dataset.contentId = contentType === 'image' ? data.image.id : data.video.id;
    previewSection.dataset.contentUrl = contentType === 'image' ? data.image.url : data.video.url;
    previewSection.dataset.caption = data.caption || '';
}

// Show variations in preview
function showVariations(variations, prompt) {
    const previewContainer = document.getElementById('ai-preview-content');
    const previewSection = document.getElementById('ai-generated-preview');
    
    // Clear previous content
    previewContainer.innerHTML = '';
    
    // Create variations container
    const variationsContainer = document.createElement('div');
    variationsContainer.className = 'row';
    
    // Add each variation
    variations.forEach((variation, index) => {
        const col = document.createElement('div');
        col.className = 'col-4';
        
        const card = document.createElement('div');
        card.className = 'card';
        
        // Check if we have base64 data
        const image = document.createElement('img');
        if (variation.base64) {
            image.src = `data:image/png;base64,${variation.base64}`;
        } else {
            image.src = variation.url.startsWith('http') ? variation.url : window.location.origin + variation.url;
        }
        image.alt = `Variation ${index + 1}`;
        image.className = 'card-img-top';
        image.dataset.id = variation.id;
        image.dataset.url = variation.url;
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center';
        
        const selectButton = document.createElement('button');
        selectButton.className = 'btn btn-sm btn-primary';
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', function() {
            // Update preview to show only this variation
            showGeneratedContent({
                image: variation,
                caption: prompt
            }, 'image');
        });
        
        cardBody.appendChild(selectButton);
        card.appendChild(image);
        card.appendChild(cardBody);
        col.appendChild(card);
        variationsContainer.appendChild(col);
    });
    
    previewContainer.appendChild(variationsContainer);
    
    // Show preview section
    previewSection.style.display = 'block';
    
    // Store content type for later use
    previewSection.dataset.contentType = 'image';
}

// Use generated content in the main form
function useGeneratedContent() {
    const previewSection = document.getElementById('ai-generated-preview');
    const contentType = previewSection.dataset.contentType;
    const contentUrl = previewSection.dataset.contentUrl;
    const caption = previewSection.dataset.caption;
    
    // Update main form
    document.getElementById('content-type').value = contentType;
    document.getElementById('content-url').value = contentUrl.startsWith('http') ? contentUrl : window.location.origin + contentUrl;
    document.getElementById('caption').value = caption;
    
    // Update preview
    updateContentPreview();
    
    // Hide AI preview
    previewSection.style.display = 'none';
    
    // Scroll to top of form
    document.getElementById('content-form').scrollIntoView({ behavior: 'smooth' });
}

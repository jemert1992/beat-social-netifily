// JavaScript for the Content Creator page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners specific to content creation
    setupContentCreationListeners();
    
    // Initialize content preview
    initializeContentPreview();
});

// Set up event listeners for content creation page
function setupContentCreationListeners() {
    // Content type change
    const contentTypeSelect = document.getElementById('content-type');
    if (contentTypeSelect) {
        contentTypeSelect.addEventListener('change', updateContentPreview);
    }
    
    // Caption input
    const captionInput = document.getElementById('caption');
    if (captionInput) {
        captionInput.addEventListener('input', updateContentPreview);
    }
    
    // Hashtag input
    const hashtagInput = document.getElementById('hashtags');
    if (hashtagInput) {
        hashtagInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addHashtag(this.value.trim());
                this.value = '';
                updateContentPreview();
            }
        });
    }
    
    // Add trending hashtag buttons
    document.querySelectorAll('.hashtag-add').forEach(button => {
        button.addEventListener('click', function() {
            const hashtag = this.parentElement.textContent.trim().replace('+', '').trim();
            addHashtag(hashtag);
            updateContentPreview();
        });
    });
    
    // Generate caption button
    const generateCaptionButton = document.getElementById('generate-caption');
    if (generateCaptionButton) {
        generateCaptionButton.addEventListener('click', generateCaption);
    }
    
    // Suggest hashtags button
    const suggestHashtagsButton = document.getElementById('suggest-hashtags');
    if (suggestHashtagsButton) {
        suggestHashtagsButton.addEventListener('click', suggestHashtags);
    }
    
    // Content URL input
    const contentUrlInput = document.getElementById('content-url');
    if (contentUrlInput) {
        contentUrlInput.addEventListener('input', updateContentPreview);
    }
    
    // Platform checkboxes
    document.querySelectorAll('input[id^="platform-"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateContentPreview);
    });
    
    // Post now button
    const postNowButton = document.getElementById('post-now-button');
    if (postNowButton) {
        postNowButton.addEventListener('click', handlePostNow);
    }
    
    // Schedule button
    const scheduleButton = document.getElementById('schedule-button');
    if (scheduleButton) {
        scheduleButton.addEventListener('click', handleSchedulePost);
    }
    
    // Content idea buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.trim() === 'Use This Idea') {
            button.addEventListener('click', function() {
                const ideaTitle = this.parentElement.querySelector('h3').textContent;
                const ideaDescription = this.parentElement.querySelector('p').textContent;
                
                // Fill in the content form with the idea
                document.getElementById('caption').value = `${ideaTitle}\n\n${ideaDescription}`;
                
                // Update preview
                updateContentPreview();
                
                // Scroll to top of form
                document.getElementById('content-form').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
}

// Initialize content preview
function initializeContentPreview() {
    updateContentPreview();
}

// Update content preview based on form inputs
function updateContentPreview() {
    // Get form values
    const contentType = document.getElementById('content-type').value;
    const contentUrl = document.getElementById('content-url').value;
    const caption = document.getElementById('caption').value;
    const hashtags = Array.from(document.querySelectorAll('.hashtag-list .hashtag')).map(tag => {
        return tag.textContent.trim().replace('×', '').replace('+', '').trim();
    }).filter(tag => !tag.includes('+'));
    
    // Get selected platforms
    let selectedPlatform = 'TikTok';
    if (document.getElementById('platform-instagram').checked) {
        selectedPlatform = 'Instagram';
    } else if (document.getElementById('platform-twitter').checked) {
        selectedPlatform = 'Twitter';
    }
    
    // Update preview elements
    document.getElementById('preview-platform').textContent = selectedPlatform;
    
    // Update media preview based on content type
    const previewMedia = document.getElementById('preview-media');
    if (contentUrl) {
        if (contentType === 'video') {
            previewMedia.innerHTML = `
                <div style="background-color: #f0f0f0; padding: 2rem; border-radius: 8px; color: #666;">
                    <i class="fas fa-video fa-3x mb-2"></i>
                    <p>Video preview: ${contentUrl}</p>
                </div>
            `;
        } else if (contentType === 'image') {
            previewMedia.innerHTML = `
                <div style="background-color: #f0f0f0; padding: 2rem; border-radius: 8px; color: #666;">
                    <i class="fas fa-image fa-3x mb-2"></i>
                    <p>Image preview: ${contentUrl}</p>
                </div>
            `;
        } else if (contentType === 'carousel') {
            previewMedia.innerHTML = `
                <div style="background-color: #f0f0f0; padding: 2rem; border-radius: 8px; color: #666;">
                    <i class="fas fa-images fa-3x mb-2"></i>
                    <p>Carousel preview: ${contentUrl}</p>
                </div>
            `;
        }
    } else {
        previewMedia.innerHTML = `
            <div style="background-color: #f0f0f0; padding: 2rem; border-radius: 8px; color: #666;">
                <i class="fas fa-${contentType === 'video' ? 'video' : contentType === 'image' ? 'image' : contentType === 'carousel' ? 'images' : 'font'} fa-3x mb-2"></i>
                <p>${contentType.charAt(0).toUpperCase() + contentType.slice(1)} preview will appear here</p>
            </div>
        `;
    }
    
    // Update caption preview
    document.getElementById('preview-caption').textContent = caption || 'Your caption will appear here';
    
    // Update hashtags preview
    const previewHashtags = document.getElementById('preview-hashtags');
    previewHashtags.innerHTML = '';
    
    hashtags.forEach(tag => {
        if (!tag.includes('+')) {
            const hashtagElement = document.createElement('span');
            hashtagElement.className = 'hashtag';
            hashtagElement.textContent = tag;
            previewHashtags.appendChild(hashtagElement);
        }
    });
}

// Generate a caption based on content type
function generateCaption() {
    const contentType = document.getElementById('content-type').value;
    let caption = '';
    
    switch (contentType) {
        case 'video':
            caption = "Check out our latest video! We're excited to share this content with you. Let us know what you think in the comments below.";
            break;
        case 'image':
            caption = "A picture is worth a thousand words. We're proud to present this new image from our collection.";
            break;
        case 'carousel':
            caption = "Swipe through to see our complete collection! Each slide has something special for you.";
            break;
        case 'text':
            caption = "We have some important news to share with our community. Read on to find out more!";
            break;
    }
    
    document.getElementById('caption').value = caption;
    updateContentPreview();
}

// Suggest hashtags based on content
function suggestHashtags() {
    const contentType = document.getElementById('content-type').value;
    const caption = document.getElementById('caption').value;
    
    // Clear existing hashtags
    document.querySelector('.hashtag-list').innerHTML = '';
    
    // Generate hashtags based on content type and caption
    const hashtags = [];
    
    // Add content type hashtag
    hashtags.push(contentType);
    
    // Add general hashtags
    hashtags.push('socialmedia');
    hashtags.push('content');
    hashtags.push('digital');
    
    // Add hashtags based on caption words (simplified version)
    if (caption) {
        const words = caption.toLowerCase().split(/\s+/);
        const commonWords = ['the', 'and', 'is', 'in', 'to', 'a', 'for', 'of', 'with', 'on', 'our'];
        
        words.forEach(word => {
            // Remove punctuation and check length
            const cleanWord = word.replace(/[^\w\s]/gi, '');
            if (cleanWord.length > 4 && !commonWords.includes(cleanWord)) {
                hashtags.push(cleanWord);
            }
        });
    }
    
    // Add hashtags to the list (up to 10)
    const uniqueHashtags = [...new Set(hashtags)];
    uniqueHashtags.slice(0, 10).forEach(tag => {
        addHashtag(tag);
    });
    
    updateContentPreview();
}

// Add a hashtag to the list
function addHashtag(tag) {
    if (!tag) return;
    
    // Remove # if present
    if (tag.startsWith('#')) {
        tag = tag.substring(1);
    }
    
    // Check if hashtag already exists
    const existingHashtags = Array.from(document.querySelectorAll('.hashtag-list .hashtag')).map(el => {
        return el.textContent.trim().replace('×', '').replace('+', '').trim();
    }).filter(t => !t.includes('+'));
    
    if (existingHashtags.includes('#' + tag) || existingHashtags.includes(tag)) {
        return;
    }
    
    // Create hashtag element
    const hashtagElement = document.createElement('span');
    hashtagElement.className = 'hashtag';
    hashtagElement.innerHTML = `#${tag} <span class="hashtag-remove">×</span>`;
    
    // Add event listener to remove button
    hashtagElement.querySelector('.hashtag-remove').addEventListener('click', function() {
        hashtagElement.remove();
        updateContentPreview();
    });
    
    // Add to hashtag list
    document.querySelector('.hashtag-list').appendChild(hashtagElement);
}

// Handle post now button click
function handlePostNow() {
    // Get form values
    const contentUrl = document.getElementById('content-url').value;
    const caption = document.getElementById('caption').value;
    const hashtags = Array.from(document.querySelectorAll('.hashtag-list .hashtag')).map(tag => {
        return tag.textContent.trim().replace('×', '').replace('+', '').trim().replace('#', '');
    }).filter(tag => !tag.includes('+'));
    
    // Validate form
    if (!contentUrl) {
        alert('Please enter a content URL');
        return;
    }
    
    // Check if TikTok is selected
    if (!document.getElementById('platform-tiktok').checked) {
        alert('TikTok must be selected for posting');
        return;
    }
    
    // Show loading state
    const button = document.getElementById('post-now-button');
    button.classList.add('btn-loading');
    button.disabled = true;
    
    // Prepare data for API
    const postData = {
        video_url: contentUrl,
        caption: caption,
        hashtags: hashtags
    };
    
    // Call TikTok API
    fetch('/api/tiktok/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post response:', data);
        
        // Reset loading state
        button.classList.remove('btn-loading');
        button.disabled = false;
        
        if (data.success) {
            alert('Posted successfully to TikTok!');
            
            // Clear form
            document.getElementById('content-url').value = '';
            document.getElementById('caption').value = '';
            document.querySelector('.hashtag-list').innerHTML = '';
            updateContentPreview();
        } else {
            alert(`Error posting to TikTok: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error posting to TikTok:', error);
        
        // Reset loading state
        button.classList.remove('btn-loading');
        button.disabled = false;
        
        alert(`Error posting to TikTok: ${error.message}`);
    });
}

// Handle schedule post button click
function handleSchedulePost() {
    // Get form values
    const contentType = document.getElementById('content-type').value;
    const contentUrl = document.getElementById('content-url').value;
    const caption = document.getElementById('caption').value;
    
    // Validate form
    if (!contentUrl) {
        alert('Please enter a content URL');
        return;
    }
    
    if (!caption) {
        alert('Please enter a caption');
        return;
    }
    
    // Get selected platforms
    const platforms = [];
    if (document.getElementById('platform-tiktok').checked) {
        platforms.push('TikTok');
    }
    if (document.getElementById('platform-instagram').checked) {
        platforms.push('Instagram');
    }
    if (document.getElementById('platform-twitter').checked) {
        platforms.push('Twitter');
    }
    
    if (platforms.length === 0) {
        alert('Please select at least one platform');
        return;
    }
    
    // Show scheduling dialog (in a real app, this would be a modal)
    const scheduleDate = prompt('Enter schedule date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (!scheduleDate) return;
    
    const scheduleTime = prompt('Enter schedule time (HH:MM):', '10:00');
    if (!scheduleTime) return;
    
    // Format date for display
    const scheduleDateObj = new Date(`${scheduleDate}T${scheduleTime}`);
    const formattedDate = scheduleDateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    const formattedTime = scheduleDateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    
    alert(`Post scheduled for ${formattedDate} at ${formattedTime} on ${platforms.join(', ')}`);
    
    // In a real application, this would save the scheduled post to a database
    // and redirect to the schedule page
    
    // Clear form
    document.getElementById('content-url').value = '';
    document.getElementById('caption').value = '';
    document.querySelector('.hashtag-list').innerHTML = '';
    updateContentPreview();
    
    // Redirect to dashboard (in a real app, this would go to the schedule page)
    window.location.href = 'index.html';
}

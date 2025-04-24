// Main JavaScript file for Social Media Automation Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
});

// Initialize API connection and check status
function initializeAPI() {
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            console.log('API Status:', data);
            if (data.success) {
                console.log('API is operational');
                // Update UI to show API is connected
                document.querySelectorAll('.api-status-indicator').forEach(el => {
                    el.classList.add('connected');
                    el.setAttribute('title', 'API Connected');
                });
            } else {
                console.error('API is not operational');
                // Update UI to show API is disconnected
                document.querySelectorAll('.api-status-indicator').forEach(el => {
                    el.classList.add('disconnected');
                    el.setAttribute('title', 'API Disconnected');
                });
            }
        })
        .catch(error => {
            console.error('Error checking API status:', error);
            // Update UI to show API is disconnected
            document.querySelectorAll('.api-status-indicator').forEach(el => {
                el.classList.add('disconnected');
                el.setAttribute('title', 'API Disconnected');
            });
        });
}

// Set up event listeners for interactive elements
function setupEventListeners() {
    // Content creation form
    const contentForm = document.getElementById('content-form');
    if (contentForm) {
        contentForm.addEventListener('submit', handleContentSubmit);
    }
    
    // Hashtag input
    const hashtagInput = document.getElementById('hashtags');
    if (hashtagInput) {
        hashtagInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addHashtag(this.value.trim());
                this.value = '';
            }
        });
    }
    
    // Hashtag remove buttons
    document.querySelectorAll('.hashtag-remove').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // Post now button
    const postNowButton = document.querySelector('.btn-success');
    if (postNowButton) {
        postNowButton.addEventListener('click', handlePostNow);
    }
    
    // Schedule button
    const scheduleButton = document.querySelector('.btn-primary');
    if (scheduleButton && scheduleButton.textContent.trim() === 'Schedule') {
        scheduleButton.addEventListener('click', handleSchedulePost);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link, .sidebar-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation (in a real app, this would load different views)
            const target = this.textContent.trim().toLowerCase();
            console.log(`Navigating to: ${target}`);
            
            // For demo purposes, we'll just show an alert
            alert(`Navigating to ${target} page - This would load the ${target} view in a real application.`);
        });
    });
}

// Load dashboard data
function loadDashboardData() {
    // In a real application, this would fetch data from the API
    console.log('Loading dashboard data...');
    
    // For demo purposes, we'll just simulate loading data
    setTimeout(() => {
        console.log('Dashboard data loaded');
    }, 1000);
}

// Handle content form submission
function handleContentSubmit(e) {
    e.preventDefault();
    console.log('Content form submitted');
    
    // Get form values
    const contentType = document.getElementById('content-type').value;
    const contentUrl = document.getElementById('content-url').value;
    const caption = document.getElementById('caption').value;
    const hashtags = Array.from(document.querySelectorAll('.hashtag')).map(tag => {
        return tag.textContent.trim().replace('×', '').trim();
    });
    
    // Get selected platforms
    const platforms = [];
    if (document.getElementById('platform-tiktok').checked) {
        platforms.push('tiktok');
    }
    if (document.getElementById('platform-instagram').checked) {
        platforms.push('instagram');
    }
    if (document.getElementById('platform-twitter').checked) {
        platforms.push('twitter');
    }
    
    // Validate form
    if (!contentUrl) {
        alert('Please enter a content URL');
        return;
    }
    
    if (!caption) {
        alert('Please enter a caption');
        return;
    }
    
    if (platforms.length === 0) {
        alert('Please select at least one platform');
        return;
    }
    
    // Log the content data
    const contentData = {
        contentType,
        contentUrl,
        caption,
        hashtags,
        platforms
    };
    
    console.log('Content data:', contentData);
    
    // In a real application, this would send the data to the API
    alert('Content created successfully! In a real application, this would be saved or posted.');
}

// Add a hashtag to the list
function addHashtag(tag) {
    if (!tag) return;
    
    // Remove # if present
    if (tag.startsWith('#')) {
        tag = tag.substring(1);
    }
    
    // Create hashtag element
    const hashtagElement = document.createElement('span');
    hashtagElement.className = 'hashtag';
    hashtagElement.innerHTML = `#${tag} <span class="hashtag-remove">×</span>`;
    
    // Add event listener to remove button
    hashtagElement.querySelector('.hashtag-remove').addEventListener('click', function() {
        hashtagElement.remove();
    });
    
    // Add to hashtag list
    document.querySelector('.hashtag-list').appendChild(hashtagElement);
}

// Handle post now button click
function handlePostNow() {
    console.log('Post now button clicked');
    
    // Get form values
    const contentUrl = document.getElementById('content-url').value;
    const caption = document.getElementById('caption').value;
    const hashtags = Array.from(document.querySelectorAll('.hashtag')).map(tag => {
        return tag.textContent.trim().replace('×', '').trim().replace('#', '');
    });
    
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
    const button = document.querySelector('.btn-success');
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
            
            // Add to recent posts table
            addToRecentPosts({
                content: caption.substring(0, 20) + '...',
                platform: 'TikTok',
                date: new Date().toLocaleDateString(),
                performance: {
                    likes: '0',
                    status: 'New'
                }
            });
            
            // Clear form
            document.getElementById('content-url').value = '';
            document.getElementById('caption').value = '';
            document.querySelector('.hashtag-list').innerHTML = '';
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
    console.log('Schedule button clicked');
    
    // Get form values
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
    
    // Add to upcoming posts table
    const upcomingPostsTable = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${caption.substring(0, 20)}${caption.length > 20 ? '...' : ''}</td>
        <td>${platforms.join(', ')}</td>
        <td>${formattedDate} - ${formattedTime}</td>
        <td><span class="badge badge-warning">Scheduled</span></td>
        <td>
            <button class="btn btn-sm btn-secondary mr-1">Edit</button>
            <button class="btn btn-sm btn-danger">Cancel</button>
        </td>
    `;
    
    // Add event listeners to new buttons
    newRow.querySelector('.btn-secondary').addEventListener('click', function() {
        alert('Edit functionality would open this scheduled post for editing');
    });
    
    newRow.querySelector('.btn-danger').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel this scheduled post?')) {
            newRow.remove();
            alert('Scheduled post cancelled');
        }
    });
    
    // Insert at the top of the table
    upcomingPostsTable.insertBefore(newRow, upcomingPostsTable.firstChild);
    
    // Clear form
    document.getElementById('content-url').value = '';
    document.getElementById('caption').value = '';
    document.querySelector('.hashtag-list').innerHTML = '';
    
    alert(`Post scheduled for ${formattedDate} at ${formattedTime}`);
}

// Add a post to the recent posts table
function addToRecentPosts(post) {
    const recentPostsTable = document.querySelectorAll('table')[1].querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${post.content}</td>
        <td>${post.platform}</td>
        <td>${post.date}</td>
        <td>
            <div class="d-flex align-items-center">
                <span class="mr-2">${post.performance.likes} likes</span>
                <span class="badge badge-${post.performance.status === 'High' ? 'success' : post.performance.status === 'Medium' ? 'primary' : 'secondary'}">${post.performance.status}</span>
            </div>
        </td>
        <td>
            <button class="btn btn-sm btn-info">Analytics</button>
        </td>
    `;
    
    // Add event listener to analytics button
    newRow.querySelector('.btn-info').addEventListener('click', function() {
        alert(`Analytics for "${post.content}" would be displayed here`);
    });
    
    // Insert at the top of the table
    recentPostsTable.insertBefore(newRow, recentPostsTable.firstChild);
}

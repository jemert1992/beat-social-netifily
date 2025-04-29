// JavaScript for the Test API page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners for test page
    setupTestPageListeners();
    
    // Check API status on page load
    checkAPIStatus();
    
    // Set up mobile responsiveness
    setupMobileResponsiveness();
});

// Set up event listeners for test page
function setupTestPageListeners() {
    // Refresh status button
    const refreshStatusButton = document.getElementById('refresh-status');
    if (refreshStatusButton) {
        refreshStatusButton.addEventListener('click', function() {
            checkAPIStatus();
        });
    }
    
    // Fetch account info button
    const fetchAccountButton = document.getElementById('fetch-account');
    if (fetchAccountButton) {
        fetchAccountButton.addEventListener('click', function() {
            fetchAccountInfo();
        });
    }
    
    // Test post form
    const testPostForm = document.getElementById('test-post-form');
    if (testPostForm) {
        testPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendTestPost();
        });
    }
    
    // Clear log button
    const clearLogButton = document.getElementById('clear-log');
    if (clearLogButton) {
        clearLogButton.addEventListener('click', function() {
            clearAPILog();
        });
    }
}

// Check API status
function checkAPIStatus() {
    console.log('Checking API status...');
    
    // Show loading state
    const statusContainer = document.getElementById('api-status-container');
    const statusLoading = statusContainer.querySelector('.api-status-loading');
    const statusResult = statusContainer.querySelector('.api-status-result');
    
    statusLoading.style.display = 'block';
    statusResult.style.display = 'none';
    
    // Log the API request
    logAPIRequest('GET', '/api/status', null);
    
    // Make API request
    fetch('/api/status')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API status:', data);
            
            // Format the JSON response
            const formattedJson = JSON.stringify(data, null, 2);
            
            // Update the result container
            const resultElement = document.getElementById('api-status-result');
            resultElement.textContent = formattedJson;
            
            // Hide loading, show result
            statusLoading.style.display = 'none';
            statusResult.style.display = 'block';
            
            // Log the API response
            logAPIResponse('GET', '/api/status', data);
        })
        .catch(error => {
            console.error('Error checking API status:', error);
            
            // Update the result container with error
            const resultElement = document.getElementById('api-status-result');
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.classList.add('error');
            
            // Hide loading, show result
            statusLoading.style.display = 'none';
            statusResult.style.display = 'block';
            
            // Log the API error
            logAPIError('GET', '/api/status', error.message);
        });
}

// Fetch account information
function fetchAccountInfo() {
    console.log('Fetching account information...');
    
    // Show loading state
    const accountContainer = document.getElementById('account-info-container');
    const accountPlaceholder = accountContainer.querySelector('.account-info-placeholder');
    const accountLoading = accountContainer.querySelector('.account-info-loading');
    const accountResult = accountContainer.querySelector('.account-info-result');
    
    accountPlaceholder.style.display = 'none';
    accountLoading.style.display = 'block';
    accountResult.style.display = 'none';
    
    // Log the API request
    logAPIRequest('GET', '/api/tiktok/account', null);
    
    // Make API request
    fetch('/api/tiktok/account')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Account info:', data);
            
            // Format the JSON response
            const formattedJson = JSON.stringify(data, null, 2);
            
            // Update the result container
            const resultElement = document.getElementById('account-info-result');
            resultElement.textContent = formattedJson;
            
            // Hide loading, show result
            accountLoading.style.display = 'none';
            accountResult.style.display = 'block';
            
            // Log the API response
            logAPIResponse('GET', '/api/tiktok/account', data);
        })
        .catch(error => {
            console.error('Error fetching account info:', error);
            
            // Update the result container with error
            const resultElement = document.getElementById('account-info-result');
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.classList.add('error');
            
            // Hide loading, show result
            accountLoading.style.display = 'none';
            accountResult.style.display = 'block';
            
            // Log the API error
            logAPIError('GET', '/api/tiktok/account', error.message);
        });
}

// Send test post
function sendTestPost() {
    console.log('Sending test post...');
    
    // Get form values
    const videoUrl = document.getElementById('video-url').value.trim();
    const caption = document.getElementById('post-caption').value.trim();
    const hashtags = document.getElementById('post-hashtags').value.trim().split(',').map(tag => tag.trim());
    
    // Validate form
    if (!videoUrl) {
        alert('Please enter a video URL');
        return;
    }
    
    if (!caption) {
        alert('Please enter a caption');
        return;
    }
    
    // Prepare request data
    const postData = {
        video_url: videoUrl,
        caption: caption,
        hashtags: hashtags
    };
    
    // Show result container and loading state
    const resultContainer = document.getElementById('post-result-container');
    const resultLoading = resultContainer.querySelector('.post-result-loading');
    const resultContent = resultContainer.querySelector('.post-result-content');
    
    resultContainer.style.display = 'block';
    resultLoading.style.display = 'block';
    resultContent.style.display = 'none';
    
    // Log the API request
    logAPIRequest('POST', '/api/tiktok/post', postData);
    
    // Make API request
    fetch('/api/tiktok/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Post result:', data);
            
            // Format the JSON response
            const formattedJson = JSON.stringify(data, null, 2);
            
            // Update the result container
            const resultElement = document.getElementById('post-result');
            resultElement.textContent = formattedJson;
            
            // Hide loading, show result
            resultLoading.style.display = 'none';
            resultContent.style.display = 'block';
            
            // Log the API response
            logAPIResponse('POST', '/api/tiktok/post', data);
        })
        .catch(error => {
            console.error('Error sending post:', error);
            
            // Update the result container with error
            const resultElement = document.getElementById('post-result');
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.classList.add('error');
            
            // Hide loading, show result
            resultLoading.style.display = 'none';
            resultContent.style.display = 'block';
            
            // Log the API error
            logAPIError('POST', '/api/tiktok/post', error.message);
        });
}

// Log API request
function logAPIRequest(method, endpoint, data) {
    const logElement = document.getElementById('api-log');
    
    // Clear "No API requests logged yet" message if present
    if (logElement.textContent === 'No API requests logged yet.') {
        logElement.textContent = '';
    }
    
    // Create log entry
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', 'request');
    
    logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-method">${method}</span>
        <span class="log-endpoint">${endpoint}</span>
        <span class="log-direction">REQUEST</span>
    `;
    
    // Add data if present
    if (data) {
        const dataString = JSON.stringify(data, null, 2);
        const dataElement = document.createElement('pre');
        dataElement.classList.add('log-data');
        dataElement.textContent = dataString;
        logEntry.appendChild(dataElement);
    }
    
    // Add to log
    logElement.appendChild(logEntry);
    
    // Scroll to bottom
    logElement.scrollTop = logElement.scrollHeight;
}

// Log API response
function logAPIResponse(method, endpoint, data) {
    const logElement = document.getElementById('api-log');
    
    // Create log entry
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', 'response');
    
    logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-method">${method}</span>
        <span class="log-endpoint">${endpoint}</span>
        <span class="log-direction">RESPONSE</span>
    `;
    
    // Add data
    const dataString = JSON.stringify(data, null, 2);
    const dataElement = document.createElement('pre');
    dataElement.classList.add('log-data');
    dataElement.textContent = dataString;
    logEntry.appendChild(dataElement);
    
    // Add to log
    logElement.appendChild(logEntry);
    
    // Scroll to bottom
    logElement.scrollTop = logElement.scrollHeight;
}

// Log API error
function logAPIError(method, endpoint, errorMessage) {
    const logElement = document.getElementById('api-log');
    
    // Create log entry
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry', 'error');
    
    logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-method">${method}</span>
        <span class="log-endpoint">${endpoint}</span>
        <span class="log-direction">ERROR</span>
        <span class="log-error">${errorMessage}</span>
    `;
    
    // Add to log
    logElement.appendChild(logEntry);
    
    // Scroll to bottom
    logElement.scrollTop = logElement.scrollHeight;
}

// Clear API log
function clearAPILog() {
    const logElement = document.getElementById('api-log');
    logElement.textContent = 'No API requests logged yet.';
}

// Initialize API connection
function initializeAPI() {
    console.log('Initializing API connection...');
    
    // In a real application, this would set up any necessary authentication
    // or configuration for the API client
    
    // For this demo, we'll just log that initialization is complete
    console.log('API connection initialized');
}

// Set up mobile responsiveness
function setupMobileResponsiveness() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) {
        dashboard.appendChild(sidebarToggle);
        
        sidebarToggle.addEventListener('click', function() {
            dashboard.classList.toggle('sidebar-active');
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            
            // Reset sidebar
            if (dashboard) {
                dashboard.classList.remove('sidebar-active');
            }
        }
    });
}

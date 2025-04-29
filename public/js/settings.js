// JavaScript for the Settings page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners for settings page
    setupSettingsListeners();
    
    // Load settings data
    loadSettingsData();
    
    // Set up mobile responsiveness
    setupMobileResponsiveness();
});

// Set up event listeners for settings page
function setupSettingsListeners() {
    // Account settings form
    const accountSettingsForm = document.getElementById('account-settings-form');
    if (accountSettingsForm) {
        accountSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAccountSettings();
        });
    }
    
    // API settings form
    const apiSettingsForm = document.getElementById('api-settings-form');
    if (apiSettingsForm) {
        apiSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAPISettings();
        });
    }
    
    // Notification settings form
    const notificationSettingsForm = document.getElementById('notification-settings-form');
    if (notificationSettingsForm) {
        notificationSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNotificationSettings();
        });
    }
    
    // Toggle password visibility buttons
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Test API connection button
    const testAPIButton = document.querySelector('#api-settings-form .btn-secondary');
    if (testAPIButton) {
        testAPIButton.addEventListener('click', function() {
            testAPIConnection();
        });
    }
    
    // Platform connect buttons
    const connectButtons = document.querySelectorAll('.platform-actions .btn-primary');
    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platformItem = this.closest('.platform-item');
            const platformName = platformItem.querySelector('.platform-name').textContent;
            connectPlatform(platformName);
        });
    });
    
    // Platform disconnect buttons
    const disconnectButtons = document.querySelectorAll('.platform-actions .btn-danger');
    disconnectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platformItem = this.closest('.platform-item');
            const platformName = platformItem.querySelector('.platform-name').textContent;
            disconnectPlatform(platformName);
        });
    });
    
    // Platform settings buttons
    const platformSettingsButtons = document.querySelectorAll('.platform-actions .btn-secondary');
    platformSettingsButtons.forEach(button => {
        if (button.textContent.trim() === 'Settings') {
            button.addEventListener('click', function() {
                const platformItem = this.closest('.platform-item');
                const platformName = platformItem.querySelector('.platform-name').textContent;
                openPlatformSettings(platformName);
            });
        }
    });
    
    // Connect new platform button
    const connectNewButton = document.querySelector('.card-header .btn-primary');
    if (connectNewButton) {
        connectNewButton.addEventListener('click', function() {
            showConnectPlatformModal();
        });
    }
}

// Load settings data from API
function loadSettingsData() {
    // In a real application, this would fetch settings data from the API
    console.log('Loading settings data...');
    
    // For demo purposes, we'll just simulate loading data
    setTimeout(() => {
        console.log('Settings data loaded');
        // In a real application, this would update the form fields with the fetched data
    }, 1000);
}

// Save account settings
function saveAccountSettings() {
    const accountName = document.getElementById('account-name').value;
    const accountEmail = document.getElementById('account-email').value;
    const accountTimezone = document.getElementById('account-timezone').value;
    const accountLanguage = document.getElementById('account-language').value;
    
    console.log('Saving account settings...');
    console.log(`Name: ${accountName}`);
    console.log(`Email: ${accountEmail}`);
    console.log(`Timezone: ${accountTimezone}`);
    console.log(`Language: ${accountLanguage}`);
    
    // In a real application, this would send the settings to the API
    
    // For demo purposes, we'll just show a success message
    alert('Account settings saved successfully!');
}

// Save API settings
function saveAPISettings() {
    const tiktokApiKey = document.getElementById('tiktok-api-key').value;
    const socialMediaToken = document.getElementById('social-media-token').value;
    const apiRateLimit = document.getElementById('api-rate-limit').value;
    const enableApiLogging = document.getElementById('enable-api-logging').checked;
    
    console.log('Saving API settings...');
    console.log(`TikTok API Key: ${tiktokApiKey.length > 0 ? '(set)' : '(not set)'}`);
    console.log(`Social Media Token: ${socialMediaToken.length > 0 ? '(set)' : '(not set)'}`);
    console.log(`API Rate Limit: ${apiRateLimit}`);
    console.log(`Enable API Logging: ${enableApiLogging}`);
    
    // In a real application, this would send the settings to the API
    
    // For demo purposes, we'll just show a success message
    alert('API settings saved successfully!');
}

// Save notification settings
function saveNotificationSettings() {
    // Collect email notification settings
    const emailPostPublished = document.getElementById('email-post-published').checked;
    const emailPostFailed = document.getElementById('email-post-failed').checked;
    const emailEngagementMilestone = document.getElementById('email-engagement-milestone').checked;
    const emailWeeklyReport = document.getElementById('email-weekly-report').checked;
    
    // Collect in-app notification settings
    const appPostPublished = document.getElementById('app-post-published').checked;
    const appPostFailed = document.getElementById('app-post-failed').checked;
    const appEngagementMilestone = document.getElementById('app-engagement-milestone').checked;
    const appTrendingTopics = document.getElementById('app-trending-topics').checked;
    
    console.log('Saving notification settings...');
    console.log('Email Notifications:');
    console.log(`- Post Published: ${emailPostPublished}`);
    console.log(`- Post Failed: ${emailPostFailed}`);
    console.log(`- Engagement Milestone: ${emailEngagementMilestone}`);
    console.log(`- Weekly Report: ${emailWeeklyReport}`);
    
    console.log('In-App Notifications:');
    console.log(`- Post Published: ${appPostPublished}`);
    console.log(`- Post Failed: ${appPostFailed}`);
    console.log(`- Engagement Milestone: ${appEngagementMilestone}`);
    console.log(`- Trending Topics: ${appTrendingTopics}`);
    
    // In a real application, this would send the settings to the API
    
    // For demo purposes, we'll just show a success message
    alert('Notification settings saved successfully!');
}

// Test API connection
function testAPIConnection() {
    console.log('Testing API connection...');
    
    // In a real application, this would make a test request to the API
    
    // For demo purposes, we'll simulate a successful connection
    setTimeout(() => {
        alert('API connection successful! All endpoints are accessible.');
    }, 1000);
}

// Connect a platform
function connectPlatform(platformName) {
    console.log(`Connecting to ${platformName}...`);
    
    // In a real application, this would redirect to the platform's OAuth flow
    
    // For demo purposes, we'll just show an alert
    alert(`In a real application, this would redirect you to ${platformName}'s authorization page to connect your account.`);
}

// Disconnect a platform
function disconnectPlatform(platformName) {
    console.log(`Disconnecting from ${platformName}...`);
    
    // Confirm disconnection
    if (confirm(`Are you sure you want to disconnect from ${platformName}? This will remove all access to your ${platformName} account.`)) {
        // In a real application, this would revoke the platform's access token
        
        // For demo purposes, we'll just show an alert
        alert(`Successfully disconnected from ${platformName}.`);
        
        // Update UI to show platform as disconnected
        const platformItem = document.querySelector(`.platform-item:has(.platform-name:contains("${platformName}"))`);
        if (platformItem) {
            platformItem.classList.remove('connected');
            platformItem.classList.add('not-connected');
            
            // Update status
            const statusElement = platformItem.querySelector('.platform-status');
            if (statusElement) {
                statusElement.textContent = 'Not Connected';
                statusElement.classList.remove('connected');
                statusElement.classList.add('not-connected');
            }
            
            // Update actions
            const actionsElement = platformItem.querySelector('.platform-actions');
            if (actionsElement) {
                actionsElement.innerHTML = `
                    <button class="btn btn-sm btn-primary">Connect</button>
                `;
                
                // Add event listener to new connect button
                const newConnectButton = actionsElement.querySelector('.btn-primary');
                if (newConnectButton) {
                    newConnectButton.addEventListener('click', function() {
                        connectPlatform(platformName);
                    });
                }
            }
        }
    }
}

// Open platform settings
function openPlatformSettings(platformName) {
    console.log(`Opening settings for ${platformName}...`);
    
    // In a real application, this would open a modal with platform-specific settings
    
    // For demo purposes, we'll just show an alert
    alert(`In a real application, this would open a modal with ${platformName}-specific settings.`);
}

// Show connect platform modal
function showConnectPlatformModal() {
    console.log('Showing connect platform modal...');
    
    // In a real application, this would show a modal with available platforms to connect
    
    // For demo purposes, we'll just show an alert
    alert('In a real application, this would show a modal with available platforms to connect.');
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

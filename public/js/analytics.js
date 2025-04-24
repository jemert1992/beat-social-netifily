// JavaScript for the Analytics page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners for analytics page
    setupAnalyticsListeners();
    
    // Load analytics data
    loadAnalyticsData();
});

// Set up event listeners for analytics page
function setupAnalyticsListeners() {
    // Apply filters button
    const applyFiltersButton = document.getElementById('apply-filters');
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function() {
            applyAnalyticsFilters();
        });
    }
    
    // Export button
    const exportButton = document.querySelector('.card-actions .btn-secondary');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportAnalyticsData();
        });
    }
    
    // Platform filter
    const platformFilter = document.getElementById('platform-filter');
    if (platformFilter) {
        platformFilter.addEventListener('change', function() {
            updatePlatformSpecificUI(this.value);
        });
    }
    
    // Date range filter
    const dateRangeFilter = document.getElementById('date-range');
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', function() {
            if (this.value === 'custom') {
                showCustomDateRangePicker();
            }
        });
    }
}

// Load analytics data from API
function loadAnalyticsData() {
    // In a real application, this would fetch analytics data from the TikTok API
    console.log('Loading analytics data...');
    
    // For demo purposes, we'll just simulate loading data
    setTimeout(() => {
        console.log('Analytics data loaded');
        // In a real application, this would update the UI with the fetched data
        
        // Simulate rendering charts
        simulateChartRendering();
    }, 1000);
}

// Apply analytics filters
function applyAnalyticsFilters() {
    const platform = document.getElementById('platform-filter').value;
    const dateRange = document.getElementById('date-range').value;
    const contentType = document.getElementById('content-type').value;
    
    console.log(`Applying filters: Platform=${platform}, Date Range=${dateRange}, Content Type=${contentType}`);
    
    // In a real application, this would fetch filtered data from the API
    // and update the UI accordingly
    
    // For demo purposes, we'll just show an alert
    alert(`Filters applied:\nPlatform: ${getPlatformName(platform)}\nDate Range: ${getDateRangeName(dateRange)}\nContent Type: ${getContentTypeName(contentType)}`);
    
    // Simulate updating the UI with new data
    simulateDataRefresh();
}

// Export analytics data
function exportAnalyticsData() {
    const platform = document.getElementById('platform-filter').value;
    const dateRange = document.getElementById('date-range').value;
    
    // In a real application, this would generate and download a CSV or PDF file
    // with the analytics data
    
    // For demo purposes, we'll just show an alert
    alert(`Exporting analytics data for ${getPlatformName(platform)} over ${getDateRangeName(dateRange)}.\n\nIn a real application, this would download a CSV or PDF file with your analytics data.`);
}

// Update UI based on selected platform
function updatePlatformSpecificUI(platform) {
    console.log(`Updating UI for platform: ${platform}`);
    
    // In a real application, this would update the UI to show platform-specific
    // metrics and charts
    
    // For demo purposes, we'll just update the page title
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        if (platform === 'all') {
            pageTitle.textContent = 'Analytics';
        } else {
            pageTitle.textContent = `${getPlatformName(platform)} Analytics`;
        }
    }
}

// Show custom date range picker
function showCustomDateRangePicker() {
    // In a real application, this would show a date range picker
    
    // For demo purposes, we'll just show an alert
    alert('In a real application, this would show a date range picker where you can select custom start and end dates.');
}

// Simulate chart rendering
function simulateChartRendering() {
    console.log('Rendering charts...');
    
    // In a real application, this would use a charting library like Chart.js
    // to render actual charts with the analytics data
    
    // For demo purposes, we'll just update the chart placeholders
    const engagementChart = document.getElementById('engagement-chart');
    if (engagementChart) {
        engagementChart.innerHTML = `
            <div style="height: 300px; background-color: #f8f9fc; display: flex; align-items: center; justify-content: center; color: #666;">
                <div class="text-center">
                    <i class="fas fa-chart-line fa-3x mb-3"></i>
                    <p>Engagement chart loaded</p>
                    <p class="text-muted">In a real application, this would show a line chart of engagement metrics over time</p>
                </div>
            </div>
        `;
    }
}

// Simulate refreshing data after filter changes
function simulateDataRefresh() {
    // Add loading indicators
    document.querySelectorAll('.card-body').forEach(cardBody => {
        cardBody.classList.add('loading');
    });
    
    // Simulate API request delay
    setTimeout(() => {
        // Remove loading indicators
        document.querySelectorAll('.card-body').forEach(cardBody => {
            cardBody.classList.remove('loading');
        });
        
        // Update charts
        simulateChartRendering();
        
        console.log('Data refreshed');
    }, 1000);
}

// Helper function to get platform name
function getPlatformName(platformValue) {
    const platforms = {
        'all': 'All Platforms',
        'tiktok': 'TikTok',
        'instagram': 'Instagram',
        'twitter': 'Twitter'
    };
    
    return platforms[platformValue] || platformValue;
}

// Helper function to get date range name
function getDateRangeName(dateRangeValue) {
    const dateRanges = {
        '7': 'Last 7 days',
        '30': 'Last 30 days',
        '90': 'Last 90 days',
        'custom': 'Custom Range'
    };
    
    return dateRanges[dateRangeValue] || dateRangeValue;
}

// Helper function to get content type name
function getContentTypeName(contentTypeValue) {
    const contentTypes = {
        'all': 'All Types',
        'video': 'Video',
        'image': 'Image',
        'carousel': 'Carousel',
        'text': 'Text Only'
    };
    
    return contentTypes[contentTypeValue] || contentTypeValue;
}

// Function to fetch TikTok analytics data
// This would be used in a real application to get analytics from the TikTok API
function fetchTikTokAnalytics(dateRange) {
    // In a real application, this would make an API request to the TikTok API
    // to get analytics data for the specified date range
    
    // Example API endpoint: /api/tiktok/analytics
    
    return new Promise((resolve, reject) => {
        // Simulate API request
        setTimeout(() => {
            // This is mock data that would normally come from the API
            const mockData = {
                totalPosts: 24,
                totalViews: 45200,
                engagementRate: 4.2,
                followers: 1245,
                engagement: {
                    dates: ['Apr 1', 'Apr 8', 'Apr 15', 'Apr 22'],
                    views: [12000, 15000, 8000, 10200],
                    likes: [1100, 1300, 800, 1000],
                    comments: [120, 150, 90, 110],
                    shares: [60, 75, 45, 55]
                },
                topContent: [
                    {
                        title: 'Behind the Scenes',
                        views: 12500,
                        likes: 1200,
                        comments: 145,
                        shares: 78,
                        type: 'video'
                    },
                    // More content items would be here
                ],
                demographics: {
                    age: {
                        '13-17': 8,
                        '18-24': 35,
                        '25-34': 42,
                        '35-44': 12,
                        '45+': 3
                    },
                    gender: {
                        'female': 62,
                        'male': 35,
                        'other': 3
                    },
                    locations: {
                        'United States': 45,
                        'United Kingdom': 12,
                        'Canada': 8,
                        'Australia': 7,
                        'Germany': 5
                    }
                },
                hashtags: [
                    {
                        name: '#socialmedia',
                        posts: 15,
                        avgViews: 8200,
                        avgEngagement: 4.5,
                        trend: 12
                    },
                    // More hashtags would be here
                ]
            };
            
            resolve(mockData);
        }, 1000);
    });
}

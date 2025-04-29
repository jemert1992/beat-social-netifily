// JavaScript for the Schedule page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize API connection
    initializeAPI();
    
    // Set up event listeners specific to scheduling
    setupScheduleListeners();
    
    // Load scheduled posts
    loadScheduledPosts();
});

// Set up event listeners for schedule page
function setupScheduleListeners() {
    // Calendar navigation buttons
    const prevMonthButton = document.querySelector('.calendar-controls .btn:first-child');
    const nextMonthButton = document.querySelector('.calendar-controls .btn:last-child');
    
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', function() {
            navigateCalendar('prev');
        });
    }
    
    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', function() {
            navigateCalendar('next');
        });
    }
    
    // Calendar date clicks
    document.querySelectorAll('.calendar-date').forEach(date => {
        date.addEventListener('click', function() {
            selectDate(this);
        });
    });
    
    // Calendar events
    document.querySelectorAll('.calendar-event').forEach(event => {
        event.addEventListener('click', function(e) {
            e.stopPropagation();
            showEventDetails(this);
        });
    });
    
    // Schedule new post button
    const scheduleNewButton = document.querySelector('.card-header .btn-primary');
    if (scheduleNewButton) {
        scheduleNewButton.addEventListener('click', function() {
            window.location.href = 'create.html';
        });
    }
    
    // Edit buttons
    document.querySelectorAll('.btn-secondary').forEach(button => {
        if (button.textContent.trim() === 'Edit') {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const contentTitle = row.querySelector('.content-title').textContent;
                editScheduledPost(contentTitle);
            });
        }
    });
    
    // Cancel buttons
    document.querySelectorAll('.btn-danger').forEach(button => {
        if (button.textContent.trim() === 'Cancel') {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const contentTitle = row.querySelector('.content-title').textContent;
                cancelScheduledPost(contentTitle, row);
            });
        }
    });
    
    // Edit posting schedule button
    const editScheduleButton = document.querySelector('.card-body .btn-primary');
    if (editScheduleButton && editScheduleButton.textContent.trim() === 'Edit Posting Schedule') {
        editScheduleButton.addEventListener('click', function() {
            editPostingSchedule();
        });
    }
}

// Load scheduled posts from API
function loadScheduledPosts() {
    // In a real application, this would fetch scheduled posts from the API
    console.log('Loading scheduled posts...');
    
    // For demo purposes, we'll just simulate loading data
    setTimeout(() => {
        console.log('Scheduled posts loaded');
        highlightCurrentDate();
    }, 1000);
}

// Navigate calendar to previous or next month
function navigateCalendar(direction) {
    const currentMonthElement = document.querySelector('.current-month');
    const currentMonth = currentMonthElement.textContent;
    
    // Parse current month
    const [monthName, year] = currentMonth.split(' ');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = months.indexOf(monthName);
    
    // Calculate new month
    let newMonthIndex, newYear;
    if (direction === 'prev') {
        newMonthIndex = monthIndex - 1;
        if (newMonthIndex < 0) {
            newMonthIndex = 11;
            newYear = parseInt(year) - 1;
        } else {
            newYear = parseInt(year);
        }
    } else {
        newMonthIndex = monthIndex + 1;
        if (newMonthIndex > 11) {
            newMonthIndex = 0;
            newYear = parseInt(year) + 1;
        } else {
            newYear = parseInt(year);
        }
    }
    
    // Update current month display
    currentMonthElement.textContent = `${months[newMonthIndex]} ${newYear}`;
    
    // In a real application, this would update the calendar grid with new dates
    alert(`In a real application, this would update the calendar to show ${months[newMonthIndex]} ${newYear}`);
}

// Select a date in the calendar
function selectDate(dateElement) {
    // Remove selected class from all dates
    document.querySelectorAll('.calendar-date').forEach(date => {
        date.classList.remove('selected-date');
    });
    
    // Add selected class to clicked date
    dateElement.classList.add('selected-date');
    
    // Get date number
    const dateNumber = dateElement.textContent.split('\n')[0].trim();
    
    // Get current month and year
    const currentMonth = document.querySelector('.current-month').textContent;
    const [monthName, year] = currentMonth.split(' ');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = months.indexOf(monthName);
    
    // Check if date is in previous or next month
    let selectedMonth = monthIndex;
    let selectedYear = parseInt(year);
    
    if (dateElement.classList.contains('prev-month')) {
        selectedMonth = monthIndex - 1;
        if (selectedMonth < 0) {
            selectedMonth = 11;
            selectedYear--;
        }
    } else if (dateElement.classList.contains('next-month')) {
        selectedMonth = monthIndex + 1;
        if (selectedMonth > 11) {
            selectedMonth = 0;
            selectedYear++;
        }
    }
    
    // Format selected date
    const selectedDate = new Date(selectedYear, selectedMonth, parseInt(dateNumber));
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    // In a real application, this would show posts scheduled for the selected date
    if (dateElement.querySelector('.calendar-event')) {
        alert(`Showing posts scheduled for ${formattedDate}`);
    } else {
        alert(`No posts scheduled for ${formattedDate}. Would you like to schedule a post for this date?`);
    }
}

// Show details for a calendar event
function showEventDetails(eventElement) {
    const eventTime = eventElement.querySelector('.event-time').textContent;
    const eventTitle = eventElement.querySelector('.event-title').textContent;
    const eventPlatform = eventElement.querySelector('.event-platform').textContent;
    
    // In a real application, this would show a modal with event details
    alert(`Event Details:\nTitle: ${eventTitle}\nTime: ${eventTime}\nPlatforms: ${eventPlatform}`);
}

// Edit a scheduled post
function editScheduledPost(title) {
    // In a real application, this would redirect to the edit page with the post data
    alert(`Editing scheduled post: ${title}`);
}

// Cancel a scheduled post
function cancelScheduledPost(title, row) {
    // Confirm cancellation
    if (confirm(`Are you sure you want to cancel the scheduled post "${title}"?`)) {
        // In a real application, this would call the API to cancel the post
        
        // Remove row from table
        row.remove();
        
        // Show success message
        alert(`Scheduled post "${title}" has been cancelled.`);
    }
}

// Edit posting schedule
function editPostingSchedule() {
    // In a real application, this would show a modal to edit the posting schedule
    alert('In a real application, this would open a modal to edit your posting schedule for each day of the week.');
}

// Highlight the current date in the calendar
function highlightCurrentDate() {
    // In a real application, this would highlight the current date based on the actual date
    // For demo purposes, we're using a hardcoded current date (April 24, 2025)
    
    // The current date is already styled with the 'current-date' class in the HTML
}

// Add a new scheduled post to the calendar
function addScheduledPostToCalendar(date, time, title, platforms) {
    // Find the calendar date element for the specified date
    const dateElements = document.querySelectorAll('.calendar-date');
    let dateElement = null;
    
    dateElements.forEach(element => {
        const dateNumber = element.textContent.split('\n')[0].trim();
        if (dateNumber === date.getDate().toString() && 
            !element.classList.contains('prev-month') && 
            !element.classList.contains('next-month')) {
            dateElement = element;
        }
    });
    
    if (dateElement) {
        // Create new event element
        const eventElement = document.createElement('div');
        eventElement.className = 'calendar-event';
        
        // Format time
        const formattedTime = time;
        
        // Format platforms
        const platformsText = platforms.join(', ');
        
        // Set event content
        eventElement.innerHTML = `
            <span class="event-time">${formattedTime}</span>
            <span class="event-title">${title}</span>
            <span class="event-platform">${platformsText}</span>
        `;
        
        // Add event listener
        eventElement.addEventListener('click', function(e) {
            e.stopPropagation();
            showEventDetails(this);
        });
        
        // Add to date element
        dateElement.appendChild(eventElement);
    }
}

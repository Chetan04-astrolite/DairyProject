document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-links li');
    const activityList = document.querySelector('.activity-list');

    // Toggle Sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '70px';
        } else {
            mainContent.style.marginLeft = '0';
        }
    }

    // Handle Navigation
    function handleNavigation(e) {
        navLinks.forEach(link => link.classList.remove('active'));
        e.currentTarget.classList.add('active');
    }

    // Create Activity Item
    function createActivityItem(title, description, time, icon) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="activity-details">
                <h4>${title}</h4>
                <p>${description}</p>
                <span class="time">${time}</span>
            </div>
        `;
        return item;
    }

    // Add New Activity
    function addNewActivity() {
        const activities = [
            {
                title: 'New Customer',
                description: 'Chetan Pulipaka was added as a new customer',
                icon: 'fa-user-plus'
            },
            {
                title: 'New Sale',
                description: 'Rs.3,200 sale recorded',
                icon: 'fa-rupee-sign'
            },
            {
                title: 'Task Completed',
                description: 'Product demo completed with client',
                icon: 'fa-check-circle'
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const newItem = createActivityItem(
            randomActivity.title,
            randomActivity.description,
            'Just now',
            randomActivity.icon
        );

        // Add animation classes
        newItem.style.opacity = '0';
        newItem.style.transform = 'translateY(-10px)';
        
        // Insert at the beginning
        activityList.insertBefore(newItem, activityList.firstChild);
        
        // Trigger animation
        requestAnimationFrame(() => {
            newItem.style.transition = 'all 0.3s ease';
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
        });

        // Remove last item if more than 3
        if (activityList.children.length > 3) {
            const lastItem = activityList.lastElementChild;
            lastItem.style.opacity = '0';
            lastItem.style.transform = 'translateY(10px)';
            setTimeout(() => activityList.removeChild(lastItem), 300);
        }
    }

    // Event Listeners
    toggleBtn.addEventListener('click', toggleSidebar);
    navLinks.forEach(link => link.addEventListener('click', handleNavigation));

    // Auto-update activities
    setInterval(addNewActivity, 10000);
});
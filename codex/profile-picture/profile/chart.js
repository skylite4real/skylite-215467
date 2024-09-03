// JavaScript to handle tab switching
document.querySelectorAll('.skylite-analytic-tabs-navigation div').forEach(function(tab) {
    tab.addEventListener('click', function() {
        // Hide all tab contents
        document.querySelectorAll('[id^="analytic-tab-"][id$="-data"]').forEach(function(content) {
            content.style.display = 'none';
        });

        // Remove active class from all tabs
        document.querySelectorAll('.skylite-analytic-tabs-navigation div').forEach(function(tab) {
            tab.classList.remove('overview-active');
        });

        // Show the clicked tab content
        var tabContentId = this.id + '-data';
        document.getElementById(tabContentId).style.display = 'block';

        // Add active class to the clicked tab
        this.classList.add('overview-active');
    });
});

// Initially display the overview tab content
document.getElementById('analytic-tab-overview-data').style.display = 'block';






// Select all the tab elements
const tabs = document.querySelectorAll('.tab-of-content-upload');

// Function to remove the active class from all tabs
function removeActiveState() {
    tabs.forEach(tab => {
        tab.style.backgroundColor = '#f0f2f5'; // Reset to original background color
        tab.classList.remove('active-tab'); // Remove active class
    });
}

// Function to add the active class to the clicked tab
function setActiveState(tab) {
    tab.style.backgroundColor = '#e0e0e0'; // Set the background color to indicate active state
    tab.classList.add('active-tab'); // Add active class
}

// Add click event listeners to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        removeActiveState(); // Remove the active state from all tabs
        setActiveState(tab); // Set the active state on the clicked tab
    });
});






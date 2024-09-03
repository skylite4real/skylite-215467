document.getElementById('profilePhoto').addEventListener('click', function () {
    document.getElementById('profileSection').style.display = 'block';
});

document.querySelector('.close-profile-icon').addEventListener('click', function () {
    document.getElementById('profileSection').style.display = 'none';
});











function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Remove active class from all tab links
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}















function showvideoContent(tabId) {
    var tabContent = document.getElementById('displayingChooseFileTabs');

    if (tabId === 'chooseVideoFile') {
        tabContent.style.display = 'block';
    } else {
        tabContent.style.display = 'none';
    }
}

// Add the event listener for the Video tab
document.getElementById('chooseVideoFileTab').addEventListener('click', function() {
    showvideoContent('chooseVideoFile');
});
















// Function to hide all sections
function hideAllSections() {
    const sectionIds = [
        'SkyliteUserAccount',
        'MyContent',
        'chooseVideoFile',
        'chooseShortFile',
        'choosePostFile',
        'Analytics',
        'Comments',
        'Earnings',
        'SkyliteAds'
    ];

    sectionIds.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    
    hideAllPreviews();  // Additionally, hide all preview boxes
}

// Function to hide all preview boxes
function hideAllPreviews() {
    document.getElementById('PreviewBox').style.display = 'none';
    document.getElementById('previewBoxPost').style.display = 'none';
    document.getElementById('previewBoxShort').style.display = 'none';
}

// Function to show the Video section and its preview
function showVideoSection() {
    hideAllSections();  // Hide all sections
    document.getElementById('chooseVideoFile').style.display = 'block';  // Show the video section
    document.getElementById('PreviewBox').style.display = 'block';  // Show the video preview box
}

// Function to show the Post section and its preview
function showPostSection() {
    hideAllSections();  // Hide all sections
    document.getElementById('choosePostFile').style.display = 'block';  // Show the post section
    document.getElementById('previewBoxPost').style.display = 'block';  // Show the post preview box
    document.getElementById('closePreviewPosts').style.display = 'block';  // Show the close button
    document.getElementById('uploadPosts').style.display = 'block';  // Show the upload button
}

// Function to show the Short section and its preview
function showShortSection() {
    hideAllSections();  // Hide all sections
    document.getElementById('chooseShortFile').style.display = 'block';  // Show the short section
    document.getElementById('previewBoxShort').style.display = 'block';  // Show the short preview box
}

// Function to show the My Account section
function showMyAccount() {
    hideAllSections();  // Hide all sections
    document.getElementById('SkyliteUserAccount').style.display = 'block';  // Show the account section
}

// Function to show the My Content section
function showMyContent() {
    hideAllSections();  // Hide all sections
    document.getElementById('MyContent').style.display = 'block';  // Show the content section
}

// Function to show the Analytics section
function showAnalytics() {
    hideAllSections();  // Hide all sections
    document.getElementById('Analytics').style.display = 'block';  // Show the analytics section
}

// Function to show the Comments section
function showComments() {
    hideAllSections();  // Hide all sections
    document.getElementById('Comments').style.display = 'block';  // Show the comments section
}

// Function to show the Earnings section
function showEarnings() {
    hideAllSections();  // Hide all sections
    document.getElementById('Earnings').style.display = 'block';  // Show the earnings section
}

// Function to show the Ads section
function showAds() {
    hideAllSections();  // Hide all sections
    document.getElementById('SkyliteAds').style.display = 'block';  // Show the ads section
}

// Function to close the Video preview
function closePreview() {
    document.getElementById('PreviewBox').style.display = 'none';  // Hide the video preview box
}

// Function to close the Post preview
function closePreviewPost() {
    document.getElementById('previewBoxPost').style.display = 'none';  // Hide the post preview box
    document.getElementById('closePreviewPosts').style.display = 'none';  // Hide the close button
    document.getElementById('uploadPosts').style.display = 'none';  // Hide the upload button
}

// Function to close the Short preview
function closePreviewShort() {
    document.getElementById('previewBoxShort').style.display = 'none';  // Hide the short preview box
}

// Add event listeners to the sidebar tabs
document.getElementById('chooseVideoFileTab').addEventListener('click', showVideoSection);
document.getElementById('choosePostFileTab').addEventListener('click', showPostSection);
document.getElementById('chooseShortFileTab').addEventListener('click', showShortSection);
document.getElementById('UserAccount').addEventListener('click', showMyAccount);
document.getElementById('AllMyContent').addEventListener('click', showMyContent);
document.getElementById('AllAnalytics').addEventListener('click', showAnalytics);
document.getElementById('AllComments').addEventListener('click', showComments);
document.getElementById('AllEarnings').addEventListener('click', showEarnings);
document.getElementById('AllAds').addEventListener('click', showAds);












// Show verification form when edit icon is clicked
document.getElementById('edit-icon').addEventListener('click', () => {
    document.getElementById('edit-section').style.display = 'block';
    document.getElementById('accountEditInfo').style.display = 'none';
    
    // Reset the form states when edit icon is clicked again
    document.getElementById('verify-form').style.display = 'block'; // Show the verification form
    document.getElementById('editable-fields').style.display = 'none'; // Ensure editable fields are hidden
});

// Handle verification
document.getElementById('VerifyEmailPassword').addEventListener('click', function() {
    // Hide the verification form
    document.getElementById('verify-form').style.display = 'none';

    // Show the editable fields
    document.getElementById('editable-fields').style.display = 'block';
});

// Handle closing edit-section using the close-circle-x-mark icon
document.querySelectorAll('#edit-section .fa-circle-xmark').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('edit-section').style.display = 'none';
        document.getElementById('accountEditInfo').style.display = 'block';
        document.getElementById('editable-fields').style.display = 'none'; // Ensure editable fields are hidden
    });
});

// Handle closing editable-fields using the close-circle-x-mark icon
document.querySelectorAll('#editable-fields .fa-circle-xmark').forEach(function(element) {
    element.addEventListener('click', function() {
        document.getElementById('editable-fields').style.display = 'none';
        document.getElementById('accountEditInfo').style.display = 'block';
        document.getElementById('edit-section').style.display = 'none'; // Ensure edit section is hidden
    });
});















// Event listener for when the label is clicked to trigger file selection
document.querySelector('.music-add-button-label').addEventListener('click', function() {
    // Trigger the hidden file input when the label is clicked
    document.getElementById('music').click();
});

// Event listener for when a file is selected
document.getElementById('music').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    const audioPlayer = document.getElementById('audio-player');
    const musicInput = document.querySelector('.music-add-input');

    if (file) {
        // Set the file name in the input box
        musicInput.value = file.name;

        // Create a URL for the file and set it as the audio source
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        audioPlayer.load(); // Load the new audio source
    }
});































// Function to handle searching content
function searchContent() {
    var input, filter, tabcontent, contentItems, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    tabcontent = document.querySelector(".tabcontent[style*='block']");
    contentItems = tabcontent.getElementsByTagName("p");

    for (i = 0; i < contentItems.length; i++) {
        txtValue = contentItems[i].textContent || contentItems[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            contentItems[i].style.display = "";
        } else {
            contentItems[i].style.display = "none";
        }
    }
}

document.addEventListener('click', function(event) {
    const sortIcon = document.querySelector('.cms-sort-icon');
    const sortOptions = document.querySelector('.cms-sort-options');

    if (sortIcon.contains(event.target)) {
        sortOptions.style.display = 'block';
    } else if (!sortOptions.contains(event.target)) {
        sortOptions.style.display = 'none';
    }
});



























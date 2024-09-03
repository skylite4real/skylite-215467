// Toggle video information display
function toggleVideoInfo() {
    const videoInfo = document.getElementById('videoInfo');
    videoInfo.style.display = videoInfo.style.display === 'none' ? 'block' : 'none';
}

// Toggle thumbnail information display
function toggleThumbnailInfo() {
    const thumbnailInfo = document.getElementById('thumbnailInfo');
    thumbnailInfo.style.display = thumbnailInfo.style.display === 'none' ? 'block' : 'none';
}
// Include Video.js library
function loadVideoJs() {
    const videoJsScript = document.createElement('script');
    videoJsScript.src = "https://vjs.zencdn.net/7.15.4/video.min.js";
    document.head.appendChild(videoJsScript);

    const videoJsStyle = document.createElement('link');
    videoJsStyle.href = "https://vjs.zencdn.net/7.15.4/video-js.css";
    videoJsStyle.rel = "stylesheet";
    document.head.appendChild(videoJsStyle);
}


// Initialize Video.js player
function initializeVideoJs(videoElement) {
    return videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        aspectRatio: '16:9'
    });
}

// Toggle video information display
function toggleVideoInfo() {
    const videoInfo = document.getElementById('videoInfo');
    videoInfo.style.display = videoInfo.style.display === 'none' ? 'block' : 'none';
}

// Toggle thumbnail information display
function toggleThumbnailInfo() {
    const thumbnailInfo = document.getElementById('thumbnailInfo');
    thumbnailInfo.style.display = thumbnailInfo.style.display === 'none' ? 'block' : 'none';
}






// Display video and extract frames
function displayVideo(input) {
    const videoBox = document.getElementById('videoBox');
    const closeIcon = videoBox.querySelector('.close-icon');
    const videoResolution = document.createElement('p');
    videoResolution.id = 'videoResolution';
    const videoPreviewButton = document.getElementById('videoPreviewButton');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        videoBox.innerHTML = `<video id="uploadedVideo" class="video-js vjs-default-skin" data-setup='{}'><source src="${url}" type="${file.type}"></video>`;
        const videoElement = document.getElementById('uploadedVideo');
        initializeVideoJs(videoElement); // Initialize Video.js

        videoBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';
        videoPreviewButton.style.display = 'block';

        videoElement.onloadedmetadata = function() {
            const duration = videoElement.duration;
            const frameCount = Math.min(20, Math.max(5, Math.floor(duration / 2))); // Adjust frame count based on video length
            extractFrames(videoElement, frameCount);

            // Display the video resolution
            const width = videoElement.videoWidth;
            const height = videoElement.videoHeight;
            const resolutionInfo = getResolutionInfo(width, height);
            videoResolution.innerHTML = `Resolution: ${resolutionInfo.icon} ${resolutionInfo.text} (${width}x${height})`;

            // Append resolution after the frames
            document.getElementById('framesContainer').parentElement.appendChild(videoResolution);
        };
    }
}





///////////////////////////////////////
///////////////////////////////////////
function clearVideo() {
    const videoBox = document.getElementById('videoBox');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoResolution = document.getElementById('videoResolution');

    videoBox.innerHTML = `<input type="file" id="videoFile" accept="video/*" style="display: none;" onchange="displayVideo(this)">
                          <div class="choose-video-button" onclick="document.getElementById('videoFile').click();">
                              <div class="upload-icon-video">
                                  <i class="fa-solid fa-upload"></i>
                              </div>
                              <div class="">
                                  <span class="">Drag and Drop your Video file to Upload</span>
                              </div>
                          </div>
                          <i class="fa-solid fa-xmark close-icon" onclick="clearVideo()"></i>`;
    document.getElementById('framesContainer').innerHTML = '';
    videoPreviewButton.style.display = 'none'; // Hide the preview button when video is cleared
    if (videoResolution) {
        videoResolution.remove(); // Remove the resolution text when video is cleared
    }
}






// Preview video
function previewVideo() {
    const videoElement = document.getElementById('uploadedVideo');
    const thumbnailBox = document.getElementById('thumbnailBox');
    const videoPreviewBox = document.getElementById('videoPreview');
    const closePreviewButton = document.getElementById('closePreviewButton');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoCloseIcon = document.querySelector('#videoBox .close-icon');
    const thumbnailCloseIcon = document.querySelector('#thumbnailBox .close-icon');

    if (!videoElement) {
        alert('Please choose a video.');
        return;
    }

    videoPreviewBox.innerHTML = `<video id="videoPreviewPlayer" class="video-js vjs-default-skin" controls></video>`;
    const videoPreviewPlayer = document.getElementById('videoPreviewPlayer');

    if (thumbnailBox.querySelector('img')) {
        const thumbnailURL = thumbnailBox.querySelector('img').src;
        videoPreviewPlayer.setAttribute('poster', thumbnailURL);
    }

    videoPreviewPlayer.innerHTML = `<source src="${videoElement.querySelector('source').src}" type="${videoElement.querySelector('source').type}">`;
    initializeVideoJs(videoPreviewPlayer); // Initialize Video.js for preview

    closePreviewButton.style.display = 'block'; // Show the close preview button
    videoPreviewButton.style.display = 'none'; // Hide the preview button
    videoCloseIcon.style.display = 'none'; // Hide the close icon on video box
    thumbnailCloseIcon.style.display = 'none'; // Hide the close icon on thumbnail box
}






// Close preview
function closePreview() {
    const videoPreviewBox = document.getElementById('videoPreview');
    const closePreviewButton = document.getElementById('closePreviewButton');
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    const videoCloseIcon = document.querySelector('#videoBox .close-icon');
    const thumbnailCloseIcon = document.querySelector('#thumbnailBox .close-icon');

    videoPreviewBox.innerHTML = ''; // Clear the video preview box
    closePreviewButton.style.display = 'none'; // Hide the close preview button
    videoPreviewButton.style.display = 'block'; // Show the preview button
    videoCloseIcon.style.display = 'block'; // Show the close icon on video box
    thumbnailCloseIcon.style.display = 'block'; // Show the close icon on thumbnail box
}






// Display thumbnail
function displayThumbnail(input) {
    const thumbnailBox = document.getElementById('thumbnailBox');
    const closeIcon = thumbnailBox.querySelector('.close-icon');
    const videoPreviewButton = document.getElementById('videoPreviewButton');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const url = URL.createObjectURL(file);

        thumbnailBox.innerHTML = `<img src="${url}">`;
        thumbnailBox.appendChild(closeIcon);
        closeIcon.style.display = 'block';
        videoPreviewButton.style.display = 'block';
    }
}

// Clear thumbnail
function clearThumbnail() {
    const thumbnailBox = document.getElementById('thumbnailBox');
    thumbnailBox.innerHTML = `<input type="file" id="thumbnailFile" accept="image/*" style="display: none;" onchange="displayThumbnail(this)">
                              <div class="choose-thumbnail-button" onclick="document.getElementById('thumbnailFile').click();">
                                  <div class="upload-icon-video">
                                      <i class="fa-solid fa-upload"></i>
                                  </div>
                                  <div class="">
                                      <span class="">Drag and Drop your Thumbnail file</span>
                                  </div>
                              </div>
                              <i class="fa-solid fa-xmark close-icon" onclick="clearThumbnail()"></i>`;
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    videoPreviewButton.style.display = 'block';
}






// Highlight the box when dragging over
function highlightBox(event) {
    event.preventDefault();  // Necessary to allow the drop
    event.currentTarget.classList.add('highlight');
}

// Remove the highlight when dragging leaves
function removeHighlight(event) {
    event.currentTarget.classList.remove('highlight');
}

// Handle video drop
function handleVideoDrop(event) {
    event.preventDefault();
    removeHighlight(event);
    const inputFile = document.getElementById('videoFile');
    inputFile.files = event.dataTransfer.files;  // Assign dropped files to input
    displayVideo(inputFile);  // Display the video
}

// Handle thumbnail drop
function handleThumbnailDrop(event) {
    event.preventDefault();
    removeHighlight(event);
    const inputFile = document.getElementById('thumbnailFile');
    inputFile.files = event.dataTransfer.files;  // Assign dropped files to input
    displayThumbnail(inputFile);  // Display the thumbnail
}






// Extract frames from the video
function extractFrames(video, frameCount) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const framesContainer = document.getElementById('framesContainer');
    framesContainer.innerHTML = ''; // Clear previous frames

    const duration = video.duration;
    const interval = duration / frameCount;
    let currentFrame = 0;
    let lastCapturedTime = -1;
    let seekResolve;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    function seekToTime(time) {
        return new Promise(resolve => {
            seekResolve = resolve;
            video.currentTime = time;
        });
    }

    video.addEventListener('seeked', async function onSeeked() {
        if (seekResolve) seekResolve();
    });

    async function captureFrame() {
        if (currentFrame < frameCount) {
            await seekToTime(interval * currentFrame);
            if (video.currentTime !== lastCapturedTime) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = canvas.toDataURL('image/png');
                displayFrame(frame, framesContainer, video.currentTime);
                lastCapturedTime = video.currentTime;
                currentFrame++;
            }
            requestAnimationFrame(captureFrame); // Proceed to the next frame
        }
    }

    captureFrame();
}







function displayFrame(frame, container, time) {
    const frameContainer = document.createElement('div');
    frameContainer.classList.add('frame-container');

    const img = document.createElement('img');
    img.src = frame;
    img.classList.add('frame');
    img.dataset.time = time;

    // Single click event: Seek to the specific time in the video
    img.onclick = function() {
        const video = videojs('uploadedVideo'); // Get the Video.js player instance
        video.currentTime(parseFloat(this.dataset.time));
        video.pause(); // Pause the video on single click
    };

    // Double click event: Play or pause the video
    img.ondblclick = function() {
        const video = videojs('uploadedVideo'); // Get the Video.js player instance
        if (video.paused()) {
            video.currentTime(parseFloat(this.dataset.time)); // Seek to the frame time
            video.play(); // Play the video on double click
        } else {
            video.pause(); // Pause the video if it's playing
        }
    };

    // Add ellipsis icon to the frame
    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.classList.add('fa', 'fa-ellipsis-h', 'ellipsis-icon');
    ellipsisIcon.onclick = function(event) {
        event.stopPropagation();
        chooseFrameAsThumbnail(frame);
    };

    frameContainer.appendChild(img);
    frameContainer.appendChild(ellipsisIcon);
    container.appendChild(frameContainer);
}







// Function to choose a frame as thumbnail
function chooseFrameAsThumbnail(frame) {
    const thumbnailBox = document.getElementById('thumbnailBox');
    const closeIcon = thumbnailBox.querySelector('.close-icon');

    thumbnailBox.innerHTML = `<img src="${frame}">`;
    thumbnailBox.appendChild(closeIcon);
    closeIcon.style.display = 'block';
}

// Load Video.js when the page loads
window.onload = loadVideoJs;

// Ensure the preview button is always visible
document.addEventListener('DOMContentLoaded', () => {
    const videoPreviewButton = document.getElementById('videoPreviewButton');
    videoPreviewButton.style.display = 'block';
});








// Function to go to the Video Details section
function goToVideoDetails() {
    const videoPreviewBox = document.getElementById('videoPreview');
    const chooseMediaContent = document.getElementById('chooseMediaContent');

    if (videoPreviewBox.innerHTML.trim() === '') {
        alert('Please preview the video before proceeding.');
    } else {
        // Hide the Choose Media section
        chooseMediaContent.style.display = 'none';

        // Show the Video Details section
        showSectionContent('videoDetails');
    }
}






// Function to go back to the Choose Media section
function goBack() {
    // Hide the Video Details section
    document.getElementById('videoDetailsContent').style.display = 'none';

    // Show the Choose Media section
    document.getElementById('chooseMediaContent').style.display = 'block';

    // Highlight the Choose Media step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('chooseMedia')"]`).classList.add('active');
}

// Toggle content based on the section clicked
function showSectionContent(sectionName) {
    // Hide all step content inside the box
    document.querySelectorAll('.box-content > div').forEach(function(content) {
        content.style.display = 'none';
    });

    // Display content based on the selected section
    const sectionContentId = sectionName + 'Content';
    const sectionContent = document.getElementById(sectionContentId);
    if (sectionContent) {
        sectionContent.style.display = 'block';
    }

    // Highlight the active step
    document.querySelectorAll('.steps .step').forEach(function(step) {
        step.classList.remove('active');
    });
    document.querySelector(`.steps .step[onclick="showSectionContent('${sectionName}')"]`).classList.add('active');
}





///////////////////////////////////////
///////////////////////////////////////
function getResolutionInfo(width, height) {
    if (width >= 3840 && height >= 2160) {
        return { text: '4K', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-4k-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M3.577 8.9v.03h1.828V5.898h-.062a47 47 0 0 0-1.766 3.001z"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm2.372 3.715.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202m7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z"/>
                                       </svg>` };
    }
    if (width >= 2560 && height >= 1440) {
        return { text: '1440p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-2-square-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306"/>
                                       </svg>` };
    }
    if (width >= 1920 && height >= 1080) {
        return { text: '1080p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-hd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11z"/>
                                        </svg>` };
    }
    if (width >= 1280 && height >= 720) {
        return { text: '720p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-hd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11z"/>
                                        </svg>` };
    }
    if (width >= 854 && height >= 480) {
        return { text: '480p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                        </svg>` };
    }
    if (width >= 640 && height >= 360) {
        return { text: '360p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                        </svg>` };
    }
    if (width >= 426 && height >= 240) {
        return { text: '240p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                          <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                    </svg>` };
    }
    return { text: '144p', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-badge-sd-fill" viewBox="0 0 16 16" style="color: white;">
                                      <path d="M10.338 5.968h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c1.521 0 2.378-.764 2.378-1.88 0-1.007-.642-1.473-1.613-1.692l-.932-.216c-.527-.114-.821-.351-.821-.712 0-.466.39-.804 1.046-.804.637 0 1.028.33 1.103.76h1.125c-.058-.923-.849-1.692-2.22-1.692-1.322 0-2.24.717-2.24 1.815 0 .91.588 1.446 1.52 1.657l.927.215c.624.145.923.36.923.778 0 .492-.391.83-1.13.83-.707 0-1.155-.342-1.234-.808H2.762c.052.95.79 1.75 2.315 1.75ZM8.307 11h2.19c1.81 0 2.684-1.107 2.684-3.015 0-1.894-.861-2.984-2.685-2.984H8.308z"/>
                                    </svg>` };
}






































document.addEventListener("DOMContentLoaded", function() {
    // Get all elements with the class 'fa-circle-info-monetization-of-choose-media'
    const infoIcons = document.querySelectorAll('.fa-circle-info-monetization-of-choose-media');

    infoIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            // Toggle the corresponding info box
            const infoBoxId = this.getAttribute('id').replace('info', 'infoBox');
            const infoBox = document.getElementById(infoBoxId);
            if (infoBox) {
                if (infoBox.style.display === 'none' || infoBox.style.display === '') {
                    infoBox.style.display = 'block';
                } else {
                    infoBox.style.display = 'none';
                }
            }
        });
    });
});













document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('.checkbox-container input[type="radio"]');

    radios.forEach(radio => {
        radio.addEventListener('click', function () {
            // Identify the container of the current radio button
            const container = this.closest('.checkbox-container').parentElement;

            // For single selection groups (Visibility, Comments, Content Analytics, Notifications)
            if (container.classList.contains('advanced-details-input-container-visibility') ||
                container.classList.contains('advanced-details-input-container-comments') ||
                container.classList.contains('advanced-details-input-container-content-analytics') ||
                container.classList.contains('advanced-details-input-container-notifications')) {

                // Ensure only one radio button is checked in these groups
                if (this.classList.contains('unchecked')) {
                    this.checked = false;
                    this.classList.remove('unchecked');
                    this.nextElementSibling.classList.remove('active-label');
                } else {
                    const containerRadios = container.querySelectorAll('input[type="radio"]');
                    containerRadios.forEach(r => {
                        r.classList.remove('unchecked');
                        r.checked = false;
                        r.nextElementSibling.classList.remove('active-label');
                    });
                    this.classList.add('unchecked');
                    this.checked = true;
                    this.nextElementSibling.classList.add('active-label');
                }
            }

            // For double selection groups (Share Settings, Viewer Interaction)
            else if (container.classList.contains('advanced-details-input-container-share-settings') ||
                     container.classList.contains('advanced-details-input-container-viewer-interaction')) {

                const checkedRadios = container.querySelectorAll('input[type="radio"]:checked');

                if (this.checked && checkedRadios.length > 2) {
                    this.checked = false;
                    this.classList.remove('unchecked');
                    this.nextElementSibling.classList.remove('active-label');
                } else {
                    if (this.classList.contains('unchecked')) {
                        this.checked = false;
                        this.classList.remove('unchecked');
                        this.nextElementSibling.classList.remove('active-label');
                    } else {
                        this.classList.add('unchecked');
                        this.checked = true;
                        this.nextElementSibling.classList.add('active-label');
                    }
                }
            }
        });

        // Add event listener for labels to also toggle the radio button
        const label = radio.nextElementSibling;
        if (label && label.tagName.toLowerCase() === 'label') {
            label.addEventListener('click', function () {
                radio.click();
            });
        }
    });
});









document.addEventListener('DOMContentLoaded', () => {
    // Select all the info icons and corresponding info boxes for advanced details
    const advancedInfoIcons = document.querySelectorAll('.fa-circle-info-advanced-details, .fa-circle-info-advanced-details-language');
    
    // Add click event listener to each icon
    advancedInfoIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Get the corresponding info box
            const infoBox = icon.nextElementSibling.nextElementSibling;
            
            // Toggle the display of the info box
            if (infoBox.style.display === 'none' || infoBox.style.display === '') {
                infoBox.style.display = 'block';
            } else {
                infoBox.style.display = 'none';
            }
        });
    });
});














document.addEventListener('DOMContentLoaded', () => {
    // Array of categories
    const categories = [
        "Food & Cooking",
        "Dance",
        "Travel",
        "Music",
        "Vlogs",
        "Education",
        "Nature",
        "Games",
        "Fitness",
        "Technology",
        "Fashion",
        "Beauty",
        "Sports",
        "Science",
        "History"
    ];

    // Populate the video category select box
    const videoCategorySelect = document.getElementById('videoCategory');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        videoCategorySelect.appendChild(option);
    });

});




document.addEventListener("DOMContentLoaded", function() {
    // Get all info icons
    const infoIcons = document.querySelectorAll('.fa-circle-info-video-details');

    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the corresponding info box using the icon's id
            const infoBoxId = 'infoBox' + this.id.replace('info', '');
            const infoBox = document.getElementById(infoBoxId);

            // Toggle the display of the info box
            if (infoBox.style.display === "none" || infoBox.style.display === "") {
                infoBox.style.display = "block";
            } else {
                infoBox.style.display = "none";
            }
        });
    });
});






























// Open Choose Media Video Terms Modal
function openChooseMediaVideoTermsModal() {
    document.getElementById('choose-media-video-modal-terms').style.display = 'block';
    document.body.classList.add('modal-open'); // Disable interactions with other sections
}

// Close Choose Media Video Terms Modal
document.getElementById('chooseMediaVideoModalTermsCloseIcon').onclick = function() {
    document.getElementById('choose-media-video-modal-terms').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable interactions with other sections
};















// Open Modal
document.getElementById("openContentWarningModal").onclick = function() {
    document.getElementById("advanced-video-modal-content-warning").style.display = "block";
    document.body.classList.add("modal-open");
};

// Close Modal
document.getElementById("closeContentWarningModal").onclick = function() {
    document.getElementById("advanced-video-modal-content-warning").style.display = "none";
    document.body.classList.remove("modal-open");
};










// Open Age Restrictions Modal
document.getElementById("openAgeRestrictionsModal").onclick = function() {
    document.getElementById("advanced-video-age-restrictions-modal").style.display = "block";
    document.body.classList.add("modal-open");
};

// Close Age Restrictions Modal
document.getElementById("closeAgeRestrictionsModal").onclick = function() {
    document.getElementById("advanced-video-age-restrictions-modal").style.display = "none";
    document.body.classList.remove("modal-open");
};







// Open License Modal
document.getElementById("openLicenseModal").onclick = function() {
    document.getElementById("advanced-video-license-modal").style.display = "block";
    document.body.classList.add("modal-open");
};

// Close License Modal
document.getElementById("closeLicenseModal").onclick = function() {
    document.getElementById("advanced-video-license-modal").style.display = "none";
    document.body.classList.remove("modal-open");
};











// Open Monetization Modal
document.getElementById("openMonetizationModal").onclick = function() {
    document.getElementById("advanced-video-monetization-modal").style.display = "block";
    document.body.classList.add("modal-open");
};

// Close Monetization Modal
document.getElementById("closeMonetizationModal").onclick = function() {
    document.getElementById("advanced-video-monetization-modal").style.display = "none";
    document.body.classList.remove("modal-open");
};













// checkbox for terms and conditions

document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('videoTermsCheckbox');
    checkbox.checked = true; // Ensure it's always checked

    // Listen for changes and recheck if unchecked
    checkbox.addEventListener('change', function() {
        if (!checkbox.checked) {
            checkbox.checked = true;
        }
    });
});

















// Function to handle the character count, limit enforcement, and warning message
// Function to handle the character count, limit enforcement, and warning message
function handleCharCount(inputElement, charCountElement, maxLength, warningThreshold, warningMessageElement) {
    let warningTimer;  // Timer for the warning message

    inputElement.addEventListener('input', function () {
        let charCount = this.textContent.length;

        // Update character count display
        charCountElement.textContent = `${charCount}/${maxLength}`;

        // Change color based on character count
        if (charCount >= warningThreshold) {
            charCountElement.style.color = 'red';
        } else {
            charCountElement.style.color = 'black';
        }

        // Display the warning message if the character limit is reached
        if (charCount >= maxLength) {
            warningMessageElement.style.display = 'block';

            // Trim excess characters and prevent further input
            this.textContent = this.textContent.substring(0, maxLength);

            // Place the caret (cursor) at the end of the text
            placeCaretAtEnd(this);

            // Update character count display to the max length
            charCountElement.textContent = `${maxLength}/${maxLength}`;

            // Clear any existing timer and set a new one to keep the warning visible for at least 10 seconds
            clearTimeout(warningTimer);
            warningTimer = setTimeout(() => {
                warningMessageElement.style.display = 'none';
            }, 10000); // 10000ms = 10 seconds
        }
    });

    // Ensure the warning message stays for at least 10 seconds, even if the user continues typing
    inputElement.addEventListener('keyup', function () {
        let charCount = this.textContent.length;

        if (charCount >= maxLength) {
            // Restart the timer to keep the message visible
            clearTimeout(warningTimer);
            warningTimer = setTimeout(() => {
                warningMessageElement.style.display = 'none';
            }, 10000); // 10000ms = 10 seconds
        } else {
            warningMessageElement.style.display = 'none';
        }
    });
}

// Helper function to place the caret at the end of the contenteditable element
function placeCaretAtEnd(el) {
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

// Initialize the character count and warning message for title, description, and tags inputs
document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('videoTitle');
    const titleCharCount = document.getElementById('titleCharCount');
    const titleWarningMessage = document.createElement('p');
    titleWarningMessage.textContent = "Words limit reached, please stop typing.";
    titleWarningMessage.style.color = 'red';
    titleWarningMessage.style.display = 'none'; // Initially hidden
    titleInput.parentNode.appendChild(titleWarningMessage);

    const descriptionInput = document.getElementById('videoDescriptionInput');
    const descriptionCharCount = document.getElementById('descriptionCharCount');
    const descriptionWarningMessage = document.createElement('p');
    descriptionWarningMessage.textContent = "Words limit reached, please stop typing.";
    descriptionWarningMessage.style.color = 'red';
    descriptionWarningMessage.style.display = 'none'; // Initially hidden
    descriptionInput.parentNode.appendChild(descriptionWarningMessage);

    const tagsInput = document.getElementById('videoTags');
    const tagsCharCount = document.getElementById('tagsCharCount');
    const tagsWarningMessage = document.createElement('p');
    tagsWarningMessage.textContent = "Words limit reached, please stop typing.";
    tagsWarningMessage.style.color = 'red';
    tagsWarningMessage.style.display = 'none'; // Initially hidden
    tagsInput.parentNode.appendChild(tagsWarningMessage);

    // Set character count limits
    const maxTitleLength = 200;
    const maxDescriptionLength = 5000;
    const maxTagsLength = 200;

    // Set warning thresholds (e.g., when character count turns red)
    const titleWarningThreshold = 180;
    const descriptionWarningThreshold = 4800;
    const tagsWarningThreshold = 180;

    // Apply the character count and warning message function to each input
    handleCharCount(titleInput, titleCharCount, maxTitleLength, titleWarningThreshold, titleWarningMessage);
    handleCharCount(descriptionInput, descriptionCharCount, maxDescriptionLength, descriptionWarningThreshold, descriptionWarningMessage);
    handleCharCount(tagsInput, tagsCharCount, maxTagsLength, tagsWarningThreshold, tagsWarningMessage);
});









// Function to handle placeholders for contenteditable elements
function handlePlaceholder(contentEditableElement, placeholderText) {
    // Add the placeholder initially if the element is empty
    if (!contentEditableElement.textContent.trim()) {
        contentEditableElement.classList.add('placeholder'); // Add a class for styling the placeholder
        contentEditableElement.textContent = placeholderText;
    }

    // When the element gains focus
    contentEditableElement.addEventListener('focus', function () {
        if (this.textContent === placeholderText) {
            this.classList.remove('placeholder');
            this.textContent = ''; // Clear the placeholder text
        }
    });

    // When the element loses focus
    contentEditableElement.addEventListener('blur', function () {
        if (!this.textContent.trim()) {
            this.classList.add('placeholder');
            this.textContent = placeholderText; // Restore the placeholder text
        }
    });

    // Prevent users from typing the placeholder text directly
    contentEditableElement.addEventListener('input', function () {
        if (this.classList.contains('placeholder')) {
            this.classList.remove('placeholder');
            this.textContent = this.textContent.replace(placeholderText, '');
        }
    });
}

// Apply the placeholder function to your contenteditable elements
document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('videoTitle');
    const descriptionInput = document.getElementById('videoDescriptionInput');
    const tagsInput = document.getElementById('videoTags');

    handlePlaceholder(titleInput, 'Write the video title');
    handlePlaceholder(descriptionInput, 'Write the video description');
    handlePlaceholder(tagsInput, 'Comma separates the tags');

});




















document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('videoTitle');
    const descriptionInput = document.getElementById('videoDescriptionInput');

    // Function to convert text into clickable links
    function convertToLinks(text) {
        // Regular expressions for URLs, hashtags, and mentions
        const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const hashtagPattern = /#(\w+)/g;
        const mentionPattern = /@(\w+)/g;

        // Replace URLs with clickable links
        text = text.replace(urlPattern, function(url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });

        // Replace hashtags with clickable links
        text = text.replace(hashtagPattern, function(hashtag) {
            return `<a href="https://www.example.com/hashtag/${hashtag.slice(1)}" target="_blank">${hashtag}</a>`;
        });

        // Replace mentions with clickable links
        text = text.replace(mentionPattern, function(mention) {
            return `<a href="https://www.example.com/user/${mention.slice(1)}" target="_blank">${mention}</a>`;
        });

        return text;
    }

    // Function to save the caret position
    function saveCaretPosition(context) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(context);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    }

    // Function to restore the caret position
    function restoreCaretPosition(context, savedPosition) {
        let charIndex = 0;
        const range = document.createRange();
        range.setStart(context, 0);
        range.collapse(true);
        const nodeStack = [context];
        let node;
        let foundStart = false;

        while ((node = nodeStack.pop()) && !foundStart) {
            if (node.nodeType === 3) { // Text node
                const nextCharIndex = charIndex + node.length;
                if (savedPosition >= charIndex && savedPosition <= nextCharIndex) {
                    range.setStart(node, savedPosition - charIndex);
                    foundStart = true;
                }
                charIndex = nextCharIndex;
            } else {
                let i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // Function to handle input event and update content with clickable links
    function handleInput(event) {
        const inputElement = event.target;

        // Save caret position before modifying the HTML content
        const savedPosition = saveCaretPosition(inputElement);

        // Convert text to HTML with clickable links
        const text = inputElement.textContent;
        const htmlContent = convertToLinks(text);

        // Set HTML content
        inputElement.innerHTML = htmlContent;

        // Restore the caret position
        restoreCaretPosition(inputElement, savedPosition);
    }

    // Function to handle keypress events, such as "Enter" for a new line
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            document.execCommand('insertLineBreak');
            event.preventDefault();
        }
    }

    // Function to handle clicks on links inside contenteditable
    function handleLinkClick(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            window.open(event.target.href, '_blank');
        }
    }

    // Attach input and keypress event listeners to the title and description fields
    titleInput.addEventListener('input', handleInput);
    titleInput.addEventListener('keypress', handleKeyPress);
    titleInput.addEventListener('click', handleLinkClick);

    descriptionInput.addEventListener('input', handleInput);
    descriptionInput.addEventListener('keypress', handleKeyPress);
    descriptionInput.addEventListener('click', handleLinkClick);
});









document.addEventListener('DOMContentLoaded', function () {
    const tagsInput = document.getElementById('videoTags');
    const tagsContainer = document.getElementById('videoTagsinput');
    const charCountDisplay = document.getElementById('videotagsCharCount');
    const warningMessage = document.getElementById('warningMessage');
    const maxChars = 500;
    const warningDuration = 10000; // 10 seconds

    // Function to create a tag element
    function createTagElement(tagText) {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tagText;

        const removeIcon = document.createElement('i');
        removeIcon.className = 'fa-regular fa-circle-xmark';
        removeIcon.addEventListener('click', function () {
            tagElement.remove();
            updateCharCount();
        });

        tagElement.appendChild(removeIcon);
        return tagElement;
    }

    // Function to update the character count display and manage warnings and colors
    function updateCharCount() {
        const currentCharCount = Array.from(tagsContainer.children).reduce((total, tagElement) => {
            return total + tagElement.textContent.length;
        }, 0);

        // Update character count display
        charCountDisplay.textContent = `${currentCharCount}/${maxChars}`;

        // Handle character count colors
        if (currentCharCount >= 480 && currentCharCount <= 500) {
            charCountDisplay.style.color = 'red';
        } else {
            charCountDisplay.style.color = 'black';
        }

        // Allow typing if the character count reaches exactly 500
        if (currentCharCount === maxChars) {
            tagsContainer.setAttribute('contenteditable', 'true');
        } else {
            tagsContainer.setAttribute('contenteditable', 'false');
        }

        // Display or hide warning message
        if (currentCharCount === maxChars) {
            warningMessage.style.display = 'block';
            setTimeout(() => {
                warningMessage.style.display = 'none';
            }, warningDuration);
        } else {
            warningMessage.style.display = 'none';
        }

        // Trim excess characters if over limit
        if (currentCharCount > maxChars) {
            let excessChars = currentCharCount - maxChars;
            for (let i = tagsContainer.children.length - 1; i >= 0 && excessChars > 0; i--) {
                const tagElement = tagsContainer.children[i];
                const tagLength = tagElement.textContent.length;
                if (tagLength <= excessChars) {
                    tagElement.remove();
                    excessChars -= tagLength;
                } else {
                    tagElement.textContent = tagElement.textContent.slice(0, -excessChars);
                    excessChars = 0;
                    tagElement.appendChild(tagElement.querySelector('.fa-circle-xmark'));
                }
            }
            updateCharCount(); // Recalculate after trimming
        }
    }

    // Function to handle input and convert text to tags
    function handleTagsInput(event) {
        const inputElement = event.target;
        const inputText = inputElement.textContent;

        if (inputText.includes(',')) {
            const tags = inputText.split(',');
            tags.forEach((tag) => {
                if (tag.trim() !== '') {
                    const tagElement = createTagElement(tag.trim());
                    tagsContainer.appendChild(tagElement); // Append the tag to the container
                }
            });

            // Clear the input field, keeping any text after the last comma
            const lastTag = tags[tags.length - 1];
            inputElement.textContent = lastTag.includes(',') ? '' : lastTag.trim();

            // Move caret to the end of the input field
            placeCaretAtEnd(inputElement);

            // Update character count
            updateCharCount();
        }
    }

    // Helper function to place the caret at the end of the contenteditable element
    function placeCaretAtEnd(el) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // Disable typing in the tags container
    tagsContainer.addEventListener('keydown', function (event) {
        if (tagsContainer.getAttribute('contenteditable') === 'false') {
            event.preventDefault();
        }
    });

    // Attach input event listener to the tags input field
    tagsInput.addEventListener('input', handleTagsInput);

    // MutationObserver to watch for changes in the tagsContainer
    const observer = new MutationObserver(updateCharCount);

    // Start observing the tagsContainer for child list changes (tags added/removed)
    observer.observe(tagsContainer, { childList: true });

    // Initial character count update
    updateCharCount();
});















function toggleContent(contentId, linkId) {
    var content = document.getElementById(contentId);
    var link = document.getElementById(linkId);
    
    if (content.style.display === "none") {
        content.style.display = "block";
        link.innerText = "See less.";
    } else {
        content.style.display = "none";
        link.innerText = "See more.";
    }
}


function showPaymentMethod(paymentMethodId) {
    // Hide all payment method details
    document.querySelectorAll('.payment-details').forEach(function(detail) {
        detail.style.display = 'none';
    });

    // Hide all submit buttons
    document.querySelectorAll('.short-payment-submit').forEach(function(button) {
        button.style.display = 'none';
    });

    // Show the selected payment method details
    document.getElementById(paymentMethodId).style.display = 'block';

    // Show the submit button related to this payment method
    document.getElementById("shortPaymentSubmit").style.display = 'block';  
}

function closePaymentMethod(paymentMethodId) {
    // Close the respective payment method details
    document.getElementById(paymentMethodId).style.display = 'none';
    
    // Hide the submit button
    document.getElementById("shortPaymentSubmit").style.display = 'none';
}

// Initially hide the submit button when the page loads
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shortPaymentSubmit").style.display = 'none';
});


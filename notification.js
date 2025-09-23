// notification.js
(function () {
  'use strict';

  /**
   * Configuration for the notification source.
   * @type {string}
   */
  const NOTIFICATION_URL = 'https://raw.githubusercontent.com/toolnovanext/toolnova-notification/main/notification.json';

  // --- Create Core DOM Elements ---

  // Main container
  const container = document.createElement('div');
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive'); // Announce changes immediately
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.backgroundColor = '#f8f9fa';
  container.style.color = '#212529';
  container.style.textAlign = 'center';
  container.style.padding = '16px 20px';
  container.style.zIndex = '10000';
  container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
  container.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
  container.style.opacity = '0';
  container.style.transform = 'translateY(-100%)'; // Start off-screen
  container.style.visibility = 'hidden';

  // Title element
  const titleElement = document.createElement('h1');
  titleElement.style.fontSize = '20px';
  titleElement.style.fontWeight = '600';
  titleElement.style.margin = '0 0 8px 0';
  titleElement.style.color = '#343a40';

  // Content wrapper for raw HTML
  const contentElement = document.createElement('div');
  contentElement.style.fontSize = '16px';
  contentElement.style.lineHeight = '1.5';
  contentElement.style.marginBottom = '16px';

  // Error message element
  const errorElement = document.createElement('div');
  errorElement.setAttribute('role', 'alert');
  errorElement.style.color = '#d32f2f';
  errorElement.style.display = 'none';
  errorElement.style.marginBottom = '12px';

  // Dismiss button
  const dismissButton = document.createElement('button');
  dismissButton.textContent = 'Dismiss';
  dismissButton.setAttribute('aria-label', 'Dismiss notification');
  dismissButton.style.padding = '8px 16px';
  dismissButton.style.backgroundColor = '#343a40';
  dismissButton.style.color = '#ffffff';
  dismissButton.style.border = 'none';
  dismissButton.style.borderRadius = '4px';
  dismissButton.style.cursor = 'pointer';
  dismissButton.style.fontSize = '14px';
  dismissButton.style.transition = 'background-color 0.2s ease';
  dismissButton.addEventListener('mouseover', () => {
    dismissButton.style.backgroundColor = '#495057';
  });
  dismissButton.addEventListener('mouseout', () => {
    dismissButton.style.backgroundColor = '#343a40';
  });


  // --- Assemble Notification Structure ---
  container.appendChild(titleElement);
  container.appendChild(contentElement);
  container.appendChild(errorElement);
  container.appendChild(dismissButton);
  document.body.prepend(container);


  // --- Core Functions ---

  /**
   * Hides the notification and clears its content.
   */
  function dismissNotification() {
    container.style.opacity = '0';
    container.style.transform = 'translateY(-100%)';
    // Use a timeout to allow the transition to complete before hiding
    setTimeout(() => {
      container.style.visibility = 'hidden';
      // Clear content to prevent flash of old content on next load
      titleElement.textContent = '';
      contentElement.innerHTML = '';
      errorElement.style.display = 'none';
    }, 300); // Must match the transition duration
  }

  /**
   * Displays the notification with a smooth animation.
   */
  function showNotification() {
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }

  /**
   * Shows an error message within the notification container.
   * @param {string} message - The error message to display.
   */
  function showError(message) {
    titleElement.textContent = '';
    contentElement.innerHTML = '';
    dismissButton.style.display = 'block'; // Ensure dismiss is visible for errors too
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
    showNotification();
  }

  /**
   * Fetches notification data from the JSON source and displays it.
   */
  async function loadNotification() {
    try {
      const response = await fetch(NOTIFICATION_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache', // Fetches the latest version
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure the JSON has the required fields with non-empty content
      if (data && data.title && data.content) {
        titleElement.textContent = data.title;
        // WARNING: Using innerHTML can be a security risk if the source is not trusted.
        // Since you control the notification.json file, this is acceptable.
        contentElement.innerHTML = data.content;
        
        errorElement.style.display = 'none';
        dismissButton.style.display = 'block';
        showNotification();
      } else {
        // If data is valid but content is empty, do nothing.
        console.log('Notification data is empty or malformed; not showing.');
      }
    } catch (error) {
      console.warn('Failed to load notification:', error.message);
      // You can optionally show a user-facing error here
      // showError('Could not retrieve the latest notification.');
    }
  }


  // --- Event Listeners and Initialization ---

  // Handle click to dismiss
  dismissButton.addEventListener('click', dismissNotification);

  // Handle keyboard accessibility for the dismiss button
  dismissButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent scrolling on spacebar press
      dismissNotification();
    }
  });

  // Load the notification once the DOM is fully ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNotification);
  } else {
    loadNotification();
  }

})();
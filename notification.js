(function () {
  'use strict';

  // The new URL for fetching the notification data.
  const NOTIFICATION_URL = 'https://toolnovanext.github.io/notifications/notification.json';

  /**
   * Injects CSS styles into the document's head.
   * This is a cleaner approach than inline styles, promoting separation of concerns.
   * CSS variables (--*) are used for easy theming.
   */
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --notification-bg: #f8f9fa;
        --notification-text: #212529;
        --notification-title-text: #343a40;
        --notification-button-bg: #343a40;
        --notification-button-hover-bg: #495057;
        --notification-button-text: #ffffff;
        --notification-link-color: #007bff;
        --notification-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .toolnova-notification-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--notification-bg);
        color: var(--notification-text);
        text-align: center;
        padding: 16px 20px;
        z-index: 10000;
        box-shadow: var(--notification-shadow);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        box-sizing: border-box;
      }

      .toolnova-notification-container.visible {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .toolnova-notification-container h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--notification-title-text);
      }

      .toolnova-notification-container p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 16px;
        white-space: pre-line;
      }
      
      .toolnova-notification-container p a {
        color: var(--notification-link-color);
        text-decoration: underline;
      }

      .toolnova-notification-container button {
        padding: 8px 16px;
        background-color: var(--notification-button-bg);
        color: var(--notification-button-text);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      .toolnova-notification-container button:hover,
      .toolnova-notification-container button:focus {
        background-color: var(--notification-button-hover-bg);
        outline: 2px solid var(--notification-button-hover-bg);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Creates and appends the notification container to the DOM.
   * @returns {object} An object containing references to the container and its child elements.
   */
  function createNotificationElements() {
    const container = document.createElement('div');
    container.className = 'toolnova-notification-container';
    // The role 'alert' and aria-live 'polite' are crucial for accessibility.
    // 'polite' ensures screen readers announce the message without interrupting the user.
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');

    // Using innerHTML is efficient for setting a predefined structure.
    container.innerHTML = `
      <h2></h2>
      <p></p>
      <button aria-label="Dismiss notification">Dismiss</button>
    `;

    document.body.prepend(container);

    return {
      container,
      titleElement: container.querySelector('h2'),
      contentElement: container.querySelector('p'),
      dismissButton: container.querySelector('button'),
    };
  }

  /**
   * Fetches and displays the notification.
   * @param {object} elements - References to the DOM elements of the notification.
   */
  async function loadNotification(elements) {
    const { container, titleElement, contentElement } = elements;

    try {
      const response = await fetch(NOTIFICATION_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache', // Ensures the latest notification is fetched.
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      // Robust check to ensure data is a valid object with the required properties.
      if (data && typeof data === 'object' && data.title && data.content) {
        titleElement.textContent = data.title;
        
        // Process content to convert Markdown-style links to HTML <a> tags.
        const processedContent = data.content.trim().replace(
          /\[([^\]]+)\]\(([^"]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        // Using innerHTML is necessary here to render the HTML links.
        contentElement.innerHTML = processedContent;
        
        container.classList.add('visible');
      } else {
        console.log('Notification data is empty or malformed; not showing.');
      }
    } catch (error) {
      console.warn('Could not load notification:', error.message);
    }
  }

  /**
   * Main function to initialize the notification system.
   */
  function init() {
    injectStyles();
    const elements = createNotificationElements();
    const { container, dismissButton } = elements;

    const dismiss = () => {
      container.classList.remove('visible');
      // The timeout ensures the transition completes before setting visibility to hidden.
      setTimeout(() => {
        container.style.visibility = 'hidden';
      }, 300);
    };

    dismissButton.addEventListener('click', dismiss);
    dismissButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        dismiss();
      }
    });

    loadNotification(elements);
  }

  // Run the script after the DOM is fully loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
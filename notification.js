(function () {
  'use strict';

  const NOTIFICATION_URL = 'https://raw.githubusercontent.com/toolnovanext/toolnova-notification/main/notification.json';

  const container = document.createElement('div');
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive');
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
  container.style.transform = 'translateY(-100%)';
  container.style.visibility = 'hidden';

  const titleElement = document.createElement('h2');
  titleElement.style.fontSize = '20px';
  titleElement.style.fontWeight = '600';
  titleElement.style.margin = '0 0 8px 0';
  titleElement.style.color = '#343a40';

  const contentElement = document.createElement('div');
  contentElement.style.fontSize = '16px';
  contentElement.style.lineHeight = '1.5';
  contentElement.style.marginBottom = '16px';
  contentElement.style.whiteSpace = 'pre-line';

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

  container.appendChild(titleElement);
  container.appendChild(contentElement);
  container.appendChild(dismissButton);
  document.body.prepend(container);

  function dismissNotification() {
    container.style.opacity = '0';
    container.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      container.style.visibility = 'hidden';
    }, 300);
  }

  function showNotification() {
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }

  async function loadNotification() {
    try {
      const response = await fetch(NOTIFICATION_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.title && data.content) {
        titleElement.textContent = data.title;
        let processedContent = data.content.trim().replace(/\[([^\]]+)\]\("([^"]+)"\)/g, '<a href="$2" target="_blank" style="color: #007bff; text-decoration: underline;">$1</a>');
        contentElement.innerHTML = processedContent;
        
        showNotification();
      } else {
        console.log('Notification data is empty or malformed; not showing.');
      }
    } catch (error) {
      console.warn('Could not load notification:', error.message);
    }
  }

  dismissButton.addEventListener('click', dismissNotification);

  dismissButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dismissNotification();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNotification);
  } else {
    loadNotification();
  }

})();
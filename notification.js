// notification.js
(function() {
  // Create container
  const container = document.createElement('div');
  container.setAttribute('role', 'alert');
  container.setAttribute('aria-live', 'assertive');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.backgroundColor = '#f0f0f0';
  container.style.color = '#111';
  container.style.textAlign = 'center';
  container.style.padding = '12px 20px';
  container.style.zIndex = '10000';
  container.style.fontWeight = '600';
  container.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  container.style.display = 'none';
  container.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
  container.style.transform = 'translateY(-100%)';
  container.style.opacity = '0';

  // Create wrapper for content and button
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'center';
  wrapper.style.maxWidth = '1200px';
  wrapper.style.margin = '0 auto';

  // Create content div
  const contentDiv = document.createElement('div');
  contentDiv.style.flex = '1';
  contentDiv.style.paddingRight = '20px';

  // Create dismiss button
  const dismissButton = document.createElement('button');
  dismissButton.textContent = 'Dismiss';
  dismissButton.setAttribute('aria-label', 'Dismiss notification');
  dismissButton.style.padding = '6px 12px';
  dismissButton.style.backgroundColor = '#333';
  dismissButton.style.color = '#fff';
  dismissButton.style.border = 'none';
  dismissButton.style.borderRadius = '4px';
  dismissButton.style.cursor = 'pointer';
  dismissButton.style.fontSize = '14px';
  dismissButton.style.transition = 'background-color 0.2s ease';
  dismissButton.addEventListener('mouseover', () => {
    dismissButton.style.backgroundColor = '#555';
  });
  dismissButton.addEventListener('mouseout', () => {
    dismissButton.style.backgroundColor = '#333';
  });

  // Create error message div
  const errorDiv = document.createElement('div');
  errorDiv.style.color = '#d32f2f';
  errorDiv.style.display = 'none';
  errorDiv.setAttribute('role', 'alert');

  // Append elements
  wrapper.appendChild(contentDiv);
  wrapper.appendChild(dismissButton);
  container.appendChild(wrapper);
  container.appendChild(errorDiv);
  document.body.prepend(container);

  // Dismiss notification function
  function dismissNotification() {
    container.style.transform = 'translateY(-100%)';
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.display = 'none';
      contentDiv.innerHTML = '';
      errorDiv.style.display = 'none';
    }, 300);
  }

  // Show notification function
  function showNotification() {
    container.style.display = 'block';
    setTimeout(() => {
      container.style.transform = 'translateY(0)';
      container.style.opacity = '1';
    }, 10);
  }

  // Show error message
  function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.style.display = 'block';
    showNotification();
  }

  // Fetch and display notification
  async function loadNotification() {
    try {
      const response = await fetch('https://toolnova-notification.vercel.app/get/', {
        method: 'GET',
        headers: {
          'Accept': 'text/html',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const htmlContent = await response.text();
      if (htmlContent && htmlContent.trim() !== '') {
        contentDiv.innerHTML = htmlContent;
        showNotification();
      } else {
        throw new Error('Empty notification content');
      }
    } catch (err) {
      console.warn('Notification fetch failed:', err);
      showError('Failed to load notification. Please try again later.');
    }
  }

  // Event listener for dismiss button
  dismissButton.addEventListener('click', dismissNotification);

  // Load notification when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNotification);
  } else {
    loadNotification();
  }

  // Keyboard accessibility
  dismissButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dismissNotification();
    }
  });

  // Auto-dismiss after 10 seconds (optional)
  let autoDismissTimeout;
  function startAutoDismiss() {
    autoDismissTimeout = setTimeout(dismissNotification, 1000000);
  }

  // Reset auto-dismiss timer on user interaction
  container.addEventListener('mouseenter', () => clearTimeout(autoDismissTimeout));
  container.addEventListener('mouseleave', () => {
    if (container.style.display === 'block') {
      startAutoDismiss();
    }
  });

  // Start auto-dismiss when notification is shown
  container.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity' && container.style.opacity === '1') {
      startAutoDismiss();
    }
  });
})();
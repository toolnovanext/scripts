// notification.js
(function () {
  // Create container
  const container = document.createElement("div");
  container.setAttribute("role", "alert");
  container.setAttribute("aria-live", "assertive");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.backgroundColor = "#f0f0f0";
  container.style.color = "#111";
  container.style.textAlign = "center";
  container.style.padding = "12px 20px";
  container.style.zIndex = "10000";
  container.style.fontWeight = "600";
  container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  container.style.display = "none";
  container.style.transition = "opacity 0.3s ease-out";
  container.style.opacity = "0";

  // Create content div
  const contentDiv = document.createElement("div");
  contentDiv.style.maxWidth = "1200px";
  contentDiv.style.margin = "0 auto";
  contentDiv.style.paddingBottom = "10px";

  // Create dismiss button
  const dismissButton = document.createElement("button");
  dismissButton.textContent = "Dismiss";
  dismissButton.setAttribute("aria-label", "Dismiss notification");
  dismissButton.style.padding = "6px 12px";
  dismissButton.style.backgroundColor = "#333";
  dismissButton.style.color = "#fff";
  dismissButton.style.border = "none";
  dismissButton.style.borderRadius = "4px";
  dismissButton.style.cursor = "pointer";
  dismissButton.style.fontSize = "14px";
  dismissButton.style.transition = "background-color 0.2s ease";
  dismissButton.style.display = "block";
  dismissButton.style.margin = "0 auto";
  dismissButton.addEventListener("mouseover", () => {
    dismissButton.style.backgroundColor = "#555";
  });
  dismissButton.addEventListener("mouseout", () => {
    dismissButton.style.backgroundColor = "#333";
  });

  // Create error message div
  const errorDiv = document.createElement("div");
  errorDiv.style.color = "#d32f2f";
  errorDiv.style.display = "none";
  errorDiv.style.paddingBottom = "10px";
  errorDiv.setAttribute("role", "alert");

  // Append elements: content, dismiss button, error
  container.appendChild(contentDiv);
  container.appendChild(dismissButton);
  container.appendChild(errorDiv);
  document.body.prepend(container);

  // Dismiss notification
  function dismissNotification() {
    container.style.opacity = "0";
    container.style.display = "none";
    contentDiv.innerHTML = "";
    errorDiv.style.display = "none";
  }

  // Show notification
  function showNotification() {
    container.style.display = "block";
    container.style.opacity = "1";
  }

  // Show error message
  function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.style.display = "block";
    showNotification();
  }

  // Fetch and display notification
  async function loadNotification() {
    try {
      const response = await fetch("https://toolnova-notification.vercel.app/get/", {
        method: "GET",
        headers: {
          "Accept": "text/html",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }

      const htmlContent = await response.text();
      if (htmlContent && htmlContent.trim() !== "") {
        contentDiv.innerHTML = htmlContent;
        dismissButton.style.display = "block";
        showNotification();
      } else {
        dismissNotification();
      }
    } catch (err) {
      console.warn("Notification fetch failed:", err.message);
      showError("Failed to load notification. Please try again later.");
    }
  }

  // Event listener for dismiss button
  dismissButton.addEventListener("click", dismissNotification);

  // Keyboard accessibility
  dismissButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Space") {
      e.preventDefault();
      dismissNotification();
    }
  });

  // Load notification on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNotification);
  } else {
    loadNotification();
  }

  // Poll every 10 seconds
  setInterval(loadNotification, 10000);
})();
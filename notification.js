// notification.js
(function() {
  // Create container at top of <body>
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
  container.style.padding = "10px 0";
  container.style.zIndex = "9999";
  container.style.fontWeight = "600";
  container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  container.style.display = "none"; // hidden initially
  document.body.prepend(container);

  // Fetch and display notification
  async function loadNotification() {
    try {
      const response = await fetch("https://toolnova-notification.vercel.app/get/");
      if (!response.ok) throw new Error("Network response not ok");

      const htmlContent = await response.text();
      if (htmlContent && htmlContent.trim() !== "") {
        container.innerHTML = htmlContent;
        container.style.display = "block";
      }
    } catch (err) {
      // Fail silently if any error
      console.warn("Notification fetch failed:", err);
      container.style.display = "none";
    }
  }

  // Load notification immediately on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNotification);
  } else {
    loadNotification();
  }
})();
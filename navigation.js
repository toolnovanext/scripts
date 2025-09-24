(() => {
    'use strict';

    /**
     * Injects all necessary CSS styles into the document's <head>.
     * This ensures that all dynamically created elements are styled correctly
     * without needing an external stylesheet.
     */
    const injectStyles = () => {
        const css = `
            /* General Body and Theme Styling */
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
                color: #212529;
                transition: background-color 0.3s ease, color 0.3s ease;
            }

            body.dark-theme {
                background-color: #121212;
                color: #e0e0e0;
            }

            /* Header and Logo */
            header[role="banner"] {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                padding: 1rem 1.5rem;
                background-color: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                position: relative;
            }

            body.dark-theme header[role="banner"] {
                background-color: #1e1e1e;
                border-bottom-color: #444;
            }

            .logo {
                height: 50px;
                vertical-align: middle;
            }
            
            .header-text-container {
                text-align: center;
                flex-grow: 1;
                padding: 0 1rem;
            }

            h1 {
                margin: 0;
                font-size: 1.75rem;
            }

            .site-slogan {
                margin: 0.25rem 0 0;
                font-style: italic;
                color: #6c757d;
            }
            
            body.dark-theme .site-slogan {
                color: #adb5bd;
            }


            /* Accessibility: Skip Link */
            .skip-link {
                position: absolute;
                top: -100px;
                left: 0;
                background: #007bff;
                color: white;
                padding: 0.5rem 1rem;
                z-index: 1000;
                transition: top 0.3s ease-in-out;
            }

            .skip-link:focus {
                top: 0;
            }

            /* Navigation Menu */
            .nav-toggle {
                font-size: 1rem;
                padding: 0.5rem 1rem;
                cursor: pointer;
                border: 1px solid #ced4da;
                background-color: #fff;
                border-radius: 5px;
                order: 3; /* Ensure it's on the right */
            }

            body.dark-theme .nav-toggle {
                background-color: #343a40;
                color: #e0e0e0;
                border-color: #6c757d;
            }

            .nav-menu {
                position: absolute;
                top: 100%;
                right: 1.5rem;
                background: #ffffff;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 999;
                width: 280px;
                overflow: hidden;
            }

            body.dark-theme .nav-menu {
                background-color: #1e1e1e;
                border-color: #444;
            }

            .nav-menu ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .nav-menu li {
                border-bottom: 1px solid #f1f3f5;
            }
            
            body.dark-theme .nav-menu li {
                border-bottom-color: #343a40;
            }

            .nav-menu li:last-child {
                border-bottom: none;
            }

            .nav-menu a, .nav-menu button {
                display: block;
                padding: 0.85rem 1.25rem;
                color: #212529;
                text-decoration: none;
                width: 100%;
                text-align: left;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                transition: background-color 0.2s ease;
            }

            body.dark-theme .nav-menu a, body.dark-theme .nav-menu button {
                color: #e0e0e0;
            }

            .nav-menu a:hover, .nav-menu button:hover {
                background-color: #f8f9fa;
            }

            body.dark-theme .nav-menu a:hover, body.dark-theme .nav-menu button:hover {
                background-color: #343a40;
            }
            
            .nav-menu p {
                padding: 0.85rem 1.25rem;
                margin: 0;
                font-style: italic;
                font-size: 0.9rem;
                color: #6c757d;
                background-color: #f8f9fa;
            }

            body.dark-theme .nav-menu p {
                color: #adb5bd;
                background-color: #2c2c2c;
            }


            .nav-menu.collapsed, .submenu.collapsed {
                display: none;
            }

            .nav-menu.expanded, .submenu.expanded {
                display: block;
            }

            /* Submenu */
            .submenu {
                list-style: none;
                padding-left: 1.5rem;
                background-color: #f8f9fa;
            }

            body.dark-theme .submenu {
                background-color: #2a2a2a;
            }

            /* Main Content & Footer */
            main[role="main"] {
                padding: 2rem;
                min-height: 60vh;
            }

            footer[role="contentinfo"] {
                background-color: #f8f9fa;
                padding: 2.5rem 1.5rem;
                text-align: center;
                border-top: 1px solid #dee2e6;
            }

            body.dark-theme footer[role="contentinfo"] {
                background-color: #1e1e1e;
                border-top-color: #444;
            }
            
            footer h3 {
                margin-bottom: 1rem;
            }

            footer iframe {
                width: 100%;
                max-width: 500px;
                height: 150px;
                border: 1px solid #ced4da;
                border-radius: 5px;
                margin: 0 auto 2rem;
            }

            body.dark-theme footer iframe {
                border-color: #444;
            }

            footer ul {
                list-style: none;
                padding: 0;
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                flex-wrap: wrap;
                margin: 1.5rem 0;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
    };

    /**
     * Creates and prepends the header element to the document body.
     */
    const renderHeader = () => {
        const header = document.createElement('header');
        header.setAttribute('role', 'banner');

        header.innerHTML = `
            <a href="#main" class="skip-link">Skip to main content</a>
            <a href="https://toolnovanext.github.io" style="line-height: 0;">
                <img src="https://toolnovanext.github.io/assets/logo.png" class="logo" role="img" alt="the logo of toolnova next">
            </a>
            <div class="header-text-container">
                <h1>Welcome to toolnova next!</h1>
                <p class="site-slogan">Realizing the dreams through the touch of technology</p>
            </div>
            <button aria-expanded="false" aria-controls="main-nav" aria-label="Toggle navigation menu" id="nav-toggle" class="nav-toggle">
                Menu
            </button>
        `;

        const nav = document.createElement('nav');
        nav.setAttribute('role', 'navigation');
        nav.id = 'main-nav';
        nav.className = 'nav-menu collapsed';

        const menuItems = [
            { type: 'paragraph', content: 'Try our question AI to get general and daily answers?' },
            { type: 'link', text: 'Try Question AI', href: 'https://toolnovanext.github.io/question-ai' },
            { type: 'link', text: 'Home', href: 'https://toolnovanext.github.io' },
            { type: 'collapsible', text: 'Important Categories', subItems: [
                { text: 'Tool Fusion AI', href: 'https://toolnovanext.github.io/ToolFusion-AI/' },
                { text: 'User Favorite Tools', href: 'https://toolnovanext.github.io/User-favourite/' },
            ]},
            { type: 'link', text: 'Toolnova Blogs', href: 'https://toolnovanext.github.io/TOOLNOVA-BLOG/' },
            { type: 'link', text: 'Telegram Channel', href: 'https://t.me/swapnatamil' },
            { type: 'link', text: 'YouTube Channel', href: 'https://youtube.com/@accessibleresource' },
            { type: 'link', text: 'About', href: 'https://toolnovanext.github.io/about' },
        ];

        const ul = document.createElement('ul');
        ul.setAttribute('role', 'menubar');

        menuItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.setAttribute('role', 'none');
            if (item.type === 'paragraph') {
                li.innerHTML = `<p>${item.content}</p>`;
            } else if (item.type === 'link') {
                li.innerHTML = `<a href="${item.href}" role="menuitem">${item.text}</a>`;
            } else if (item.type === 'collapsible') {
                const subMenuHTML = item.subItems.map(subItem => `
                    <li role="none"><a href="${subItem.href}" role="menuitem">${subItem.text}</a></li>
                `).join('');
                li.innerHTML = `
                    <button aria-expanded="false" aria-controls="submenu-${index}" aria-label="Toggle ${item.text} submenu" class="submenu-toggle" role="menuitem">${item.text}</button>
                    <ul id="submenu-${index}" class="submenu collapsed" role="menu">${subMenuHTML}</ul>
                `;
            }
            ul.appendChild(li);
        });
        
        const themeLi = document.createElement('li');
        themeLi.setAttribute('role', 'none');
        themeLi.innerHTML = `<button id="theme-toggle" class="theme-toggle" role="menuitem" aria-label="Switch to dark theme">Switch to Dark Theme</button>`;
        ul.appendChild(themeLi);

        nav.appendChild(ul);
        header.appendChild(nav);
        document.body.prepend(header);
    };

    /**
     * Creates and appends the footer element to the document body.
     */
    const renderFooter = () => {
        const footer = document.createElement('footer');
        footer.setAttribute('role', 'contentinfo');
        footer.innerHTML = `
            <h3>Leave a Feedback</h3>
            <iframe src="https://toolnovanext.github.io/feedback" title="Feedback Form"></iframe>
            <h3>Important Links</h3>
            <ul>
                <li><a href="https://toolnovanext.github.io/ToolFusion-AI/">Tool Fusion AI</a></li>
                <li><a href="https://toolnovanext.github.io/User-favourite/">User Favorite Tools</a></li>
                <li><a href="https://toolnovanext.github.io/ToolNova-blog/">Toolnova Blog</a></li>
            </ul>
            <h3>More</h3>
            <p>Thanks for visiting toolnova next. We will continuously add new features.</p>
            <p>&copy; ${new Date().getFullYear()} Toolnova Next. All rights reserved.</p>
        `;
        document.body.appendChild(footer);
    };

    /**
     * Set up all event listeners for interactive elements.
     */
    const attachEventListeners = () => {
        const navToggle = document.getElementById('nav-toggle');
        const themeToggle = document.getElementById('theme-toggle');
        const submenuToggles = document.querySelectorAll('.submenu-toggle');

        navToggle.addEventListener('click', () => {
            const navMenu = document.getElementById('main-nav');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.textContent = isExpanded ? 'Menu' : 'Close';
            navMenu.classList.toggle('collapsed');
            navMenu.classList.toggle('expanded');
            if (!isExpanded === false) { // When closing main menu, collapse submenus
                submenuToggles.forEach(button => {
                    const submenu = document.getElementById(button.getAttribute('aria-controls'));
                    button.setAttribute('aria-expanded', 'false');
                    submenu.classList.add('collapsed');
                    submenu.classList.remove('expanded');
                });
            }
        });

        submenuToggles.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent nav menu from closing
                const submenu = document.getElementById(button.getAttribute('aria-controls'));
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                submenu.classList.toggle('collapsed');
                submenu.classList.toggle('expanded');
            });
        });

        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            themeToggle.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        });
    };

    /**
     * Initializes the entire UI script.
     */
    const init = () => {
        injectStyles();
        renderHeader();
        createMainContent();
        renderFooter();
        attachEventListeners();
    };

    // Run the script once the DOM is fully loaded.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
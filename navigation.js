/**
 * @fileoverview This script dynamically renders the header and footer for Toolnova Next.
 * It includes an accessible navigation menu with collapsible sections, a theme switcher,
 * and structured footer content. All elements, styles, and logic are contained within this file.
 */

// Wait for the DOM to be fully loaded before executing the script.
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Main function to initialize the page by rendering UI components
     * and setting up event listeners.
     */
    const initializePage = () => {
        injectGlobalStyles();
        renderHeader();
        renderFooter();
        setupEventListeners();
        applyInitialTheme();
    };

    /**
     * Injects necessary CSS into the document's head for styling the
     * header, footer, navigation, and theme switching.
     */
    const injectGlobalStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-bg: #ffffff;
                --primary-text: #1a1a1a;
                --accent-color: #007bff;
                --accent-text: #ffffff;
                --border-color: #e0e0e0;
                --header-bg: #f8f9fa;
                --footer-bg: #343a40;
                --footer-text: #f8f9fa;
                --link-color: #0056b3;
            }

            html.dark-mode {
                --primary-bg: #1a1a1a;
                --primary-text: #f0f0f0;
                --accent-color: #0088ff;
                --accent-text: #ffffff;
                --border-color: #333333;
                --header-bg: #222222;
                --footer-bg: #111111;
                --footer-text: #e0e0e0;
                --link-color: #4da6ff;
            }

            body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--primary-bg);
                color: var(--primary-text);
                transition: background-color 0.3s, color 0.3s;
            }

            /* Accessibility: Skip to Main Content Link */
            .skip-to-main {
                position: absolute;
                left: -9999px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
                z-index: -999;
            }
            .skip-to-main:focus {
                left: 50%;
                transform: translateX(-50%);
                top: 10px;
                width: auto;
                height: auto;
                padding: 10px 15px;
                background-color: var(--accent-color);
                color: var(--accent-text);
                border-radius: 8px;
                text-decoration: none;
                z-index: 10000;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }

            /* Header Styles */
            .site-header {
                padding: 1rem 2rem;
                background-color: var(--header-bg);
                border-bottom: 1px solid var(--border-color);
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .site-header .logo {
                height: 50px;
                width: auto;
                display: block;
            }

            .site-title-group {
                text-align: center;
                flex-grow: 1;
            }

            .site-title-group h1 {
                margin: 0;
                font-size: 2rem;
            }

            .site-title-group .site-slogan {
                margin: 0.25rem 0 0;
                font-style: italic;
                opacity: 0.8;
            }

            /* Navigation Styles */
            .nav-toggle-btn, .theme-toggle-btn {
                background: none;
                border: 2px solid var(--accent-color);
                color: var(--accent-color);
                padding: 0.5rem 1rem;
                cursor: pointer;
                border-radius: 8px;
                font-weight: bold;
                transition: background-color 0.2s, color 0.2s;
            }

            .nav-toggle-btn:hover, .theme-toggle-btn:hover {
                background-color: var(--accent-color);
                color: var(--accent-text);
            }

            .main-navigation {
                position: fixed;
                top: 0;
                right: -300px; /* Initially hidden */
                width: 280px;
                height: 100%;
                background-color: var(--header-bg);
                box-shadow: -4px 0 15px rgba(0,0,0,0.1);
                transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                z-index: 1000;
                overflow-y: auto;
            }

            .main-navigation.is-open {
                right: 0;
            }

            .main-navigation ul {
                list-style: none;
                padding: 1rem;
                margin: 0;
            }

            .main-navigation ul li {
                margin-bottom: 0.5rem;
            }

            .main-navigation a, .main-navigation .categories-toggle-btn {
                display: block;
                padding: 0.75rem 1rem;
                text-decoration: none;
                color: var(--primary-text);
                border-radius: 6px;
                transition: background-color 0.2s;
                font-weight: 500;
            }

             .main-navigation .categories-toggle-btn {
                background: none;
                border: none;
                width: 100%;
                text-align: left;
                cursor: pointer;
                font-size: 1em;
             }

            .main-navigation a:hover, .main-navigation a:focus, .main-navigation .categories-toggle-btn:hover, .main-navigation .categories-toggle-btn:focus {
                background-color: var(--border-color);
                outline: 2px solid var(--accent-color);
            }

            .nav-header {
                padding: 1rem;
                text-align: right;
            }

            .nav-header .close-btn {
                 background: none;
                 border: none;
                 font-size: 2rem;
                 cursor: pointer;
                 color: var(--primary-text);
            }

            .nav-item-description {
                font-size: 0.9rem;
                padding: 0 1rem 0.5rem;
                opacity: 0.7;
            }
            
            .sub-menu {
                list-style: none;
                padding-left: 1.5rem;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out;
            }
            
            .sub-menu.is-open {
                max-height: 200px; /* Adjust as needed */
            }

            /* Footer Styles */
            .site-footer {
                background-color: var(--footer-bg);
                color: var(--footer-text);
                padding: 2rem;
                text-align: center;
            }

            .site-footer h3 {
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: var(--accent-text);
            }
            
            .site-footer h3:first-child {
                margin-top: 0;
            }

            .site-footer iframe {
                width: 100%;
                max-width: 500px;
                height: 150px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
            }

            .site-footer .footer-links a {
                display: inline-block;
                margin: 0.5rem 1rem;
                color: var(--link-color);
                text-decoration: none;
                transition: text-decoration 0.2s;
            }
            
            .site-footer .footer-links a:hover {
                text-decoration: underline;
            }

            .site-footer .copyright {
                margin-top: 2rem;
                font-size: 0.9rem;
                opacity: 0.7;
            }

            /* Screen Reader Only */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border-width: 0;
            }
            
            @media (max-width: 768px) {
                .site-header {
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .site-title-group h1 {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    };

    /**
     * Creates and appends the header element to the body.
     */
    const renderHeader = () => {
        const header = document.createElement('header');
        header.className = 'site-header';

        // 1. Skip to Main Content Link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        header.appendChild(skipLink);
        
        // Ensure there is a target for the skip link
        if (!document.getElementById('main')) {
            const main = document.createElement('main');
            main.id = 'main';
            document.body.insertBefore(main, document.body.firstChild.nextSibling);
        }

        // 2. Logo
        const logoLink = document.createElement('a');
        logoLink.href = 'https://toolnovanext.github.io';
        const logoImg = document.createElement('img');
        logoImg.src = 'https://toolnovanext.github.io/assets/logo.png';
        logoImg.className = 'logo';
        logoImg.setAttribute('role', 'logo');
        logoImg.alt = 'The logo of Toolnova Next';
        logoLink.appendChild(logoImg);
        header.appendChild(logoLink);

        // 3. Site Title and Slogan
        const titleGroup = document.createElement('div');
        titleGroup.className = 'site-title-group';
        const h1 = document.createElement('h1');
        h1.textContent = 'Welcome to Toolnova Next!';
        const slogan = document.createElement('p');
        slogan.className = 'site-slogan';
        slogan.textContent = 'Realizing dreams through the touch of technology.';
        titleGroup.appendChild(h1);
        titleGroup.appendChild(slogan);
        header.appendChild(titleGroup);

        // 4. Navigation Toggle Button
        const navToggleBtn = document.createElement('button');
        navToggleBtn.id = 'nav-toggle';
        navToggleBtn.className = 'nav-toggle-btn';
        navToggleBtn.setAttribute('aria-expanded', 'false');
        navToggleBtn.setAttribute('aria-controls', 'main-nav');
        navToggleBtn.setAttribute('aria-label', 'Open navigation menu');
        navToggleBtn.textContent = 'Menu';
        header.appendChild(navToggleBtn);

        // 5. Navigation Menu
        const nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.className = 'main-navigation';
        nav.setAttribute('aria-labelledby', 'nav-toggle');

        // Nav Header with Close Button
        const navHeader = document.createElement('div');
        navHeader.className = 'nav-header';
        const closeBtn = document.createElement('button');
        closeBtn.id = 'nav-close';
        closeBtn.className = 'close-btn';
        closeBtn.setAttribute('aria-label', 'Close navigation menu');
        closeBtn.innerHTML = '&times;';
        navHeader.appendChild(closeBtn);
        nav.appendChild(navHeader);

        const ul = document.createElement('ul');

        const navItems = [
            { type: 'html', content: '<p class="nav-item-description">Try our question AI to get general and daily answers?</p>' },
            { type: 'link', text: 'Try Question AI', href: 'https://toolnovanext.github.io/question-ai' },
            { type: 'link', text: 'Home', href: 'https://toolnovanext.github.io' },
            {
                type: 'collapsible',
                text: 'Important Categories',
                id: 'categories-toggle',
                controls: 'categories-submenu',
                subItems: [
                    { text: 'Tool Fusion AI', href: 'https://toolnovanext.github.io/ToolFusion-AI/' },
                    { text: 'User Favorite Tools', href: 'https://toolnovanext.github.io/User-favourite/' },
                ]
            },
            { type: 'link', text: 'Toolnova Blogs', href: 'https://toolnovanext.github.io/ToolNova-blog/' },
            { type: 'link', text: 'Telegram Channel', href: 'https://t.me/swapnatamil' },
            { type: 'link', text: 'YouTube Channel', href: 'https://YouTube.com/@accessibleresource' },
            { type: 'link', text: 'About', href: 'https://toolnovanext.github.io/about' },
            { type: 'button', text: 'Switch Theme', id: 'theme-toggle', label: 'Toggle light and dark theme' },
        ];

        navItems.forEach(item => {
            const li = document.createElement('li');
            if (item.type === 'link') {
                const a = document.createElement('a');
                a.href = item.href;
                a.textContent = item.text;
                li.appendChild(a);
            } else if (item.type === 'html') {
                li.innerHTML = item.content;
            } else if (item.type === 'button') {
                const button = document.createElement('button');
                button.id = item.id;
                button.className = 'theme-toggle-btn';
                button.setAttribute('aria-label', item.label);
                button.textContent = item.text;
                li.appendChild(button);
            } else if (item.type === 'collapsible') {
                const button = document.createElement('button');
                button.id = item.id;
                button.className = 'categories-toggle-btn';
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-controls', item.controls);
                button.textContent = item.text;
                li.appendChild(button);

                const subUl = document.createElement('ul');
                subUl.id = item.controls;
                subUl.className = 'sub-menu';
                item.subItems.forEach(subItem => {
                    const subLi = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = subItem.href;
                    a.textContent = subItem.text;
                    subLi.appendChild(a);
                    subUl.appendChild(subLi);
                });
                li.appendChild(subUl);
            }
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        document.body.appendChild(nav); // Append nav outside header for fixed positioning
        document.body.prepend(header);
    };

    /**
     * Creates and appends the footer element to the body.
     */
    const renderFooter = () => {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';

        // Feedback section
        const feedbackHeading = document.createElement('h3');
        feedbackHeading.textContent = 'Leave a Feedback';
        const feedbackIframe = document.createElement('iframe');
        feedbackIframe.src = 'https://toolnovanext.github.io/feedback';
        feedbackIframe.title = 'Feedback Form';
        footer.appendChild(feedbackHeading);
        footer.appendChild(feedbackIframe);

        // Important Links section
        const linksHeading = document.createElement('h3');
        linksHeading.textContent = 'Important Links...';
        const linksContainer = document.createElement('div');
        linksContainer.className = 'footer-links';
        const importantLinks = [
            { text: 'Tool Fusion AI', href: 'https://toolnovanext.github.io/ToolFusion-AI/' },
            { text: 'User Favorite Tools', href: 'https://toolnovanext.github.io/User-favourite/' },
            { text: 'ToolNova Blog', href: 'https://toolnovanext.github.io/ToolNova-blog/' },
        ];
        importantLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            linksContainer.appendChild(a);
        });
        footer.appendChild(linksHeading);
        footer.appendChild(linksContainer);

        // More section
        const moreHeading = document.createElement('h3');
        moreHeading.textContent = 'More...';
        const thanksPara = document.createElement('p');
        thanksPara.textContent = 'Thanks for visiting Toolnova Next. We will continuously add new features.';
        const copyrightPara = document.createElement('p');
        copyrightPara.className = 'copyright';
        copyrightPara.textContent = `© ${new Date().getFullYear()} Toolnova Next. All Rights Reserved.`;
        footer.appendChild(moreHeading);
        footer.appendChild(thanksPara);
        footer.appendChild(copyrightPara);

        document.body.appendChild(footer);
    };

    /**
     * Sets up all necessary event listeners for interactive elements.
     */
    const setupEventListeners = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');
        const mainNav = document.getElementById('main-nav');
        const categoriesToggle = document.getElementById('categories-toggle');
        const categoriesSubmenu = document.getElementById('categories-submenu');
        const themeToggle = document.getElementById('theme-toggle');

        // Navigation Menu Toggle
        const toggleNav = () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        };
        
        navToggle.addEventListener('click', toggleNav);
        navClose.addEventListener('click', toggleNav);

        // Categories Sub-menu Toggle
        categoriesToggle.addEventListener('click', () => {
            const isExpanded = categoriesToggle.getAttribute('aria-expanded') === 'true';
            categoriesToggle.setAttribute('aria-expanded', !isExpanded);
            categoriesSubmenu.classList.toggle('is-open');
        });

        // Theme Switcher
        themeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const isDarkMode = html.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    };
    
    /**
     * Applies the theme from localStorage on initial page load.
     */
    const applyInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        }
    };

    // Run the initialization
    initializePage();
});

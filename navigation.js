// navigation.js

// Function to render the header
function renderHeader() {
  const header = document.createElement('header');
  header.setAttribute('role', 'banner');

  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.classList.add('skip-link');
  header.appendChild(skipLink);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.href = 'https://toolnovanext.github.io';
  const logoImg = document.createElement('img');
  logoImg.src = 'https://toolnovanext.github.io/assets/logo.png';
  logoImg.classList.add('logo');
  logoImg.setAttribute('role', 'img');
  logoImg.alt = 'the logo of toolnova next';
  logoLink.appendChild(logoImg);
  header.appendChild(logoLink);

  // Navigation menu button
  const navButton = document.createElement('button');
  navButton.setAttribute('aria-expanded', 'false');
  navButton.setAttribute('aria-controls', 'main-nav');
  navButton.setAttribute('aria-label', 'Toggle navigation menu');
  navButton.id = 'nav-toggle';
  navButton.textContent = 'Open Navigation Menu';
  navButton.classList.add('nav-toggle');
  header.appendChild(navButton);

  // Navigation menu
  const nav = document.createElement('nav');
  nav.setAttribute('role', 'navigation');
  nav.id = 'main-nav';
  nav.classList.add('nav-menu', 'collapsed');

  const ul = document.createElement('ul');
  ul.setAttribute('role', 'menubar');

  // Menu items
  const menuItems = [
    {
      type: 'paragraph',
      content: 'Try our question AI to get general and daily answers?',
    },
    {
      type: 'link',
      text: 'Try Question AI',
      href: 'https://toolnovanext.github.io/question-ai',
    },
    {
      type: 'link',
      text: 'Home',
      href: 'https://toolnovanext.github.io',
    },
    {
      type: 'collapsible',
      text: 'Important Categories',
      subItems: [
        {
          text: 'Tool Fusion AI',
          href: 'https://toolnovanext.github.io/ToolFusion-AI/',
        },
        {
          text: 'User Favorite Tools',
          href: 'https://toolnovanext.github.io/User-favourite/',
        },
      ],
    },
    {
      type: 'link',
      text: 'Toolnova Blogs',
      href: 'https://toolnovanext.github.io/ToolNova-blog/',
    },
    {
      type: 'link',
      text: 'Telegram Channel',
      href: 'https://t.me/swapnatamil',
    },
    {
      type: 'link',
      text: 'YouTube Channel',
      href: 'https://youtube.com/@accessibleresource',
    },
    {
      type: 'link',
      text: 'About',
      href: 'https://toolnovanext.github.io/about',
    },
  ];

  menuItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');

    if (item.type === 'paragraph') {
      const p = document.createElement('p');
      p.textContent = item.content;
      li.appendChild(p);
    } else if (item.type === 'link') {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      a.setAttribute('role', 'menuitem');
      li.appendChild(a);
    } else if (item.type === 'collapsible') {
      const button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `submenu-${index}`);
      button.setAttribute('aria-label', `Toggle ${item.text} submenu`);
      button.textContent = item.text;
      button.classList.add('submenu-toggle');
      button.id = `submenu-toggle-${index}`;
      button.setAttribute('role', 'menuitem');

      const subUl = document.createElement('ul');
      subUl.classList.add('submenu', 'collapsed');
      subUl.id = `submenu-${index}`;
      subUl.setAttribute('role', 'menu');

      item.subItems.forEach((subItem) => {
        const subLi = document.createElement('li');
        subLi.setAttribute('role', 'none');
        const subA = document.createElement('a');
        subA.href = subItem.href;
        subA.textContent = subItem.text;
        subA.setAttribute('role', 'menuitem');
        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      });

      li.appendChild(button);
      li.appendChild(subUl);
    }

    ul.appendChild(li);
  });

  // Theme switch button
  const themeLi = document.createElement('li');
  themeLi.setAttribute('role', 'none');
  const themeButton = document.createElement('button');
  themeButton.textContent = 'Switch to Dark Theme';
  themeButton.setAttribute('aria-label', 'Switch to dark theme');
  themeButton.classList.add('theme-toggle');
  themeButton.id = 'theme-toggle';
  themeButton.setAttribute('role', 'menuitem');
  themeLi.appendChild(themeButton);
  ul.appendChild(themeLi);

  nav.appendChild(ul);
  header.appendChild(nav);

  // Header text
  const h1 = document.createElement('h1');
  h1.textContent = 'Welcome to toolnova next!';
  header.appendChild(h1);

  const slogan = document.createElement('p');
  slogan.classList.add('site-slogan');
  slogan.textContent = 'Realizing the dreams through the touch of technology';
  header.appendChild(slogan);

  document.body.prepend(header);
}

// Function to render the footer
function renderFooter() {
  const footer = document.createElement('footer');
  footer.setAttribute('role', 'contentinfo');

  // Feedback section
  const feedbackH3 = document.createElement('h3');
  feedbackH3.textContent = 'Leave a Feedback';
  footer.appendChild(feedbackH3);

  const iframe = document.createElement('iframe');
  iframe.src = 'https://toolnovanext.github.io/feedback'; // Fixed typo in URL
  iframe.title = 'Feedback Form';
  footer.appendChild(iframe);

  // Important links section
  const linksH3 = document.createElement('h3');
  linksH3.textContent = 'Important Links';
  footer.appendChild(linksH3);

  const linksUl = document.createElement('ul');
  const footerLinks = [
    {
      text: 'Tool Fusion AI',
      href: 'https://toolnovanext.github.io/ToolFusion-AI/',
    },
    {
      text: 'User Favorite Tools',
      href: 'https://toolnovanext.github.io/User-favourite/',
    },
    {
      text: 'Toolnova Blog',
      href: 'https://toolnovanext.github.io/ToolNova-blog/',
    },
  ];

  footerLinks.forEach((link) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    li.appendChild(a);
    linksUl.appendChild(li);
  });
  footer.appendChild(linksUl);

  // More section
  const moreH3 = document.createElement('h3');
  moreH3.textContent = 'More';
  footer.appendChild(moreH3);

  const thanksP = document.createElement('p');
  thanksP.textContent = 'Thanks for visiting toolnova next. We will continuously add new features.';
  footer.appendChild(thanksP);

  const copyrightP = document.createElement('p');
  copyrightP.textContent = `© ${new Date().getFullYear()} Toolnova Next. All rights reserved.`;
  footer.appendChild(copyrightP);

  document.body.appendChild(footer);
}

// Toggle navigation menu
function toggleNavMenu() {
  const navButton = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('main-nav');
  const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

  navButton.setAttribute('aria-expanded', !isExpanded);
  navButton.textContent = isExpanded ? 'Open Navigation Menu' : 'Close Navigation Menu';
  navMenu.classList.toggle('collapsed', isExpanded);
  navMenu.classList.toggle('expanded', !isExpanded);

  // Ensure submenus are collapsed when main menu is closed
  if (isExpanded) {
    document.querySelectorAll('.submenu-toggle').forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      const submenu = document.getElementById(button.getAttribute('aria-controls'));
      submenu.classList.add('collapsed');
      submenu.classList.remove('expanded');
    });
  }
}

// Toggle submenu
function toggleSubMenu(event) {
  const button = event.currentTarget;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const submenu = document.getElementById(button.getAttribute('aria-controls'));

  button.setAttribute('aria-expanded', !isExpanded);
  submenu.classList.toggle('collapsed', isExpanded);
  submenu.classList.toggle('expanded', !isExpanded);
}

// Toggle theme
function toggleTheme() {
  const themeButton = document.getElementById('theme-toggle');
  const isDark = document.body.classList.contains('dark-theme');

  document.body.classList.toggle('dark-theme');
  themeButton.textContent = isDark ? 'Switch to Dark Theme' : 'Switch to Light Theme';
  themeButton.setAttribute('aria-label', isDark ? 'Switch to dark theme' : 'Switch to light theme');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();

  // Attach event listeners
  document.getElementById('nav-toggle').addEventListener('click', toggleNavMenu);
  document.querySelectorAll('.submenu-toggle').forEach((button) => {
    button.addEventListener('click', toggleSubMenu);
  });
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
});
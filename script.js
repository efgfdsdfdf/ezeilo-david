// keep functions globally accessible in case other pages call them
function login() {
  const usernameEl = document.getElementById('username');
  const username = usernameEl ? usernameEl.value.trim() : '';
  if (!username) {
    alert('Please enter a username');
    return;
  }
  localStorage.setItem('currentUser', username);
  // nice fade-out then redirect
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'gpa.html';
  }, 600);
}

function logout() {
  localStorage.removeItem('currentUser');
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
  // bind login button if present
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.addEventListener('click', login);

  // attach click handler to internal links to animate before navigation
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    try {
      // only internal same-origin links
      if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
          // if link should open in new tab or has data-no-fade skip
          if (link.target === '_blank' || link.dataset.noFade !== undefined) return;
          e.preventDefault();
          document.body.classList.add('fade-out');
          setTimeout(() => { window.location.href = link.href; }, 600);
        });
      }
    } catch (err) {
      // ignore cross-origin links
    }
  });

  // protect pages: if not logged in and not on index.html redirect to login
  const user = localStorage.getItem('currentUser');
  const currentPage = window.location.pathname.split('/').pop();
  if (!user && currentPage && currentPage !== 'index.html') {
    // go to login page
    window.location.href = 'index.html';
  }

  // activate lucide icons if included on page
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (e) { /* ignore */ }
  }
});




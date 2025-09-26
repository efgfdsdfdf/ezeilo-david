// Handle login
function login() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("currentUser", username);
    // Redirect to GPA after login
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "gpa.html";
    }, 600);
  } else {
    alert("Please enter a username");
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
}

// Smooth page transitions
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location = link.href;
        }, 600); // match CSS transition time
      });
    }
  });
});

  });
}, 60000); // check every 1 minute


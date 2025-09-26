// Login
function login() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("currentUser", username);
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
    if (link.hostname === window.location.hostname && link.getAttribute("href") !== "#") {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location = link.href;
        }, 600);
      });
    }
  });

  // Show username
  const user = localStorage.getItem("currentUser");
  if (user && document.getElementById("displayUser")) {
    document.getElementById("displayUser").textContent = user;
  }

  /* -----------------------------
     NOTES Save + Load
  ------------------------------ */
  const notesArea = document.getElementById("notesArea");
  if (notesArea) {
    const savedNotes = localStorage.getItem("userNotes_" + user) || "";
    notesArea.value = savedNotes;

    notesArea.addEventListener("input", () => {
      localStorage.setItem("userNotes_" + user, notesArea.value);
    });
  }

  /* -----------------------------
     TIMETABLE Save + Load
  ------------------------------ */
  const timetable = document.getElementById("timetableTable");
  if (timetable) {
    const savedTable = localStorage.getItem("userTimetable_" + user);
    if (savedTable) {
      timetable.innerHTML = savedTable;
    }

    timetable.addEventListener("input", () => {
      localStorage.setItem("userTimetable_" + user, timetable.innerHTML);
    });
  }

  /* -----------------------------
     GPA Calculator + History
  ------------------------------ */
  const gpaForm = document.getElementById("gpaForm");
  const courseList = document.getElementById("courseList");
  const calcGPAButton = document.getElementById("calcGPA");
  const gpaResult = document.getElementById("gpaResult");
  const gpaHistory = document.getElementById("gpaHistory");

  if (gpaForm && courseList && calcGPAButton && gpaResult) {
    let courses = [];

    gpaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const gradePoint = parseFloat(document.getElementById("gradePoint").value);
      const creditHours = parseInt(document.getElementById("creditHours").value);

      if (!isNaN(gradePoint) && !isNaN(creditHours) && gradePoint >= 0 && creditHours > 0) {
        courses.push({ gradePoint, creditHours });

        const li = document.createElement("li");
        li.textContent = `Grade Point: ${gradePoint}, Credit Hours: ${creditHours}`;
        courseList.appendChild(li);

        gpaForm.reset();
      } else {
        alert("Enter valid values.");
      }
    });

    calcGPAButton.addEventListener("click", () => {
      if (courses.length === 0) {
        alert("Add at least one course.");
        return;
      }

      let totalPoints = 0, totalCredits = 0;
      courses.forEach(course => {
        totalPoints += course.gradePoint * course.creditHours;
        totalCredits += course.creditHours;
      });

      const gpa = (totalPoints / totalCredits).toFixed(2);
      gpaResult.textContent = `Your GPA: ${gpa}`;

      // Save GPA history per user
      let history = JSON.parse(localStorage.getItem("gpaHistory_" + user) || "[]");
      history.push({ gpa, date: new Date().toLocaleString() });
      localStorage.setItem("gpaHistory_" + user, JSON.stringify(history));

      displayHistory(history);

      // Reset for new session
      courses = [];
      courseList.innerHTML = "";
    });

    // Load GPA history on page load
    let history = JSON.parse(localStorage.getItem("gpaHistory_" + user) || "[]");
    displayHistory(history);

    function displayHistory(history) {
      gpaHistory.innerHTML = "";
      history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.gpa} (on ${item.date})`;
        gpaHistory.appendChild(li);
      });
    }
  }
});





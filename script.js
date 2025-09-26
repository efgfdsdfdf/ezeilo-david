// Check authentication
function checkAuth() {
  const user = localStorage.getItem("currentUser");
  if (!user && !window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }
}

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  }
});


// ================= NOTES =================
function loadNotes() {
  const user = localStorage.getItem("currentUser");
  const notes = JSON.parse(localStorage.getItem(user + "_notes")) || [];
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  notes.forEach((note, i) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = note;
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-danger";
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      notes.splice(i, 1);
      localStorage.setItem(user + "_notes", JSON.stringify(notes));
      loadNotes();
    };
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

document.getElementById("noteForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const noteInput = document.getElementById("noteInput").value;
  const user = localStorage.getItem("currentUser");
  const notes = JSON.parse(localStorage.getItem(user + "_notes")) || [];
  notes.push(noteInput);
  localStorage.setItem(user + "_notes", JSON.stringify(notes));
  document.getElementById("noteInput").value = "";
  loadNotes();
});


// ================= GPA =================
function loadGPA() {
  const user = localStorage.getItem("currentUser");
  const gpaData = JSON.parse(localStorage.getItem(user + "_gpa")) || [];
  displayGPA(gpaData);
}

function displayGPA(data) {
  const gpaList = document.getElementById("gpaList");
  const gpaResult = document.getElementById("gpaResult");
  gpaList.innerHTML = "";
  let totalUnits = 0, totalPoints = 0;

  data.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${item.course} - ${item.units} units - Grade: ${item.grade}`;
    gpaList.appendChild(li);
    totalUnits += parseInt(item.units);
    totalPoints += parseInt(item.units) * parseInt(item.grade);
  });

  gpaResult.textContent = totalUnits ? (totalPoints / totalUnits).toFixed(2) : "0.00";
}

document.getElementById("gpaForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const course = document.getElementById("course").value;
  const units = document.getElementById("units").value;
  const grade = document.getElementById("grade").value;
  const user = localStorage.getItem("currentUser");

  const gpaData = JSON.parse(localStorage.getItem(user + "_gpa")) || [];
  gpaData.push({ course, units, grade });
  localStorage.setItem(user + "_gpa", JSON.stringify(gpaData));

  displayGPA(gpaData);
  document.getElementById("gpaForm").reset();
});


// ================= TIMETABLE =================
function loadTimetable() {
  const user = localStorage.getItem("currentUser");
  const timetable = JSON.parse(localStorage.getItem(user + "_timetable")) || [];
  const timetableList = document.getElementById("timetableList");
  timetableList.innerHTML = "";

  timetable.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${entry.day} - ${entry.subject} at ${entry.time}`;
    timetableList.appendChild(li);
  });
}

document.getElementById("timetableForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const day = document.getElementById("day").value;
  const time = document.getElementById("time").value;
  const subject = document.getElementById("subject").value;
  const user = localStorage.getItem("currentUser");

  const timetable = JSON.parse(localStorage.getItem(user + "_timetable")) || [];
  timetable.push({ day, time, subject });
  localStorage.setItem(user + "_timetable", JSON.stringify(timetable));

  loadTimetable();
  document.getElementById("timetableForm").reset();
});
function loadTimetable() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const timetable = JSON.parse(localStorage.getItem(currentUser + "_timetable")) || [];
  const timetableList = document.getElementById("timetableList");
  
  timetableList.innerHTML = ""; // ✅ clear old entries before re-adding

  timetable.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${entry.day} - ${entry.subject} at ${entry.time}`;
    timetableList.appendChild(li);
  });
}
// ✅ Timetable Handling
document.getElementById("timetableForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const subject = document.getElementById("subject").value.trim();
  const day = document.getElementById("day").value.trim();
  const time = document.getElementById("time").value;

  if (subject && day && time) {
    let timetable = JSON.parse(localStorage.getItem(currentUser + "_timetable")) || [];
    timetable.push({ subject, day, time });

    localStorage.setItem(currentUser + "_timetable", JSON.stringify(timetable));

    // Clear inputs
    document.getElementById("timetableForm").reset();

    // Reload timetable list
    loadTimetable();
  }
});

// ✅ Load timetable function
function loadTimetable() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const timetable = JSON.parse(localStorage.getItem(currentUser + "_timetable")) || [];
  const timetableList = document.getElementById("timetableList");

  if (!timetableList) return;
  timetableList.innerHTML = "";

  timetable.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${entry.day} - ${entry.subject} at ${entry.time}`;
    timetableList.appendChild(li);
  });
}

// ✅ Load timetable on page load
if (window.location.pathname.includes("timetable.html")) {
  loadTimetable();
}
// ✅ Ask for notification permission
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// ✅ Check timetable every minute for reminders
setInterval(() => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;

  const timetable = JSON.parse(localStorage.getItem(currentUser + "_timetable")) || [];
  const now = new Date();

  const currentDay = now.toLocaleString("en-US", { weekday: "long" }); // e.g. "Monday"
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  timetable.forEach(entry => {
    if (entry.day.toLowerCase() === currentDay.toLowerCase() && entry.time === currentTime) {
      // 🔔 Trigger browser notification
      if (Notification.permission === "granted") {
        new Notification("⏰ Class Reminder", {
          body: `${entry.subject} starts now!`,
          icon: "icons/icon-192.png"
        });
      }
    }
  });
}, 60000); // check every 1 minute

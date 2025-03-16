// Request notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Tea Times
const teaTimes = [
    { hour: 10, minute: 0 },
    { hour: 15, minute: 0 },
    { hour: 19, minute: 0 }
];

// Function to get the next tea time
function getNextTeaTime() {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    for (let teaTime of teaTimes) {
        let nextTeaTime = new Date();
        nextTeaTime.setHours(teaTime.hour, teaTime.minute, 0);

        if (nextTeaTime > now) {
            return nextTeaTime;
        }
    }

    let nextTeaTime = new Date();
    nextTeaTime.setDate(now.getDate() + 1); // Set to the next day
    nextTeaTime.setHours(teaTimes[0].hour, teaTimes[0].minute, 0); // First tea time of the next day

    return nextTeaTime;
}

// Update countdown
function updateCountdown() {
    const nextTeaTime = getNextTeaTime();
    const now = new Date();
    const timeLeft = nextTeaTime - now;

    if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText = `${hours}h ${minutes}m ${seconds}s`;

        const progress = (timeLeft / (1000 * 60 * 60 * 24)) * 100;
        document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    } else {
        sendTeaNotification();
    }
}

// Send Tea Time Notification
function sendTeaNotification() {
    if (Notification.permission === "granted") {
        new Notification("Tea Time Alarm", {
            body: "It's time for tea! Failure to comply may result in fines.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tea_cup_icon.svg"
        });
    }
}

// Live tea counter
function updateTeaCounter() {
    const count = Math.floor(Math.random() * 1000000) + 500000;
    document.getElementById("teaCounter").innerText = count.toLocaleString();
}

// Tea History
function updateTeaHistory() {
    const history = [
        { time: "10:00 AM", participated: true },
        { time: "3:00 PM", participated: false },
        { time: "7:00 PM", participated: true },
    ];

    const historyList = document.getElementById("teaHistory");
    history.forEach(tea => {
        const listItem = document.createElement("li");
        listItem.textContent = `Tea Time at ${tea.time}: ${tea.participated ? "Participated" : "Missed"}`;
        historyList.appendChild(listItem);
    });
}

// Accept the tea pledge
function acceptPledge() {
    document.getElementById("pledgeResponse").innerText = "You are now officially a Tea Time participant.";
}

// Send Contact Form
function sendContactForm(event) {
    event.preventDefault(); // Prevent page refresh
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (email && message) {
        document.getElementById("contactResponse").innerText = "Your message has been sent. Thank you!";
    } else {
        document.getElementById("contactResponse").innerText = "Please fill in all fields.";
    }
}

// Staff Login Function
function staffLogin() {
    const password = document.getElementById("staffPassword").value;
    if (password === "admin123") { // Replace with a more secure password system if needed
        document.getElementById("staffPanel").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

// Send Test Notification (For Staff)
function sendTestNotification() {
    if (Notification.permission === "granted") {
        new Notification("Tea Time Alarm - Test", {
            body: "This is a test notification for Tea Time.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tea_cup_icon.svg"
        });
    } else {
        alert("Notifications are not enabled.");
    }
}

// Initialize
updateCountdown();
setInterval(updateCountdown, 1000);
updateTeaCounter();
updateTeaHistory();

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
    nextTeaTime.setDate(now.getDate() + 1);
    nextTeaTime.setHours(teaTimes[0].hour, teaTimes[0].minute, 0);

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

// Accept the tea pledge
function acceptPledge() {
    document.getElementById("pledgeResponse").innerText = "You are now officially a Tea Time participant.";
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

// Run updates
setInterval(updateCountdown, 1000);
setInterval(updateTeaCounter, 5000);

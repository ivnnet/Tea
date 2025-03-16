// Tea time countdown logic
function getNextTeaTime() {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);

    const teaTimes = [
        { hour: 10, minute: 0 },
        { hour: 15, minute: 0 },
        { hour: 19, minute: 0 }
    ];

    let upcomingTimes = [];
    for (let teaTime of teaTimes) {
        let nextTeaTime = new Date();
        nextTeaTime.setHours(teaTime.hour, teaTime.minute, 0);

        if (nextTeaTime > now) {
            upcomingTimes.push(nextTeaTime);
        }
    }

    if (upcomingTimes.length === 0) {
        let nextTeaTime = new Date();
        nextTeaTime.setDate(now.getDate() + 1);
        nextTeaTime.setHours(teaTimes[0].hour, teaTimes[0].minute, 0);
        upcomingTimes.push(nextTeaTime);
    }

    return upcomingTimes[0];
}

function updateCountdown() {
    const nextTeaTime = getNextTeaTime();
    const now = new Date();
    const timeLeft = nextTeaTime - now;

    if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText = `${hours}h ${minutes}m ${seconds}s`;

        const totalTeaTime = new Date(nextTeaTime - now);
        const percentage = (timeLeft / totalTeaTime) * 100;
        document.getElementById("progress").style.width = `${percentage}%`;
    } else {
        document.getElementById("countdown").innerText = "Tea Time Now!";
        document.getElementById("progress").style.width = "100%";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Tea Time Pledge
function acceptPledge() {
    document.getElementById("pledgeResponse").innerText = "You are now officially a Tea Time participant.";
}

// Staff Login Function
function staffLogin() {
    const password = document.getElementById("staffPassword").value;
    if (password === "admin123") {
        document.getElementById("staffSection").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

// Request Notification Permission
function requestNotificationPermission() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("You can now receive notifications.");
            }
        });
    }
}

// Send Test Notification
function sendTestNotification() {
    if (Notification.permission === "granted") {
        new Notification("Tea Time Alarm - Test", {
            body: "This is a test notification for Tea Time.",
            icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tea_cup_icon.svg"
        });
    } else {
        requestNotificationPermission();
    }
}

// Request notification permission
if (Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
        } else {
            console.log("Notification permission denied.");
        }
    });
}

// Countdown Functionality
function countdown() {
    const targetTimes = [
        { time: '10:00 AM', hour: 10, minute: 0 },
        { time: '3:00 PM', hour: 15, minute: 0 },
        { time: '7:00 PM', hour: 19, minute: 0 }
    ];

    function getNextTeaTime() {
        const now = new Date();
        const ukTimeOffset = 0; // UK time (GMT/BST)
        now.setHours(now.getHours() + ukTimeOffset);
        
        let nextTeaTime = null;

        for (const { time, hour, minute } of targetTimes) {
            const teaTime = new Date();
            teaTime.setHours(hour);
            teaTime.setMinutes(minute);
            teaTime.setSeconds(0);
            teaTime.setMilliseconds(0);
            
            // If tea time is in the future and we haven't found the next one, update nextTeaTime
            if (teaTime > now && (nextTeaTime === null || teaTime < nextTeaTime)) {
                nextTeaTime = teaTime;
            }
        }
        return nextTeaTime;
    }

    const nextTeaTime = getNextTeaTime();
    const timeLeft = nextTeaTime - new Date();

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerText = `Time left until next Tea Time: ${hours}h ${minutes}m ${seconds}s`;

    // Check if the time has arrived for a tea time
    if (timeLeft <= 0) {
        sendNotification(nextTeaTime);
    }
}

// Function to send notification
function sendNotification(nextTeaTime) {
    const notificationTitle = "Tea Time Alarm";
    const notificationBody = `It's time for tea! The next scheduled tea time is at ${nextTeaTime.toLocaleTimeString()}. Enjoy your break!`;
    
    if (Notification.permission === "granted") {
        new Notification(notificationTitle, {
            body: notificationBody,
            icon: "/path-to-tea-icon.png" // Replace with your own icon path
        });
    }
}

setInterval(countdown, 1000);

// Toggle visibility of hidden content
function toggleVisibility(id) {
    const element = document.getElementById(id);
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

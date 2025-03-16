// Countdown and Progress Bar
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

    return upcomingTimes;
}

// Update countdown and progress bar
function updateCountdown() {
    const nextTeaTime = getNextTeaTime()[0];  // Get the first upcoming tea time
    const now = new Date();
    const timeLeft = nextTeaTime - now;

    if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerText = `${hours}h ${minutes}m ${seconds}s`;

        // Update Progress Bar
        const totalTeaTime = new Date(nextTeaTime - now);
        const percentage = (timeLeft / totalTeaTime) * 100;
        document.getElementById("progress").style.width = `${percentage}%`;

        // Update upcoming tea times list
        updateTeaTimesList();

        // Play Alarm when close to tea time
        if (timeLeft < 60000) { // 1 minute before tea time
            playAlarm();
        }
    } else {
        sendTeaNotification();
    }
}

// Function to update the upcoming tea times list
function updateTeaTimesList() {
    const upcomingTimes = getNextTeaTime();
    const teaTimesList = document.getElementById('teaTimesList');
    teaTimesList.innerHTML = '';  // Clear the current list

    upcomingTimes.forEach(teaTime => {
        const teaTimeItem = document.createElement('li');
        teaTimeItem.textContent = `Tea Time: ${teaTime.getHours()}:${teaTime.getMinutes() < 10 ? '0' : ''}${teaTime.getMinutes()}`;
        teaTimesList.appendChild(teaTimeItem);
    });
}

// Tea Facts Section
const teaFacts = [
    "Tea was introduced to Britain in the 17th century and became an integral part of British culture.",
    "The average British person drinks 2.5 cups of tea a day.",
    "Drinking tea can improve your mood and increase mental alertness.",
    "Black tea is the most commonly consumed tea in the UK, followed by green tea."
];

// Display a random tea fact
function displayRandomTeaFact() {
    const randomFact = teaFacts[Math.floor(Math.random() * teaFacts.length)];
    document.getElementById('teaFact').innerText = randomFact;
}

// Tea Notification System
function sendTeaNotification() {
    if (Notification.permission === "granted") {
        new Notification("Tea Time is now!", {
            body: "It's time for tea! Please prepare your cup.",
            icon: "tea-icon.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                new Notification("Tea Time is now!", {
                    body: "It's time for tea! Please prepare your cup.",
                    icon: "tea-icon.png"
                });
            }
        });
    }
}

// Request notification permission on page load
if (Notification.permission !== "denied") {
    Notification.requestPermission();
}

// Trigger test notification for staff
function sendTestNotification() {
    new Notification("Test Notification", {
        body: "This is a test notification to confirm the system is working.",
        icon: "test-icon.png"
    });
}

// Staff login functionality
function staffLogin() {
    const password = document.getElementById('staffPassword').value;
    if (password === 'staffpassword') {
        document.getElementById('staffPanel').classList.remove('hidden-text');
        alert("Welcome to the staff panel!");
    } else {
        alert("Incorrect password.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayRandomTeaFact();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

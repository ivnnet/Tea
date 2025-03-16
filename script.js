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

// Update countdown and progress bar
function updateCountdown() {
    const nextTeaTime = getNextTeaTime();
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
    } else {
        sendTeaNotification();
    }
}

// Live tea counter
let teaCounter = 0;
function updateTeaCounter() {
    teaCounter++;
    document.getElementById("teaCounter").innerText = `Tea is being brewed... Total cups brewed: ${teaCounter}`;
}

// Pledge to Drink Tea
document.getElementById("pledgeButton").addEventListener("click", function () {
    document.getElementById("pledgeResponse").classList.remove("hidden-text");
    document.getElementById("pledgeResponse").innerText = "Thank you for pledging to drink tea!";
});

// FAQ Toggle
function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    answer.style.display = answer.style.display === "none" ? "block" : "none";
}

// Contact Form Submission Response
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("contactResponse").innerText = "Your message has been sent successfully!";
});

// Staff Login
function staffLogin() {
    const password = document.getElementById("staffPassword").value;
    if (password === "admin123") {
        document.getElementById("staffPanel").classList.remove("hidden-text");
        alert("Staff Login Successful");
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Send Test Notification (for staff only)
function sendTestNotification() {
    alert("Test notification sent to all users with notifications enabled.");
}

// Initialize countdown update every second
setInterval(updateCountdown, 1000);
setInterval(updateTeaCounter, 3000);  // Update every 3 seconds for live counter

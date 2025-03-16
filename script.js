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

// Live tea counter
let teaCounter = 0;
function updateTeaCounter() {
    teaCounter++;
    document.getElementById("teaCounter").innerText = `Tea is being brewed... Total cups brewed: ${teaCounter}`;
}

// Tea Time Facts (Display a random fact each time the page loads)
const teaFacts = [
    "Tea is the second most consumed beverage in the world, after water.",
    "The UK drinks 165 million cups of tea per day!",
    "The earliest evidence of tea drinking dates back to 2737 BC in China.",
    "In Britain, the average person drinks about 3 cups of tea per day.",
    "Black tea is the most popular type of tea in the UK."
];

function displayRandomTeaFact() {
    const fact = teaFacts[Math.floor(Math.random() * teaFacts.length)];
    document.getElementById("teaFact").innerText = fact;
}

//

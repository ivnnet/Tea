function updateCountdown() {
    const teaTimes = ["10:00", "15:00", "19:00"];
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    let nextTeaTime = null;

    for (let time of teaTimes) {
        let [hours, minutes] = time.split(":").map(Number);
        if (hours > currentHours || (hours === currentHours && minutes > currentMinutes)) {
            nextTeaTime = new Date();
            nextTeaTime.setHours(hours, minutes, 0, 0);
            break;
        }
    }

    if (!nextTeaTime) {
        nextTeaTime = new Date();
        nextTeaTime.setDate(nextTeaTime.getDate() + 1);
        nextTeaTime.setHours(10, 0, 0, 0);
    }

    const timeDiff = nextTeaTime - now;
    document.getElementById("countdown").innerText = new Date(timeDiff).toISOString().substr(11, 8);
}

setInterval(updateCountdown, 1000);
updateCountdown();

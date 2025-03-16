// Handle the form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("contactResponse");
    const button = document.querySelector("button[type='submit']");
    
    // Basic validation
    if (email === "" || message === "") {
        responseMessage.innerText = "Please fill in all fields.";
        responseMessage.style.color = "red";
        return;
    }
    
    // Show loading spinner
    button.innerHTML = "Sending...";
    button.disabled = true; // Disable the button to prevent multiple submissions

    // Create FormData object
    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", message);

    // Use Fetch API to send the form data to Formspree
    fetch("https://formspree.io/f/mldjdnay", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            responseMessage.innerText = "Your message has been sent successfully!";
            responseMessage.style.color = "green";
            document.getElementById("contactForm").reset(); // Reset form fields
        } else {
            responseMessage.innerText = "There was an error sending your message. Please try again.";
            responseMessage.style.color = "red";
        }
    })
    .catch(error => {
        responseMessage.innerText = "Error: Unable to send message. Please try again later.";
        responseMessage.style.color = "red";
    })
    .finally(() => {
        button.innerHTML = "Send Message"; // Reset the button text
        button.disabled = false; // Re-enable the button
    });
});

// Countdown Timer & Progress Bar
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
function

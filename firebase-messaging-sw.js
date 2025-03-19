self.addEventListener("push", function (event) {
    const options = {
        body: "It's Tea Time! Grab your tea now!",
        icon: "tea-icon.png",
    };
    event.waitUntil(self.registration.showNotification("Tea Time Alarm", options));
});

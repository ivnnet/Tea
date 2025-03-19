function showAlert() {
  alert("You have successfully registered to the Tea Time alarm from the UK Government");
}

// Request Notification Permission
function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      alert('Please enable notifications to receive Tea Time reminders.');
    }
  });
}

// Schedule Notifications for Tea Times
function scheduleTeaTimeNotifications() {
  const teaTimes = [10, 15, 19];
  const now = new Date();

  teaTimes.forEach((hour) => {
    const teaTime = new Date();
    teaTime.setHours(hour, 0, 0, 0);

    if (teaTime <= now) {
      teaTime.setDate(teaTime.getDate() + 1); // Schedule for next day
    }

    const timeUntilTeaTime = teaTime.getTime() - now.getTime();

    setTimeout(() => {
      new Notification('Tea Time Reminder', {
        body: 'It is time for your tea! Head to the kitchen now!',
      });
    }, timeUntilTeaTime);
  });
}

// Initialize Notifications on Page Load
if (Notification.permission !== 'granted') {
  requestNotificationPermission();
}
scheduleTeaTimeNotifications();

// Staff Login and Test Notification
document.getElementById('loginButton').onclick = function () {
  const password = document.getElementById('staffPassword').value;
  if (password === 'TeaTime123') { // Example password
    document.getElementById('sendNotificationSection').style.display = 'block';
    alert('Login successful. You can now send a test notification.');
  } else {
    alert('Incorrect password. Please try again.');
  }
};

document.getElementById('testNotificationButton').onclick = function () {
  if (Notification.permission === 'granted') {
    new Notification('Test Notification', {
      body: 'This is a test notification from the Tea Time Alarm system.',
    });
  } else {
    alert('Please enable notifications to receive test notifications.');
  }
};

importScripts("https://www.gstatic.com/firebasejs/6.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.0.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "99989017353",
  appId: "1:99989017353:web:cc519002d9097f3c67f9d8"
});

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = "Background Message Title";
  var notificationOptions = {
    body: "Background Message body.",
    icon: "/noti-icon.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

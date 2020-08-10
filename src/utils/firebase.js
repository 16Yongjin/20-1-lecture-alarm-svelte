import { firebase } from "@firebase/app";
import "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD4tn_AXY6q-RfIqhD26HAxnsnTy5xlQo4",
  projectId: "lecturealer",
  messagingSenderId: "99989017353",
  appId: "1:99989017353:web:cc519002d9097f3c67f9d8",
};

firebase.initializeApp(firebaseConfig);

if (!firebase.messaging.isSupported()) {
  alert("알람을 사용할 수 없습니다.\n지원되지 않는 브라우저입니다.");
}

const messaging = firebase.messaging();

const setup = async () => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log(token);
  } catch (e) {
    console.log(e);
    alert("알람을 사용할 수 없습니다. 알람을 허용하고 새로고침 해주세요.");
  }
};

setup();

export { messaging };

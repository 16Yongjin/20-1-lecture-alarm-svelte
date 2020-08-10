<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { myAlarms } from "../stores";
  import Navbar from "../components/Navbar.svelte";
  import AlarmCard from "../components/AlarmCard.svelte";
  import serverApi from "../utils/ServerApi";
  import { messaging } from "../utils/firebase";
  import AddAlarmBySearch from "./AddAlarmBySearch.svelte";
  import AddAlarmByList from "./AddAlarmByList.svelte";
  import AddAlarmCard from "./AddAlarmCard.svelte";
  import MyAlarms from "./MyAlarms.svelte";
  import { loadMyAlarms } from "../api/alarm";

  const { addNotification } = getNotificationsContext();

  const notifyDelete = () => {
    addNotification({
      text: "알람이 삭제됐습니다.",
      theme: "is-success",
      position: "bottom-right",
      removeAfter: 3000,
    });
  };

  const notifyAlarm2 = () => {
    addNotification({
      text: "hi",
      position: "top-center",
      theme: "is-warning",
      removeAfter: 15000,
    });
  };

  const notifyAlarm = (notification) => {
    addNotification({
      text: notification.title,
      position: "top-center",
      theme: "is-warning",
      removeAfter: 15000,
    });
  };

  messaging.onMessage((payload) => {
    console.log(payload);
    notifyAlarm(payload.notification);
    loadMyAlarms();
    alarmCard.reloadLectures();

    document.getElementById("noti-sound").play();
  });

  onMount(loadMyAlarms);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") loadMyAlarms();
  });

  const onAlarmDelete = async (e) => {
    const lectureId = e.detail.id;
    const token = await messaging.getToken();
    const alarms = await serverApi.deleteAlarm(token, lectureId);
    myAlarms.set(alarms);
    notifyDelete();
  };

  const onLectureSelected = () => {};

  let alarmCard;
</script>

<style>
  .container-offset {
    padding-top: 52px;
    margin: 0;
    padding: 68px 32px 0 32px;
  }
</style>

<Navbar />

<div class="container is-fluid container-offset">
  <div class="columns">
    <MyAlarms {onAlarmDelete} />
    <AddAlarmCard bind:this={alarmCard} />
  </div>
</div>

<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { myAlarms } from "../stores";
  import Navbar from "../components/Navbar.svelte";
  import AlarmCard from "../components/AlarmCard.svelte";
  import AddAlarmModal from "./AddAlarmModal.svelte";
  import serverApi from "../utils/ServerApi";
  import { messaging } from "../utils/firebase";

  const { addNotification } = getNotificationsContext();

  $: disableAdd = $myAlarms.length >= 5;

  const loadMyAlarms = async () => {
    const token = await messaging.getToken();
    const alarms = await serverApi.myAlarms(token);
    myAlarms.set(alarms);
  };

  const notifyDelete = () => {
    addNotification({
      text: "알람이 삭제됐습니다.",
      theme: "is-success",
      position: "bottom-right",
      removeAfter: 3000
    });
  };

  const notifyAlarm2 = () => {
    addNotification({
      text: "hi",
      position: "top-center",
      theme: "is-warning",
      removeAfter: 15000
    });
  };

  const notifyAlarm = notification => {
    addNotification({
      text: notification.title,
      position: "top-center",
      theme: "is-warning",
      removeAfter: 15000
    });
  };

  messaging.onMessage(payload => {
    console.log(payload);
    notifyAlarm(payload.notification);
    loadMyAlarms();

    document.getElementById("noti-sound").play();
  });

  onMount(async () => {
    await loadMyAlarms();
    if ($myAlarms.length === 0) {
      activateAddModal();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") loadMyAlarms();
  });

  let activeModal = false;

  const activateAddModal = () => {
    activeModal = true;
  };

  const closeModal = () => {
    activeModal = false;
  };

  const onAlarmDelete = async e => {
    const lectureId = e.detail.id;
    const token = await messaging.getToken();
    const alarms = await serverApi.deleteAlarm(token, lectureId);
    myAlarms.set(alarms);
    notifyDelete();
  };
</script>

<style>
  .container-offset {
    padding-top: 52px;
    margin: 16px;
  }
</style>

<Navbar onClickAdd={activateAddModal} {disableAdd} />

<div class="container is-fluid container-offset">
  <div class="title is-4">내가 등록한 알람 {$myAlarms.length} / 5개</div>
  <div class="columns is-tablet is-multiline">
    {#each $myAlarms as alarm}
      <AlarmCard {alarm} on:delete={onAlarmDelete} />
    {/each}
  </div>
  <AddAlarmModal active={activeModal} on:close={closeModal} />
</div>

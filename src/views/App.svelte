<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { myAlarms } from "../stores";
  import Navbar from "../components/Navbar.svelte";
  import AlarmCard from "../components/AlarmCard.svelte";
  import serverApi from "../utils/ServerApi";
  import { messaging } from "../utils/firebase";
  import { onVisibile } from "../utils";
  import AddAlarmBySearch from "./AddAlarmBySearch.svelte";
  import AddAlarmByList from "./AddAlarmByList.svelte";
  import AddAlarmCard from "./AddAlarmCard.svelte";
  import MyAlarms from "./MyAlarms.svelte";
  import { loadMyAlarms } from "../api/alarm";

  messaging.onMessage((payload) => {
    console.log(payload);
    notifyAlarm(payload.notification);
    loadMyAlarms();

    document.getElementById("noti-sound").play();
  });

  onMount(loadMyAlarms);

  onVisibile(loadMyAlarms);

  let width;
  let showOnMobile = false;

  const openModal = () => (showOnMobile = true);
  const closeModal = () => (showOnMobile = false);

  $: width > 768 && closeModal();
</script>

<style>
  .container-offset {
    padding-top: 68px;
    margin-bottom: -16px;
  }
</style>

<Navbar on:openModal={openModal} />

<div class="container is-fluid container-offset" bind:clientWidth={width}>
  <div class="columns">
    <MyAlarms />
    <AddAlarmCard {showOnMobile} on:close={closeModal} />
  </div>
</div>

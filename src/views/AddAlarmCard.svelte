<script>
  import { createEventDispatcher } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { myAlarms } from "../stores";
  import serverApi from "../utils/ServerApi";
  import { messaging } from "../utils/firebase";
  import AddAlarmByList from "./AddAlarmByList.svelte";
  import AddAlarmBySearch from "./AddAlarmBySearch.svelte";
  import Icon from "fa-svelte";
  import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
  import { faList } from "@fortawesome/free-solid-svg-icons/faList";
  import { setReloadLectures } from "../api/alarm";

  let search = false;

  let component;

  setReloadLectures(() => component.reloadLectures());

  const switchAddMethod = () => (search = !search);
</script>

<style>
  .full-height {
    height: calc(100vh - 84px);
  }

  .box {
    padding: 0;
  }
</style>

<div class="column rel w100">
  <div class="box animated fadeInUp full-height">
    <header class="modal-card-head">
      <p class="modal-card-title">알람 추가하기</p>
      <button class="button" on:click={switchAddMethod}>
        <Icon icon={search ? faList : faSearch} />

        <span class="ml-1">강의 {search ? '리스트' : '검색'}</span>
      </button>
    </header>

    <svelte:component
      this={search ? AddAlarmBySearch : AddAlarmByList}
      bind:this={component} />
  </div>
</div>

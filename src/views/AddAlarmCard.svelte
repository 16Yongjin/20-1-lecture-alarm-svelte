<script>
  import { createEventDispatcher } from "svelte";
  import AddAlarmByList from "./AddAlarmByList.svelte";
  import AddAlarmBySearch from "./AddAlarmBySearch.svelte";
  import Icon from "fa-svelte";
  import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
  import { faList } from "@fortawesome/free-solid-svg-icons/faList";
  import { setReloadLectures } from "../api/alarm";

  export let showOnMobile;

  let search = false;

  let component;

  setReloadLectures(() => component.reloadLectures());

  const switchAddMethod = () => (search = !search);
  const dispatch = createEventDispatcher();
  const closeModal = (e) => e.target === e.currentTarget && dispatch("close");
</script>

<style>
  .full-height {
    height: calc(100vh - 84px);
  }

  .box {
    margin: 12px;
    padding: 0px;
    min-width: 400px;
    max-width: 600px;
  }

  .modal-background {
    padding: 32px;
  }

  @media screen and (max-width: 768px), print {
    .box {
      min-width: none;
      max-width: none;
      margin: 0;
    }
  }
  @media screen and (max-width: 456px), print {
    .modal-background {
      padding: 32px 0;
    }
  }
</style>

<div class={`${showOnMobile ? 'modal is-active' : ''}`}>
  <div
    class={`${!showOnMobile ? 'is-hidden-mobile' : 'modal-background'}`}
    on:click={closeModal}>
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

      <footer class="modal-card-foot is-hidden-tablet">
        <button class="card-footer-item button" on:click={closeModal}>
          닫기
        </button>
      </footer>

    </div>
  </div>
</div>

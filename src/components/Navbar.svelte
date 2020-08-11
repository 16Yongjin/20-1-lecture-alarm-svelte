<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "fa-svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

  const dispatch = createEventDispatcher();

  const emitOpenModal = () => {
    dispatch("openModal");
  };
</script>

<style>
  .bottom-shadow {
    box-shadow: 0 2px 5px grey;
  }

  .navbar {
    height: 52px;
  }
</style>

<nav class="navbar level is-mobile is-fixed-top bottom-shadow">

  <div class="level-left navbar-item">
    <a class="level-item " href="/">
      <img
        src="noti-icon.png"
        alt="강의 빈자리 알람 아이콘"
        width="28"
        height="28" />
    </a>
    <p class="level-item title is-4">강의 빈자리 알람</p>
  </div>

  <div class="level-right navbar-item is-hidden-tablet">
    <p class="level-item">
      <button class="button" on:click={emitOpenModal}>
        <span class="icon is-large">
          <Icon icon={faPlus} />
        </span>
      </button>
    </p>
  </div>
</nav>

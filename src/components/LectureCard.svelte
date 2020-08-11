<script>
  import Icon from "fa-svelte";
  import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { addAlarm, deleteAlarm } from "../api/alarm";

  export let lecture;

  const onAlarmAdd = () => addAlarm(lecture.id);
  const onAlarmDelete = () => deleteAlarm(lecture.id);
</script>

<style>
  .box {
    margin-bottom: 0.8rem !important;
  }
</style>

<div class="box">
  <div class="media">
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{lecture.name}</strong>
          <br />
          <small>{lecture.professor} / {lecture.time}</small>
        </p>
      </div>
    </div>
    <div class="media-right">
      {#if lecture.registered}
        <button class="button is-rounded is-white" on:click={onAlarmDelete}>
          <span class="icon is-large has-text-danger">
            <Icon class="medium-icon" icon={faTrash} />
          </span>
        </button>
      {:else}
        <button class="button is-rounded is-white" on:click={onAlarmAdd}>
          <span class="icon is-large has-text-success">
            <Icon class="medium-icon" icon={faPlus} />
          </span>
        </button>
      {/if}

    </div>
  </div>
</div>

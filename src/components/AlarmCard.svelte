<script>
  import { createEventDispatcher } from "svelte";
  import Icon from "fa-svelte";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { deleteAlarm } from "../api/alarm";

  export let alarm;

  const dispatch = createEventDispatcher();
  const onAlarmDelete = () => deleteAlarm(alarm.id);
</script>

<style>
  @media screen and (max-width: 1023px), print {
    .is-fullwidth-tablet {
      width: 100% !important;
    }
  }
</style>

<div class="column is-6 is-fullwidth-tablet">
  <div class="box h100">
    <div class="media">
      <div class="media-content">
        <div class="content">
          <p class="title is-4">{alarm.name}</p>
          <p>{alarm.professor} / {alarm.time}</p>
        </div>

      </div>
      <div class="media-right">
        <button class="button is-rounded is-white" on:click={onAlarmDelete}>
          <span class="icon is-medium has-text-danger">
            <Icon class="medium-icon" icon={faTrash} />
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

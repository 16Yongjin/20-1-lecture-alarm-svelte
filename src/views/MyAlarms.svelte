<script>
  import { myAlarms } from "../stores";
  import AlarmCard from "../components/AlarmCard.svelte";

  export let onAlarmDelete;
</script>

<style>
  .full-height {
    height: calc(100vh - 84px);
  }
</style>

<div class="column">
  <div class="full-height">
    <div class="title is-4">내가 등록한 알람 {$myAlarms.length}개</div>
    <div class="columns is-desktop is-multiline">
      {#each $myAlarms as alarm}
        <AlarmCard {alarm} on:delete={onAlarmDelete} />
      {/each}
    </div>
  </div>
</div>

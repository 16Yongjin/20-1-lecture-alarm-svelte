<script>
  import LectureCard from "../components/LectureCard.svelte";
  import serverApi from "../utils/ServerApi";

  let lectures = [];

  let query = "";
  let timer;

  const debounceQuery = () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (!query) return;
      lectures = await serverApi.searchLectures(query);
    }, 300);
  };

  export const reloadLectures = () => debounceQuery();
</script>

<section class="modal-card-body">

  <div class="field">
    <div class="control">
      <input
        bind:value={query}
        on:keyup={debounceQuery}
        class="input is-primary is-medium is-flex"
        type="text"
        placeholder="강의명이나 교수명을 입력하세요." />
    </div>
  </div>

  {#if !lectures.length}
    <p class="has-text-centered subtitle">검색된 강의가 없습니다.</p>
  {/if}

  {#each lectures as lecture}
    <LectureCard {lecture} {reloadLectures} />
  {/each}

</section>

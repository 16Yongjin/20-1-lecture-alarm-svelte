<script>
  import LectureCard from "../components/LectureCard.svelte";
  import courseMap from "../data/courses.js";
  import serverApi from "../utils/ServerApi";

  let campusSelect = "서울";
  let courseSelect = "전공";
  let department = "ATMB3_H1";
  let lectures = [];

  const loadLectures = async () => {
    console.log("reloadLectures");
    lectures = await serverApi.findLectures(department);
  };

  const setDepartment = () => {
    department = courses[0][1];
  };

  $: courseMapSelect = campusSelect + courseSelect;
  $: courses = courseMap[courseMapSelect];
  $: courseMapSelect, setDepartment();
  $: department, loadLectures();

  export const reloadLectures = () => loadLectures();
</script>

<style>
  .full-height {
    height: calc(100vh - 167px);
  }
</style>

<section class="modal-card-body full-height">
  <div class="level is-mobile">
    <div class="level-right">
      <div class="level-item">
        <p class="subtitle is-6">캠퍼스:</p>
      </div>
      <div class="level-item">
        <div class="field">
          <span class="control">
            <span
              class="button is-rounded"
              class:is-primary={campusSelect === '서울'}
              on:click={() => (campusSelect = '서울')}>
              <p>서울</p>
            </span>
          </span>
          <span class="control">
            <span
              class="button is-rounded"
              class:is-primary={campusSelect === '글로벌'}
              on:click={() => (campusSelect = '글로벌')}>
              <p>글로벌</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-6">과정:</p>
      </div>
      <div class="level-item">
        <div class="field">
          <span class="control">
            <span
              class="button is-rounded"
              class:is-primary={courseSelect === '전공'}
              on:click={() => (courseSelect = '전공')}>
              <p>전공</p>
            </span>
          </span>
          <span class="control">
            <span
              class="button is-rounded"
              class:is-primary={courseSelect === '교양'}
              on:click={() => (courseSelect = '교양')}>
              <p>교양</p>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="level">
    <div class="level-item">
      <div class="select is-rounded" style="width: 100%;">
        <select bind:value={department} style="width: 100%;">
          {#each courses as course}
            <option value={course[1]}>{course[0]}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  {#each lectures as lecture}
    <LectureCard {lecture} {reloadLectures} />
  {/each}

</section>

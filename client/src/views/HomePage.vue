<script>
import { useDramaStore } from "../stores/drama";
import { mapState, mapWritableState, mapActions } from "pinia";
export default {
  data() {
    return {
      dramas: [],
      totalPage: "",
      pagination: [],
    };
  },
  computed: {
    ...mapWritableState(useDramaStore, ["page", "name"]),
  },
  methods: {
    ...mapActions(useDramaStore, ["axiosGetDramas"]),
    getDramas: async function () {
      try {
        this.pagination = [];
        console.log(this.name);
        const response = await this.axiosGetDramas();
        this.dramas = response.data.data;
        this.totalPage = response.data.totalPage;
        for (let i = 1; i <= +this.totalPage; i++) {
          this.pagination.push({ index: i });
        }
        this.page = 1;
        this.name = "";
      } catch (err) {
        console.log(err.response);
      }
    },
    changePage: function (val) {
      this.page = val;
      this.getDramas();
    },
    seeDetail(id) {
      this.$router.push(`/drama/${id}`);
    },
  },
  created() {
    this.getDramas();
  },
};
</script>

<template>
  <h1>Drama List</h1>

  <div class="row justify-content-start">
    <div
      @click.prevent="seeDetail(drama.id)"
      v-for="drama in dramas"
      class="card col-4 mx-auto my-2"
    >
      <section class="movie_image">
        <img class="movie_poster" :src="drama.imageUrl" />
      </section>

      <section class="center">
        <div class="about_movie">
          <h5 class="movie-year">{{ drama.releasedYear }}</h5>
          <h3 class="movie-title">{{ drama.title }}</h3>
        </div>
      </section>
      <section class="bottom">
        <h6 class="totalWatchH6">
          <i class="fa-solid fa-heart"> {{ drama.totalWatchlist }}</i>
        </h6>
      </section>
    </div>
  </div>
  <nav aria-label="Page navigation example" class="my-4">
    <ul class="pagination pagination-lg justify-content-center">
      <li v-for="page in pagination" class="page-item">
        <a @click.prevent="changePage(page.index)" class="page-link" href="#">{{
          page.index
        }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* img {
  width: 285px;
  height: 285px;
  object-fit: cover;
}

.card {
  text-align: center;
}



.input-group {
  width: 50%;
} */

html {
  box-sizing: border-box;
  background: linear-gradient(to right, #232526, #414345);
}

h1 {
  text-align: center;
  margin-top: 3%;
  margin-bottom: 3%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

body,
html {
  width: 100%;
  height: 100%;
}

body {
  font-family: "Varela Round", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  line-height: 1.3;
}

.search-bar {
  margin-left: 40%;
}
.search-bar button {
  margin-left: 1%;
}

.card {
  max-width: 275px;
  height: 480px;
  background: whitesmoke;
  border: 2px solid #1e1e1e;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 5px 8px;
  margin: 0 10px;
  transition: all 0.2s;
}
.card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.85);
  transform: translateY(-4px);
}
.card .movie_image {
  height: 320px;
  min-width: 200px;
  position: relative;
  z-index: 99;
  overflow: hidden;
  box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.4);
  margin-bottom: 0.5rem;
}
.card .movie_image .movie_poster {
  min-width: 100%;
  height: inherit;
}

section.center {
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 5px 10px;
}
section.bottom {
  /* display: flex;
  /* align-items: center; */
  /* vertical-align: bottom;
  padding: 5px 0px; */
  margin-left: 8%;
  letter-spacing: 10px;
}
.center .about_movie {
  flex-basis: 100%;
  padding: 0 10px;
  position: relative;
  z-index: 99;
  align-items: center;
}

.center h5,
.center h3 {
  font-family: monospace;
  font-weight: bold;
  color: #1e1e1e;
  font-size: 1rem;
  margin: 5px 0;
}
.center .movie-title {
  font-family: Verdana;
}
.watch {
  position: relative;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: none;
  padding: 5px 10px;
  outline: none;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
  font-weight: 500;
}
.watch:hover {
  background: rgba(0, 0, 0, 0.85);
}
.watch svg {
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
  position: relative;
  top: 1.5px;
  fill: #fff;
}
</style>

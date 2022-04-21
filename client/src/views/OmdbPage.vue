<script>
import { mapActions, mapWritableState } from "pinia";
import { useDramaStore } from "../stores/drama";
export default {
  data() {
    return {
      foundDrama: {},
      omdbData: {
        keyword: "",
      },
    };
  },
  methods: {
    ...mapActions(useDramaStore, ["axiosGetOmdb"]),
    getOmdb: async function () {
      try {
        const response = await this.axiosGetOmdb(this.omdbData);
        this.foundDrama = response.data;
        console.log(this.foundDrama);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="input-group w-50 my-5">
    <input
      type="search"
      v-model="omdbData.keyword"
      class="form-control rounded"
      placeholder="Input your drama name here.."
      aria-label="Search"
      aria-describedby="search-addon"
    />
    <button @click="getOmdb" type="button" class="btn btn-outline-primary">
      search
    </button>
  </div>
  <div class="card my-3 mx-auto" style="width: 18rem">
    <img class="card-img-top" :src="foundDrama.Poster" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{ foundDrama.Title }}</h5>
      <p class="card-text">Released: {{ foundDrama.Released }}</p>
      <p class="card-text">Rating: {{ foundDrama.imdbRating }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import { mapActions } from "pinia";
import { useDramaStore } from "../stores/drama";
import CommentSpace from "../components/CommentSpace.vue";
export default {
  data() {
    return {
      dramaDetail: {},
      comments: {},
      youtubeUrl: "",
      commentData: {
        comment: "",
      },
    };
  },
  components: {
    CommentSpace,
  },
  methods: {
    ...mapActions(useDramaStore, [
      "axiosGetDramaById",
      "axiosPostComment",
      "axiosAddWatchlist",
    ]),
    getDramaById: async function (id) {
      try {
        const response = await this.axiosGetDramaById(id);
        this.dramaDetail = response.data.data;
        this.comments = response.data.comments;
        this.youtubeUrl = response.data.youtubeUrl;
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.response.data.message,
        });
      }
    },
    addWatchlist: async function () {
      try {
        const response = await this.axiosAddWatchlist(this.$route.params.id);
        this.$swal({
          icon: "success",
          text: response.data.message,
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.response.data.message,
        });
      }
    },
    postComment: async function () {
      try {
        const response = await this.axiosPostComment(
          this.$route.params.id,
          this.commentData
        );
        this.getDramaById(this.$route.params.id);
        this.$swal({
          icon: "success",
          text: response.data.message,
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          text: err.response.data.message,
        });
      }
    },
  },
  created() {
    this.getDramaById(this.$route.params.id);
  },
};
</script>

<template>
  <main>
    <h2>{{ dramaDetail.title }}</h2>
    <button @click="addWatchlist" class="btn btn-primary">
      Add to Watchlist
    </button>

    <hr />

    <div id="movie-detail">
      <img :src="dramaDetail.imageUrl" />
      <div class="movie-info">
        <h2>Details</h2>
        <p>Genre: {{ dramaDetail.Category.name }}</p>

        <h2 class="mt-3">Synopsis</h2>
        <p>
          {{ dramaDetail.synopsis }}
        </p>
      </div>
    </div>
  </main>
  <div class="youtube-player">
    <iframe width="420" height="315" :src="youtubeUrl"> </iframe>
  </div>
  <form class="comment-form">
    <textarea
      v-model="commentData.comment"
      cols="70"
      rows="5"
      placeholder="Leave your comment.."
    ></textarea
    ><br />
    <button @click.prevent="postComment" class="btn btn-primary w-48">
      Send
    </button>
  </form>
  <CommentSpace :comments="comments" />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: black;
}

/* Base Styles */
h1,
h2,
h3,
h4,
p,
a {
  font-family: "Arimo", sans-serif;
}

main {
  width: 80%;
  margin: 10vh auto;
}

.comment-form {
  margin-left: 20%;
  margin-top: 4%;
}
.comment-form textarea {
  border-radius: 5px;
}
.comment-form .btn {
  width: 5%;
  margin-top: 1%;
}

.youtube-player {
  margin-left: 35%;
}

main h1:first-child {
  font-weight: 700;
  line-height: 63px;
  padding-bottom: 10px;
}

main > hr {
  margin-top: 8vh;
  margin-bottom: 3vh;
  opacity: 0.3;
}

main #movie-detail {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

@media only screen and (max-width: 600px) {
  main #movie-detail {
    grid-template-columns: 1fr;
  }
  main {
    width: 90%;
  }
}

main #movie-detail > img {
  width: 100%;
}
</style>

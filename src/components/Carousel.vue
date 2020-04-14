<template>
  <v-card :elevation="10">
    <v-carousel
      show-arrows-on-hover
      :show-arrows="screensNum > 1"
      height="70vh"
      :reverse="true"
      v-model="carouselIndex"
    >
      <v-carousel-item
        class="item"
        v-on:click.stop="onClickSlide(i)"
        v-for="(screen,i) in screens"
        :key="i"
        :src="screen.src"
      >
        <v-row class="fill-height" align="center" justify="center">
          <h1 class="font-weight-light">{{ screen.name }}</h1>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div>
      <div class="d-inline">
        <v-btn
          v-on:click.stop="setFavorite()"
          icon
          :color="screens[carouselIndex].fav ? 'indigo' : ''"
        >
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </div>
      <p class="d-inline body-2 font-weight-medium" v-if="screens[carouselIndex].fav">הסר ממועדפים</p>
      <p class="d-inline body-2 font-weight-medium" v-if="!screens[carouselIndex].fav">הוסף למועדפים</p>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    carouselIndex: {
      get: function() {
        return this.$store.state.carouselIndex;
      },
      set: function(index) {
        this.$store.dispatch("setCarouselIndex", index);
      }
    },
    ...mapState(["screens"]),
    ...mapGetters(["screensNum"])
  },
  methods: {
    onClickSlide: function(index) {
      alert(this.$store.state.screens[index].name);
      // TODO : Send screen name to server
    },
    setFavorite: function() {
      this.$store.dispatch("setScreenFavorite");
    }
  }
};
</script>

<style>
h1 {
  color: black;
  opacity: 70%;
  font-size: 80px;
}
</style>
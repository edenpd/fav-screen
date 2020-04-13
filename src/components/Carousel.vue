<template>
  <div id="carousel">
    <v-row dense>
      <v-col cols="12">
        <v-card :elevation="10">
          <v-carousel show-arrows-on-hover height="70vh" :reverse="true" v-model="carouselIndex">
            <v-carousel-item
              class="item"
              v-on:click.stop="onClickSlide(i)"
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            >
              <v-row class="fill-height" align="center" justify="center">
                <h1 class="font-weight-light">{{ item.name }}</h1>
              </v-row>
            </v-carousel-item>
          </v-carousel>
          <div>
            <div class="d-inline">
              <v-btn
                v-on:click.stop="setFavorite()"
                icon
                :color="items[carouselIndex].fav ? 'indigo' : ''"
              >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </div>
            <p
              class="d-inline body-2 font-weight-medium"
              v-if="items[carouselIndex].fav"
            >הסר ממועדפים</p>
            <p
              class="d-inline body-2 font-weight-medium"
              v-if="!items[carouselIndex].fav"
            >הוסף למועדפים</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      carouselIndex: 0
      
    };
  },
  methods: {
    onClickSlide: function(i) {
      alert(i);
    },
    setFavorite: function() {
      this.$emit("setFavorite", this.$props.items[this.carouselIndex].id);
    }
  }
};
</script>

<style>
#app {
  background: transparent;
}

#carousel {
  margin: auto;
}

h1 {
  color: black;
  opacity: 70%;
  font-size: 80px;
}
</style>
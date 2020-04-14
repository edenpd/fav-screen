<template>
  <v-app id="app">
    <v-container fluid>
      <v-row>
        <v-col xl="2" md="2">
          <Panel />
        </v-col>
        <v-col xl="7" md="7">
          <transition name="slide-fade" mode="out-in">
            <div v-if="screensNum == 0">
              <v-alert
                id="alert"
                transition="scale-transition"
                type="info"
                width="300"
                style="margin-right:50vh"
              >לא נמצאו נתונים התואמים לחיפוש</v-alert>
            </div>
            <Carousel v-if="screensNum > 0" />
          </transition>
        </v-col>
        <v-col cols="3">
          <transition name="slide-fade" mode="out-in">
            <span v-if="screensNum == 0"></span>
            <ScreensList v-if="screensNum > 0" />
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Carousel from "./components/Carousel.vue";
import ScreensList from "./components/ScreensList.vue";
import Panel from "./components/Panel.vue";

export default {
  name: "App",
  components: {
    Carousel,
    ScreensList,
    Panel
  },
  computed: {
    ...mapState(["items", "screens"]),
    ...mapGetters(["screensNum"])
  },
  created() {
    this.$store.dispatch("getScreens", this.$store.state.currentSubject);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

::-webkit-scrollbar {
  display: none;
}

#app {
  background-image: url("./assets/back.jpg");
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
</style>

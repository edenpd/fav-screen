<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout fill-height id="layout">
        <v-flex class="xl2 md3">
          <Panel />
        </v-flex>
        <v-flex class="xl7 md6">
          <Carousel v-if="screensNum > 0" />
          <div v-if="screensNum == 0">
            <v-alert
              id="alert"
              transition="scale-transition"
              type="info"
              width="400"
            >לא נמצאו נתונים התואמים לחיפוש</v-alert>
          </div>
        </v-flex>
        <v-flex class="xl3 md3">
          <ScreensList v-if="screensNum > 0" />
        </v-flex>
      </v-layout>
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

#alert {
  margin-top: 200px;
}
</style>

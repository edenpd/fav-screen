<template>
  <v-card :elevation="10" max-height="92vh" id="screenlist">
    <v-container>
      <v-row>
        <v-col v-for="(screen,i) in screens" :key="i" cols="6">
          <v-card :elevation="5" v-on:click.stop="onClickSlide(i)">
            <v-card-title class="subtitle-1">{{ screen.name }}</v-card-title>
            <v-img :src="screen.src" height="9vh"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["screens"]),
  methods: {
    onClickSlide: function(index) {
      alert(this.$store.state.screens[index].name);
      // TODO : Send screen name to server
    }
  }
};
</script>

<style>
#screenlist {
  width: 95%;
  overflow: auto;
}
</style>
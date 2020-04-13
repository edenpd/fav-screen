<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <v-card :elevation="10" max-height="92vh" id="screenlist">
          <v-row>
            <v-col v-for="(screen,i) in screens" :key="i" cols="6">
              <v-row justify="center" align="center">
                <v-card
                  class="d-inline"
                  width="18vh"
                  :elevation="5"
                  v-on:click.stop="onClickSlide(i)"
                >
                  <v-card-title class="subtitle-1">{{ screen.name }}</v-card-title>
                  <v-img :src="screen.src" height="100px"></v-img>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["screens"]),
  methods: {
    onClickSlide: function(index) {
      alert(index);
      // TODO : Send screen name to server
    }
  }
};
</script>

<style>
#screenlist {
  width: 85%;
  margin-right: 4vh;
  overflow: auto;
}
</style>
<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <v-card :elevation="10" max-height="92vh" id="screenlist">
          <v-row>
            <v-col v-for="(item,i) in items" :key="i" cols="6">
              <v-row justify="center" align="center">
                <v-card
                  class="d-inline"
                  width="18vh"
                  :elevation="5"
                  v-on:click.stop="onClickSlide(i)"
                >
                  <v-card-title class="subtitle-1">{{ item.name }}</v-card-title>
                  <v-img :src="item.src" height="100px"></v-img>
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
export default {
  props: ["items"],
  data() {
    return {};
  },
  methods: {
    onClickSlide: function(i) {
      alert(i);
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
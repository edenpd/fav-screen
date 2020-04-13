<template>
  <div id="buttonPanel">
    <v-row v-for="(row,i) in items" :key="i">
      <v-col v-for="(col,j) in row" :key="j">
        <v-btn v-if="col.id !=''" x-large>{{ col.name }}</v-btn>
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
  methods: {}
};
</script>

<style>
#buttonPanel {
  width: 650px;
  margin: auto;
  margin-top: 50px;
}
</style>
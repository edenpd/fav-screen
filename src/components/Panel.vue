<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <v-card id="panel" height="70" :elevation="10">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="display-1">מיטב ברשת</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="12">
        <v-card id="panel" class="align-end" :elevation="10">
          <v-navigation-drawer width="100vh">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">{{ currentShown }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-expansion-panels multiple="multiple" :flat="true" v-model="panel">
              <v-expansion-panel v-on:click="onClickSubject('הצג הכל')" :readonly="true">
                <v-expansion-panel-header disable-icon-rotate>
                  הצג הכל
                  <template v-slot:actions>
                    <v-icon>all_inbox</v-icon>
                  </template>
                </v-expansion-panel-header>
              </v-expansion-panel>

              <v-expansion-panel v-on:click="onClickSubject('מועדפים')" :readonly="true">
                <v-expansion-panel-header disable-icon-rotate>
                  מועדפים
                  <template v-slot:actions>
                    <v-icon>mdi-star</v-icon>
                  </template>
                </v-expansion-panel-header>
              </v-expansion-panel>

              <v-expansion-panel :readonly="true">
                <v-expansion-panel-header disable-icon-rotate>
                  <v-text-field
                    label="חיפוש לפי שם מסך"
                    v-model="screenName"
                    @input="setInput"
                    @keyup.native="setInput"
                    @click="setInput"
                  ></v-text-field>
                  <template v-slot:actions>
                    <v-icon></v-icon>
                  </template>
                </v-expansion-panel-header>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>נושאים</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-on:click="onClickSubject(subject)"
                        v-for="(subject, i) in subjects"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="subject"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-navigation-drawer>
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
      currentShown: "הצג הכל",
      subjects: [],
      screenName: "",
      multiple: true,
      panel: []
    };
  },
  methods: {
    setSubjects: function() {
      var items = this.$props.items;
      for (var i = 0; i < items.length; i++) {
        if (!this.subjects.includes(items[i].subject)) {
          this.subjects.push(items[i].subject);
        }
      }
    },
    onClickSubject: function(subject) {
      this.panel = [];
      this.screenName = "";
      if (subject == "הצג הכל" || subject == "מועדפים") {
        this.currentShown = subject;
      } else this.currentShown = "נושא: " + subject;
      this.$emit("setSubject", subject);
    },
    setInput: function() {
      this.panel = [];
      if (this.screenName == "") this.currentShown = "הצג הכל";
      else this.currentShown = "שם מסך: " + this.screenName;
      this.$emit("searchByName", this.screenName);
    }
  },

  beforeMount() {
    this.setSubjects();
  }
};
</script>

<style>
#panel {
  width: 90%;
}
v-navigation-drawer {
  background: #cdf2ff;
}

.main-title {
  font-size: 20px;
}
</style>
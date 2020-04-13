<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout fill-height id="layout">
        <v-flex class="xl2 md3">
          <Panel
            :items="items"
            @setSubject="chooseScreenBySubject"
            @searchByName="chooseScreenByName"
          />
        </v-flex>
        <v-flex class="xl7 md6">
          <Carousel
            ref="Carousel"
            v-if="screens.length > 0"
            :items="screens"
            @setFavorite="setScreenFavorite"
          />
          <div v-if="screens.length == 0">
            <v-alert
              id="alert"
              transition="scale-transition"
              type="info"
              width="400"
            >לא נמצאו נתונים התואמים לחיפוש</v-alert>
          </div>
        </v-flex>
        <v-flex class="xl3 md3">
          <ScreensList :items="screens" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
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
  data() {
    return {
      items: [
        {
          id: 1,
          name: "טרנזקציה 1",
          subject: "מיטב",
          src: "https://blogs.sap.com/wp-content/uploads/2014/03/1_401684.png",
          fav: false
        },
        {
          id: 2,
          name: "טרנזקציה 2",
          subject: "מיטב",
          src:
            "https://sites.google.com/site/sapabapmsp/_/rsrc/1442931298424/sap/finding-the-badi/go-to-se15-se90-transaction-code-and-press-enter/1.jpg",
          fav: false
        },
        {
          id: 3,
          name: "טרנזקציה 3",
          subject: "שכר",
          src:
            "https://blogs.sap.com/wp-content/uploads/2012/09/ovp_in_display_mode_140475.png",
          fav: true
        },
        {
          id: 4,
          name: "טרנזקציה 4",
          subject: "מילואים",
          src:
            "https://msaptechstuff.files.wordpress.com/2017/05/2017-05-07-14_52_59-183-82-114-111_4444-remote-desktop-connection.jpg?w=650",
          fav: true
        },
        {
          id: 5,
          name: "טרנזקציה 5",
          subject: "מילואים",
          src:
            "https://blogs.sap.com/wp-content/uploads/2013/11/finalresult_327756.png",
          fav: false
        },
        {
          id: 6,
          name: "טרנזקציה 6",
          subject: "מילואים",
          src:
            "https://www.sapspot.com/wp-content/uploads/2019/06/1-6-1024x697.jpg",
          fav: true
        },
        {
          id: 7,
          name: "טרנזקציה 7",
          subject: "מיטב",
          src: "https://blogs.sap.com/wp-content/uploads/2018/04/1-34.png",
          fav: false
        },
        {
          id: 8,
          name: "טרנזקציה 8",
          subject: "מילואים",
          src:
            "https://i0.wp.com/www.samplecodeabap.com/wp-content/uploads/2017/05/Fioriapprefernce-WD-Apps.png?w=600",
          fav: false
        },
        {
          id: 9,
          name: "טרנזקציה 9",
          subject: "שכר",
          src: "https://i.ytimg.com/vi/TlrA7Hnz-CQ/maxresdefault.jpg",
          fav: true
        },
        {
          id: 10,
          name: "טרנזקציה 10",
          subject: "מילואים",
          src: "https://i.ytimg.com/vi/sEKXguCrHLI/maxresdefault.jpg",
          fav: false
        }
      ],
      screens: [],
      currentSubject: "הצג הכל",
      screenMatrix: []
    };
  },
  methods: {
    chooseScreenBySubject: function(subject) {
      this.screens = [];
      if (subject == "הצג הכל") this.setAllScreens();
      else if (subject == "מועדפים") this.setFavorites();
      else {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].subject == subject) {
            this.screens.push(this.items[i]);
          }
        }
      }
      if (this.currentSubject != subject) {
        if (this.$refs.Carousel != undefined)
          this.$refs.Carousel.carouselIndex = 0;
        this.currentSubject = subject;
      } else if (subject == "מועדפים" && this.currentSubject == subject) {
        if (this.$refs.Carousel != undefined) {
          if (this.$refs.Carousel.carouselIndex - 1 >= 0)
            this.$refs.Carousel.carouselIndex -= 1;
          else this.$refs.Carousel.carouselIndex = 0;
        }
      }
      this.listToMatrix();
    },
    chooseScreenByName: function(name) {
      this.screens = [];
      if (name == "") this.setAllScreens();
      else {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].name.includes(name) == true) {
            this.screens.push(this.items[i]);
          }
        }
      }
      if (this.$refs.Carousel != undefined)
        this.$refs.Carousel.carouselIndex = 0;
      this.listToMatrix();
    },
    setAllScreens: function() {
      this.screens = this.items;
    },
    setFavorites: function() {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].fav == true) {
          this.screens.push(this.items[i]);
        }
      }
    },
    setScreenFavorite: function(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) {
          this.items[i].fav = !this.items[i].fav;
        }
      }

      this.chooseScreenBySubject(this.currentSubject);
    },

    listToMatrix: function() {
      var colsPerRow = 4;
      if (this.screens.length % 2 != 0) colsPerRow = 3;

      this.screenMatrix = [];

      for (var i = 0, k = -1; i < this.screens.length; i++) {
        if (i % colsPerRow === 0) {
          k++;
          this.screenMatrix[k] = [];
        }

        this.screenMatrix[k].push(this.screens[i]);
      }
      var lastRow = Math.ceil(this.screens.length / colsPerRow) - 1;
      if (this.screenMatrix[lastRow].length < colsPerRow) {
        while (colsPerRow >= this.screenMatrix[lastRow].length) {
          this.screenMatrix[lastRow].push({ id: "" });
          colsPerRow--;
        }
      }
    }
  },
  beforeMount() {
    this.chooseScreenBySubject(this.currentSubject);
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

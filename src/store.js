import Vue from 'vue'
import Vuex from 'vuex'
import screenList from "../db"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: screenList.items,
        screens: [],
        carouselIndex: 0,
        currentSubject: "הצג הכל"
    },
    mutations: {

        SET_SCREERNS(state, screenList) {
            state.screens = screenList;
        },

        SET_CAROUSEL_INDEX(state, value) {
            state.carouselIndex = value;
        },

        SET_SCREEN_FAVORITE(state, index) {
            state.screens[index].fav = !state.screens[index].fav;
        },

        SET_SUBJECT(state, subject) {
            state.currentSubject = subject;
        },
    },
    actions: {

        getScreens({ commit, state }, subject) {
            var screens = [];
            switch (subject) {
                case "הצג הכל":
                    commit('SET_SCREERNS', state.items)
                    break;
                case "מועדפים":
                    screens = state.items.filter(screen => screen.fav);
                    commit('SET_SCREERNS', screens)
                    break;

                default:
                    screens = state.items.filter(screen => screen.subject === subject);
                    commit('SET_SCREERNS', screens)
                    break;
            }
        },

        setScreensByName({ commit, state }, name) {
            var screens = state.items.filter(screen => screen.name.includes(name));
            commit('SET_SCREERNS', screens)
        },

        setCarouselIndex({ commit }, value) {
            commit('SET_CAROUSEL_INDEX', value)
        },

        setScreenFavorite({ state, commit, dispatch }) {
            commit('SET_SCREEN_FAVORITE', state.carouselIndex);
            dispatch('getScreens', state.currentSubject)

            if (state.currentSubject === "מועדפים") {
                if (state.carouselIndex - 1 >= 0)
                    dispatch("setCarouselIndex", state.carouselIndex - 1);
                else dispatch("setCarouselIndex", 0);
            }
        },

        setSubject({ commit }, subject) {
            commit('SET_SUBJECT', subject);
        },

    },

    getters: {

        screensNum: state => {
            return state.screens.length;
        }

    }
})
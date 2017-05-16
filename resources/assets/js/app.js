
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

var appName = '';

/*
 * Passport
 */

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

/*
 * Components
 */

Vue.component('example', require('./components/Example.vue'));

/**
 * App
 */

if (document.getElementById(appName = 'vue-laws')) {
    const app = new Vue({
        el: '#'+appName,

        data: {
            laws: {},
        },

        methods: {
            __loadLaws() {
                axios.get('/api/laws')
                    .then(function (response) {
                        this.laws = response.data;
                    })
            },
        },

        mounted() {
            this.__loadLaws();
        }
    });
}

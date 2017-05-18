
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
            laws: [],
            lawsOriginal: [],
            currentLaw: -1,
            filter: '',
        },

        methods: {
            cloneOriginal: function () {
                this.lawsOriginal = clone(this.laws);
            },

            __loadLaws() {
                var vue = this;

                axios.get('/api/laws')
                    .then(function (response) {
                        vue.laws = JSON.parse(JSON.stringify(response.data));

                        vue.cloneOriginal();
                    })
            },

            __selectLaw(law) {
                this.currentLaw = law;
            },

            __markdown2Html(text) {
                if (typeof text == 'string' && text.length > 0) {
                    return markdown.render(text);
                }

                return '';
            },

            __saveCurrent() {
                this.saving = true;
                var vue = this;

                axios.post(
                    '/api/laws/'+this.laws[this.currentLaw].id,
                    this.laws[this.currentLaw]
                ).then(function () {
                    this.saving = false;

                    vue.__loadLaws();

                    vue.cloneOriginal();
                })
            },

            __unchanged() {
                return JSON.stringify(this.laws[this.currentLaw]) === JSON.stringify(this.lawsOriginal[this.currentLaw]);
            },

            __createLaw() {
                var law = clone(this.laws[0]);

                for (var prop in law) {
                    if (law.hasOwnProperty(prop)) {
                        law[prop] = '';
                    }
                }

                law['new'] = true;
                law['uuid'] = uuid();

                this.laws.push(law);

                this.currentLaw = this.laws.length-1;
            }
        },

        mounted() {
            this.__loadLaws();
        },

        computed: {
            _filteredLaws() {
                if (this.filter.trim() == '') {
                    return this.laws;
                }

                var filter = unaccent(this.filter.trim());

                var split = filter.split(' ');

                if (split.length > 1) {
                    filter = '^(?=.*\\b'+split.join('\\b)(?=.*\\b')+'\\b).+';
                    filter = '(?=.*'+split.join(')(?=.*')+')';
                }

                return _.filter(this.laws, function(item) {
                    for (var key in item) {
                        found = false;

                        if (unaccent(String(item[key])).match(new RegExp(filter, "i"))) {
                            return true;
                        }
                    }

                    return false;
                });
            }
        }
    });
}

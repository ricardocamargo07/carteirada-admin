
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

/*
 * Directives
 */

Vue.directive('img', function(element, url) {
    element.src = '/img/spinner_azul.gif';

    var img = new Image();

    img.src = url.value;

    img.onload = function() {
        element.src = url.value;
        $(element)
            .css('opacity', 0)
            .animate({ opacity: 1 }, 1000)
    }.bind(this);

    img.onerror = function() {
        element.src = '/img/no-image.png';
    }.bind(this);
});

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
            orderBy: 'numero',
            orderType: 'asc',
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

            __downloadCode() {
                axios.get('/api/laws/download/code')
                    .then(function (response) {
                        let blob = new Blob([response.data], { type:   'application/text' } );

                        let link = document.createElement('a');

                        link.href = window.URL.createObjectURL(blob);

                        link.download = 'carteirada-json.js';

                        link.click();
                    })
            },

            __selectLaw(law) {
                this.currentLaw = this.__findLawById(this._filteredLaws[law].id);
            },

            __findLawById(id, laws) {
                if (typeof laws == 'undefined') {
                    laws = this.laws;
                }

                for (var i = 0; i < laws.length; i++) {
                    if (laws[i].id == id) {
                        return i;
                    }
                }

                return null;
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

            __changeOrder: function(field) {
                if (this.orderBy == field)
                {
                    this.orderType = this.orderType == 'asc' ? 'desc' : 'asc';

                    return;
                }

                this.orderType = 'asc';

                this.orderBy = field;
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
            },

            __clearFilter() {
                this.filter = '';
            },

            __isCurrent(id) {
                if (this.currentLaw >= 0) {
                    return this.laws[this.currentLaw].id == id;
                }

                return false;
            },

            __getCurrentIconUrl() {
                return this.laws[this.currentLaw].image_path;
            },

            __getArrowClass() {
                if (this.orderType == 'asc') {
                    return 'fa-arrow-down';
                }

                return 'fa-arrow-up';
            },
        },

        mounted() {
            this.__loadLaws();
            this.__clearFilter();
        },

        computed: {
            _filteredLaws() {
                var filter = unaccent(this.filter.trim());

                var split = filter.split(' ');

                if (split.length > 1) {
                    filter = '^(?=.*\\b'+split.join('\\b)(?=.*\\b')+'\\b).+';
                    filter = '(?=.*'+split.join(')(?=.*')+')';
                }

                var filtered = _.filter(this.laws, function(item) {
                    for (var key in item) {
                        found = false;

                        if (unaccent(String(item[key])).match(new RegExp(filter, "i"))) {
                            return true;
                        }
                    }

                    return false;
                });

                var orderBy = this.orderBy;

                var orderType = this.orderType;

                var ordered = _.orderBy(
                    filtered,

                    function(item) {
                        return item[orderBy] || '';
                    },

                    orderType
                );

                if (ordered.length > 0 && (this.currentLaw < 0 || (! this.__findLawById(this.laws[this.currentLaw].id, ordered)))) {
                    var id = ordered[0].id;

                    this.currentLaw = this.__findLawById(id);
                }

                return ordered;
            },
        }
    });
}

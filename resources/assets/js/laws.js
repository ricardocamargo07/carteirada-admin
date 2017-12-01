window.Vue = require('vue');

var appName = 'vue-carteirada';

if (document.getElementById(appName)) {
    const app = new Vue({
        el: '#'+appName,

        data: {
            laws: [],
            categories: [],
            enabled: true,
            search: '',
            selectedLaw: false,
            allowBack: false,
        },

        methods: {
            __loadLaws() {
                var vue = this;

                axios.get('/api/laws/json')
                    .then(function (response) {
                        vue.laws = JSON.parse(JSON.stringify(response.data['cartao']['lei']));

                        vue.__extractCategories();
                    })
            },

            __getColors(category) {
                if (category == "lazer") {
                    return {
                        order: 1,
                        bgcolor: "#217dac",
                        bgCompartilhar: "#1c6a92",
                        btcolor: "azul",
                        btfechar: "#1a5877",
                    };
                }

                if (category == "servicos") {
                    return {
                        order: 2,
                        bgcolor: "#ff5845",
                        bgCompartilhar: "#d94b3b",
                        btcolor: "vermelho",
                        btfechar: "#bf4234",
                    };
                }

                if (category == "transporte") {
                    return {
                        order: 3,
                        bgcolor: "#ffc95e",
                        bgCompartilhar: "#e6b555",
                        btcolor: "amarelo",
                        btfechar: "#d3a64f"
                    };
                }

                if (category == "saude") {
                    return {
                        order: 4,
                        bgcolor: "#39c3a2",
                        bgCompartilhar: "#31a68a",
                        btcolor: "verde",
                        btfechar: "#2ea185",
                    };
                }

                if (category == "compras") {
                    return {
                        order: 5,
                        bgcolor: "#35293f",
                        bgCompartilhar: "#2d2336",
                        btcolor: "roxo",
                        btfechar: "#281f30",
                    };
                }
            },

            __extractCategories() {
                vue = this;
                var laws = vue.laws;

                this.categories = Object.keys(this.laws).map(function(key, index) {
                    return jQuery.extend(
                        {
                            id: laws[key].categoriaslug,
                            name: laws[key].categoria,
                        },
                        vue.__getColors(laws[key].categoriaslug)
                    );
                });

                this.categories = _.uniqBy(this.categories, 'id');

                this.categories = _.sortBy(this.categories, 'order');
            },

            __lawsOnCategory(id) {
                return this.laws.filter(function(law) {
                    return law.categoriaslug == id;
                });
            },

            __searchItems() {
                var vue = this;

                return this.laws.filter(function(law) {
                    return law.is_published;
                }).filter(function(law) {
                    var s1 = unaccent(law.nomelei).search(new RegExp(unaccent(vue.search), "i")) != -1;

                    var s2 = unaccent(law.nome).search(new RegExp(unaccent(vue.search), "i")) != -1;

                    var s3 = unaccent(law.descricao).search(new RegExp(unaccent(vue.search), "i")) != -1;

                    var s4 = unaccent(law.numero).search(new RegExp(unaccent(vue.search), "i")) != -1;

                    return s1 || s2 || s3 || s4;
                });
            },

            __getCategory(search) {
                return _.find(this.categories, {id: search});
            },

            __findById(id) {
                return _.find(this.laws, {id: id});
            },

            __makeTwitterUrl: function (selectedLaw) {
                return 'https://twitter.com/share?url=' + selectedLaw.url;
            },

            __makeFacebookUrl: function (selectedLaw) {
                return 'http://www.facebook.com/dialog/feed?app_id=1525309634450525&link=' +
                    selectedLaw.url +
                    '&description=' +
                    selectedLaw.descricao +
                    '&redirect_uri=' +
                    selectedLaw.url
                ;
            },

            __selectLaw(id) {
                this.selectedLaw = this.__findById(id);

                this.selectedLaw.twitterUrl = this.__makeTwitterUrl(this.selectedLaw);

                this.selectedLaw.facebookUrl = this.__makeFacebookUrl(this.selectedLaw);

                this.selectedLaw = jQuery.extend(
                    this.selectedLaw,
                    this.__getColors(this.selectedLaw.categoriaslug)
                );

                this.allowBack = false;

                vue = this;

                setTimeout(function() { vue.__allowBack() }, 300);
            },

            __allowBack() {
                this.allowBack = true;
            },

            __unselectLaw(id) {
                if (this.allowBack) {
                    this.selectedLaw = false;
                }
            },
        },

        mounted() {
            this.selectedLaw = false;

            this.__loadLaws();
        },

        computed: {
            _found() {
                if (! this.search) {
                    return false;
                }

                return this.__searchItems().length > 0;
            },

            _filtered() {
                return this.__searchItems();
            },

            _isHome() {
                return

                ;
            }
        }
    });
}

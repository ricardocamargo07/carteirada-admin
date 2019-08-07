@extends('layouts.master')

@section('page-contents')
    <header id="h" v-if="(this.search == '') && (! this.selectedLaw)">
        <div class="container">
            <div class="logo-carteirada">
                <img src="/assets/images/logo_carteirada_g.png" alt="Carteirada do Bem">
            </div>

            <div class="header-home">
                <div class="text-intro clearfix">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-8">A Carteirada do Bem transforma o dia a dia do cidadão fluminense. Com ela, é mais fácil conhecer seus direitos. E o melhor: é mais fácil fazer seus direitos serem reconhecidos. Não importa quem esteja falando, a lei é igual para todos. E agora você usa seu celular para provar e comprovar isso.</div>
                    <div class="col-lg-2"></div>
                </div>

                {{--<div class="container-social">--}}
                    {{--<div class="facebook-count counter">{{ $shareCount->get_fb() }}</div>--}}
                    {{--<div class="google-count counter">{{ $shareCount->get_plusones() }}</div>--}}
                    {{--<div class="clear"></div>--}}
                {{--</div>--}}

                {{--<div class="container-social" style="display:none;">--}}
                    {{--<div class="count tweeter-count">--}}
                        {{--<div class="fb-like"></div>--}}
                    {{--</div>--}}
                    {{--<div class="count facebook-count">--}}
                        {{--<a href="https://twitter.com/alerj" class="twitter-follow-button" data-show-count="false">Follow @alerj</a>--}}
                    {{--</div>--}}
                    {{--<div class="count google-count">--}}
                        {{--<div class="g-plusone" data-annotation="inline" data-width="300" data-href="https://plus.google.com/+alerj"></div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            </div>
        </div>
    </header>

    <div class="content" v-if="! enabled">
        {{-- will be replaced by javascript--}}
    </div>

    <div class="content-vue" v-if="enabled">
        <div v-if="! selectedLaw">
            <div v-if="! search" class="container-fluid home-categorias">
                <div class="h1-title">
                    <h1 class="align-center">Categorias</h1>
                </div>

                <div class="row categorias">
                    <div class="col-sm-12">
                        <div class="home-categorias itens">
                            <div class="panel-group" id="accordion">
                                <div class="row" v-for="category in categories">
                                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" :href="'#'+category.id">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <i class="icon-accord" :class="'icon-' + category.id"></i>
                                                <br>
                                                @{{ category.name }}
                                            </h4>
                                        </div>
                                    </a>
                                    <div :id="category.id" class="panel-collapse collapse" :class="category.id">
                                        <div class="panel-body" :class="'item' + (key % 2 == 0 ? '1' : '2')" v-for="(law, key) in __lawsOnCategory(category.id)">
                                            <div :class="category.id">
                                                <div class="item">
                                                    <a href="#" @click="__selectLaw(law.id)">@{{ law.nomelei }}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="search" class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="h1-supertitle">
                            <h1 class="align-center" style="color: #001329; font-size: 42px;">Busca</h1>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div v-if="! _found" class="text-center bg-vermelho list-categorias-result-leis">
                            <div class="row">
                                <div class="item item0 bg-vermelho">
                                    <a href="#">Nenhum resultado encontrado</a>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="_found" class="list-categorias-result-leis">
                            <div class="row" :class="law.categoriaslug" v-for="law in __searchItems()">
                                <div :class="'item item' + law.id + ' bg-' + law.categoriaslug">
                                    <a href="#" @click="__selectLaw(law.id)">@{{ law.nomelei }}</a>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </div>

                        <br><br><br>
                    </div>
                </div>
            </div>
        </div>

        <div id="whatever" v-if="selectedLaw" :class="'bg-' + selectedLaw.categoriaslug">
            <div class="pages container-fluid">
                <div class="container">
                    <div class="back float-left" @click="__unselectLaw()">
                        <div id="back" class="float-left"></div>
                        <span class="back-text float-left">Home</span>
                        <div class="clear"></div>
                    </div>

                    <div style="background-color: #ffc95e;"></div>
                    <div class="clear"></div>
                    <div class="row cabecalho">
                        <div class="col-sm-12 col-xs-12">
                            <div class="image-top"> <img :src="selectedLaw.image_file" alt="" id="lei-img-top"></div>
                            <h1 id="lei-nome" v-html="selectedLaw.nome"></h1>
                            <div class="sub-descr" id="sub-descr"><strong>ONDE SE APLICA:</strong> <span v-html="selectedLaw.subcategoria"></span></div>
                            <div class="cat-descr" id="lei-descr" v-html="selectedLaw.descricao"></div>
                            <div class="cat-lei" id="lei-numero">Lei <span v-html="selectedLaw.numero"></span>, de <span v-html="selectedLaw.dataLei"></span></div>
                            <div class="separator"></div>
                        </div>
                    </div>
                </div>

                <div class="container html">
                    <div class="row">
                        <div class="col-sm-12 col-xs-12" id="lei-html" v-html="selectedLaw.html"></div>
                        <div class="col-sm-12 col-xs-12">
                            <div class="separator"></div>
                            <div id="cartao-multa"><h4>EM CASO DE NÃO CUMPRIMENTO:</h4><p v-html="selectedLaw.punicao"></p><div class="top-25"></div><span v-html="selectedLaw.multa_texto"></span></div>
                        </div>
                    </div>
                    <div class="row compartilhamento">
                        <div class="separator"></div>
                        <div class="compartilhe">
                            <div class="text float-left"> Compartilhe esse direito</div>
                            <div class="bts-compartilhe float-left">
                                <a :href="selectedLaw.twitterUrl" target="_blank" class="item-compartilhe compartilhe-tw"></a>
                                <a :href="selectedLaw.facebookUrl" target="_blank" class="item-compartilhe compartilhe-fb"></a>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('page-javascripts')
    {{--Twitter like e facebook like disabled--}}
    {{--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>--}}
@stop

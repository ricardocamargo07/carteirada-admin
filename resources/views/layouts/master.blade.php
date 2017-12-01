@extends('layouts.html')

@section('body')
    <script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.4";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
    <!-- Google + -->
    <script src="//apis.google.com/js/platform.js" async defer>
        {lang: 'pt-BR'}
    </script>

    <div id="vue-carteirada" :class="(this.search == '') && (! this.selectedLaw) ? 'page-home' : 'page-busca'">
        <div v-cloak>
            <!-- Facebook -->
            <div id="fb-root"></div>
            <header id="header">
                <div class="side-box">
                    <strong class="logo"><a href="#">Carteirada do Bem</a></strong>
                    <div class="logo-box">
                        <a href="#"><img src="/assets/images/logo-alerj.png" alt="#"></a>
                    </div>
                </div>
                <div class="nav-bar">
                    <div class="holder">
                        <nav id="main-nav">
                            <ul>
                                <li><a href="/">HOME</a></li>
                                {{--<li><a href="/clipping">Clipping <span>DIGITAL</span></a></li>--}}
                                <li><a href="/awards">Prêmios</a></li>
                                <li>
                                    <div class="search-form">
                                        <form action="#" id="frm-search">
                                            <input v-model="search" type="search" id="wordsearch" name="wordsearch" class="text" placeholder="PROCURE POR UMA LEI">
                                            <input type="submit" class="submit" value="submit">
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div class="side-box">
                            <ul class="socials">
                                <li><a href="//instagram.com/instalerj/" target="_blank"><i class="fa fa-instagram"></i></a></li>
                                <li><a href="//www.facebook.com/assembleiaRJ " target="_blank"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="//twitter.com/alerj" target="_blank"><i class="fa fa-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <span class="btn-menu"></span>
            </header><!-- header -->

            @yield('page-contents')

            <!-- BAIXE APP -->
            <div class="container baixe-app">
                <div class="h1-title">
                    <h1 class="align-center">Baixe o aplicativo para smartphones</h1>
                </div>
                <div class="text-intro clearfix">
                    <div class="col-lg-2"></div>
                    <div class="col-lg-8">Com o aplicativo Carteirada do Bem no seu celular é mais prático e rápido acessar as leis que vão te ajudar a tomar posse da sua cidadania. Baixe grátis!</div>
                    <div class="col-lg-2"></div>
                </div>

                <div class="tel-image">
                    <img src="/assets/images/celular.png" alt="Baixe o aplicativo">
                </div>
                <div class="click-download">
                    <div class="destaques-title middle">
                        <h3 class="button-wrapper">Leve o app no seu celular</h3>
                        <hr>
                    </div>
                    <div class="item float-left" onclick=""><a href="//itunes.apple.com/br/app/carteirada-do-bem/id1038219840?mt=8" target="_blank"><img src="/assets/images/dowload_appstore.png" alt="Baixe o aplicativo para Iphone"></a></div>
                    <div class="item float-right" onclick=""><a href="//play.google.com/store/apps/details?id=com.casadigital.carteirada2&hl=pt_BR" target="_blank"><img src="/assets/images/dowload_googleplay.png" alt="Baixe o aplicativo para Android"></a></div>
                    {{--<div class="item float-left" onclick=""><a href="//www.microsoft.com/pt-br/store/apps/carteirada-do-bem/9nblggh6cpgt" target="_blank"><img src="/assets/images/dowload_windowsphone.png" alt="Baixe o aplicativo para Windows Phone"></a></div>--}}
                    <div class="clear"></div>
                </div>
            </div>


            <!-- FOOTER
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="footer row">
                            <div class="news">
                                <div class="container-news clearfix">
                                    <div class="title item">Receba Newsletter</div>
                                    <form class="item" action="" accept-charset="utf-8">
                                        <div class="input"><input type="text" name="email" id="email" placeholder="Insira seu email"/></div>
                                    </form>
                                    <div class="bt-cadastrar item">Cadastrar</div>

                                </div>
                            </div>
                            <div class="bottom ">
                                <div class="container">
                                    <div class="footer-links">

                                        <div class="col-icon col0">

                                            <div class="redes-sociais">
                                                <a href="//twitter.com/alerj" target="_blank"><i class="fa fa-twitter"></i></a>
                                                <a href="//www.facebook.com/assembleiaRJ " target="_blank"><i class="fa fa-facebook"></i></a>
                                                <a href="//plus.google.com/+alerj/posts" target="_blank"><i class="fa fa-google-plus"></i></a>
                                                <a href="//instagram.com/instalerj/" target="_blank"><i class="fa fa-instagram"></i></a>
                                            </div>

                                    <div class="copyright">© ALERJ 2011 - 2015</div>



                                        </div>

                                        <div class="col col1">

                                            <a href="">PLENÁRIO</a>
                                            <a href="">LEGISLATIVO</a>
                                            <a href="">DEPUTADOS</a>
                                            <a href="">COMISSÕES</a>

                                        </div>

                                        <div class="col col2">

                                            <a href="">ASSEMBLÉIA</a>
                                            <a href="">PUBLICAÇÕES</a>
                                            <a href="">TRANSPARÊNCIA</a>

                                        </div>

                                        <div class="col col3">

                                            <a href="">FALE CONOSCO</a>
                                            <a href="">SOBRE</a>

                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div> -->

            <!-- FOOTER -->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                        <div class="footer row">

                            <!-- <div class="news">
                                <div class="container-news clearfix">
                                    <div class="title item">Receba Newsletter</div>
                                    <form class="form" action="" accept-charset="utf-8">
                                        <div class="input"><input type="text" name="email" id="email" placeholder="Insira seu email"></div>
                                        <button type="submit" class="bt-cadastrar">Cadastrar</button>
                                    </form>
                                </div>
                            </div> -->
                            <div class="bottom ">
                                <div class="container">
                                    <div class="copyright"><p>© ALERJ 2011 - 2015   |   <a href="//www.alerj.rj.gov.br/" target="_blank">SITE ALERJ</a>   |   <a href="//instagram.com/instalerj/" target="_blank">FALE COM A ALERJ</a></p></div>
                                    <p class="separator">_____</p>
                                    <div class="redes-sociais">
                                        <p class="social-icons">
                                            <a href="//instagram.com/instalerj/" target="_blank"><i class="fa fa-instagram"></i></a>
                                            <a href="//www.facebook.com/assembleiaRJ " target="_blank"><i class="fa fa-facebook"></i></a>
                                            <a href="//twitter.com/alerj" target="_blank"><i class="fa fa-twitter"></i></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> {{--vue-carteirada--}}

    @yield('page-javascripts')

    <script type="text/javascript" src="/js/app.js"></script>

    <script src="//platform.twitter.com/oct.js" type="text/javascript"></script>
    <script type="text/javascript">twttr.conversion.trackPid('ntm4x', { tw_sale_amount: 0, tw_order_quantity: 0 });</script>
    <noscript>
        <img height="1" width="1" style="display:none;" alt="" src="//analytics.twitter.com/i/adsct?txn_id=ntm4x&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />
        <img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?txn_id=ntm4x&p_id=Twitter&tw_sale_amount=0&tw_order_quantity=0" />
    </noscript>
    <script type="text/javascript" src="/assets/js/placeholders.js"></script>
    <script type="text/javascript" src="/assets/js/af.equal-height.js"></script>

    @include('layouts.partials.analytics')
@stop

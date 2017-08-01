@extends('layouts.master')

@section('page-contents')
    <div class="container container-md">
        <header class="heading">
            <div class="h1-title">
                <h1 class="align-center">Clipping Digital</h1>
            </div>
            <div class="text-intro clearfix">
                <div class="col-lg-12"> Eles falaram sobre a Carteirada do Bem. E a gente reuniu tudo aqui para te
                    mostrar.
                </div>
            </div>
        </header><!-- heading -->

        <div class="info-boxes">
            <div class="row">
                @foreach ($clipping as $article)
                    <div class="col-sm-6">
                        <div class="info-box" data-toggle="modal">
                            <a href="{{ $article->url }}" target="_blank">
                                <i class="ico"><span><img src="/assets/images/{{$article->type}}.svg"
                                                          alt="{{ $article->type }}"></span></i>
                                <div class="wrap" style="min-height: 32px;">
                                    <h2>{{ $article->title }} – {{ $article->date }}</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                @endforeach
            </div><!-- row -->
        </div><!-- info-boxes -->

        <br><br><br>

        {{--<div class="paging">--}}
            {{--<ol class="wp-paginate">--}}
                {{--<li><a href="http://www.carteiradadobem.com.br/clipping/page/2/" class="prev">ANTERIOR</a></li>--}}
                {{--<li><a href="http://www.carteiradadobem.com.br/clipping/" title="1" class="page">1</a></li>--}}
                {{--<li><a href="http://www.carteiradadobem.com.br/clipping/page/2/" title="2" class="page">2</a></li>--}}
                {{--<li><span class="page current">3</span></li>--}}
            {{--</ol>--}}
        {{--</div>--}}
    </div>
@stop

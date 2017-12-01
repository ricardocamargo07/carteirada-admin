<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta content="" name="description">
        <meta name="keywords" content="">
        <meta name="author" content="">

        <!-- OG TAGS : FACEBOOK E TWITTER -->
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Carteirada do Bem" />
        <meta property="og:url" content="https://www.carteiradadobem.com.br/" />
        <meta property="og:image" content="https://www.carteiradadobem.com.br/assets/images/ShareFacebook_1200x630.jpg" />
        <meta property="og:description" content="A Carteirada do Bem transforma o dia a dia do cidadão fluminense. Com ela, é mais fácil conhecer seus direitos. E o melhor: é mais fácil fazer seus direitos serem reconhecidos. Não importa quem esteja falando, a lei é igual para todos. E agora você usa seu celular para provar e comprovar isso." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="#carteiradadobem"/>

        <title>{{ config('app.name', 'Carteirada do Bem') }}</title>

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link rel="icon" href="favicon.ico" />

        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <link href='//fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        @if (request()->get('client') == 'app')
            <link rel="stylesheet" href="/css/client-app.css">
        @endif

        <script>
            window.Laravel = {!! json_encode([
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
    </head>

    <body>
        @yield('body')

        @include('layouts.partials.analytics')
    </body>
</html>

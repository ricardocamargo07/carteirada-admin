// var app_debug = true;
//
// var href = '';
// var classBody = 'page-home';
// var bgcolor = '';
// var bgCompartilhar = '';
// var btcolor = '';
// var btfechar = '';
// var pageLeiUrl = '';
// var pageUrl = '';
// var breads = null;
// var leID = '';
// var numero = '';
// var urlCompartilheFb = '';
// var urlCompartilheTw = '';
// var urlCompartilheWtapp = '';
// var wordsearch = '';
// var total = 0;
//
// window.showPage = function() {
//     $.get(fullurl,
//         {
//             "hashs":breads
//         }, function(page) {
//
//             if (page != "")
//             {
//                 //alert('callback'+ page);
//
//                 /** CARREGA A PAGINA */
//                 //alert(page);
//                 $(".content").html(page);
//
//                 if ($('body').hasClass('page-home')) {
//
//                     $(".header-home").show();
//                     $("#h > div").addClass("container");
//
//                     debug('page-home');
//
//                     $('#h .logo-carteirada img').attr('src', "/assets/images/logo_carteirada_g.png");
//
//                 } else {
//                     debug('page-home-small');
//
//                     /*$('#h').css('position', "fixed");*/
//                     $(".header-home").hide();
//                     $("#h > div").removeClass("container");
//
//                     $('#h .logo-carteirada img').attr('src', "/assets/images/logo_carteirada_p.png");
//
//                     $(".back").click(function(event) {
//                         window.location = "?page=home";
//                     });
//
//                 }
//                 if ($('body').hasClass('page-lei'))
//                 {
//
//
//                     // $.each(laws.cartao.lei, function(i, v)
//                     // {
//                     //     leID = href.substr('4');
//                     //     //debug("PAGE LEI - " + leID);
//                     //
//                     //     if (v.id == leID)
//                     //     {
//                     //
//                     //         $('#lei-img-top').attr('src', "/assets/images/leis/lei-"+v.numero+".png");
//                     //         $('.icon-accord').addClass("icon-"+v.categoriaslug);
//                     //
//                     //         $(".page-title").html(v.categoria); // esta oculto
//                     //         $('#sub-descr').html("ONDE SE APLICA: " + v.subcategoria);
//                     //         $('#lei-nome').html(v.nome);
//                     //         $('#lei-descr').html(v.descr1);
//                     //         numero = v.numero.replace("-", "/");
//                     //         $('#lei-numero').html("Lei "+ numero+ ", de "+ v.dataLei); //trocar o - por /
//                     //         $('#lei-html').html(v.html);
//                     //         $('#cartao-multa').html(v.multatexto);
//                     //
//                     //         urlCompartilheFb = "http://www.carteiradadobem.com.br?page=lei-"+v.id;
//                     //         urlCompartilheTw = "http://www.carteiradadobem.com.br?page=lei-"+v.id+"&text="+v.nome;
//                     //         urlCompartilheWtapp = "http://www.carteiradadobem.com.br?page=lei-"+v.id;
//                     //
//                     //         $(".compartilhe-fb").attr('href',"http://www.facebook.com/sharer.php?u="+encodeURIComponent(urlCompartilheFb));
//                     //         $(".compartilhe-tw").attr('href',"https://twitter.com/share?url="+encodeURIComponent(urlCompartilheTw));
//                     //         $(".compartilhe-whatpp").attr('href',"whatsapp://send?text="+encodeURIComponent(urlCompartilheWtapp));
//                     //
//                     //         if (v.categoriaslug == "lazer") {
//                     //             bgcolor = "#217dac";
//                     //             bgCompartilhar = "#1c6a92";
//                     //             btcolor = "azul";
//                     //             btfechar = "#1a5877";
//                     //         }
//                     //         if (v.categoriaslug == "servicos") {
//                     //             bgcolor = "#ff5845";
//                     //             bgCompartilhar = "#d94b3b";
//                     //             btcolor = "vermelho";
//                     //             btfechar = "#bf4234";
//                     //         }
//                     //         if (v.categoriaslug == "transporte") {
//                     //             bgcolor = "#ffc95e";
//                     //             bgCompartilhar = "#e6b555";
//                     //             btcolor = "amarelo";
//                     //             btfechar = "#d3a64f";
//                     //         }
//                     //         if (v.categoriaslug == "saude") {
//                     //             bgcolor = "#39c3a2";
//                     //             bgCompartilhar = "#31a68a";
//                     //             btcolor = "verde";
//                     //             btfechar = "#2ea185";
//                     //         }
//                     //         if (v.categoriaslug == "compras") {
//                     //             bgcolor = "#35293f";
//                     //             bgCompartilhar = "#2d2336";
//                     //             btcolor = "roxo";
//                     //             btfechar = "#281f30";
//                     //         }
//                     //     }
//                     //
//                     // });
//
//                     $('#main-title').css('color', "#FFFFFF");
//                     $('.page-title').css('color', "#FFFFFF");
//                     $('.page-total').css('color', "#FFFFFF");
//
//                     $('.content').css('background-color', bgcolor);
//                 }
//                 else if ($('body').hasClass('page-busca'))
//                 {
//                     //debug("busca = " + Cookies.getJSON('busca'));
//                     wordsearch = Cookies.getJSON('busca');
//                     debug('wordsearch === ', wordsearch);
//
//                     $(".page-total").removeClass("hide");
//                     total = 0;
//                     $.each(laws.cartao.lei, function(i, v)
//                     {
//                         if (v.nome.search(wordsearch) != -1)
//                         {
//                             //alert(v.numero);
//
//                             //total = (i+1);
//                             //debug("Achou = " +i+("vezez - ")+ wordsearch);
//                             //debug("busca cout = " + total);
//                             if (v.categoria == "Lazer")
//                                 var bgC = "#217dac";
//
//                             if (v.categoria == "Serviços")
//                                 var bgC = "#ff5845";
//
//                             if (v.categoria == "Transporte")
//                                 var bgC = "#ffc95e";
//
//                             if (v.categoria == "Saúde")
//                                 var bgC = "#39c3a2";
//
//                             if (v.categoria == "Compras")
//                                 var bgC = "#35293f";
//
//                             $(".page-busca .list-categorias-result-leis").append("<div class='row "+v.categoriaslug+"'> <div class='item item"+(i+1)+"' style='background-color:"+bgC+"'> <i class='icon-menu icon-star-of icon-favorito' data-cat='"+v.subcategoria+"' data-cat='' data-lei='"+v.numero+"' data-id='"+v.id+"' ></i><a href='?page=lei-"+v.id+"'>"+v.nome+"</a> <div class='clear'></div></div></div>");
//
//                             return;
//                         }
//                     });
//                     $(".page-total").html("total "+ "-");
//                 }
//                 else {
//                     bgcolor = "#FFFFFF";
//                     $('#main-title').css('color', "#000000");
//                     $('.page-title').css('color', "#000000");
//                     $('.page-total').css('color', "#000000");
//                     $('.bt-menu span').css('background-color', "#000000");
//
//                     if ($('body').hasClass('page-home'))
//                     {
//                         wordsearch = $('input[name="wordsearch"]');
//
//                         $("#frm-search").on('submit', function(event) {
//                             event.preventDefault();
//                             wordsearch = $("#wordsearch").val();
//                             if (wordsearch != "")
//                             {
//                                 Cookies.set('busca', wordsearch);
//                                 window.location = "/?page=busca";
//                             }
//                         });
//
//                         $('#accordion .row').each(function(i, obj)
//                         {
//                             //MONTA LAZER
//                             if ($(this).find(".panel-collapse").attr('id') == "lazer")
//                             {
//                                 var j= 1;
//                                 $.each(laws.cartao.lei, function(i, v)
//                                 {
//
//                                     if (v.categoriaslug == "lazer")
//                                     {
//                                         //debug(" teste = " + indice);
//
//                                         $("#lazer").append("<div class='panel-body item"+j+"'><div class='lazer'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nome+"</a></div></div></div>");
//
//                                         if (j== 2)
//                                             j = 1;
//                                         else
//                                             j++;
//                                     }
//                                 });
//                             }
//
//                             //MONTA SERVICOS
//                             if ($(this).find(".panel-collapse").attr('id') == "servicos")
//                             {
//                                 var j= 1;
//                                 $.each(laws.cartao.lei, function(i, v)
//                                 {
//
//                                     if (v.categoriaslug == "servicos")
//                                     {
//                                         //debug(" teste = " + indice);
//
//                                         $("#servicos").append("<div class='panel-body item"+j+"'><div class='servicos'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nome+"</a></div></div></div>");
//
//                                         if (j== 2)
//                                             j = 1;
//                                         else
//                                             j++;
//                                     }
//                                 });
//                             }
//
//
//                             //MONTA TRANSPORTE
//                             if ($(this).find(".panel-collapse").attr('id') == "transporte")
//                             {
//                                 var j= 1;
//                                 $.each(laws.cartao.lei, function(i, v)
//                                 {
//
//                                     if (v.categoriaslug == "transporte")
//                                     {
//                                         //debug(" teste = " + indice);
//
//                                         $("#transporte").append("<div class='panel-body item"+j+"'><div class='transporte'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nome+"</a></div></div></div>");
//
//                                         if (j== 2)
//                                             j = 1;
//                                         else
//                                             j++;
//                                     }
//                                 });
//                             }
//
//                             //MONTA SAUDE
//                             if ($(this).find(".panel-collapse").attr('id') == "saude")
//                             {
//                                 var j= 1;
//                                 $.each(laws.cartao.lei, function(i, v)
//                                 {
//
//                                     if (v.categoriaslug == "saude")
//                                     {
//                                         //debug(" teste = " + indice);
//
//                                         $("#saude").append("<div class='panel-body item"+j+"'><div class='saude'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nome+"</a></div></div></div>");
//
//                                         if (j== 2)
//                                             j = 1;
//                                         else
//                                             j++;
//                                     }
//                                 });
//                             }
//
//                             //MONTA COMPRAS
//                             if ($(this).find(".panel-collapse").attr('id') == "compras")
//                             {
//                                 var j= 1;
//                                 $.each(laws.cartao.lei, function(i, v)
//                                 {
//
//                                     if (v.categoriaslug == "compras")
//                                     {
//                                         //debug(" teste = " + indice);
//
//                                         $("#compras").append("<div class='panel-body item"+j+"'><div class='compras'><div class='item'><a href='?page=lei-"+v.id+"'>"+v.nome+"</a></div></div></div>");
//
//                                         if (j== 2)
//                                             j = 1;
//                                         else
//                                             j++;
//                                     }
//                                 });
//                             }
//
//                         });
//
//                     }
//                 }
//             }
//         });
// };
//
// jQuery(document).ready(function($)
// {
//     debug("ready");
//     debug(document.location.hostname);
//
//     //www.facebook.com/sharer.php?u=http://projects.paulajbastos.com/#/cartao-2424-95
//
//     $.urlParam = function(name) {
//         var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//         if (results==null) {
//             return null;
//         }
//         else {
//             return results[1] || 0;
//         }
//     }
//
//     /********************* NAVEGACAO *********************/
//
//     $.address.change(function(event)
//     {
//         goTo();
//     });
//
//     function goTo()
//     {
//         debug('goTo');
//
//         $("body").removeClass();
//
//         href = $.urlParam('page');
//
//         if (href == "" || href === null ) href = "home";
//
//         $(".navlink").removeClass("mm-selected");
//
//         //debug(href);
//         classBody = "page-home";
//         bgcolor = "";
//         bgCompartilhar = "";
//         btcolor = "";
//         btfechar = "";
//
//         debug('href = ', href)
//
//         if (href == 'home' || href == '' ) {
//             $(".back").addClass("hide");
//             $("#main-title").addClass("hide");
//         }
//         else {
//             $(".back").removeClass("hide");
//             $("#main-title").removeClass("hide");
//         }
//
//         if (href == 'busca') {
//             classBody = 'page-busca';
//             $(".page-title").html("Busca");
//
//         }
//         else
//             $(".page-total").addClass("hide");
//
//
//         pageLeiUrl = href.substring(0, 4); //lei-
//         pageUrl = href;
//
//         if (pageLeiUrl == "lei-") {
//             pageUrl = "lei";
//             classBody = 'page-lei';
//         } else {
//         }
//
//         fullurl = 'partials/' + pageUrl;
//
//         $('body').addClass(classBody);
//
//         debug('fullurl', fullurl);
//
//         showPage();
//
//         // $.get('/api/laws/json')
//         //     .done(function(data) {
//         //         leis = data;
//         //
//         //         showPage();
//         //     })
//         // ;
//     }
// });

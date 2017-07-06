@extends('layouts.app')

@section('content')
    <div class="container-fluid" id="vue-laws">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-2">
                                @{{ _filteredLaws.length }} leis
                            </div>

                            <div class="col-md-10">
                                <div class="text-right">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="btn btn-success" @click="__createLaw()">
                                                Nova lei
                                            </div>
                                        &nbsp;</div>

                                        <div class="col-md-8 pull-right">
                                            <div class="input-group">
                                                <span class="input-group-addon" :class="filter ? 'danger' : ''">
                                                    @{{ filter ? 'Filtrado' : 'Filtrar' }}
                                                </span>

                                                <input type="text" name="filter" v-model="filter" class="form-control">

                                                <span class="input-group-addon" :class="filter ? 'danger pointer' : ''" @click="__clearFilter()">
                                                    <i :class="filter ? 'fa fa-times' : 'fa fa-search'"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel-body scrollable">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                {{--show arrow here--}}
                                            </th>

                                            <th @click="__changeOrder('id')">
                                                #

                                                <div v-show="orderBy == 'id'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>

                                            <th @click="__changeOrder('numero')" class="text-right">
                                                Número da Lei

                                                <div v-show="orderBy == 'numero'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>

                                            <th @click="__changeOrder('ano')">
                                                Ano

                                                <div v-show="orderBy == 'ano'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>

                                            <th @click="__changeOrder('paragrafo')" class="text-right">
                                                Parágrafo

                                                <div v-show="orderBy == 'paragrafo'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>

                                            <th @click="__changeOrder('nome_lei')">
                                                Título (nome_lei)

                                                <div v-show="orderBy == 'nome_lei'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>

                                            <th @click="__changeOrder('updated_at')">
                                                Atualizada em

                                                <div v-show="orderBy == 'updated_at'" class="btn btn-danger btn-xs">
                                                    <i class="fa" :class="__getArrowClass()"></i>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {{--<tr v-for="law in laws" class="clickable" @click="__selectLaw(law)">--}}
                                        <tr v-for="(law, index) in _filteredLaws" class="clickable" @click="__selectLaw(index)">
                                            <td>
                                                <div v-show="__isCurrent(law.id)" class="btn btn-danger btn-xs">
                                                    <i class="fa fa-arrow-right"></i>
                                                </div>
                                            </td>

                                            <td>@{{ law.id }}</td>
                                            <td class="text-right">@{{ law.numero }}</td>
                                            <td>@{{ law.ano }}</td>
                                            <td>@{{ law.paragrafo }}</td>
                                            <td>@{{ law.nome_lei }}</td>
                                            <td>@{{ law.updated_at }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="currentLaw >= 0">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-8">
                                Lei @{{ laws[currentLaw].numero }} / @{{ laws[currentLaw].ano }} - @{{ laws[currentLaw].nome_lei }}
                            </div>

                            <div class="col-md-4">
                                <div class="text-right">
                                    <button type="text" class="btn btn-primary" @click="__saveCurrent()" :disabled="__unchanged()">Salvar esta lei</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel-body add-margin">
                        <div class="row">
                            <div class="col-md-12">
                                <form @submit.prevent>
                                    <div class="row bg-danger row-form">
                                        <div class="col-md-10">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Status</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].status">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <div class="form-group">
                                                            <label>Número</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].numero">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <div class="form-group">
                                                            <label>Ano</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].ano">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <div class="form-group">
                                                            <label>Parágrafo</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].paragrafo">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Data da Lei</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].data_lei">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Link</label>
                                                            <input type="text" class="form-control" v-model="laws[currentLaw].link">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-2">
                                            <img src="/img/spinner_azul.gif" alt="" class="img-responsive law-icon" v-img="__getCurrentIconUrl()">
                                        </div>
                                    </div>

                                    <div class="row bg-warning row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Título (nome_lei)</label>
                                                <input type="text" class="form-control" v-model="laws[currentLaw].nome_lei">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Nome</label>
                                                <textarea type="text" rows="4" class="form-control" v-model="laws[currentLaw].nome"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bg-danger row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Categoria</label>
                                                <input type="text" class="form-control" v-model="laws[currentLaw].categoria">
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Subcategoria</label>
                                                <input type="text" class="form-control" v-model="laws[currentLaw].subcategoria">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bg-warning row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Descrição (em <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a>)</label>
                                                <textarea type="text" rows="8" class="form-control" v-model="laws[currentLaw].descricao"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label></label>
                                                <div v-html="__markdown2Html(laws[currentLaw].descricao)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bg-danger row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Punição (em <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a>)</label>
                                                <textarea type="text" rows="8" class="form-control" v-model="laws[currentLaw].punicao"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label></label>
                                                <div v-html="__markdown2Html(laws[currentLaw].punicao)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bg-warning row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Multa (em <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a>)</label>
                                                <textarea type="text" rows="8" class="form-control" v-model="laws[currentLaw].multa_texto"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label></label>
                                                <div v-html="__markdown2Html(laws[currentLaw].multa_texto)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row bg-danger row-form">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>HTML (em <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a>)</label>
                                                <textarea type="text" rows="30" class="form-control" v-model="laws[currentLaw].html"></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label></label>
                                                <div v-html="__markdown2Html(laws[currentLaw].html)"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <br>
                                    <button type="text" class="btn btn-primary" @click="__saveCurrent()" :disabled="__unchanged()">Salvar esta lei</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

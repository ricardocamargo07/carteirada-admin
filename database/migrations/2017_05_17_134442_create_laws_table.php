<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLawsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laws', function (Blueprint $table) {
            $table->increments('id');

            $table->string('status')->nullable();
            $table->text('link')->nullable();
            $table->string('categoria')->nullable();
            $table->string('numero')->nullable();
            $table->integer('ano')->nullable();
            $table->string('nome_lei', 4096)->nullable();
            $table->string('nome', 4096)->nullable();
            $table->string('data_lei')->nullable();
            $table->text('descricao')->nullable();
            $table->text('subcategoria')->nullable();
            $table->text('punicao')->nullable();
            $table->text('multa_texto')->nullable();
            $table->text('html')->nullable();
            $table->string('imagem_1')->nullable();
            $table->string('imagem_2')->nullable();
            $table->string('obs')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laws');
    }
}

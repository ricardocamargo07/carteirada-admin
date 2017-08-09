<?php

use App\Data\Models\Law;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPublishedColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('laws', function (Blueprint $table) {
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_published')->default(false);
        });

        DB::statement('update laws set published_at = updated_at, is_published = true');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('laws', function (Blueprint $table) {
            $table->dropColumn('published_at');
            $table->dropColumn('is_published');
        });
    }
}

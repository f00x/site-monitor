<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventPositionTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('event_position', function (Blueprint $table) {
            $table->increments('id');

            $table->char('event_key', 30);
            $table->integer('x');
            $table->integer('y');
            $table->integer('site_id')->nullable()->unsigned();
            $table->foreign('site_id')->references('id')->on('site');
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('event_positions');
    }

}

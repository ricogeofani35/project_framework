<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('product_kode')->unique();
            $table->string('product_image');
            $table->string('product_name', 64);
            $table->integer('product_price');
            $table->integer('product_stock');
            $table->text('product_desc');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            // relasi
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penyuratan', function (Blueprint $table) {
            $table->string('id', 13)->primary();
            $table->string('nama')->required();
            $table->string('alamat')->required();
            $table->string('nomor_hp')->required();
            $table->string('tujuan')->required();
            $table->string('wilayah')->required();
            $table->longText('isi')->required();
            $table->string('dokumen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyuratan');
    }
};

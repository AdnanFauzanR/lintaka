<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penyuratan extends Model
{
    use HasFactory;

    protected $table = 'penyuratan';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'user_id', 'nama', 'alamat', 'nomor_hp', 'wilayah', 'tujuan', 'isi', 'dokumen'];
}

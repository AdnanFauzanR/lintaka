<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratDinas extends Model
{
    use HasFactory;

    protected $table = 'surat_dinas';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'user_id', 'judul', 'isi', 'tujuan', 'dokumen'];
}

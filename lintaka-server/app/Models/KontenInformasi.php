<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KontenInformasi extends Model
{
    use HasFactory;

    protected $table = 'konten_informasi';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'user_id', 'judul', 'isi', 'foto'];

    /**
     * Summary of role
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}

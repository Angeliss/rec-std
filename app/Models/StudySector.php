<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudySector extends Model
{
    use HasFactory;

    public $fillable = ['label', 'code', 'slug'];

    public function etudiants() {
        return $this->hasMany(Etudiant::class);
    }
}

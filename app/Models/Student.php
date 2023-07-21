<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public $fillable = [
        'level_id',
        'study_sector_id',
        'lastname',
        'firstname',
        'birthday',
        'contact',
        'email',
        'gender',
        'photo',
        'matricule'
    ]; 

    public function level() {
        return $this->belongsTo(Level::class);
    }

    public function studySector() {
        return $this->belongsTo(StudySector::class);
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Level;
use App\Models\StudySector;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index() {
        return Inertia::render('Setting', 
        [
            'levels' => Level::all(),
            'study_sectors' => StudySector::all()
        ]);
    }

    public function storeLevel(Request $request) {
        $request->validate([
          'level_label' => ['required'],
          'slug' => 'unique:levels'
        ]);
        try {
            Level::create([
                'label' => $request->level_label,
                'slug' => \Str::slug($request->level_label),
                'code' => $request->level_code
            ]);
            return to_route('setting');
        } catch (\Exception $e) {
            if (Level::whereSlug(\Str::slug($request->name))->exists()) {
                return back()->withError('Echèc de l\'enregistrement ! \n Ce niveau existe déjà.')->withInput();
            } else {
                return back()->withError('Echèc de l\'enregistrement ! Veuillez réessayer plutard ou contact votre administrateur.')
                            ->withInput();
            } 
        }        
    }

    public function storeStudySector(Request $request) {
        $request->validate([
          'filiere' => ['required'],
          'slug' => 'unique:study_sectors'
        ]);
        try {
            StudySector::create([
                'label' => $request->filiere,
                'slug' => \Str::slug($request->filiere),
                'code' => $request->code_filiere
            ]);
            return to_route('setting');
        } catch (\Exception $e) {
            if (StudySector::whereSlug(\Str::slug($request->name))->exists()) {
                return back()->withError('Echèc de l\'enregistrement ! \n Ce niveau existe déjà.')->withInput();
            } else {
                return back()->withError('Echèc de l\'enregistrement ! Veuillez réessayer plutard ou contact votre administrateur.')
                            ->withInput();
            } 
        } 
    }
}

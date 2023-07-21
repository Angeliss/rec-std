<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Level;
use App\Models\Student;
use App\Models\StudySector;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $etudiants = Student::all();
        $etudiants->load('level');
        $etudiants->load('studySector');

        return Inertia::render('List', compact('etudiants'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Create', [
            'levels' => Level::all(),
            'study_sectors' => StudySector::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'mimes:jpg,jpeg,png|max:500000',
            'lastname' => 'required',
            'firstname' => 'required',
            'birthday' => 'required',
            'level' => 'required',
            'email' => 'email',
            'study_sector' => 'required',
            'contact' => 'regex:/[0-9]{10}/'
        ]);

        list($year, $month, $day) = explode('-', $request->birthday);
        $year_slice = substr($year, -2);
        $first_lastname_letter = strtoupper(substr($request->lastname, 0, 1));
        $firstname_letters = strtoupper(substr(str_replace("'", '', $request->firstname), 0, 2));
        $std = Student::latest()->first();
        
        if ($std == null) {
            $last = '001';
        } else {
            $last_id = $std->id;
            $cpt = $last_id + 1;
            $last = sprintf("%03d", $cpt);
        }
        
        $matricule = $first_lastname_letter.$firstname_letters.$day.$month.$year_slice.'-'.$last;        

        if ($request->photo) {
            $fileName = $matricule.'.'.$request->photo->extension();  
            $request->photo->move(public_path('uploads'), $fileName);
        } else {
            $fileName = '';
        }

        try {
            $student = Student::create([
                'level_id' => (int) $request->level,
                'study_sector_id' => (int) $request->study_sector,
                'lastname' => $request->lastname,
                'firstname' => $request->firstname,
                'birthday' => $request->birthday,
                'contact' => $request->contact,
                'email' => $request->email,
                'gender' => $request->gender,
                'photo' => $fileName,
                'matricule' => $matricule
            ]);  
            return to_route('show', $student);
        } catch (\Exception $e) {
            if (Student::where('matricule', $matricule)->exists()) {
                return back()->with('error', 'Echèc de l\'enregistrement ! \n Cet étudiant existe déjà.')->withInput();
            } else {
                return back()->with('error','Echèc de l\'enregistrement ! Veuillez réessayer plutard ou contact votre administrateur.');
            } 
        }  
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $etudiant = Student::findOrFail($id);
        $etudiant->load('level');
        $etudiant->load('studySector');

        return Inertia::render('Details', compact('etudiant'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $etudiant = Student::findOrFail($id);
        $etudiant->load('level');
        $etudiant->load('studySector');

        return Inertia::render('Edit', [
            'etudiant' => $etudiant,
            'levels' => Level::all(),
            'study_sectors' => StudySector::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $request->validate([
            'lastname' => 'required',
            'firstname' => 'required',
            'birthday' => 'required',
            'level' => 'required',
            'study_sector' => 'required',
        ]);
        $etudiant = Student::findOrFail($id);
        $matricule = $etudiant->matricule;
        $last = explode('-', $matricule)[1];

        list($year, $month, $day) = explode('-', $request->birthday);
        $year_slice = substr($year, -2);
        $first_lastname_letter = strtoupper(substr($request->lastname, 0, 1));
        $firstname_letters = strtoupper(substr(str_replace("'", '', $request->firstname), 0, 2));
        $std = Student::latest()->first();
        
        $matricule = $first_lastname_letter.$firstname_letters.$day.$month.$year_slice.'-'.$last;        

        if ($request->photo != '') {
            $fileName = $matricule.'.'.$request->photo->extension();  
            $request->photo->move(public_path('uploads'), $fileName);
        } else {
            $fileName = $etudiant->photo;
        }

        $etudiant->update([
            'level_id' => (int) $request->level,
            'study_sector_id' => (int) $request->study_sector,
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'birthday' => $request->birthday,
            'contact' => $request->contact,
            'email' => $request->email,
            'gender' => $request->gender,
            'photo' => $fileName,
            'matricule' => $matricule
        ]);  
        return to_route('show', $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Student::findOrFail($id)->delete();
        return to_route('students');
    }

    public function searching(Request $request) {
        $etudiants = Student::where('matricule', 'LIKE', "%{$request->mat}%")->get();
        $etudiants->load('level');
        $etudiants->load('studySector');

        // if ($etudiants->count() > 0) {
        //     return Inertia::render('Search', compact('etudiants'));
        // } else {
        //     return back()->with('error', "Cet matricule ne correspond à aucun enregistrement");
        // }
        return Inertia::render('Search', compact('etudiants'));
    }
}

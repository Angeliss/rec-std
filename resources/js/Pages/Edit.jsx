import React from 'react'
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
const Edit = ({levels, study_sectors, etudiant}) => {

  const { data, setData, post, processing, progress, errors, reset } = useForm({
    lastname: etudiant.lastname,
    firstname: etudiant.firstname,
    birthday: etudiant.birthday,
    contact: etudiant.contact,
    email: etudiant.email,
    gender: etudiant.gender,
    level: etudiant.level_id,
    study_sector: etudiant.study_sector_id,
    photo: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    post(route('update', etudiant.id), {
      preserveScroll: true,
      onSuccess: () => {
        runToast("success")
        reset()
      },
      onError: (errors) => {
        runToast("error")
        console.log(errors);
      }
    })
  }
  return (
    <AppLayout>
      <Head title="Modification Etudiant" />
      <main className='mb-3'>
            <div className="remark text-center">
                FICHE D'IDENTIFICATION ETUDIANT
            </div>
            <h1 className="section-title">Modification Etudiant</h1>
            <div>
              <NavLink href={route('show', etudiant.id)}>
                  <button className='button secondary small'><span className='mif-reply'></span> Retour aux détails</button>
              </NavLink>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                  <div className="remark secondary py-1">
                    (*) Champ obligatoire
                  </div>
                  {
                    levels.length == 0 && 
                    <div className='remark danger'>
                      <b>Aucun niveau d'étude enregistré</b> <br />
                      Veuillez vous rendre dans l'onglet <b>Paramètre</b> pour ajouter les niveaux d'étude avant de continuer
                    </div>
                  }
                  {
                    levels.length == 0 && 
                    <div className='remark danger'>
                      <b>Aucun niveau de filière enregistrée</b> <br />
                      Veuillez vous rendre dans l'onglet <b>Paramètre</b> pour ajouter les filières avant de continuer
                    </div>
                  }
                  <div className="d-flex">
                    <div className="cell-md-6">
                      <div className="form-group">
                        <label htmlFor='lastname'>Nom de famille*</label>
                        <input type="text" id='lastname' 
                            value={data.lastname} 
                            onChange={e => setData('lastname', e.target.value)}
                            className='metro-input pl-2' 
                            placeholder="Nom de l'étudiant"/>
                      </div>  
                      {errors.lastname && <div className='fg-red'>Veuillez remplir ce champ</div>}

                      <div className="form-group">
                          <label htmlFor='firstname'>Prénom*</label>
                          <input type="text" id='firstname' 
                              value={data.firstname} 
                              onChange={e => setData('firstname', e.target.value)}
                              className='metro-input pl-2' 
                              placeholder="Prénoms de l'étudiant"/>
                      </div>
                      {errors.firstname && <div className='fg-red'>Veuillez remplir ce champ</div>}

                      <div className="form-group">
                          <label htmlFor='birthday'>Date de naissance*</label>
                          <input type="date" id='birthday' 
                              value={data.birthday} 
                              onChange={e => setData('birthday', e.target.value)}
                              className='metro-input pl-2'/>
                      </div>
                      {errors.birthday && <div className='fg-red'>Veuillez remplir ce champ</div>}

                      <div className="form-group">
                          <label htmlFor='contact'>Contact* <small>(Entrer les 10 chiffres sans espace)</small></label>
                          <input type="tel" id='contact' 
                              value={data.contact} 
                              onChange={e => setData('contact', e.target.value)}
                              className='metro-input pl-2'
                              placeholder='N° de téléphone' />
                      </div>
                      {errors.contact && <div className='fg-red'>{errors.contact}</div>}

                      <div className="form-group">
                          <label htmlFor='email'>Email*</label>
                          <input type="email" id='email' 
                              value={data.email} 
                              onChange={e => setData('email', e.target.value)}
                              className='metro-input pl-2'
                              placeholder='Mail étudiant' />
                      </div>
                      {errors.email && <div className='fg-red'>{errors.email}</div>}

                      <div className="form-group">
                          <label htmlFor='gender'>Genre</label>
                          <select id="gender" data-role='select' 
                              value={data.gender} 
                              onChange={e => setData('gender', e.target.value)}>
                            <option value="masculin">Masculin</option>
                            <option value="feminin">Feminin</option>
                          </select>
                      </div>
                    </div>

                    <div className="cell-md-6">
                      <div className="form-group">
                          <label htmlFor='level'>Niveau d'étude*</label>
                          <select id="level" data-role='select' 
                              value={data.level} 
                              onChange={e => setData('level', e.target.value)}>
                            <option value="">---- Sélection niveau d'étude ----</option>
                            {
                              levels.length > 0 && 
                              levels.map((level) => (
                                <option key={level.id} value={level.id}>{level.label} ({level.code})</option>
                              ))
                            }
                          </select>
                      </div>
                      {errors.level && <div className='fg-red'>Veuillez remplir ce champ</div>}

                      <div className="form-group">
                          <label htmlFor='study_sector'>Filière*</label>
                          <select id="study_sector" data-role='select' 
                              value={data.study_sector} 
                              onChange={e => setData('study_sector', e.target.value)}>
                            <option value="">---- Sélection filière ----</option>
                            {
                              study_sectors.length > 0 && 
                              study_sectors.map((study) => (
                                <option key={study.id} value={study.id}>{study.label} ({study.code})</option>
                              ))
                            }
                          </select>
                      </div>
                      {errors.study_sector && <div className='fg-red'>Veuillez remplir ce champ</div>}
                      <div className='d-flex flex-column justify-center mt-3'>
                          <img src={'/uploads/'+etudiant.photo} alt={etudiant.matricule} height="180" width="181" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="photo">Photo de l'étudiant* <small>(Type de fichier: .jpg, .jpeg, .png)</small></label>
                        <input type="file" data-role="file" onChange={e => setData('photo', e.target.files[0])}
                          data-mode="drop" data-button-title="Cliquer pour choisir un fichier"></input>
                          {progress && (
                            <progress value={progress.percentage} max="100">
                              {progress.percentage}%
                            </progress>
                          )}
                      </div>
                      {errors.photo && <div className='fg-red'>{errors.photo}</div>}
                    </div>
                  </div>
                  
                  <div className="form-group text-center">
                      <button className="button primary" 
                          disabled={processing}><span className='mif-checkmark'></span> Enregistrer les modification</button>
                  </div>
                </form>
            </div>
        </main>
    </AppLayout>
  )
}

export default Edit
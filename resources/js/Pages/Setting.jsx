import React, { useEffect } from 'react'
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
const Setting = ({levels, study_sectors}) => {

  const { data, setData, post, processing, errors, reset } = useForm({
    level_label: '',
    level_code: '',
    filiere: '',
    code_filiere: '',
  })

  function handleLevelFormSubmit(e) {
    e.preventDefault()
    post(route('add-level'), {
      preserveScroll: true,
      onSuccess: () => {
        runToast("success")
        reset()
      }
    })
  }

  function handleStudyFormSubmit(e) {
    e.preventDefault()
    post(route('add-study-sector'), {
      preserveScroll: true,
      onSuccess: () => {
        runToast("success")
        reset()
      }
    })
  }

  return (
    <AppLayout>
      <Head title="Paramètre" />
      <main>
            <div className="remark text-center">
                FICHE D'IDENTIFICATION ETUDIANT
            </div>
            <h1 className="section-title">Paramètre</h1>
            <div data-role="panel"
                data-title-caption="Niveaux d'étude"
                data-title-icon="<span class='mif-apps'></span>">
                
                <div className="d-flex">
                  <div className='cell-md-7'>
                    {
                      levels.length > 0 ?
                      <table className='table subcompact' data-role="table">
                        <thead>
                          <tr>
                            <th>Niveau</th>
                            <th>Code</th>
                            {/* <th></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            levels.map((level) => (
                             <tr key={level.id}>
                              <td>{level.label}</td>
                              <td>{level.code}</td>
                              {/* <td style={{'width': '2rem'}}>
                                <button className='button danger'><span className='mif-bin'></span></button>
                              </td> */}
                             </tr> 
                            ))
                          }
                        </tbody>
                      </table>
                      :
                      <div className='remark danger'> 
                        Pas de niveau d'étude enregistré 
                      </div>
                    }
                  </div>
                  <div className='cell-md-5'>
                    <h2 className='txt-primary'>Ajout niveau d'étude</h2>
                    <form onSubmit={handleLevelFormSubmit}>
                      <div className="remark secondary py-1">
                        (*) Champ obligatoire
                      </div>
                      <div className="form-group">
                          <label></label>
                          <input type="text" id='level_label' 
                              value={data.level_label} 
                              onChange={e => setData('level_label', e.target.value)}
                              className='metro-input pl-2' 
                              placeholder="Entrer le niveau d'étude*"/>
                      </div>
                      {/* {errors.level_label && <div className='fg-red'>{errors.level_label}</div>} */}
                      {errors.level_label && <div className='fg-red'>Veuillez remplir ce champ</div>}
                      {errors.slug && <div className='fg-red'>Le niveau d'étude existe déjà</div>}
                      <div className="form-group">
                          <label></label>
                          <input type="text" id='level_code' 
                              value={data.level_code} 
                              onChange={e => setData('level_code', e.target.value)}
                              className='metro-input pl-2' 
                              placeholder="Abréviatiion nivequ (Ex: LP pour Licence Professionnelle)"/>
                      </div>
                      <div className="form-group">
                          <button className="button primary" 
                              disabled={processing}>Ajouter</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>

            <div className='mt-3' data-role="panel"
                data-title-caption="Filières"
                data-title-icon="<span class='mif-apps'></span>">
                
                <div className="d-flex">
                  <div className='cell-md-7'>
                    {
                      study_sectors.length > 0 ?
                      <table className='table subcompact' data-role="table">
                        <thead>
                          <tr>
                            <th>Filière</th>
                            <th>Code</th>
                            {/* <th></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            study_sectors.map((study) => (
                             <tr key={study.id}>
                              <td>{study.label}</td>
                              <td>{study.code}</td>
                              {/* <td style={{'width': '2rem'}}>
                                <button className='button danger'><span className='mif-bin'></span></button>
                              </td> */}
                             </tr> 
                            ))
                          }
                        </tbody>
                      </table>
                      :
                      <div className="remark danger">
                        Pas de filière enregistrée !
                      </div>
                    }
                  </div>
                  <div className='cell-md-5'>
                    <h2 className='txt-primary'>Ajout une filière</h2>
                    <form onSubmit={handleStudyFormSubmit}>
                      <div className="remark secondary py-1">
                        (*) Champ obligatoire
                      </div>
                      <div className="form-group">
                          <label></label>
                          <input type="text" id='filiere' 
                              value={data.filiere} 
                              onChange={e => setData('filiere', e.target.value)} 
                              className='metro-input pl-2' placeholder="Entrer la filière *"/>
                      </div>
                      {errors.filiere && <div className='fg-red'>Veuillez remplir ce champ</div>}
                      <div className="form-group">
                          <label></label>
                          <input type="text" id='code_filiere' 
                              value={data.code_filiere} 
                              onChange={e => setData('code_filiere', e.target.value)} 
                              className='metro-input pl-2' placeholder="Abréviatiion filière (Ex: GI pour Génie Informatique)"/>
                      </div>
                      <div className="form-group">
                          <button className="button primary">Ajouter</button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </main>
    </AppLayout>
  )
}

export default Setting
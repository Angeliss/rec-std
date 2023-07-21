import React from 'react';
import { Inertia } from "@inertiajs/inertia";
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

const Details = ({etudiant}) => {

  function deleteStudent() { 
    if (confirm(`Etes-vous sure de vouloir suprimer cet étudiant ? Cliquer "OK" pour confirmer la suppression`)) {
      Inertia.delete(route('delete', etudiant), {
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
    } else {
      return false 
    }
  }

  return (
    <AppLayout>
      <Head title="Etudiant" />
      <main>
            <div className="remark text-center">
                FICHE D'IDENTIFICATION ETUDIANT
            </div>
            <h1 className="section-title">Informations Etudiant</h1>
            <div>
              <NavLink href={route('students')}>
                  <button className='button secondary small'><span className='mif-reply'></span> Aller à la liste</button>
              </NavLink>
            </div>
            {
              etudiant ? 
              <div>
                <div className='d-flex'>
                  <div className="cell-md-8">
                    <table className='table'>
                      <tbody>
                        <tr>
                          <th className='text-left'>Nom</th>
                          <td>{etudiant.lastname}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Prenoms</th>
                          <td>{etudiant.firstname}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Date de naissance</th>
                          <td>{etudiant.birthday}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>N° Matricule</th>
                          <td>{etudiant.matricule}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Contact</th>
                          <td>{etudiant.contact}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Genre</th>
                          <td>{etudiant.gender.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Email</th>
                          <td>{etudiant.email}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Niveau</th>
                          <td>{etudiant.level.label}</td>
                        </tr>
                        <tr>
                          <th className='text-left'>Filière</th>
                          <td>{etudiant.study_sector.label}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="cell-md-4">
                      <div className='d-flex flex-column justify-center gap-0'>
                          <img src={'/uploads/'+etudiant.photo} alt={etudiant.matricule} height="180" width="181" />
                      </div>
                  </div>
                </div>
                <div className="text-center">
                  <button onClick={deleteStudent} className='button alert small mr-3'>
                    <span className="mif-bin"></span> Supprimer
                  </button> 
                  <NavLink href={route('edit', etudiant.id)}>
                      <button className='button success small'><span className='mif-pencil'></span> Modifier</button>
                  </NavLink>

                </div>
              </div>
              : 
              <div className='remark danger'>
                Cet étudiant n'existe pas ou a été suprimé
              </div>
            }
        </main>
    </AppLayout>
  )
}

export default Details
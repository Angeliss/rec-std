import React from 'react'
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
const List = ({etudiants}) => {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <main>
            <div className="remark text-center">
                FICHE D'IDENTIFICATION ETUDIANT
            </div>
            <h1 className="section-title">Liste des étudiants</h1>
            {
                etudiants.length > 0 ? 
                <div className="bg-white p-2">
                    <div className="text-right mb-2">
                        <b>{etudiants.length}</b> Etudiant(s) enregistré(s)
                    </div>
                    <table className='table subcompact' data-role='table'>
                        <thead>
                            <tr>
                                <th>Nom & Prénoms</th>
                                <th>Matricule</th>
                                <th>Niveau</th>
                                <th>Filiaire</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                etudiants.map((etudiant) => (
                                    <tr key={etudiant.id}>
                                        <td>{etudiant.lastname+' '+etudiant.firstname}</td>
                                        <td>{etudiant.matricule}</td>
                                        <td>{etudiant.level.label}</td>
                                        <td>{etudiant.study_sector.label}</td>
                                        <td>
                                            <NavLink href={route('show', etudiant.id)}>
                                                <span type='button' className='button primary small'><span className='mif-plus'></span> Détails</span>
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                :
                <div className="remark danger">
                    Aucun étudiant enregistré !
                </div>
            }
            
        </main>
    </AppLayout>
  )
}

export default List
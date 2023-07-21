import React from 'react'
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
const Dash = ({latest}) => {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <main>
            <div className="remark text-center">
                FICHE D'IDENTIFICATION ETUDIANT
            </div>
            <h1 className="section-title">Tableau de bord</h1>
            <div className="recent-order">
                <h2>Ajout Recent</h2>
                {
                    latest.length > 0 ?
                    <table>
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
                                latest.map((etd) => (
                                    <tr key={etd.id}>
                                        <td>{etd.lastname+' '+etd.firstname}</td>
                                        <td>{etd.matricule}</td>
                                        <td>{etd.level.label}</td>
                                        <td>{etd.study_sector.label}</td>
                                        <td>
                                            <NavLink href={route('show', etd.id)}>
                                                <span type='button' className='button primary small'><span className='mif-plus'></span> Détails</span>
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div className="remark danger">
                        Pas d'étudiant enregistré
                    </div>
                }
                <NavLink href={route('students')}>
                    <h3 className='a-link'>Voir la liste complète</h3>
                </NavLink>
            </div>
        </main>
    </AppLayout>
  )
}

export default Dash
import React from 'react'
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
const Dash = () => {
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
                        <tr>
                            <td>BINDIE Ange</td>
                            <td>BAN231290001</td>
                            <td>Licence Professionnelle</td>
                            <td>GI</td>
                            <td className="txt-primary">Details</td>
                        </tr>
                    </tbody>
                </table>
                {/* <a href="#">Voir la liste complète</a> */}
                <NavLink href={route('students')}>
                    <h3 className='a-link'>Voir la liste complète</h3>
                </NavLink>
            </div>
        </main>
    </AppLayout>
  )
}

export default Dash
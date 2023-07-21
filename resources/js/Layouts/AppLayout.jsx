import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import '../../css/style.css';
import SearchForm from '@/Components/SearchForm';

export default function AppLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="principal">
        <aside>
            <div className="top d-flex flex-align-center flex-justify-between">
                <div className="logo d-flex flex-align-center">
                    <h2>Rec-<span className="danger">Std</span> </h2>
                </div>
                <div className="close" id="close-btn">
                    <span className="mif-cross-light"></span>
                </div>
            </div>

            <div className="left-sidebar">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <span className="mif-home"></span>
                    <h3>Tableau de bord</h3>
                </NavLink>
                <NavLink href={route('students')} active={route().current('students')}>
                    <span className="mif-users"></span>
                    <h3>Etudiants</h3>
                </NavLink>
                <NavLink href={route('setting')}>
                    <span className="mif-cog"></span>
                    <h3>Paramètre</h3>
                </NavLink>
            </div>
        </aside>
        {/* ----------------------END OF ASIDE ---------------------------- */}
            { children }
        {/* -- ------------------END MAIN ------------------- -- */}
        <div className="right">
            <div className="top">
                <button id="menu-btn">
                    <span className="mif-menu"></span>
                </button>

                <SearchForm />
                
                <div className="theme-toggler">
                    <span className="mif-sun active"></span>
                    <span className="mif-moon2"></span>
                </div>
            </div>
            {/* -- -------- END TOP -------- -- */}
            {
                (route().current('students') || route().current('dashboard')|| route().current('show')) &&
                <div className="sales-analytics">
                    <div className="item add-product">
                        <NavLink href={route('create')}>
                            <div>
                                <span className="mif-add"></span>
                                <h3>Nouveau Etudiant</h3>
                            </div>
                        </NavLink>
                    </div>
                </div>
            }
        </div>
    </div>
    );
}

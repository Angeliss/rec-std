import { Inertia } from "@inertiajs/inertia";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SearchForm() {
//     const { data, setData, errors } = useForm({
//     search: '',
//   })
    const [values, setValues] = useState({
        mat: "",
    })
    
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (values.mat == '') {
            runInfo("error", "Veuillez saisir le matricule")    
        } else {
            Inertia.get(route('search'), values, {
                preserveScroll: true,
                onSuccess: () => {
                    runToast("success")
                    reset()
                }, 
                onError: (errors) => {
                    console.log(errors);
                }
            })
        }
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(e);
    //     if (data.search == '') {
    //         alert("Entrer le matricule de l'etudiant !")
    //     } else {
    //         alert('Ok');
    //         Inertia.get(route('search', data.search),{
    //             preserveScroll: true,
    //             onSuccess: (res) => {
    //                 console.log(res);
    //             }, 
    //             onError: (errors) => {
    //                 console.log(errors);
    //             }
    //         });
    //     }
    // }
    return (
        <form onSubmit={handleSubmit} className="top-search-form">
            {/* <input type="text" id="search" data-role="input" value={values.search}  
                onChange={handleChange}
                data-search-button="true" /> */}
            <input type="search" id="mat" data-role="input" value={values.mat}  
                onChange={handleChange} />
        </form>
    );
}

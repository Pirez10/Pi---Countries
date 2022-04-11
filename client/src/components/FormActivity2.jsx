import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postActivity } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import style from './FormActivity2.module.css';



function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is require";
    } else if (!input.duration) {
        errors.duration = "Duration is require";

    } else if (!input.idCountry) {
        errors.idCountry = "Country is require";

    } else if (!input.difficulty) {
        errors.difficulty = "Dificulty is require";

    }
    else if (!input.season) {
        errors.season = "Season is require";
    }

    return errors;
}


export default function FormActivity() {
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch();

    const stateInitialForms = {
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        /* country: "", */
        idCountry: "",
    };

    const [input, setInput] = useState(stateInitialForms);
    const [errors, setErrors] = useState({});




    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handleCheckCountry = (e) => {
        setInput({
            ...input,
            idCountry: e.target.value
            /* country: input.country.concat(e.target.value) */
        })

        setErrors(
            validate({
                ...input,
                idCountry: e.target.value
                /* country: input.country.concat(e.target.value) */
            })
        )
    }

    const handleCheckSeason = (e) => {
        setInput({
            ...input,
            season: e.target.value

        })

        setErrors(
            validate({
                ...input,
                season: e.target.value,
            })
        );
    }

    const handleCheckDifficulty = (e) => {
        setInput({
            ...input,
            difficulty: e.target.value

        })

        setErrors(
            validate({
                ...input,
                difficulty: e.target.value,
            })
        );
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert("Please complete the information required");
        } else if (
            input.name === "" &&
            input.duration === "" &&
            input.difficulty === "" &&
            input.season === "" &&
            input.idCountry === ""

        ) {
            alert("Please complete the form");
        } else {
            dispatch(postActivity(input));
            alert("New activity added successfully!");
            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                /* country: "", */
                idCountry: "",
            });
        }
    };

    return (

        <div /* className={style.totalform} */>
            <div >
                <Link to="/home">
                    <button className={style.link} > GO HOME </button>
                </Link>
                <div className={style.titulo}>Create a new activity</div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className={style.container}>
                <div className={style.div}>
                    <label className={style.label}>Name:</label>
                    <input
                        className={style.inputName}
                        placeholder="name...."
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name && <p className={style.danger}>{errors.name}</p>}
                </div>

                <div className={style.div}>
                    <label className={style.label} >Duration:</label>
                    <input
                        className={style.inputDuration}
                        placeholder="Duration in minutos...."
                        type="text"
                        name="duration"

                        value={input.duration}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.duration && (<p className={style.danger}>{errors.duration}</p>)}
                </div>


                {/* //----------------------------------------------------- */}

                <div className={style.div}>
                    <label className={style.label}>Countries:</label>
                    <select className={style.selectCountry} onChange={handleCheckCountry}  multiple>
                        {
                            countries?.map(country => {
                                return (
                                    <option key={country.id} name="idCountry" value={(country.id)}>{country.name}</option>
                                )
                            })
                        }

                    </select>
                    {errors.idCountry && (<p className={style.danger}>{errors.idCountry}</p>)}
                </div>



                <div className={style.div}>
                    <label className={style.label}>Difficulty:</label>
                    <select  name="difficulty" onChange={handleCheckDifficulty}>
                        <option>Difficulty level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.difficulty && (<p className={style.danger}>{errors.difficulty}</p>)}
                </div>

                <div className={style.div}>
                    <label className={style.label}>Seasson:</label>
                    <select  onChange={handleCheckSeason} name="season">
                        <option>Seasson...</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                    {errors.season && (<p className={style.danger}>{errors.season}</p>)}
                </div>

                <div >
                    <input className={style.butonAct} type="submit" />
                </div>

            </form>

        </div>

    );
}
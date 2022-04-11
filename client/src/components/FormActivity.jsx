import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postActivity } from '../redux/Action';
import style from './FormActivity.module.css';

const Validate = (activity) => {
    let error = {}

    /* if (!input.name){
        error.name = "Name is require"
    }else if (!input.duration){
        error.duration = "Duration is require" */
    /* }else */ if (!activity.difficulty){
        error.difficulty = "Dificulty is require"
    }else if(!activity.season){
        error.season = "Season is require"
    }
    return error
}

const FromActivity = () => {
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch()

    const [formvalidate, setFormValidate] = useState(false)
    const [error, setError] = useState({})
    const [activity, setActivity] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        /* country: [] */
        idCountry: "",
    })

    useEffect(() => {
        if (!activity.name) {
            setError({ ...error, name: "you need to specify the name of the activity" })
        }
        else if (!activity.duration.length) {
            setError({ ...error, duration: "please specify the duration" })
        }
    }, [activity])

    const handleSeason = (e) => {
        setActivity({...activity,
        season: e.target.value  
    })
        setError(Validate({...activity,
        season: e.target.value
    }))
    }

    const handleActivity = (e) => {
        setFormValidate(false)
        e.preventDefault()
        if (e.target.name !== "country" && e.target.name !== "difficulty") {
            setActivity({
                ...activity,
                [e.target.name]: e.target.value
            })
        }
        else if (e.target.name === "difficulty") {
            setActivity({
                ...activity,
                [e.target.name]: e.target.value
            })
        }
        else {
            setActivity({
                ...activity,
                [e.target.name]: activity[e.target.name].concat(e.target.value)
            })

        }

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setFormValidate(true)
        dispatch(postActivity(activity))
        setActivity("")
    }
    return (
        <div className={style.totalform}>
            <div >
                <div className={style.volverA}>
                    <Link className={style.volver} to='/home'> GO HOME </Link>
                </div>
                <div className={style.titulo}>Create a new activity</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div >
                    <div className={style.inputName}>
                        <input required autoComplete="off" className={style.dur} placeholder="Name" name="name" onChange={handleActivity} value={activity.name}></input>
                    </div>
                    <div className={style.inputDuration}>
                        <input required autoComplete="off" className={style.dur} type="number" placeholder="Duration(in minutes)" name="duration" onChange={handleActivity} value={activity.duration}></input>
                    </div>
                    <div className={style.selectDifficulty}>
                        <select value = {activity.difficulty} className={style.difficulty} name="difficulty" onChange={handleSeason/* handleActivity */}>
                            <option>Difficulty level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className={style.selectSeasson}>
                        <select value = {activity.season} className={style.season} onChange={handleSeason/* handleActivity */} name="season">
                            <option>Seasson...</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                    {error.season && (<p>{error.season}</p>)}
                </div>

                <div>
                    <select className={style.multiSelect} onChange={handleActivity} name="idCountry" id="idCountry" multiple>
                        {
                            countries?.map(country => {
                                return (
                                    <option key={country.id} value={(country.id)}>{country.name}</option>
                                )
                            })
                        }

                    </select>

                    <div >
                        <input className={style.butonAct} type="submit" />
                    </div>
                </div>
 
                {
                    formvalidate ? <div className={style.confirmacion}>created The activity was successfully</div> : null
                }
            </form>
        </div>
    )
}

export default FromActivity;
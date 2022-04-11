import React from "react"

const Activity = ({activities, countryName}) =>{
    if(activities && activities.length){
    return(
        <div >
            <h2>Activities to do in {countryName}</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration (minutos)</th>
                    <th>Season</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>
                {activities && activities.map((a)=>
                <tr key={a.id} >
                    <td>{a.name}</td>
                    <td>{a.duration}</td>
                    <td>{a.season}</td>
                    <td>{a.difficulty}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )
    } else{
        return (
            <h2>You didnt organize anything yet...</h2>
        )
    }
}

export default Activity;
import React, {useState, useEffect} from 'react'
import Tables from '../../Base/Tables/Tables';
import DbTable from '../../MyComponents/dbTable/dbTable';
import {tempUserID, UserDatabasesAPI } from '../../../services/backendUrls';

export default function Databases() {
    const[DbTables, setDbTables] = useState([]);

    useEffect(() => {
        getDataFromAPI()
        
    }, [])

    
    
    function getDataFromAPI() {
        fetch(UserDatabasesAPI + tempUserID, {
            method: "GET"
        })
        .then(res => res.json())
        .then(json => {
            if(json.isValid) {
                console.log(json.databases)
                setDbTables(json.databases)
            }
        })
    }
    
    
    return (
        <div >
            
            <DbTable databases={DbTables}></DbTable>
            {/* {           
                DbTables.map(db => (<div>{db.databaseName}</div>))
            } */}
           
            {/* <Tables></Tables> */}
        </div>
    )
}

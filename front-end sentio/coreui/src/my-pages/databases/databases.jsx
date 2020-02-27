import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { fetchUserDatabases, deleteDatabase} from '../../services/redux/actions/databases-actions';

function Databases({userId, databases, getUserDatabases, deleteDb}) {
    
    
    useEffect(()=>{  
        debugger
        getUserDatabases(userId)
     }, [])

    

    return (
        
        <div>
{console.log(databases)}
            There will be displayed all databases
        </div>
    )
}

function mapStateToProps( state) {
    console.log(state, 'cia tas state pries seta')

    return {
    userId: state.user.id,
    databases: state.databases.databases
    }
}

const mapDispatchToProps = dispatch => ({
    getUserDatabases: uid => dispatch(fetchUserDatabases(uid)),
    deleteDb: dbId => dispatch(deleteDatabase(dbId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Databases)
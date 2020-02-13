import React from 'react'
import Tables from '../../Base/Tables/Tables';
import DbTable from '../../MyComponents/dbTable/dbTable';

export default function Databases() {
    return (
        <div>
            Welcome from databases component
            <DbTable></DbTable>
            {/* <Tables></Tables> */}
        </div>
    )
}

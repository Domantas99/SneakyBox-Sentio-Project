import React, { useState, useEffect } from 'react';
import './creation.scss';
import { useSelector} from 'react-redux';
import {allTableDataResultAPI} from '../../services/backend';
import TableCard from '../../components/table-card/table-card';

export default function Creation() {
  const db = useSelector(state=>state.DbConnection);
  const [data, setData] = useState([]);
  
  useEffect(()=> {
      const url = allTableDataResultAPI + db.DatabaseId;
      fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(db)
      })
      .then(res => res.json())
      .then(json => {
        if(json.isValid) {
          setData(json.tableModels)
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="container2" >
      <div>{db.DatabaseType}</div>
      <div className="container">
          <div className="sub-container1">
          <input placeholder="Search" type="text"/>
            {
              data.map(tableModel => (
                <TableCard table={tableModel}></TableCard>
                // <div className="item1">
                //   <h2>{table.tableName}</h2>
                //   <ul>
                //   {
                //     table.properties.map(prop => (
                //     <li>{prop.collumnName} ---- {prop.collumnType}</li>    
                //     ))
                //   }
                //   </ul>
                // </div>
                ))
            }
          </div>
          <div className="sub-container2">
            <div>List of items</div>
            <div>
              Items..
            </div>
            <button className="btn-custom">Custumize</button>
          </div>
      </div>
    </div>
  );
}

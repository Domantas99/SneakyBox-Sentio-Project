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
      fetch(url, 
        {
        method: 'GET',
        // headers: {
        // 'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(db)
      }
      )
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
                <TableCard key={tableModel.id} table={tableModel}></TableCard>           
                ))
            }
          </div> 
          <div className="sub-container2">
          <button className="btn-custom">Custumize</button>
          <div>Selected</div>
            <div>
              <div className="item1">item A</div>
              <div className="item1">item B</div>
            </div>      
          </div>
      </div>
    </div>
  );
}

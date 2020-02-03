import React, { useState, useEffect } from 'react';
import './creation.scss';
import { useSelector} from 'react-redux';

export default function Creation() {
  const db = useSelector(state=>state.DbConnection);
  
  useEffect(()=> {
    console.log(db, ' cia db')
  })
  

  return (
    <div>
        welcome from creation page
    </div>
  );
}

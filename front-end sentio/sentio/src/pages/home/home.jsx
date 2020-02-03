import React from 'react';
import './home.scss';
import ConnectionForm from '../../components/connection-form/connection-form';
import { useSelector} from 'react-redux';

export default function Home() {
  // const connStr = useSelector(state=>state.connectionStr);
  return (
    <div>
        <div className="home">
            {/* <h1>{connStr}</h1> */}
            <ConnectionForm></ConnectionForm>

           
        </div>
    </div>

  );
}

import React from 'react';
import './home.scss';
import ConnectionForm from '../../components/connection-form/connection-form';

export default function Home(props) {
  return (
    <div>
        <div className="home">
            <ConnectionForm></ConnectionForm>     
        </div>
    </div>
  );
}

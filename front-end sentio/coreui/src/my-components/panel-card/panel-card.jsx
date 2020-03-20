import React from 'react';
import './panel-card.scss';
import { Label } from 'reactstrap';

export default function PanelCard({panel}) {
  return (
    <>
        <div className="panel-card">  
            <div className="panel-card-line">
                <Label className="panel-card-line-title">Legend:</Label>
                <Label>{panel.legend}</Label>
            </div>
            <div className="panel-card-line">
                <Label className="panel-card-line-title">Panel Type:</Label>
                <Label>{panel.panelType}</Label>
            </div>
        </div>
    </>
  );
}

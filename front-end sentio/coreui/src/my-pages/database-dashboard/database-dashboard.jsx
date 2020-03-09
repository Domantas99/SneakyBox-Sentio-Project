import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';

export default function DatabaseDashboard(props) {
    const dbId = props.match.params.dbId
    return (
        <div>
            <Link to={`/databases/${dbId}/metrics`}>
                    <Button color="success">View Metrics</Button>
                </Link>
                <Link to={`/databases/${dbId}/panels`}>
                    <Button color="success">View Panels</Button>
                </Link>
                <Link to={`/databases/${dbId}/dashboards`}>
                    <Button color="success">View Dashboards</Button>
                </Link>
        </div>
    )
}

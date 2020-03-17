import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';
import { fetchDbMetrics } from '../../services/redux/actions/metrics-actions';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';
import { fetchDashboards } from '../../services/redux/actions/dashboards-actions';

// database dashboard to view data
import './database-dashboard.scss';
import { connect } from 'react-redux';
function DatabaseDashboard(props) {
    const userId = props.user.id;
    const dbId = props.match.params.dbId;
    const metrics = props.metrics;
    const panels = !props.panels.isFetching || (!props.panels.isFetching && !props.panels.error) ? props.panels.panels.filter(p => p.databaseId === dbId) : [];
    const dashboards = props.dashboards.filter(x => x.databaseId === dbId);
    useEffect(() => {
        props.getMetrics(dbId);
        props.getPanels(userId);
        props.getDashboards(userId);
    }, [])

    return (
        <div className="db-dash-container">
            <div className="db-dash-container-item">
                <Card className="db-dash-container-item__card">
                    <CardHeader className="db-dash-container-item__card-header">
                        <div>
                            <strong><h3>Metrics</h3></strong>
                        </div>
                        <div>
                            <Link to={`/databases/${dbId}/metrics`}>
                               <Button color="success">View More</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody>
                        
                        <ListGroup className="db-dash-container-item__card-list">
                        
                        {
                            metrics.length > 0 ? metrics.map(metric => (       
                                <ListGroupItem>{metric.name}</ListGroupItem>
                            )) : <ListGroupItem>No metrics yet</ListGroupItem>
                        }  
                        </ListGroup>
                    </CardBody>
                </Card>
            </div>

            <div className="db-dash-container-item">      
                <Card className="db-dash-container-item__card">
                    <CardHeader className="db-dash-container-item__card-header">
                        <div>
                            <strong><h3>Panels</h3></strong>
                        </div>
                        <div>
                        <Link to={`/databases/${dbId}/panels`}>
                            <Button color="success">View More</Button>
                        </Link>
                        </div>
                    </CardHeader>
                    <CardBody>
                        
                        <ListGroup className="db-dash-container-item__card-list">
                            {
                            panels.length > 0 ? panels.map(panel => (       
                                <ListGroupItem>{panel.legend}</ListGroupItem>
                            )) : <ListGroupItem>No panels yet</ListGroupItem>
                            } 
                        </ListGroup>
                    </CardBody>
                </Card>
            </div>

            <div className="db-dash-container-item">
                <Card className="db-dash-container-item__card">
                    <CardHeader className="db-dash-container-item__card-header">
                        <div>
                            <strong><h3>Dashboards</h3></strong>
                        </div>
                        <div>
                        <Link to={`/databases/${dbId}/dashboards`}>
                            <Button color="success">View More</Button>
                        </Link>
                        </div>
                    </CardHeader>
                    <CardBody>
                    <ListGroup className="db-dash-container-item__card-list">
                        {
                           dashboards.length > 0 ? dashboards.map(dashboard => (       
                           <ListGroupItem>{dashboard.name}</ListGroupItem>
                           )) :
                            <ListGroupItem>No dashboards yet</ListGroupItem>
                        } 
                    </ListGroup>
                </CardBody>
            </Card>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    metrics: state.metrics.metrics,
    panels: state.panels,
    dashboards: state.dashboards.dashboards,
    user: state.user
});
const mapDispatchToProps = dispatch => ({
    getMetrics: dbId => dispatch(fetchDbMetrics(dbId)),
    getPanels: userId => dispatch(fetchAllPanels(userId)),
    getDashboards: userId => dispatch(fetchDashboards(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDashboard)
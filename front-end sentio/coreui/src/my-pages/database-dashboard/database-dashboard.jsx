import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';
import { fetchDbMetrics } from '../../services/redux/actions/metrics-actions';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';

// database dashboard to view data
import './database-dashboard.scss';
import { connect } from 'react-redux';
function DatabaseDashboard(props) {
    const userId = props.user.id;
    const dbId = props.match.params.dbId;
    const metrics = props.metrics;
    debugger;
    const panels = !props.panels.isFetching || (!props.panels.isFetching && !props.panels.error) ? props.panels.panels.filter(p => p.databaseId === dbId) : [];

    useEffect(() => {
        props.getMetrics(dbId);
        props.getPanels(userId)
    }, [])

    return (
        <div className="db-dash-container">
            <div className="db-dash-container-item">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i><strong>Metrics</strong>
                    </CardHeader>
                    <CardBody>
                        <Link to={`/databases/${dbId}/metrics`}>
                            <Button color="success">View More Details</Button>
                        </Link>
                        <ListGroup>
                        
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
                <Card>
                    <CardHeader>
                    <i className="fa fa-align-justify"></i><strong>Panels</strong>
                    </CardHeader>
                    <CardBody>
                        <Link to={`/databases/${dbId}/panels`}>
                            <Button color="success">View Panels</Button>
                        </Link>
                        <ListGroup>
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
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i><strong>Dashboards</strong>
                    </CardHeader>
                    <CardBody>
                    <Link to={`/databases/${dbId}/dashboards`}>
                        <Button color="success">View Dashboards</Button>
                    </Link>
                    <ListGroup>
                        {
                        //    panels.length > 0 ? panels.map(panel => (       
                        //    <ListGroupItem>{panel.legend}</ListGroupItem>
                        //    )) :
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
    user: state.user
});
const mapDispatchToProps = dispatch => ({
    getMetrics: dbId => dispatch(fetchDbMetrics(dbId)),
    getPanels: userId => dispatch(fetchAllPanels(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDashboard)
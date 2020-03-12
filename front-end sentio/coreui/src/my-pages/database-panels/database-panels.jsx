import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';

function DatabasePanels(props) {
    const dbId = props.match.params.dbId;
    const userId = props.user.id;
    const dbPanels = props.panels ? props.panels.filter(p => p.databaseId === dbId) : [];
    
    useEffect(() => {
      props.getPanels(userId);         
    }, [])


    return (

        <div>
          { console.log(dbPanels,'cia props db panel')}
            <Col xs="6" lg="6">
                
                <Link to={`/databases/${dbId}/panels/creation/metric-selection`}>
                    <Button color="success">Create new panel</Button>
                </Link>
                
            <Card>
              <CardHeader>
                 <h3>Panels</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Panel name</th>
                        <th>Panel Type</th>  
                        <th>Edit</th>  
                        <th>Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dbPanels.map(panel => <tr>
                        <td>{ panel.legend }</td>
                        <td>{ panel.panelType }</td>
                        <td>
                          <Button className="px-3" color="warning"><i className="cui-pencil icons"></i></Button>
                        </td>
                        <td>
                          <Button className="px-3" color="danger"><i className="cui-trash icons"></i></Button>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            </Col>       
        </div>
    )
}
const mapStateToProps = state => ({
  user: state.user,
  panels: state.panels.panels
});
const mapDispatchToProps = dispatch => ({
  getPanels: userId => dispatch(fetchAllPanels(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasePanels)
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchAllPanels, DeletePanel  } from '../../services/redux/actions/panel-actions';
import { resetPanelOptions  } from '../../services/redux/actions/tempPanelOptions-actions';


function DatabasePanels(props) {
    const dbId = props.match.params.dbId;
    const userId = props.user.id;
    const dbPanels = props.panels ? props.panels.filter(p => p.databaseId === dbId) : [];
    
    useEffect(() => {
     // props.getPanels(userId);         
     // reiktu reseting temppaneloptions
      props.getPanels("72c50eeb-bb66-47fa-ae1d-63eacbeb74fe");     
      props.resetTempPanelOptions();
    }, [])

    function onDeleteClick(panelId) {
      props.deletePanel(panelId);
    }

    return (
        <div>     
          {console.log(props, 'db panels props')}
            <Card>
              <CardHeader className="container-header">
                <div>
                  <h3>Panels</h3>
                </div>
                <div>
                  <Link to={`/databases/${dbId}/panels/creation/metric-selection`}>
                    <Button color="success">Create new panel</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="container__table" responsive>
                  <thead>
                    <tr>
                        <th className="container__table-row-text">Panel name</th>
                        <th className="container__table-row-text">Panel Type</th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dbPanels.map(panel => <tr>
                        <td className="container__table-row-text">{ panel.legend }</td>
                        <td className="container__table-row-text">{ panel.panelType }</td>
                        <td className="container__table-row-action">
                          <Link to={`/databases/${dbId}/panels/edit/${panel.id}/metric-selection`}>
                            <Button className="px-3" color="warning"><i className="cui-pencil icons"></i></Button>
                          </Link>
                        </td>
                        <td className="container__table-row-action">
                          <Button onClick={() => onDeleteClick(panel.id)} className="px-3" color="danger"><i className="cui-trash icons"></i></Button>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>  
        </div>
    )
}
const mapStateToProps = state => ({
  user: state.user,
  panels: state.panels.panels
});
const mapDispatchToProps = dispatch => ({
  getPanels: userId => dispatch(fetchAllPanels(userId)),
  deletePanel: panelId => dispatch(DeletePanel(panelId)),
  resetTempPanelOptions: () => dispatch(resetPanelOptions())
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabasePanels)
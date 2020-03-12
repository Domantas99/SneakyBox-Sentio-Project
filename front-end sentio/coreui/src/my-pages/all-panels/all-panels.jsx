import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

function AllPanels(props) {
    const userId = props.user.id;
    const panels = props.panels ? props.panels : [];
 
    useEffect(() => {
        props.getPanels(userId);     
    }, [])


    return (
        <div>
            {console.log(panels, 'cia panels')}
            <h1>Welcome to panels list page</h1>
            {/* there will be listed all panels and you will be able to create one */}
            <Col xs="6" lg="6">
                
                <Link to={`/databases`}>
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
                      panels.map(panel => <tr>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(AllPanels)

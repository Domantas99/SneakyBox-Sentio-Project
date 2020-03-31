import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './all-panels.scss';

function AllPanels(props) {
    const userId = props.user.id;
    let panels = props.panels ? props.panels : [];
    const [sortReverse, setSort] = useState(false);

    useEffect(() => {
        props.getPanels(userId);     
    }, [])

    function sortTable(property) {
      debugger;
      let temp = panels;
      switch (property){
        case 'panelName':
          temp.sort((a, b) => (a.legend.toLowerCase() > b.legend.toLowerCase()) ? 1: -1);
          break;
        case 'panelType':
          temp.sort((a, b) => (a.panelType.toLowerCase() > b.panelType.toLowerCase()) ? 1: -1);
          break;
        default:
      }
      if(sortReverse) {
        temp.reverse();
      }
      setSort(!sortReverse);
      panels = temp;
    }



    return (
        <div>
            <Card>
              <CardHeader className="container-header">
                <div>
                 <h3>Panels</h3>
                </div>
                <div>
                  <Link to={`/databases`}>
                    <Button color="success">Create new panel</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th className="container__table-row-text">Panel Name <i onClick={() => sortTable('panelName')} className="fa fa-sort fa-lg"></i></th>
                        <th className="container__table-row-text">Panel Type <i onClick={() => sortTable('panelType')} className="fa fa-sort fa-lg"></i></th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      panels.map(panel => <tr key={panel.id}>
                        <td className="container__table-row-text">{ panel.legend }</td>
                        <td className="container__table-row-text">{ panel.panelType }</td>
                        <td className="container__table-row-action">
                          <Button className="px-3" color="warning"><i className="cui-pencil icons"></i></Button>
                        </td>
                        <td className="container__table-row-action">
                          <Button className="px-3" color="danger"><i className="cui-trash icons"></i></Button>
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
    getPanels: userId => dispatch(fetchAllPanels(userId))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(AllPanels)

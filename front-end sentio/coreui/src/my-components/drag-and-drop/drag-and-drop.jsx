import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { addDashboard, updateDashboard } from '../../services/redux/actions/dashboards-actions';
import './drag-and-drop.scss';


let uniqId=0;
class DragDrop extends React.Component {
    constructor(props){
        super(props)
        console.log(props, 'cia props construktoriuje')
        const dashboard = props.dashboard;
        const panels = props.panels;
        let currentDashboardPanels = [];
        if(dashboard) {
            for (let i = 0; i < dashboard.dashboardPanels.length; i++) {
                const dPanel = dashboard.dashboardPanels[i];
                for (let j = 0; j < panels.length; j++) {
                    if(dPanel.panelId === panels[j].id) {
                        currentDashboardPanels.push(panels[j]);
                    } 
                }
            }
        }
        console.log(currentDashboardPanels, 'cia tos panels');
        this.state = {
          dashboard: props.dashboard,
          container : currentDashboardPanels,
          data: props.data,
          name: props.dashboard?.name || ''
        }
    }
    
    onSubmit = () => {
        debugger;
        if(!this.state.dashboard) {
            this.makeAdd();
        }
        else {
            this.makeUpdate();
            
        }
    }

    makeAdd() {
        const obj = JSON.stringify({ 
            Name: this.state.name,
            DatabaseId: this.props.dbId,
            Panels: this.state.container
        });
        this.props.addDashboard(obj)
            .then(res => {
                if(res.json.isValid) {
                    alert("Dashboard added successfully")
                }
                else {
                    alert("There was an error adding");
                }
            });
    }

    makeUpdate() {
        let newObj = this.state.dashboard;
            let newDashboardPanels = [];
            const panels = this.state.container;
            for (let i=0; i< panels.length; i++) {
                newDashboardPanels.push({
                                        DashboardId: this.props.dashboard.id,
                                        PanelId : panels[i].id
                                    });
            }
            newObj.name= this.state.name;
            newObj.dashboardPanels = newDashboardPanels;
            this.props.updateDashboard(newObj)
                .then(res => res.json())
                    .then(json => {
                        if(json.isValid) {
                            alert("Dashboard updated successfully")
                        }
                        else {
                            alert("There was an error updating");
                        }
                    });
    }

    onNameChange = (value) => {
        this.setState({name: value});
    }

    onDragStart = (e,v) =>{
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData( "text/plain", JSON.stringify(v) )
    }
    
    allowDrop = ev =>{
        ev.preventDefault();
    }
    
    onDropLeft = e =>{
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        console.log(JSON.parse(data), 'cia data');
    
        let {container} = this.state;
        const deserializeObj =JSON.parse(data);
        const obj = {...deserializeObj, uniqId};
        console.log(obj, 'cia naujas obj');
        uniqId+=1;
        container.push(obj);
        this.setState({ container });
    }
    
    onRemoveClick = uniqueId => {
        let { container } = this.state; 
        container =  container.filter(x=> x.uniqId !== uniqueId)
        this.setState({ container });
    }

    render() {

        return(<>
            { console.log(this.props, 'cia props drag drope') }
            <div className="container-main">
                <div className="container-data">                    
                    <div className="DragAndDrop">
                        <h2>Available panels</h2>
                        <div className="DragAndDrop__list">
                        {
                            this.props.data.map((item) =>{
                            return <div className="DragAndDrop__list-item" draggable="true" onDragStart={ (e) => this.onDragStart(e, item) } >
                                    <ul>
                                        <li>{item.legend}</li>
                                        <li>{item.panelType}</li>
                                    </ul>                          
                                </div>
                        })
                        }
                        </div>
                    </div>
        
                    <div className="DragAndDrop" onDragOver={this.allowDrop} onDrop={this.onDropLeft}>
                    <h2>Your dashboard panels</h2>
                    <div className="DragAndDrop__list">
                        {    
                            this.state.container.map( item => {
                                    return <div className="DragAndDrop__list-item">{item.text}          
                                                <ul>
                                                    <li>{item.legend}</li>
                                                    <li>{item.panelType}</li>
                                                </ul>  
                                                <Button onClick={()=> this.onRemoveClick(item.uniqId)}>Remove</Button>
                                            </div>
                        })
                        }
                    </div>
                    </div>
                </div>
                <div className="container-submit">        
                    <label htmlFor="">Enter your dashboard name</label>
                    <Input value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)}></Input>
                    <Button onClick={() => this.onSubmit()}>Sumbit</Button>        
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = state => ({
    panels: state.panels.panels
});
const mapDispatchToProps = dispatch => ({
    addDashboard: json => dispatch(addDashboard(json)),
    updateDashboard: obj => dispatch(updateDashboard(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(DragDrop)
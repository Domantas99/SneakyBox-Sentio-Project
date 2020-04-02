import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Label } from 'reactstrap';
import { addDashboard, updateDashboard } from '../../services/redux/actions/dashboards-actions';
import './drag-and-drop.scss';
import PanelCard from '../panel-card/panel-card';

let uniqId=0;
class DragDrop extends React.Component {
    constructor(props){
        debugger
        super(props)
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
        const p = props.data.filter(x => x.databaseId === props.dbId)

        this.state = {
          dashboard: props.dashboard,
          container : currentDashboardPanels,
          data: p,
          name: props.dashboard?.name || ''
        }
    }
    
    onSubmit = () => {
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
                .then(res => res.json)
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
        let {container} = this.state;
        const deserializeObj =JSON.parse(data);
        const obj = {...deserializeObj, uniqId};
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
            <div className="container-main">
                <h2 className="container-main-header">Drag and drop panels to your dashboard</h2>                
                <div className="container-data">    
                    <div className="DragAndDrop">
                        <h2>Available panels</h2>
                        <div className="DragAndDrop__list">
                        {
                            this.state.data.map((item, index) =>{
                            return <div key={item.id + index} className="DragAndDrop__list-item" draggable="true" onDragStart={ (e) => this.onDragStart(e, item) } >
                                        <PanelCard panel={item}></PanelCard>
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
                                    return <div key={item.id} className="CardWithRemove">     
                                                <PanelCard className="CardWithRemove-panel" panel={item}></PanelCard>
                                                <Button color="danger" className="CardWithRemove-btn" onClick={()=> this.onRemoveClick(item.uniqId)}>Remove</Button>
                                            </div>
                        })
                        }
                    </div>
                    </div>
                </div>
                <div className="container-submit">        
                    <Label className="container-submit-title" htmlFor="name">Enter your dashboard name</Label>
                    <Input name="name"value={this.state.name} onChange={(e) => this.onNameChange(e.target.value)}></Input>
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
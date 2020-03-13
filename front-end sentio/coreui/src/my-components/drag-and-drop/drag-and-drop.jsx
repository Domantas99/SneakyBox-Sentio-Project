import React,{Component} from 'react'
import { connect } from 'react-redux';
import './drag-and-drop.scss';
import {Button, Input} from 'reactstrap';
import { addDashboard } from '../../services/redux/actions/dashboards-actions';


let uniqId=0;
class DragDrop extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          container : [],
          data: props.data,
          name: ''
        }
    }
    
    onSubmit = () => {
        debugger;
        const obj = JSON.stringify({ 
            Name: this.state.name,
            DatabaseId: this.props.dbId,
            Panels: this.state.container
        });

        this.props.addDashboard(obj);

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
        debugger;
        let { container } = this.state;
        
        container =  container.filter(x=> x.uniqId !== uniqueId)
        this.setState({ container });
    }

    render() {

        return(<>
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
                        <Input onChange={(e) => this.onNameChange(e.target.value)}></Input>
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
    addDashboard: json => dispatch(addDashboard(json))
});

export default connect(mapStateToProps, mapDispatchToProps)(DragDrop)
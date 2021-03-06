import React, {Component} from 'react';
import {graphql} from 'react-apollo';



class sidebar extends Component {
    displayPatients(){
        var data = this.props.data;
        if(data.loading){
            return (<div> Loading Patients</div>);
        }
        else{
            return data.patients.map(patient => {
                return(
                    <li key={patient.id}>{patient.name}|{patient.dob}|{patient.id}</li>
                )
            })
        }
    }
    render(){
        return (
            
        <div>
            <ul id="list">
                {this.displayPatients()}
            </ul>
        </div>
        );
    }
}

export default (sidebar);
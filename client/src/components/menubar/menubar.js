import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import './menubar.css';


class menubar extends Component {
    
    render(){
        return (
            
        <div className="bar">
            <div className="nav">
                <a>Dash Board</a>
                <a>Patients</a>
                <a>Visits</a>
            </div>
            <div className="acnt">
                <a>account</a>
                
            </div>
        </div>
        );
    }
}

export default (menubar);
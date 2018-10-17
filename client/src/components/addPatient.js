import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getDrs, addPatient, getPatients} from '../queries/queries';


class AddPatient extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            dob: '',
            phone: '',
            emcname: '',
            emcphone: '',
            emcrxn: ''
        };        
    }
    displayDrs(){
        var data = this.props.getDrs;
        
        if(data.loading){
            return (
                <option disabled>Loading Drs </option>
            );
        }
        else{
            return data.doctors.map(dr => {
                return <option key={dr.id} value={dr.id}>{dr.name}</option>
            });
        }
    }
    submitForm(e){
        e.preventDefault();
        console.log(this.state);
        this.props.addPatient({
            variables: {
                name: this.state.name,
                dob: this.state.dob,
                cPhone: this.state.phone,
                eName: this.state.emcname,
                ephone: this.state.emcphone,
                erxn: this.state.emcrxn
            },
            refetchQueries:[{query: getPatients}]
        });
    }
    render (){
        return(
            <form id="add-patient" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Patient Name</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Birthdate</label>
                    <input type="text" onChange={(e) => this.setState({dob: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Phone Number</label>
                    <input type="text" onChange={(e) => this.setState({phone: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Emergency Contact Name</label>
                    <input type="text" onChange={(e) => this.setState({emcname: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Emergency Contact Number</label>
                    <input type="text" onChange={(e) => this.setState({emcphone: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Emergency Contact Relation</label>
                    <input type="text" onChange={(e) => this.setState({emcrxn: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Doctor: </label>
                    <select onChange={(e) => this.setState({dr: e.target.value})}>
                        {this.displayDrs()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}
export default compose(
    graphql(getDrs, {name: "getDrs"}),
    graphql(addPatient, {name: "addPatient"})
)(AddPatient);

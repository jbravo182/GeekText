import React, { Component } from 'react';
import axios from 'axios';




class PersonalInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: ''

        };

        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateAddress = this.updateAddress.bind(this);

    }

    //
    updateFirstName(event){
        this.setState({
            firstName: event.target.value
        });
    }
    updateLastName(event){
        this.setState({
            lastName: event.target.value
        });
    }
    updateEmail(event){
        this.setState({
            email: event.target.value
        });
    }
    updateAddress(event){
        this.setState({
            address:event.target.value
        });
    }


    //
    updatePersonalInfo(event){

        alert('Changes Saved');
    }
    componentDidMount(){

    }


    render() {
        return(
            <div className="card">
                <div className="card-header">
                    <b>Edit Personal Information</b>
                </div>
                <div className="card-body">
                    <form onSubmit={this.updatePersonalInfo}>
                        <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="userFirstName">First Name:</label>
                            <input id="userFirstName" className="form-control" type="text" placeholder=" " value={this.state.firstName} onChange={this.updateFirstName}/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="userLastName">Last Name:</label>
                            <input id="userLastName" className="form-control" type="text" placeholder=" " value={this.state.lastName} onChange={this.updateLastName}/>
                        </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userEmail">Email:</label>
                            <input id="userEmail" className="form-control" type="text" placeholder=" " value={this.state.email} onChange={this.updateEmail}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userAddress">Address:</label>
                            <input id="userAddress" className="form-control" type="text" placeholder=" " value={this.state.address} onChange={this.updateAddress}/>
                        </div>


                        <button className="btn btn-primary float-right" type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PersonalInfo;
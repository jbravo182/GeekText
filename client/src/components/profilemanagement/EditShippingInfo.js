import React, { Component } from 'react';


class ShippingInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: ''
            
        };

        this.updateAddress = this.updateAddress.bind(this);

    }

    //

    updateAddress(event){
        this.setState({
            address: event.target.value
        });
    }


    //
    updatePersonalInfo(event){

        alert('Changes Saved');
    }
    componentDidMount() {
        
    }


    render() {
        return(
            <div className="card">
                <div className="card-header">
                    <b>Edit Shipping Address</b>
                </div>
                <div className="card-body">
                    <form onSubmit={this.updatePersonalInfo}>
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

export default ShippingInfo;
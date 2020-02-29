import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default class SearchArea extends Component
{
    render() {
        return(
            <InputGroup style={{display: 'flex', alignItems: 'center'}}>
                <FormControl
                    id="searchText"
                    style={{borderRadius: '1.2rem'}}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={this.handleSearch}
                    onFocus={this.setTextBoxListner}
                    />
            </InputGroup>
        )
    }
}
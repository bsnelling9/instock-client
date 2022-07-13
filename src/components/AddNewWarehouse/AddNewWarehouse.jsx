import './AddNewWarehouse.scss';
import { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";

export default class AddNewWarehouse extends Component {

    state = {
        nameError: false,
        addressError: false,
        cityError: false,
        countryError: false,
        contactNameError: false,
        positionError: false,
        phoneError: false,
        emailError: false,
        warehouseName: '',
        streetAddress: '',
        warehouseCity: '',
        warehouseCountry: '',
        contact: {
            contactName: '',
            contactPosition: '',
            contactPhoneNumber: '',
            contactEmail: '',
        } 
    };
 
    handleWarehouseName = (event) => {
        this.setState ({
            warehouseName: event.target.value,
            nameError: false
        })
    }

    handleStreetAddress = event => {
        this.setState ({
            streetAddress: event.target.value,
            addressError: false
        })
    }

    handleWarehouseCity = event => {
        this.setState ({
            warehouseCity: event.target.value,
            cityError: false
        })
    }

    handleWarehouseCountry = event => {
        this.setState ({
            warehouseCountry: event.target.value,
            countryError: false
        })
    }
    
    handleContactName = event => {
        this.setState ({
            contactName: event.target.value,
            contactNameError: false
        })
    }

    handlePhoneNumber = event => {
        this.setState ({
            contactPhoneNumber: event.target.value,
            phoneError: false
        })
    }

    handlecontactPosition = event => {
        this.setState ({
            contactPosition: event.target.value,
            positionError: false
        })
    }

    handleContactEmail = event => {
        this.setState ({
            contactEmail: event.target.value,
            emailError: false
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const warehouseName = this.state.warehouseName;
        const warehouseAddress = this.state.streetAddress;
        const warehouseCity = this.state.warehouseCity;
        const warehouseCountry = this.state.warehouseCountry;
        const contactName = this.state.contactName;
        const contactPosition = this.state.contactPosition;
        const contactPhoneNumber = this.state.contactPhoneNumber;
        const contactEmail = this.state.contactEmail;
        if(warehouseName && warehouseAddress && warehouseCity && warehouseCountry && contactName && contactPosition && contactPhoneNumber && contactEmail) {
            // post data to API
            axios
            .post(`${process.env.REACT_APP_API_URL}/warehouses/add`, {
                name: warehouseName,
                address: warehouseAddress,
                city: warehouseCity,
                country: warehouseCountry,
                contact: {
                    name: contactName,
                    position: contactPosition,
                    phone: contactPhoneNumber,
                    email: contactEmail
                }
            })
            .then((res) => {
                console.log(res);
                alert('Your form was succesfully submited!');
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            if (!warehouseName) {this.setState({ nameError: true}); console.log('in here')}
            if (!warehouseAddress) this.setState({ addressError: true})
            if (!warehouseCity) this.setState({ cityError: true})
            if (!warehouseCountry) this.setState({ countryError: true})
            if (!contactName) this.setState({ contactNameError: true})
            if (!contactPosition) this.setState({ positionError: true})
            if (!contactPhoneNumber) this.setState({ phoneError: true})
            if (!contactEmail) this.setState({ emailError: true})
        }     
    }


  render() {
    return (
        <div className='newWarehouse'>
            <form onSubmit={this.handleFormSubmit} className='newWarehouse__container' autoComplete='off'> 
                <div className='newWarehouse__header'>
                    <Link className='newWarehouse__header-link' to={'/warehouses'}>
                            <img className='newWarehouse__header-img' src={arrowBack} alt="arrow back"/>
                    </Link>
                    <h1 className='newWarehouse__header-title'>Add New Warehouse</h1>
                </div>
                <section className="newWarehouse__form">
                    <div className="newWarehouse__form-container">
                        <div className="newWarehouse__form-details">
                            <h2 className='newWarehouse__form-title'>Warehouse Details</h2>
                            <label className='newWarehouse__form-header'>Warehouse Name
                                <input className={!this.state.nameError ? "newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="warehouseName"
                                    placeholder="Warehouse Name" value={this.state.warehouseName} onChange={this.handleWarehouseName}/>
                            </label>
                            <label className='newWarehouse__form-header'>Street Address
                                <input className={!this.state.addressError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="warehouseAddress"
                                    placeholder="Street Address" value={this.state.streetAddress} onChange={this.handleStreetAddress}/>
                            </label>
                            <label className='newWarehouse__form-header'>City
                                <input className={!this.state.cityError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="warehouseCity"
                                    placeholder="City" value={this.state.warehouseCity} onChange={this.handleWarehouseCity}/>
                            </label>
                            <label className='newWarehouse__form-header'>Country
                                <input className={!this.state.countryError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="warehouseCountry"
                                    placeholder="Country" value={this.state.warehouseCountry} onChange={this.handleWarehouseCountry}/>
                            </label>
                        </div>
                    </div>
                    <div className="newWarehouse__form-divider" ></div>
                    <div className="newWarehouse__form-container">
                        <div className="newWarehouse__form-details">
                            <h2 className='newWarehouse__form-title'>Contact Details</h2>
                            <label className='newWarehouse__form-header'>Contact Name
                                <input className={!this.state.contactNameError? "newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="contactName"
                                    placeholder="Contact Name" value={this.state.contactName} onChange={this.handleContactName}/>
                            </label>
                            <label className='newWarehouse__form-header'>Position
                                <input className={!this.state.positionError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="contactPosition"
                                    placeholder="Position" value={this.state.contactPosition} onChange={this.handlecontactPosition}/>
                            </label>
                            <label className='newWarehouse__form-header'>Phone Number
                                <input className={!this.state.phoneError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="contactPhoneNumber"
                                    placeholder="City" value={this.state.contactPhoneNumber} onChange={this.handlePhoneNumber}/>
                            </label>
                            <label className='newWarehouse__form-header'>Email
                                <input className={!this.state.emailError?"newWarehouse__form-input": "newWarehouse__form-input error"} type="text" name="contactEmail"
                                    placeholder="Email" value={this.state.contactEmail} onChange={this.handleContactEmail}/>
                            </label>
                        </div>
                    </div>
                </section>
                <div className='newWarehouse__form-btn'>
                    <Link className='newWarehouse__form-btn-link-cancel' to='/warehouses'>
                        <button className='newWarehouse__form-btn-cancel'>Cancel</button>
                    </Link>
                    <button className='newWarehouse__form-btn-add' type='submit'>+ Add Warehouse</button>
                </div>
            </form>
        </div>
    );
    }
}

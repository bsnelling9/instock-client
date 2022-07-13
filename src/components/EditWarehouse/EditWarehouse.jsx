import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./EditWarehouse.scss";
import axios from "axios";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg"

class EditWarehouse extends Component {
state = {
    id: "",
    warehouseName: "",
    streetAddress: "",
    warehouseCity: "",
    warehouseCountry: "",
    contact: {
        contactName: "",
        contactPosition: "",
        contactPhoneNumber: "",
        contactEmail: "",
    },
    };

    componentDidMount() {
    axios
        .get(
        `${process.env.REACT_APP_API_URL}warehouses/${this.props.match.params.id}`
        )
        .then((res) => {
        this.setState({
            id: res.data.id,
            warehouseName: res.data.name,
            streetAddress: res.data.address,
            warehouseCity: res.data.city,
            warehouseCountry: res.data.country,
            contactName: res.data.contact.name,
            contactPosition: res.data.contact.position,
            contactPhoneNumber: res.data.contact.phone,
            contactEmail: res.data.contact.email,
        });
        })
        .catch((err) => {
        console.log(err);
        });
    }

    handleWarehouseName = (event) => {
    this.setState({
        warehouseName: event.target.value,
    });
    };

    handleStreetAddress = (event) => {
    this.setState({
        streetAddress: event.target.value,
    });
    };

    handleWarehouseCity = (event) => {
    this.setState({
        warehouseCity: event.target.value,
    });
    };

    handleWarehouseCountry = (event) => {
    this.setState({
        warehouseCountry: event.target.value,
    });
    };

    handleContactName = (event) => {
    this.setState({
        contactName: event.target.value,
    });
    };

    handlePhoneNumber = (event) => {
    this.setState({
        contactPhoneNumber: event.target.value,
    });
    };

    handlecontactPosition = (event) => {
    this.setState({
        contactPosition: event.target.value,
    });
    };

    handleContactEmail = (event) => {
    this.setState({
        contactEmail: event.target.value,
        // emailError: false
    });
    };

    handleFormSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const warehouseName = this.state.warehouseName;
    const warehouseAddress = this.state.streetAddress;
    const warehouseCity = this.state.warehouseCity;
    const warehouseCountry = this.state.warehouseCountry;
    const contactName = this.state.contactName;
    const contactPosition = this.state.contactPosition;
    const contactPhoneNumber = this.state.contactPhoneNumber;
    const contactEmail = this.state.contactEmail;

    if (
        warehouseName &&
        warehouseAddress &&
        warehouseCity &&
        warehouseCountry &&
        contactName &&
        contactPosition &&
        contactPhoneNumber &&
        contactEmail
    ) {
        // patch data to API
        axios
        .patch(`${process.env.REACT_APP_API_URL}warehouses/${id}/edit`, {
            id: id,
            name: warehouseName,
            address: warehouseAddress,
            city: warehouseCity,
            country: warehouseCountry,
            contact: {
            name: contactName,
            position: contactPosition,
            phone: contactPhoneNumber,
            email: contactEmail,
            },
        })
        .then((res) => {
            alert("Warehouse edited successfully");
            this.props.history.push("/warehouses");
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        if (!warehouseName) {
        this.setState({ nameError: true });
        }
        if (!warehouseAddress) this.setState({ addressError: true });
        if (!warehouseCity) this.setState({ cityError: true });
        if (!warehouseCountry) this.setState({ countryError: true });
        if (!contactName) this.setState({ contactNameError: true });
        if (!contactPosition) this.setState({ positionError: true });
        if (!contactPhoneNumber) this.setState({ phoneError: true });
        if (!contactEmail) this.setState({ emailError: true });
    }
    };
    render() {
    return (
        <div className="editWarehouse">
        <form
            onSubmit={this.handleFormSubmit}
            className="editWarehouse__container"
            autoComplete="off"
        >
            <div className="editWarehouse__header">
            <Link className="editWarehouse__header-link" to={"/warehouses"}>
                <img
                className="editWarehouse__header-img"
                src={arrowBack}
                alt="arrow back"
                />
            </Link>
            <h1 className="editWarehouse__header-title">Edit Warehouse</h1>
            </div>
            <section className="editWarehouse__form">
            <div className="editWarehouse__form-container">
                <div className="editWarehouse__form-details">
                <h2 className="editWarehouse__form-title">Warehouse Details</h2>
                <label className="editWarehouse__form-header">
                    Warehouse Name
                    <input
                    className={
                        !this.state.nameError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="warehouseName"
                    placeholder="Warehouse Name"
                    value={this.state.warehouseName}
                    onChange={this.handleWarehouseName}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    Street Address
                    <input
                    className={
                        !this.state.addressError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="warehouseAddress"
                    placeholder="Street Address"
                    value={this.state.streetAddress}
                    onChange={this.handleStreetAddress}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    City
                    <input
                    className={
                        !this.state.cityError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="warehouseCity"
                    placeholder="City"
                    value={this.state.warehouseCity}
                    onChange={this.handleWarehouseCity}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    Country
                    <input
                    className={
                        !this.state.countryError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="warehouseCountry"
                    placeholder="Country"
                    value={this.state.warehouseCountry}
                    onChange={this.handleWarehouseCountry}
                    />
                </label>
                </div>
            </div>
            <div className="editWarehouse__form-divider"></div>
            <div className="editWarehouse__form-container">
                <div className="editWarehouse__form-details">
                <h2 className="editWarehouse__form-title">Contact Details</h2>
                <label className="editWarehouse__form-header">
                    Contact Name
                    <input
                    className={
                        !this.state.contactNameError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="contactName"
                    placeholder="Contact Name"
                    value={this.state.contactName || ""}
                    onChange={this.handleContactName}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    Position
                    <input
                    className={
                        !this.state.positionError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="contactPosition"
                    placeholder="Position"
                    value={this.state.contactPosition || ""}
                    onChange={this.handlecontactPosition}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    Phone Number
                    <input
                    className={
                        !this.state.phoneError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="contactPhoneNumber"
                    placeholder="Phone Number"
                    value={this.state.contactPhoneNumber || ""}
                    onChange={this.handlePhoneNumber}
                    />
                </label>
                <label className="editWarehouse__form-header">
                    Email
                    <input
                    className={
                        !this.state.emailError
                        ? "editWarehouse__form-input"
                        : "editWarehouse__form-input error"
                    }
                    type="text"
                    name="contactEmail"
                    placeholder="Email"
                    value={this.state.contactEmail || ""}
                    onChange={this.handleContactEmail}
                    />
                </label>
                </div>
            </div>
            </section>
            <div className="editWarehouse__form-btn">
            <Link
                className="editWarehouse__form-btn-link-cancel"
                to="/warehouses"
            >
                <button className="editWarehouse__form-btn-cancel">Cancel</button>
            </Link>
            <button className="editWarehouse__form-btn-add" type="submit">
                Save
            </button>
            </div>
        </form>
        </div>
    );
    }
}

export default EditWarehouse;
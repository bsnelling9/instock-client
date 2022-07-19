import "./AddNewInventoryItem.scss";
import { Component } from "react";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AddNewInventoryItem extends Component {
    state = {
      warehouseData: [],
      warehouseId: "",
      nameError: false,
      descriptionError: false,
      statusError: false,
      quantityError: false,
      warehouseName: "",
      name: "",
      description: "",
      category: "",
      status: "",
      quantity: 0,
      warehouse: "",
    };
  
    getMappedWarehouses = (warehouseData) => {
      const mapWarehouse = warehouseData.map((warehouse) => {
        return (
          <option
            key={warehouse.id}
            id={warehouse.id}
            className="addInventoryForm__select--option"
            value={JSON.stringify({
              warehouseName: warehouse.name,
              warehouseId: warehouse.id,
            })}
          >
            {warehouse.name}
          </option>
        );
      });
      return mapWarehouse;
    };
  
    async fetchWarhouseData() {
      const allWarehouses = await axios.get(
        `${process.env.REACT_APP_API_URL}warehouses`
      );
      this.setState({
        warehouseData: allWarehouses.data,
      });
    }
  
    componentDidMount() {
      this.fetchWarhouseData();
    }
  
    addName = (event) => {
      this.setState({
        name: event.target.value,
        nameError: false,
      });
    };
  
    addDescription = (event) => {
      this.setState({
        description: event.target.value,
        descriptionError: false,
      });
    };
  
    addCategory = (event) => {
      this.setState({
        category: event.target.value,
      });
    };
  
    addStatus = (event) => {
      this.setState({
        status: event.target.value,
        statusError: false,
      });
    };
  
    addQuantity = (event) => {
      this.setState({
        quantity: event.target.value,
        statusError: false,
      });
    };
  
    addWarehouseName = (event) => {
      const optionValue = JSON.parse(event.target.value);
      this.setState({
        warehouseName: optionValue.warehouseName,
        warehouseId: optionValue.warehouseId,
      });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      const warehouseName = this.state.warehouseName;
      const warehouseID = this.state.warehouseId;
      const itemName = this.state.name;
      const description = this.state.description;
      const category = this.state.category;
      const status = this.state.status;
      const quantity = status === "Out of Stock" ? 0 : this.state.quantity;
  
      if (itemName && description && category && status) {
        axios
          .post(`${process.env.REACT_APP_API_URL}inventory/add`, {
            warehouseName,
            warehouseID,
            itemName,
            description,
            category,
            status,
            quantity,
          })
          .then((res) => {
            alert("New item added successfully");
            this.props.history.push("/inventory");
          })
          .catch((err) => {
            console.err(err);
          });
      } else {
        if (!itemName) this.setState({ nameError: true });
        if (!description) this.setState({ descriptionError: true });
        if (!category) this.setState({ categoryError: true });
        if (!status) this.setState({ statusError: true });
        if (!quantity) this.setState({ quantityError: true });
      }
    };
  
    render() {
      return (
        <div className="addInventory">
          <div className="addInventoryHeader">
            <Link className="addInventoryHeader__link" to={"/inventory"}>
              <img
                className="addInventoryHeader__icon"
                src={arrowBack}
                alt="arrow back"
              />
            </Link>
            <h1 className="addInventoryHeader__heading">Add inventory item</h1>
          </div>
          <div className="addInventoryForm">
            <form
              className="addInventoryForm__form"
              action=""
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <div className="addInventoryForm__fields-container">
                <div className="addInventoryForm__fields-container-left">
                  <h2 className="addInventoryForm__heading">Item Details</h2>
                  <div className="addInventoryForm__field">
                    <label className="addInventoryForm__label">
                      <h3 className="addInventoryForm__label-text">Item Name</h3>
                    </label>
                    <input
                      className={
                        !this.state.nameError
                          ? "addInventoryForm__input"
                          : "addInventoryForm__input error"
                      }
                      type="text"
                      name="itemName"
                      placeholder="Item name"
                      value={this.state.name}
                      onChange={this.addName}
                    ></input>
                  </div>
                  <div className="addInventoryForm__field">
                    <label className="addInventoryForm__label">
                      <h3 className="addInventoryForm__label-text">
                        Description
                      </h3>
                    </label>
                    <textarea
                      className={
                        !this.state.descriptionError
                          ? "addInventoryForm__textarea"
                          : "addInventoryForm__textarea error"
                      }
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.addDescription}
                    ></textarea>
                  </div>
                  <div className="addInventoryForm__field">
                    <label className="addInventoryForm__label">
                      <h3 className="addInventoryForm__label-text">Category</h3>
                    </label>
                    <select
                      className="addInventoryForm__dropdown"
                      name="category"
                      id=""
                      placeholder="Please select"
                      onChange={this.addCategory}
                    >
                      <option
                        className="addInventoryForm__select--option"
                        value="Electronics"
                      >
                        Electronics
                      </option>
                      <option
                        className="addInventoryForm__select--option"
                        value="Gear"
                      >
                        Gear
                      </option>
                      <option
                        className="addInventoryForm__select--option"
                        value="Apparel"
                      >
                        Apparel
                      </option>
                      <option
                        className="addInventoryForm__select--option"
                        value="Accessories"
                      >
                        Accessories
                      </option>
                      <option
                        className="addInventoryForm__select--option"
                        value="Health"
                      >
                        Health
                      </option>
                    </select>
                  </div>
                </div>
                <div className="addInventoryForm__fields-container-right">
                  <h2 className="addInventoryForm__heading">Item Availability</h2>
                  <div className="addInventoryForm__statusField">
                    <h3>Status</h3>
                    <div className="addInventoryForm__statusContainer">
                      <div className="addInventoryForm__statusRadio">
                        <input
                          type="radio"
                          id="radio-1"
                          name="status"
                          value="In Stock"
                          checked={this.state.status === "In Stock"}
                          onChange={this.addStatus}
                        />
                        <label
                          className={!this.state.statusError ? "" : "errorStatus"}
                        >
                          In Stock
                        </label>
                      </div>
                      <div className="addInventoryForm__statusRadio">
                        <input
                          type="radio"
                          id="radio-2"
                          name="status"
                          value="Out of Stock"
                          checked={this.state.status === "Out of Stock"}
                          onChange={this.addStatus}
                        />
                        <label
                          className={!this.state.statusError ? "" : "errorStatus"}
                        >
                          Out of Stock
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="addInventoryForm__field"
                    style={{
                      display: this.state.status === "In Stock" ? "flex" : "none",
                      flexDirection: "column",
                    }}
                  >
                    <label className="addInventoryForm__label">
                      <h3 className="addInventoryForm__label-text">Quantity</h3>
                    </label>
                    <input
                      className={
                        !this.state.quantityError
                          ? "addInventoryForm__input"
                          : "addInventoryForm__input error"
                      }
                      type="text"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.addQuantity}
                      required
                    ></input>
                  </div>
                  <div className="addInventoryForm__field">
                    <label className="addInventoryForm__label">
                      <h3 className="addInventoryForm__label-text">Warehouse</h3>
                    </label>
                    <select
                      className="addInventoryForm__dropdown"
                      onChange={this.addWarehouseName}
                    >
                      {this.getMappedWarehouses(this.state.warehouseData)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="buttonContainer">
                <Link className="addInventoryForm__cancelBtn" to={"/inventory"}>
                  <button className="buttonSecondary" type="button">
                    Cancel
                  </button>
                </Link>
                <button className="buttonPrimary" type="submit">
                  + Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }

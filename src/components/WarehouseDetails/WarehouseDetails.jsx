import React, { Component } from "react";
import axios from "axios";
import "./WarehouseDetails.scss";
import { Link } from "react-router-dom";
import WarehouseInv from "../WarehouseInv/WarehouseInv";
import Modal from "../Modal/Modal";
import penIcon from "../../assets/Icons/edit-24px.svg";
import arrow from "../../assets/Icons/arrow_back-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

export default class WarehouseDetails extends Component {
  state = {
    warehouseData: {},
    inventory: [],
    popUp: false,
    deleteId: "",
  };

  async fetchInventory(id) {
    try {
      const invResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/warehouses/${id}/inventory`
      );
      this.setState({
        inventory: invResponse.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async fetchWarehouseData(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/warehouses/${id}`
      );
      this.setState({
        warehouseData: response.data,
      });
      this.fetchInventory(id);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchWarehouseData(this.props.match.params.id);
  }

  handlePopUp = (deleteId) => {
    this.setState({
      popUp: !this.state.popUp,
      deleteId: deleteId,
    });
  };

  handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/inventory/${this.state.deleteId}/delete`
    );
    this.handlePopUp();
    this.fetchWarehouseData(this.props.match.params.id);
  };


  render() {
    return (
      <>
        <div className="details">
            <div className="details-top">
                <Link to="/" className="details-top__link">
                    <img className="details-top__arrow" src={arrow} alt="arrow"></img>
                    <h1 className="details-top__title">{this.state.warehouseData.name}</h1>
                </Link>
                <Link to={`/warehouses/${this.props.match.params.id}/edit`}className="details-top__iconBox">
                    <img className="details-top__icon"src={penIcon} alt='pen'></img>
                    <h3 className="details-top__edit">Edit</h3>
                </Link>
            </div>

            <div className="warehouse-info">
                <div className="details__address">
                    <h3 className="details__subtitles labelT">warehouse address:</h3>
                    <p className="details__text">
                    {this.state.warehouseData.address}
                    {", "}
                    {this.state.warehouseData.city}
                    {", "}
                    {this.state.warehouseData.country}
                    </p>
                </div>

                <div className="details__contacts">
                    <div className="details__contact details__contact--name">
                        <h3 className="details__subtitles labelT">contact name:</h3>
                        <p className="details__text">
                            {this.state.warehouseData.contact &&
                            this.state.warehouseData.contact.name}
                            <br />
                            {this.state.warehouseData.contact &&
                            this.state.warehouseData.contact.position}
                        </p>
                    </div>
                    <div className="details__contactdetails__contact--info">
                        <h3 className="details__subtitles labelT">contact information:</h3>
                        <p className="details__text">
                            {this.state.warehouseData.contact &&
                            this.state.warehouseData.contact.phone}
                            <br />
                            {this.state.warehouseData.contact &&
                            this.state.warehouseData.contact.email}
                        </p>
                    </div>
                </div>
            </div>

        {/* row of labels for the table on desktop and tablet */}
        <div className="labelsRow">
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Inventory item</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Category</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Status</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Quantity</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item labelsRow__item--action">
            <h4 className="labelsRow__label">Actions</h4>
          </div>
        </div>

          <div className="details__inv">
            <WarehouseInv
              inventory={this.state.inventory}
              handlePopUp={this.handlePopUp}
            />
          </div>
        </div>
        {this.state.popUp === true ? (
          <Modal
            warehouseData={this.state.inventory}
            handlePopUp={this.handlePopUp}
            deleteId={this.state.deleteId}
            deleteHandler={this.handleDelete}
          />
        ) : <></>}
      </>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss";
import axios from "axios";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import trashCan from "../../assets/Icons/delete_outline-24px.svg";
import editPen from "../../assets/Icons/edit-24px.svg";
import searchIcon from "../../assets/Icons/search-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";
import Modal from "../Modal/Modal";

export default class WarehouseList extends Component {
  state = {
    warehouseData: [],
    popUp: false,
    deleteId: "",
  };

  // Lifecycle methods
  componentDidMount() {
    this.getWarehouseData();
  }

  // axios call to fetch warehouse list
  getWarehouseData() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/warehouses`)
      .then((response) => {
        this.setState({ warehouseData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePopUp = (deleteId) => {
    this.setState({
      popUp: !this.state.popUp,
      deleteId: deleteId,
    });
  };

  handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/warehouses/${this.state.deleteId}/delete`
    );
    this.handlePopUp();
    this.getWarehouseData();
  };

  render() {
    return (
      <>
        {/* header of the page */}
        <div className="warehousePage-subhead">
          <h1 className="warehousePage-title">Warehouses</h1>
          <div className="warehousePage-subhead__right">
            <div className="search">
              <input
                className="search__input"
                type="text"
                name=""
                placeholder="Search..."
              />
              <img
                className="search__icon"
                src={searchIcon}
                alt="search icon"
              ></img>
            </div>
            <Link to={`/warehouses/add`}>
              <button className="newWarehouse-btn">+ Add New Warehouse</button>
            </Link>
          </div>
        </div>
        {/* row of labels for the table on desktop and tablet */}
        <div className="labelsRow">
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Warehouse</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Address</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Contact Name</h4>
            <img
              className="labelsRow__icon"
              src={sortIcon}
              alt="sorting icon"
            ></img>
          </div>
          <div className="labelsRow__item">
            <h4 className="labelsRow__label">Contact Information</h4>
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
        {/* list of warehouses */}
        <div className="whList">
          {this.state.warehouseData.map((warehouse) => (
            <div className="whLi" key={warehouse.id}>
              <div className="whLi__box">
                <div className="whLi__subbox whLi__subbox--left">
                  <div className="whLi__item whLi__item--link">
                    <h4 className="whLi__label">Warehouse</h4>
                    <div className="whLi__link-box">
                      <Link
                        className="whLi__link"
                        to={`/warehouses/${warehouse.id}`}
                      >
                        <h3 className="whLi__link-p">{warehouse.name}</h3>
                      </Link>
                      <img
                        className="whLi__link-icon"
                        src={chevron}
                        alt="chevron"
                      ></img>
                    </div>
                  </div>
                  <div className="whLi__item">
                    <h4 className="whLi__label">Address</h4>
                    <p className="whLi__info">
                      {warehouse.address}, {warehouse.city}, {warehouse.country}
                    </p>
                  </div>
                </div>
                <div className="whLi__subbox whLi__subbox--right">
                  <div className="whLi__item">
                    <h4 className="whLi__label">Contact Name</h4>
                    <p className="whLi__info">{warehouse.contact.name}</p>
                  </div>
                  <div className="whLi__item">
                    <h4 className="whLi__label">Contact Information</h4>
                    <p className="whLi__info">
                      {warehouse.contact.phone} <br />
                      {warehouse.contact.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="whLi__actions">
                <img
                  onClick={() => this.handlePopUp(warehouse.id)}
                  className="whLi__deleteBtn iconBtn"
                  src={trashCan}
                  alt="trash can icon"
                ></img>
                <Link to={`/warehouses/${warehouse.id}/edit`}>
                  <img
                    className="whLi__editBtn iconBtn"
                    src={editPen}
                    alt="edit pen icon"
                  ></img>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {this.state.popUp &&this.state.popUp === true ? (
          <Modal
            warehouseData={this.state.warehouseData}
            handlePopUp={this.handlePopUp}
            deleteHandler={this.handleDelete}
            deleteId={this.state.deleteId}
          />
        ) : <></>}
      </>
    );
  }
}

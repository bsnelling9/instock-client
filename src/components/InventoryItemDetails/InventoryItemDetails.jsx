import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InventoryItemDetails.scss';
import editPen from "../../assets/Icons/edit-24px.svg";
import arrowBack from '../../assets/Icons/arrow_back-24px.svg';
import axios from 'axios';

export default class InventoryItemDetails extends Component {

    state = {
        inventoryItem: {}
    }

    getInventoryID = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/${this.props.match.params.id}`)
            this.setState({
                inventoryItem: response.data,
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getInventoryID();
    }

    render() {
        const item = this.state.inventoryItem;
        return (
            <div className="itemDetails">
                <div className="itemDetails__subHead">
                    <div className="itemDetails__subHead-left">
                        <Link to={`/warehouses/${item.warehouseID}`}>
                            <img className="itemDetails__subHead-arrow" src={arrowBack} alt="back arrow" />
                        </Link >
                        <h1 className="itemDetails__subHead-title">{item.itemName}</h1>
                    </div>
                    <div>
                    <Link className="itemDetails__subHead-btn-link" to={`/inventory/${item.id}/edit`}>
                        <img className="itemDetails__subHead-btn-icon" src={editPen} alt="editing icon" />
                        <p className="itemDetails__subHead-btn-text">Edit</p>
                    </Link>
                    </div>
                </div>
                <div className="itemDetails__content">
                    <div className="itemDetails__contentBox itemDetails__contentBox--left">
                        <div className="itemDetails__contentBox-data">
                            <h4 className="itemDetails__label">item description:</h4>
                            <p className="itemDetails__data">{item.description}</p>
                        </div>
                        <div className="itemDetails__contentBox-data">
                            <h4 className="itemDetails__label">category:</h4>
                            <p className="itemDetails__data">{item.category}</p>
                        </div>
                    </div>
                    <div className="itemDetails__contentBox itemDetails__contentBox--right">
                        <div className="itemDetails__contentSubBox">
                            <div className="itemDetails__contentBox-data">
                                <h4 className="itemDetails__label">status:</h4>
                                <h4 className={item.status === 'In Stock' ? 'itemDetails__status': 'itemDetail__status itemDetail__status--out'}>{item.status}</h4>
                            </div>
                            <div className="itemDetails__contentBox-data">
                                <h4 className="itemDetails__label">warehouse:</h4>
                                <p className="itemDetails__data">{item.warehouseName}</p>
                            </div>
                        </div>
                        <div className="itemDetails__contentSubBox">
                            <div className="itemDetails__contentBox-data">
                                <h4 className="itemDetails__label">quantity:</h4>
                                <p className="itemDetails__data">{item.quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


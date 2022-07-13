import './InventoryList.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InventoryCard from '../InventoryCard/InventoryCard';
import Modal from '../Modal/Modal';


class InventoryList extends Component {
    state = {
        inventories: [],
        popUp: false,
        deleteId: "",
    };

    componentDidMount() {
        this.getAllInventories();
    }

    getAllInventories() {
        axios
            .get(`${process.env.REACT_APP_API_URL}/inventory`)
            .then((res) => {
                this.setState({
                    inventories: res.data
                });
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
        console.log("deleted");
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/inventory/${this.state.deleteId}/delete`
        );
        this.handlePopUp();
        this.getAllInventories();
      };


    render() {
        return (
            <>
            <div>
                <section className='inventory'>
                    <header className='inventory__container'>
                        <div className='inventory__section'>
                            <h1 className='inventory__title'>Inventory</h1>
                            <div className='inventory__actions'>
                                <input className='inventory__actions-search' type='text' name='search' placeholder='Search...' />
                                <Link to='/inventory/add'>
                                    <button className='inventory__actions-btn'>+ Add New Item</button>
                                </Link>
                            </div>
                        </div>
                        <ul className='inventory__list'>
                            <li className='inventory__list-item inventory__icon-1'>inventory item</li>
                            <li className='inventory__list-item inventory__icon-2'>category</li>
                            <li className='inventory__list-item inventory__icon-3'>status</li>
                            <li className='inventory__list-item inventory__icon-4'>qty</li>
                            <li className='inventory__list-item inventory__icon-5'>warehouse</li>
                            <li className='inventory__list-item inventory__icon-6'>actions</li>
                        </ul>
                    </header>
                    {this.state.inventories.map(item => {
                        return (
                            <InventoryCard
                                key={item.id}
                                handlePopUp={this.handlePopUp}
                                deleteHandler={this.handleDelete}
                                {...item} />
                        )
                    })}
                </section>
            </div >
            {this.state.popUp &&this.state.popUp === true ? (
                <Modal
                    deleteId = {this.state.deleteId}
                    handlePopUp={this.handlePopUp}
                    deleteHandler={this.handleDelete}
                    warehouseData = {this.state.inventories}
                />) : <></>}
            </>
        );
    }
}

export default InventoryList;
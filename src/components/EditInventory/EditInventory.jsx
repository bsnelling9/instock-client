import "./EditInventory.scss";
import { Component } from "react";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg"
import axios from "axios";


export default class EditInventory extends Component {

    state ={
        warehouseData: [],
        id: '',
        warehouseId: '',
        warehouseName: '',
        name: "",
        description: "",
        category: "",
        status: "",
        quantity: 0,
        warehouse: "", 
    }
 
    getMappedWarehouses = (warehouseData) => {
        const mapWarehouse = warehouseData.map((warehouse) => {
            return (
                <option key={warehouse.id} id={warehouse.id} className="editInventoryForm__select--option" value={JSON.stringify({warehouseName: warehouse.name, warehouseId: warehouse.id})}>{warehouse.name}</option>
            )
        })
        return mapWarehouse
    }

    async fetchWarhouseData () {
        const allWarehouses = await axios.get(`${process.env.REACT_APP_API_URL}/warehouses`)
        this.setState({
            warehouseData: allWarehouses.data
        })
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/inventory/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                id: res.data.id,
                warehouseId: res.data.warehouseId,
                warehouseName: res.data.warehouseName,
                name: res.data.itemName,
                description: res.data.description,
                category: res.data.category,
                status: res.data.status,
                quantity: res.data.quantity,
                warehouse: res.data.warehouse
            });
        })
        this.fetchWarhouseData()
    }

    editName = event =>{
        this.setState({name: event.target.value});
        return event.target.value
    }

    editDescription = event => {
        this.setState({description: event.target.value});
    }

    editStatus = event => {
        this.setState({status: event.target.value});
    }

    editQuantity = event => {
        this.setState({quantity: event.target.value});
    }

    editWarehouseName = event => {
        const optionValue = JSON.parse(event.target.value)
        this.setState({
            warehouseName: optionValue.warehouseName,
            warehouseId: optionValue.warehouseId
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const id = this.props.match.params.id;
        const warehouseName = this.state.warehouseName;
        const warehouseId = this.state.warehouseId;
        const itemName = this.state.name;
        const description = this.state.description;
        const category = this.state.category;
        const status = this.state.status;
        const quantity = status === 'Out of Stock'? 0 : this.state.quantity;
        
        await axios.patch(`${process.env.REACT_APP_API_URL}/inventory/${this.props.match.params.id}/edit`, {
        id,
        warehouseName,
        warehouseId,
        itemName,
        description,
        category,
        status,
        quantity
        })
        window.alert("updates have been saved")
    }

    render() {
        return(
        <div className="editInventory">
            <div className="editInventoryHeader">
                <img className="editInventoryHeader__icon" src={arrowBack} onClick={(event) => (window.location.href = `/inventory/${this.state.id}`)} alt="arrow back"></img>
                <h1 className="editInventoryHeader__heading">edit inventory item</h1>
            </div>
            <div className="editInventoryForm">
                <form className="editInventoryForm__form" action="" onSubmit={this.handleSubmit}>
                    <div className="editInventoryForm__fields-container">
                        <div className="editInventoryForm__fields-container-left">
                        <h2 className="editInventoryForm__heading">Item Details</h2>
                        <div className="editInventoryForm__field">
                            <label  className="editInventoryForm__label">
                                <h3 className="editInventoryForm__label-text">Item Name</h3>
                            </label>
                            <input
                                className="editInventoryForm__input"
                                type="text"
                                name="Item Name"
                                value={this.state.name}
                                onChange={this.editName}
                                required
                            ></input>
                        </div>
                        <div className="editInventoryForm__field">
                            <label  className="editInventoryForm__label">
                                <h3 className="editInventoryForm__label-text">Description</h3>
                            </label>
                            <textarea className="editInventoryForm__textarea"
                                type="text"
                                placeholder="description"
                                name="Description"
                                value={this.state.description}
                                onChange={this.editDescription}
                                required
                            ></textarea>
                        </div>
                        <div className="editInventoryForm__field">
                            <label  className="editInventoryForm__label">
                                <h3  className="editInventoryForm__label-text">Category</h3>
                            </label>
                            <select className="editInventoryForm__dropdown" name="Category" id="" placeholder="Please select">
                                <option className="editInventoryForm__select--option" value="1">Electronics</option>
                                <option className="editInventoryForm__select--option" value="2">Gear</option>
                                <option className="editInventoryForm__select--option" value="3">Apparel</option>
                                <option className="editInventoryForm__select--option" value="4">Accessories</option>
                                <option className="editInventoryForm__select--option" value="5">Health</option>
                            </select>
                        </div>
                        </div>
                        <div className="editInventoryForm__fields-container-right">
                        <h2 className="editInventoryForm__heading">Item Availability</h2>
                        <div className="editInventoryForm__statusField">
                            <h3>Status</h3>
                            <div className="editInventoryForm__statusContainer">
                                <div className="editInventoryForm__statusRadio" >
                                <input  type="radio" id="radio-1" name="stock_status" value='In Stock' checked={this.state.status === "In Stock"} onChange={this.editStatus}/>
                                <label>In Stock</label>
                                </div>
                                <div className="editInventoryForm__statusRadio">
                                <input  type="radio" id="radio-2" name="stock_status" value='Out of Stock' checked={this.state.status === "Out of Stock"} onChange={this.editStatus}/>
                                <label >Out of Stock</label>
                                </div>
                            </div>
                        </div>
                        <div className="editInventoryForm__field" style={{display: this.state.status === 'In Stock' ? "flex": "none", flexDirection: "column"}}>
                            <label className="editInventoryForm__label">
                                <h3 className="editInventoryForm__label-text">Quantity</h3>
                            </label>
                            <input
                                className="editInventoryForm__input"
                                type="text"
                                name="Item Name"
                                value={this.state.quantity}
                                onChange={this.editQuantity}
                                required
                            ></input>
                        </div>
                        <div className="editInventoryForm__field">
                            <label className="editInventoryForm__label">
                                <h3  className="editInventoryForm__label-text">Warehouse</h3>
                            </label>
                            <select className="editInventoryForm__dropdown" onChange={this.editWarehouseName}>
                                {this.getMappedWarehouses(this.state.warehouseData)}
                            </select>
                        </div>
                    </div></div>
                    <div className="buttonContainer">
                    <button className="buttonSecondary" type="button" onClick={(event) => (window.location.href = `/inventory/${this.state.id}`)}>
                        Cancel
                    </button>
                    <button className="buttonPrimary" type="submit" >
                        Save
                    </button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

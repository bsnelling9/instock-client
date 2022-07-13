import React, { Component } from 'react';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import "./WarehousesPage.scss";


class WarehousesPage extends Component {
  render() {
    return (
      // header of the warehouse Page
      <div className='warehousePage'>
        <WarehouseList />
      </div>
    );
  }
}

export default WarehousesPage;

import React, { Component } from 'react';
import "./InventoryPage.scss";
import InventoryList from '../../components/InventoryList/InventoryList';

class InventoryPage extends Component {
  render() {
    return (
      <div>
        <InventoryList />
      </div>
    );
  }
}

export default InventoryPage;

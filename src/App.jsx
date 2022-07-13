import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails';
import Footer from './components/Footer/Footer';
import AddNewWarehouse from './components/AddNewWarehouse/AddNewWarehouse';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import EditInventory from './components/EditInventory/EditInventory'
import InventoryItemDetails from './components/InventoryItemDetails/InventoryItemDetails';
import AddNewInventoryItem from "./components/AddNewInventoryItem/AddNewInventoryItem";
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className='App'>
            <Header />
            <Switch>
              {/* Routing */}
              <Route path="/" exact render={(routerProps) =>
                <WarehousesPage
                  {...routerProps} />
                } />
              <Route
                path="/warehouses"
                exact
                render={(routerProps) =>
                <WarehousesPage {...routerProps} /> }
              />
              <Route
                exact path="/warehouses/add"
                render={(routerProps) =>
                <AddNewWarehouse {...routerProps} /> }
              />
              <Route
                exact path="/warehouses/:id"
                render={(routerProps) =>
                <WarehouseDetails {...routerProps} /> }
              />
              <Route
                path="/warehouses/:id/edit"
                render={(routerProps) =>
                <EditWarehouse {...routerProps} /> }
              />
              <Route
                path="/inventory"
                exact
                render={(routerProps) =>
                <InventoryPage {...routerProps} /> }
              />
              <Route
                path="/inventory/add"
                exact
                render={(routerProps) => (
                  <AddNewInventoryItem {...routerProps} />)}
              />
              <Route
                path="/inventory/:id"
                exact
                render={(routerProps) =>
                <InventoryItemDetails {...routerProps} /> }
              />
               <Route
                path="/inventory/:id/edit"
                render={(routerProps) =>
                <EditInventory {...routerProps} /> }
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
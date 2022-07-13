import "./WarehouseInvCard.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import Chevron from "../../assets/Icons/chevron_right-24px.svg";
import Edit from "../../assets/Icons/edit-24px.svg";
import Delete from "../../assets/Icons/delete_outline-24px.svg";

export default class WarehouseInvCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card__top">
          <div className="card__left">
            <div className="card__content card__content--invItem">
              <h3 className="card__title card__title--mobile label">inventory item</h3>
              <Link className="link" to={`/inventory/${this.props.id}`}>
                <p className="link__text">{this.props.itemName}</p>
                <img className="link__image" src={Chevron} />
              </Link>
            </div>
            <div className="card__content card__content--category">
              <h3 className="card__title label">category</h3>
              <p className="card__text">{this.props.category}</p>
            </div>
          </div>
          <div className="card__right">
            <div className="card__content card__content--status">
              <h3 className="card__title label">status</h3>
              <p
                className={
                  this.props.status === "In Stock"
                    ? "card__status"
                    : "card__status card__status--out"
                }
              >
                {this.props.status}
              </p>
            </div>
            <div className="card__content card__content--qty">
              <h3 className="card__title label">qty</h3>
              <p className="card__text">{this.props.quantity}</p>
            </div>
          </div>
        </div>
        <div className="card__actions">
            <img onClick={() => this.props.handlePopUp(this.props.id)}
            className="card__delete" src={Delete} alt="delete icon" />
          <Link to={`/inventory/${this.props.id}/edit`}>
            <img className="card__edit" src={Edit} alt="edit icon" />
          </Link>
        </div>
      </div>
    );
  }
}

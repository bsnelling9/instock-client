import React from "react";
import "./Modal.scss";
import closeIcon from "../../assets/Icons/close-24px.svg";

export default function Modal(props) {
  console.log(props);
  const newArray = props.warehouseData.find(
    (item) => item.id === props.deleteId
  );

  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal__iconBox">
          <img
            className="modal__closeIcon"
            src={closeIcon}
            onClick={() => props.handlePopUp(props.warehouseData.id)}
            alt="x"
          ></img>
        </div>
        <div className="modal__core">
          <div className="modal__content">
            <h1 className="modal__title">
              {newArray.name === undefined
                ? `Delete ${newArray.itemName} inventory item?`
                : `Delete ${newArray.name} warehouse?`}
            </h1>

            <p className="modal__text">
              {newArray.name === undefined
                ? `Please confirm that you'd like to delete ${newArray.itemName} from the inventory list.
                You won't be able to undo this action.`
                : `Please confirm that you'd like to delete the ${newArray.name} from the list of warehouses.
                You won't be able to undo this action.`}
            </p>
          </div>
          <div className="modal__btnBox">
            <button
              className="modal__btn modal__btn--cancel"
              onClick={() => props.handlePopUp(props.warehouseData.id)}
            >
              Cancel
            </button>
            <button
              className="modal__btn modal__btn--delete"
              onClick={() => props.deleteHandler()}
            >
              Delete{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

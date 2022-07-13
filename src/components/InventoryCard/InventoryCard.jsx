import './InventoryCard.scss';
import Delete from '../../assets/Icons/delete_outline-24px.svg';
import Edit from '../../assets/Icons/edit-24px.svg';
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import { Link } from 'react-router-dom';
import { Component } from 'react';

export default class InventoryCard extends Component {


    render() {
        return (
            <div className='cardList'>
                <div className='card '>
                    <div className='card__box'>
                        <section className='card__subbox card__subbox--left'>
                            <div className='card__item card__item--link'>
                                <h4 className='card__label'>inventory item</h4>
                                <div className='card__link-box'>
                                    <Link className='card__link-anchor' to={`/inventory/${this.props.id}`}>
                                        <h3 className='card__link'>{this.props.itemName}</h3>
                                    </Link>
                                    <img className='card__link-icon' src={chevron} alt="chevron"></img>
                                </div>
                            </div>
                            <div className='card__item'>
                                <h4 className='card__label'>category</h4>
                                <p className='card__info card__info--category'>{this.props.category}</p>
                            </div>
                        </section >
                        <section className='card__subbox card__subbox--right'>
                            <div className='card__item'>
                                <h4 className='card__label'>status</h4>
                                <h3 className={this.props.status === 'In Stock' ? 'card__status': 'card__status card__status--out'}>{this.props.status}</h3>
                            </div>
                            <div className='card__item'>
                                <h4 className='card__label'>qty</h4>
                                <p className='card__info card__info--qty'>{this.props.quantity}</p>
                            </div>
                            <div className='card__item'>
                                <h4 className='card__label'>warehouse</h4>
                                <p className='card__info card__info--warehouse'>{this.props.warehouseName}</p>
                            </div>
                        </section>
                    </div>
                    <section className='card__actions'>
                        <img onClick={() => this.props.handlePopUp(this.props.id)} className='card__deleteBtn iconBtn' src={Delete} alt='delete Icon' />
                        <Link to={`/inventory/${this.props.id}/edit`}>
                            <img className='card__editBtn iconBtn' src={Edit} alt='Edit Icon' />
                        </Link>
                    </section>
                </div>
            </div>

        )
    }
}


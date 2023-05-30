import React from "react";
import '../css/checkout.css'



const EmptyCart = () => {
    return (
        <>
            <h2>
                EMPTY
            </h2>
            <a href={"/"}>
            <span>
                 TO HOME
            </span>
            </a>
        </>

    )
}


function PriceTable (props)  {
    let info ={
        "Sale": 0,
        "Tax": 0,
        "Shipping": 0,
        "Total": 0
    }

    props.cartList.forEach((x) => {
        info.Sale += x.n*x.price;
    });
    info.Tax = info.Sale*0.08
    info.Total = info.Sale*1.08

    let infoList =Object.entries(info);

    return (
        <table className="priceTable">
            {infoList.map((x) =>  (
                <tr >
                    <td>{x[0]}</td>
                    <td>${x[1].toFixed(2)}</td>
                </tr>
            ))}
        </table>

    );
}

export class CheckoutItem extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
    }

    render(){
        return (
            <div className="checkoutItem">
                <div className="checkoutImageContainer">
                    <img className="checkoutImage" src={this.props.item.images[1]} alt="" />
                </div>
                <div className='checkoutItemInfo'>
                    <h2 className="checkoutItemTitle">{this.props.item.title}</h2>
                    <div className="checkoutItemQuantityInfo">
                        <span className="checkoutPrice">$ {this.props.item.n*this.props.item.price}</span>
                        <div className="checkoutQuantity">
                            <span className="checkoutChangeQuantity" onClick={() => this.parentData.changeQuantity(this.props.item.id, 1)}>+</span>
                            <span className="checkoutItemQuantity">{this.props.item.n}</span>
                            <span className="checkoutChangeQuantity"  onClick={() => this.parentData.changeQuantity(this.props.item.id, -1)}>-</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
        this.cart = this.parentData.getCartItems()
    }

    componentDidMount() {
        this.parentData.getCartFromCache()
    }

    changeQuantity = (key, amount) => {
        if (amount < 0){
            this.parentData.removeFromCart(key, -amount)
        }
        else {
            this.parentData.addToCart(key, amount)
        }
    }

    render() {
        let componentClass = "checkout"
        if (!this.parentData.isMobile()) {
            componentClass += " desktop"
        }
        this.parentData["changeQuantity"] = this.changeQuantity

        let cartDisplayList = Object.values(this.parentData.getCartItems())
        if (cartDisplayList.length > 0) {
            return (
                // on mobile it will show:
                // rows of each item in cart (component) img - title - total price -(+ n -)
                // price table
                // payment gateway todo
                <div className={componentClass}>
                    <div className="checkoutItemList">
                        {cartDisplayList.map((item) => {
                            return  <CheckoutItem
                                parentData={this.parentData}
                                item={item}
                            />
                        })}
                    </div>

                    <div className="priceTableHolder">
                        <PriceTable
                            cartList={cartDisplayList}
                        />
                    </div>
                </div>
            )
        } else {
            return EmptyCart
        }

    }
}

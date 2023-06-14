import React from "react";
import '../css/checkout.css'
import ItemDetailExpander from "./ItemDetailExpander";



const EmptyCart = () => {
    return (
        <a href={"/"}>
            <div className="empty">
                <h2>
                    nothing here<br/>(yet)
                </h2>

                <div>
                     checkout all the cool stuff we have
                </div>

            </div>
        </a>

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

    // let componentClass = "priceTable"
    // if (!props.parentData.isMobile()) {
    //     componentClass += " desktop"
    // }

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
        this.state = {
            expanded: false
        }
    }

    setExpanded = () => {
        this.setState({expanded: !this.state.expanded});
    }

    render(){
        let exp = this.state.expanded? " expanded": "";
        exp = !this.parentData.isMobile()? exp + " " + "desktop": exp
        return (
            <div className="checkoutItem">
                <div className={"checkoutItemContent"+exp}>
                        <div className={"checkoutImageContainer"+exp}>
                            <img className="checkoutImage" src={this.props.item.images[0]} alt="" />
                        </div>
                    <div className={'checkoutItemInfo'+exp}>
                        <div className={"checkoutItemTitleHolder"+exp}>
                            <h2 className={"checkoutItemTitle"+exp}>{this.props.item.title}</h2>
                            {/*<span className={"itemIsAvailable"+exp}>adsf</span>*/}

                        </div>

                        <div className={"checkoutItemQuantityInfo"+exp}>
                            <span className={"checkoutPrice" + exp}>$ {this.props.item.n*this.props.item.price}</span>
                            <div className="checkoutQuantity">
                                <span className="checkoutChangeQuantity"  onClick={() => this.parentData.changeQuantity(this.props.item.id, -1)}>-</span>
                                <span className="checkoutItemQuantity">{this.props.item.n}</span>
                                <span className="checkoutChangeQuantity" onClick={() => this.parentData.changeQuantity(this.props.item.id, 1)}>+</span>
                            </div>
                        </div>
                    </div>
                </div>

                <ItemDetailExpander
                    expandedCallback={this.setExpanded}
                    expanded={this.state.expanded}
                    item={this.props.item}
                    hidden={!this.parentData.isMobile}
                />
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

        let componentClass = ""
        if (!this.parentData.isMobile()) {
            componentClass += " desktop"
        }
        this.parentData["changeQuantity"] = this.changeQuantity

        let cartDisplayList = Object.values(this.parentData.getCartItems())
        if (cartDisplayList.length > 0) {
            return (
                // payment gateway todo
                <div className={"checkout" + componentClass}>
                    <div className={"checkoutItemList" + componentClass}>
                        {cartDisplayList.map((item) => {
                            return  <CheckoutItem
                                parentData={this.parentData}
                                item={item}
                            />
                        })}
                    </div>

                    <div className={"priceTableHolder" + componentClass}>
                        <PriceTable
                            cartList={cartDisplayList}
                            parentData={this.parentData}
                        />
                    </div>
                </div>
            )
        } else {
            return <EmptyCart/>
        }

    }
}

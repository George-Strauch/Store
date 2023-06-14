import React from "react";
import '../css/productCard.css';
import ItemDetailExpander from "./ItemDetailExpander";






export class MyCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'currentIndex': 0
        }
    }

    move = (x) => {
        let index = (this.state.currentIndex+x) % this.props.images.length;
        if (index < 0) {
            index = this.props.images.length + index
        }
        this.setState({currentIndex: index});
    }

    render() {
        return (
            <>
                <div className="image-container">
                    <img className="displayImage" src={this.props.images[this.state.currentIndex]} alt="" />

                    <div className="swipe" id="left" onClick={() => this.move(-1)}>
                        <div className="swipeArrowHolder">
                            <i className="leftArrow navArrow"/>
                        </div>
                    </div>

                    <div className="swipe" id="right" onClick={() => this.move(1)}>
                        <div className="swipeArrowHolder">
                            <i className="rightArrow navArrow"/>
                        </div>
                    </div>
                </div>

                <div
                    className={this.props.expanded? "CarouselNav": "CarouselNav secretDiv"}
                >
                    {this.props.images.map((x,i) => <img
                        className={i === this.state.currentIndex? "CarouselNavImage selected" : "CarouselNavImage"}
                        onClick={() => this.setState({currentIndex: i})}
                        src={x} alt=""/>)}
                </div>
            </>
        )
    }
}


export class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = this.props.parentData
        this.addToCart = props?.addToCart
        this.data = props?.data;
        this.state = {
            expanded: false
        }
    }

    setExpanded = () => {
        this.setState({expanded: !this.state.expanded});
    }

    addThisToCart = () => {
        this.addToCart(this.data.id)
    }


    expressCheckout = () => {
        this.addToCart(this.data.id)
        window.location.href = "/checkout";
    }

    render() {
        let id_name = ""
        if (!this.parentData.isMobile()){
            id_name += "desktop"
        }
        return (
            <section className="itemCard" id={id_name}>
                <div className="itemcontent">
                    <MyCarousel images={this.data.images} expanded={this.state.expanded}/>

                    <div className="infobox">
                        <h2 className="productTitle">
                            {this.data.title}
                        </h2>
                        <div className="itemdesc">{this.data.desc}</div>
                        <div  className="POS">
                            <span className="pricetag">
                              $ {this.data.price}
                            </span>
                            <div className="checkoutOptions">

                                <div className="buyButton" onClick={this.addThisToCart}>
                                    add to cart
                                </div>
                                {/*<div className="buyButton" onClick={this.expressCheckout} id="express">*/}
                                {/*    Buy Now*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                    <ItemDetailExpander
                        expandedCallback={this.setExpanded}
                        expanded={this.state.expanded}
                        item={this.data}
                        hidden = {!this.parentData.isMobile()}
                    />

                </div>


            </section>
        )
    }
}


export default class ProductCards extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
        this.addToCart = this.parentData.addToCart

    }

    render() {
        this.shopItems = this.parentData.getItemsList()
        console.log("update - ", this.shopItems)
        let className = ""
        if (this.parentData.getIsSideNavVisible()){
            className = "menu-visible"
        } else if (!this.parentData.isMobile()) {
            className = "desktop"
        }
        return (
            // todo make this div a component that has the nav off click and the set width from nav
            <div>
                <span className="shipping">
                    100% Free Shipping
                </span>

                <div
                id="itemRowContainer"
                className={className}
                >
                    {this.shopItems.map((x) => <ItemCard data={x} addToCart={this.addToCart} parentData={this.parentData}/>)}
                </div>
            </div>

        )
    }
}


import React from "react";
import '../css/productCard.css';



function ItemTable (info)  {
    let items = Object.entries(info.info);
    return (
        <table className="itemTable">
            {items.map((x) =>  (
                <tr >
                    <td>{x[0]}</td>
                    <td>{x[1]}</td>
                </tr>
            ))}
        </table>
    );
}


export class MyCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.images = props.images
        this.state = {
            'currentIndex': 1
        }
    }

    move = (x) => {
        let index = (this.state.currentIndex+x) % this.images.length;
        if (index < 0) {
            index = this.images.length + index
        }
        this.setState({currentIndex: index});
    }

    render() {
        return (
            <div className="image-container">
                <img className="row_img" src={this.images[this.state.currentIndex]} alt="" />

                <div className="swipe" id="left" onClick={() => this.move(-1)}>
                    <div className="swipeArrowHolder">
                        <i className="leftArrow navArrow"/>
                    </div>
                </div>

                <div className="swipe" id="right" onClick={() => this.move(-1)}>
                    <div className="swipeArrowHolder">
                        <i className="rightArrow navArrow"/>
                    </div>
                </div>
            </div>

        )
    }
}


export class ItemCard extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <section className="itemCard" >
                <div className="itemcontent">
                    <MyCarousel images={this.data.images}/>

                    <div className="infobox">
                        <h2 className="productTitle">
                            {this.data.title}
                        </h2>
                        <div className="itemdesc">{this.data.desc}</div>
                        <div  className="POS">
                  <span className="pricetag">
                      {this.data.price}
                  </span>

                            <div className="checkoutOptions">
                                <button className="buyButton" onClick={this.addThisToCart}>
                                    <span>add to cart</span>
                                </button>
                                <button className="buyButton" onClick={this.expressCheckout} id="express">
                                    <span>Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={this.state.expanded? "expanded secretDiv": "secretDiv"}>

                        <div className="longDesc">
                            {this.data.descMore}
                        </div>


                        <div>
                            <ItemTable info={this.data.info}/>
                        </div>



                    </div>
                </div>

                <div className="arrowbutton" onClick={this.setExpanded}>

                    <i className={this.state.expanded? "expanded down": "down"} id={this.state.expanded? "expanded": ""}/>
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
        this.shopItems = this.parentData.getItemsList()
        console.log(this.shopItems)
    }

    render() {
        let className = ""
        if (this.parentData.getIsSideNavVisible()){
            className = "menu-visible"
        } else if (!this.parentData.isMobile()) {
            className = "desktop"
        }
        return (
            <div
                id="itemRowContainer"
                className={className}
                onClick={this.parentData.hideNav}>
                <span className="shipping">
                      100% Free Shipping
                </span>
                {this.shopItems.map((x) => <ItemCard data={x} addToCart={this.addToCart}/>)}
            </div>
        )
    }
}


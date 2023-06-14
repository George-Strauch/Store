import React from "react";
import '../css/nav.css'


const CartIcon = ({nItems}) => {
    return (
        <a className="cartButton" href="/checkout">
            <span className="cart">{nItems}</span>
            <span >
                <i className="fa fa-shopping-cart cart"></i>
            </span>
        </a>
    );
}


export class Sidenav extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
    }


    render() {
        let nItems = this.parentData.getNitemsFromCart();
        let checkoutMessage = "Add Items to your cart"
        if (nItems === 1){
            checkoutMessage = "1 Item is Waiting to be yours"
        }else if(nItems > 1) {
            checkoutMessage = nItems + " Items are Waiting to be yours"
        }
        let menuClass = ""
        if (this.parentData.getIsSideNavVisible()){
            menuClass = "menu-visible"
        } else if (!this.parentData.isMobile()) {
            menuClass = "desktop"
        }
        console.log(menuClass)
        return (
          <section id="menu" className={menuClass}>
          <section>
            <ul className="links">
              <li>
                <a href="/">
                  <h3>All Products</h3>
                  {/*<p>View all products in our inventory</p>*/}
                </a>
              </li>
              <li>
                <a href="/">
                  <h3>Knives</h3>
                  {/*<p>Beautiful Damascus blades</p>*/}
                </a>
              </li>
              <li>
                <a href="/">
                  <h3>Stands</h3>
                  {/*<p>Show off your collection</p>*/}
                </a>
              </li>
              <li>
                <a href="/checkout">
                  <h3>Checkout</h3>
                    {/*<p>{checkoutMessage}</p>*/}
                </a>
    
              </li>
            </ul>
          </section>
        </section>
       )
    }
}

export class Headnav extends React.Component {
    constructor(props) {
        super(props);
        console.log("Headnav props:", this.props)
        this.parentData = props.parentData;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const topVisClass = this.parentData.topVisible()? "": " topHidden"
        return (
      <header id="header" className={topVisClass}>
        <nav className="main">
          <ul>
            <li className="menu" onClick={this.parentData.changeMenuVis}>
              <a className="fa-bars" href="#menu">d</a>
            </li>
          </ul>
        </nav>
        <h1><a href="index.html">Culinary Edge</a></h1>
          <CartIcon nItems={this.parentData.getNitemsFromCart()}/>
      </header>
    )
  }
}

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
        console.log(this.parentData)
    }

  render() {

    return (
        <>
            <Headnav
                parentData={this.parentData}
            />
            <Sidenav
                 parentData={this.parentData}
            />
        </>
    )
  }
}


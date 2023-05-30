import React from "react";
import '../css/nav.css'

import {RedirectFunction} from "react-router-dom";

const CartIcon = ({nItems}) => {
    return (
        <button className="cartButton">

            <span className="cart">{nItems}</span>
            <a href="/checkout">
                <i className="fa fa-shopping-cart cart"></i>
            </a>

        </button>
    );
}


export class Sidenav extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
    }

    render() {
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
                  <p></p>
                </a>
              </li>
              <li>
                <a href="/">
                  <h3>Knives</h3>
                  <p></p>
                </a>
              </li>
              <li>
                <a href="/">
                  <h3>Stands</h3>
                  <p></p>
                </a>
              </li>
              <li>
                <a href="/checkout">
                  <h3>Checkout</h3>
                  <p></p>
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
    return (
      <header id="header">
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
      <div style={{"display": "contents"}}>
        <Headnav
            parentData={this.parentData}
        />
        <Sidenav
             parentData={this.parentData}
        />
      </div>
    )
  }
}


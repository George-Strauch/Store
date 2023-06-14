import Navigation from "./components/nav";
import './css/App.css';
import "./components/productCards"
import Page from "./components/Page";
import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productview from "./components/product-page";
import ReactFlow, { useViewport } from 'reactflow';
import ProductCards from "./components/productCards"
import Checkout from "./components/checkout";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopItems: [],
            isMobile: this.getIsMobile(),
            cart: this.getCartFromCache(),
            navVisible:false,
            topVisible:true,
            nCartItems:0
        }
        this.last_scroll=0
        window.onresize = this.setIsMobile;
        window.onscroll = this.catchScrollDirection
    }

    catchScrollDirection = () => {
        // console.log(window.scrollY)
        if (window.scrollY > this.last_scroll && this.state.topVisible){
            // hide nav, we are scrolling down
            this.setState({topVisible:false})
        }
        else if (window.scrollY < this.last_scroll && !this.state.topVisible) {
            // show top, going back up
            this.setState({topVisible:true})
        }
        this.last_scroll = window.scrollY
        // console.log(this.state.topVisible)
    }

    getTopVis = ()=> {
        return this.state.topVisible
    }

    getIsMobile = ()=> {
        const h = window.innerHeight
        const w = window.innerWidth
        const ar = w/h
        return ar < 1
    }

    setIsMobile = ()=> {
        this.setState({isMobile: this.getIsMobile()})
    }

    isMobile= ()=>{
        return this.state.isMobile
    }

    addItemToCart = (itemID, amount=1)=>{
        console.log("adding " + amount + " of " + itemID + " in app")
        let newCart = structuredClone(this.state.cart)
        if (!(itemID in newCart)) {
            newCart[itemID] = this.getItemByID(itemID)
            newCart[itemID]['n'] = amount
            this.setState({"cart": newCart}, ()=> {this.storeCart()})
        }
        else {
            newCart[itemID]['n'] += amount
            this.setState({"cart": newCart}, ()=> {this.storeCart()})
        }
        return newCart
    };

    delItemFromCart = (itemID, amount=1) => {
        const newCart = structuredClone(this.state.cart)

        if (!(itemID in this.state.cart)) {
            return;
        }
        const newQuantity = newCart[itemID]["n"] - amount;
        if (newQuantity <= 0){
            delete newCart[itemID];

        }else {
            newCart[itemID]["n"] = newQuantity
        }
        this.setState({"cart": newCart}, ()=> {this.storeCart()})
        // return newCart

    };

    getCartFromCache = ()=> {
        // todo update items in case cached object is not the same as current
        let cart =  JSON.parse(window.localStorage.getItem('cart'));
        if (!cart) {
            cart = {}
        }
        this.setState({"cart": cart})
        return cart;
    }

    getNitemsFromCart = (cart)=> {
        let total = 0;

        for (const value of Object.values(this.state.cart)) {
            total += value["n"]
        }
        return total;
    }

    getCartItems = () => {
        return structuredClone(this.state.cart)
    }

    storeCart = ()=> {
        window.localStorage.setItem("cart", JSON.stringify(this.state.cart))
    }
    
    async fetchItems(){
        axios.get('/items')
            .then((response) => {
                    const items = response.data.items
                    console.log(items)
                    this.setState({"shopItems": items}, ()=> {console.log("items have been set")})
                }
            )
            .catch(
            //     todo: cannot fetch items
            );
    }

    getItems = () => {
        return this.state.shopItems;
    }

    getItemByID  = (id) => {
        let retVal = null
        this.state.shopItems.forEach(x => {
            console.log(x['id'], " == ", id)
            console.log(x['id'] === id)
            if (x['id'] === id) {
                retVal = structuredClone(x);
            }
        });
        return retVal
    }

    changeMenuVis = () => {
        this.setState({ navVisible: !this.state.navVisible });
    }

    hideNav = () => {
        if (this.state.navVisible && this.state.isMobile){
            this.setState({navVisible: false})
        }
    }

    getIsSideNavVisible = () => {
        return this.state.navVisible
    }

    componentDidMount() {
        this.fetchItems();
    }

    render() {
        const parentData = {
            getNitemsFromCart: this.getNitemsFromCart,
            addToCart: this.addItemToCart,
            removeFromCart: this.delItemFromCart,
            changeMenuVis: this.changeMenuVis,
            hideNav: this.hideNav,
            getIsSideNavVisible: this.getIsSideNavVisible,
            isMobile:  this.isMobile,
            getCartItems: this.getCartItems,
            getItemsList: this.getItems,
            getCartFromCache: this.getCartFromCache,
            topVisible: this.getTopVis
        }

        return (
            <div style={{"display": "contents"}} style={{"align-items": "centered"}}>
                <Navigation parentData={parentData}/>
                <div style={{"display": "contents"}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={ <Page parentData={parentData}><ProductCards parentData={parentData}/> </Page>}/>
                            <Route path='/1' element={<Page parentData={parentData}><Productview parentData={parentData}/></Page>}/>
                            <Route path='/checkout' element={<Page parentData={parentData}><Checkout parentData={parentData}/></Page>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default App;

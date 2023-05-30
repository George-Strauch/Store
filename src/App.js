import Navigation from "./components/nav";
import './css/App.css';
import "./components/productCards"
import Home from "./components/home";
import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productview from "./components/product-page";
import ReactFlow, { useViewport } from 'reactflow';
import ProductCards from "./components/productCards"
import Checkout from "./components/checkout";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.shopItemsList = this.getItems();
        this.shopItemsMap = this.getMappedItems();

        this.state = {
            isMobile: this.getIsMobile(),
            isSideNavVisible: false,
            isTopNavVisible: true,
            cart: this.getCartFromCache(),
            last_scroll:0,
            navVisible:false,
            nCartItems:0
        }
        window.onresize = this.setIsMobile;
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
            newCart[itemID] = structuredClone(this.shopItemsMap[itemID])
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

    getItems(){
        return [
            {
                "id": "a",
                "header": require("./images/final/cleaver/2.webp"),
                "images": [1,2,3].map((x) => {return require("./images/final/cleaver/"+x+".webp")}),
                "title": "Cleaver",
                "price": 200,
                "desc": "Made for the toughest cutting jobs in the kitchen such as chopping heavy vegetables, hacking bones, and can cutting thicker meats",
                "descMore": "\n" +
                    "The epitome of culinary craftsmanship featuring a lustrous blade and a luxurious sycamore handle. Meticulously handcrafted by skilled artisans, this masterpiece combines the unrivaled strength and sharpness of Damascus steel with the natural elegance of sycamore wood. The enchanting blade, adorned with mesmerizing Damascus patterns, effortlessly glides through meats, vegetables, and more, ensuring precision and control in every cut. With its ergonomic handle crafted from carefully selected sycamore, this knife offers a comfortable and secure grip, elevating your culinary experience to new heights of sophistication. Unleash your culinary creativity and embrace the art of cooking with this heirloom-worthy Damascus cleaver knife, a true treasure for passionate chefs and connoisseurs of exceptional cutlery.",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm"
                }
            },
            {
                "id": "b",
                "header": require("./images/final/Santoku/2.webp"),
                "images": [1,2,3].map((x) => {return require("./images/final/Santoku/"+x+".webp")}),
                "title": "Santoku",
                "price": 120,
                "desc": "Flatter edg compared to the more western chefs knifes that makes it idea for a chopping motion rather than a rocking ",
                "descMore": "\n" +
                    "The Santoku knife, meaning \"three virtues\" in Japanese, embodies its name by excelling in three primary functions: slicing, chopping, and mincing, while some chefs attribute the three virtues to utilizing distinct sections of the blade—the cutting edge for precision slicing, the heel for robust chopping, and the tip for intricate tasks. The santaku offers a flatter edge over the western chefs knife for mor of a chopping rather than a rolling motion",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm"
                }
            },
            {
                "id": "c",
                "header": require("./images/final/chef/2.webp"),
                "images": [1,2,3].map((x) => {return require("./images/final/chef/"+x+".webp")}),
                "title": "Chef Knife",
                "price": 120,
                "desc": "The classic western chefs Knife perfect all-around tool for any cutting, slicing or dicing job",
                "descMore": "cleaver",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "8 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm"
                }
            },
            {
                "id": "d",
                "header": require("./images/final/5in/2.webp"),
                "images": [1,2,3].map((x) => {return require("./images/final/5in/"+x+".webp")}),
                "title": " Utility Knife",
                "price": 95,
                "desc": "For everything else",
                "descMore": "cleaver",
                "info": {
                    "Steel": "67 layers damascus 10Cr15CoMoV steel",
                    "Dimensions": "5 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm"
                }
            },

            {
                "id": "e",
                "images": [1,2,3,4].map((x) => {return require("./images/final/stand/"+x+".webp")}),
                "title": "Stand",
                "price": 49,
                "desc": "Show off your beautiful collection",
                "descMore": "cleaver",
                "info": {
                    "wood": "Acacia",
                    "Dimensions": "5 inch blade \n 5 inch handel",
                    "handle": "Figured sycamore wood",
                    "Mass": "1kg",
                    "Package Size": "42 X 8 X 4 cm"
                }
            },
        ]
    }

    getMappedItems  = () => {
        let obj = {}
        const items = this.getItems()
        items.forEach((x) => {
            obj[x['id']] = x;
        });
        return obj
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
            getMappedItems: this.getMappedItems,
            getItemsList: this.getItems,

            getCartFromCache: this.getCartFromCache
        }

        return (
            <div style={{"display": "contents"}} style={{"align-items": "centered"}}>
                <Navigation parentData={parentData}/>
                <div style={{"display": "contents"}} onClick={this.hideNav}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home parentData={parentData}/>}/>
                            <Route path='/1' element={<Productview parentData={parentData}/>}/>
                            <Route path='/checkout' element={<Checkout parentData={parentData}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default App;

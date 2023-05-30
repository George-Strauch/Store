import ProductCards from "./productCards";
import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("home props: ", this.props)
        this.parentData = props.parentData
    }

    render() {
        return (
            <div style={{"display": "contents"}}>
                <ProductCards parentData={this.parentData}/>
            </div>
        );
    }
}

export default Home

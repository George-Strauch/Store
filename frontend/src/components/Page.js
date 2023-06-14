import ProductCards from "./productCards";
import React from "react";
import '../css/page.css'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
    }

    render() {
        let id_name = ""
        if (!this.parentData.isMobile()){
            id_name += "desktop"
        }
        return (
            <div
                className="Page"
                id={id_name}
                onClick={this.parentData.hideNav}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Page

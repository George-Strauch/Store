import React from "react";

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.parentData = props.parentData
        this.state = {}
    }
    render(){
        return (
            this.props.children
        )
    }
}

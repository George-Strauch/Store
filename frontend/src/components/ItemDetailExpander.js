import React from "react";
import '../css/detailExpander.css';

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

export default class ItemDetailExpander extends React.Component {
    constructor(props) {
        console.log(props.item)
        super(props);
        this.item = this.props.item

    }

    setExpanded = () => {
        if (this.props.expandedCallback != null){
            this.props.expandedCallback()
        }

    }

    render() {
        console.log(this.props.hidden)
        if (this.props.hidden) {
            return <></>
        } else {
            return (
                <>
                    <div className={this.props.expanded? "expanded secretDiv": "secretDiv"}>

                        <div className="longDesc">
                            {this.props.item.descMore}
                        </div>

                        <div>
                            <ItemTable info={this.props.item.info}/>
                        </div>

                    </div>

                    <div className="arrowbutton" onClick={this.setExpanded}>
                        <i className={this.props.expanded? "expanded down": "down"} id={this.props.expanded? "expanded": ""}/>
                    </div>
                </>
            )
        }
    }
}

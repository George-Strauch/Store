import React, {Component} from "react";

class Productview extends Component {
    constructor(props) {
        super();

    }
    render() {
        return (
            <section id="product-section">
                    <div class="product-page-image-container">
                        <div class="product-page-image">
                        </div>
                        <div class="product-page-image-nav">
                        </div>
                    </div>
                    {/* to the right or below on mobile */}
                    <div class="product-page-description">
                        {/* description of product */}
                    </div>
            </section>
        );
    }
}

export default Productview;

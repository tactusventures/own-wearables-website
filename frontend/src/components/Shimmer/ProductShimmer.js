import "./shimmer.css";

const ProductShimmer = () => {
    return (
        <div className="container">
            <div className="section-navigation">

            </div>
            <div className="shimmer">
                <div className="left">
                    <div className="product2__product_images_wrapper">
                        {
                            new Array(4).fill(0).map(() => (
                                <div className="single_image">

                                </div>
                            ))
                        }
                    </div>

                    <div className="thumbnil">
                        <div className="img">

                        </div>
                        <div className="buttons">
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                </div>


                <div className="right">

                    <div className="title">
                        <div className="title-small">

                        </div>

                        <div className="title-big">

                        </div>
                    </div>

                    

                    <div className="colors">
                        <div className="title"></div>
                        <div className="color_wrapper">
                            <div className="color_box"></div>
                            <div className="color_box"></div>
                            <div className="color_box"></div>
                            <div className="color_box"></div>
                        </div>
                    </div>


                   

                    <div className="description">
                        <div className="description-1">

                        </div>
                        <div className="description-2">

                        </div>
                        <div className="description-3">

                        </div>

                    </div>

                </div>

        </div>
        </div >
    )
}

export default ProductShimmer; 
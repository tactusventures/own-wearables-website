import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'; 
import "./home2.css"; 


const Home2 = () => {
    
    const settings = {
        dots: true,
        infinite: true,autoplay: true,
        autoplaySpeed: 2000, 
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className="page-home2">

                {/* ---------------------- hero Slider -------------- */}
                 <div className="hero__slider">
                     <Slider {...settings}>
                        <div className="single-slide slide-1">
                            <h2>Slide1</h2>
                        </div>

                        <div className="single-slide slide-2" >
                          <h2>Slide 2</h2>

                        </div>

                        {/* <div className="single-slide slide-3">
                            <h2>Slide 3</h2>
                        </div>


                        <div className="single-slide slide-4">
                            <h2>Slide 4</h2>
                        </div> */}
                     </Slider>
                    
                 </div>

                {/* ----------------- Product Overview Section -------------- */}
                <div className="product__overview">
                    <div className="container">
                        <h2>OWN SHOES <br />
                         WORLD'S FIRST<strong> SMART SHOE</strong></h2>
                        <p>Our most loved laptop, now with a spacious 38.91-centimetre (15.3-inch) Liquid Retina display to make room for more of what you love. Supercharged by the M2 chip, with up to 18 hours of battery life. </p>
                        <span>Available starting from 13 July</span>
                        <div className="product-overview-btn">
                            <button>Learn more</button>
                            <button>Order Now</button>
                        </div>
                    </div>
                </div>

                {/* ------------------- specification ---------------- */}
                <div className="product__specification">
                    <div className="container">

                        <h2 className="main_section_title">Product Specifications</h2>

                        <div className="specifications-wrapper">

                            <div className="small-specifications">
                                {/* ------------------ left side --------------------s   */}
                                <div className="left">
                                    <h4>Powerfull Sensors</h4>
                                    <p>Discover How powerfull sensors will help you</p>
                                    <a href="#"> Learn More <i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i> </a>

                                    {/* <img src="/images/specification-img-1.png" alt="image" /> */}

                                    {/* <img src="https://5.imimg.com/data5/MW/YH/MY-55101799/shoe-sole-500x500.jpg" /> */}
                                    <img src="https://assets-global.website-files.com/6179bd8bf2c3bb015c1fa461/62daf35bb6560b8b8a59244c_Cover.jpg" />


                                </div>

                                {/* ---------------- rightside ----------------------  */}
                                <div className="right">
                                    <h4>Powerfull Sensors</h4>
                                    <p>Discover How powerfull sensors will help you</p>
                                    <a href="#"> Learn More<i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i> </a>

                                    {/* <img src="/images/specification-img-1.png" alt="image" /> */}
                                    {/* <img src="https://5.imimg.com/data5/MW/YH/MY-55101799/shoe-sole-500x500.jpg" /> */}
                                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOw-2pbts7dAmzz6wc7yUAtKYFaQYipM983w&usqp=CAU" /> */}
                                    <img src="https://assets-global.website-files.com/6179bd8bf2c3bb015c1fa461/62daf35bb6560b8b8a59244c_Cover.jpg" />


                                </div>
                            </div>

                            <div className="imp-specification">
                                
                            </div>
                        </div>
                    </div>
                
                    <div className="container">
                        <div className="features-list">
                                <div className="left">
                                    <img src="/images/zyro-img.png" />
                                </div>

                                <div className="right">
                                    <div className="features-wrapper">
                                        <div className="single-feature">
                                            <i className="fas fa-compass"></i>
                                            <div>
                                                <h4>No Building, No Pain</h4>
                                                <p>

                                                Our most loved laptop, now with a spacious 38.91-centimetre (15.3-inch) Liquid Retina display to make room for more of what you love
                                                </p>
                                            </div>
                                        </div>


                                        <div className="single-feature">
                                            <i className="fas fa-location"></i>
                                            <div>
                                                <h4>No Building, No Pain</h4>
                                                <p>

                                                Our most loved laptop, now with a spacious 38.91-centimetre (15.3-inch) Liquid Retina display to make room for more of what you love
                                                </p>
                                            </div>
                                        </div>


                                        <div className="single-feature">
                                            <i className="fas fa-shoe-prints"></i>
                                            <div>
                                                <h4>No Building, No Pain</h4>
                                                <p>

                                                Our most loved laptop, now with a spacious 38.91-centimetre (15.3-inch) Liquid Retina display to make room for more of what you love
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                {/* ----------------- Pointed Specifications -------------  */}
                <div className="pointed__specifications">
                    <h2>Pointed Specifications</h2>
                </div>


                {/* app */}

            </div>
    )
}


export default Home2; 
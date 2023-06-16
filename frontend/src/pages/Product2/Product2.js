import React, { useEffect, useState } from 'react'
import './product2.css';
import { loadAllProducts, orderPlace } from '../../http';
import ProductShimmer from '../../components/Shimmer/ProductShimmer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';





const Product2 = () => {
    const [product, setProduct] = useState(null);
    const [activeColor, setActiveColor] = useState("");
    const [activeThumbnilImage, setActiveThumbnilImage] = useState("");
    const [size, setSize] = useState(null);
    const navigate = useNavigate();

    const selector = useSelector(state => state.auth);
    const userId = selector.user._id;

    useEffect(() => {
        async function load() {
            try {
                let products = await loadAllProducts();
                setProduct(products.data[0]);
                setActiveColor(products.data[0].colors[0]);
                setActiveThumbnilImage(products.data[0].images[products.data[0].colors[0]][0]);
                setSize(products.data[0].sizes[0]); 
            } catch (e) {
                console.log(e);
            }
        }

        load();
    }, []);


    // switch the color 
    function switchColor(e, color) {
        setActiveThumbnilImage(product.images[color][0]);
        setActiveColor(color)
    }


    // change Image 
    const changeImage = (e, img) => {
        setActiveThumbnilImage(img);
    }


    // place order
    const placeOrder = async (e) => {
        try {
            const res = await orderPlace({ customerId: userId, item: product._id, color: activeColor, size: size, quantity: 1, paymentMode: "online", totalPrice: product.price });

            console.log(res); 

            const { _id } = res.data;
            navigate(`/order/order-summary/${_id}`);

        } catch (e) {
            console.log(e);
        }
    }


    // slider settings

    const settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 2000, 
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1
      };


    return (
        <section className='Product2-page'>

            {
                !product ? <ProductShimmer />
                    :
                    <>
                        <div className='container'>
                            {/* Product navigation */}
                            <div className='page__navigation'>
                                <a href="#">Home </a> <i className='fas fa-chevron-right'></i>
                                <a href="#">Product </a> <i className='fas fa-chevron-right'></i>
                                <span>Own Shoes</span>
                            </div>


                            {/* -------- Product seciton-------------- */}
                            <div className='product2-wrapper'>
                                {/* left div */}
                                <div className='product2-left'>
                                    {/*------- verticle image veiw ---------- */}
                                    <div className='product2__product_images_wrapper'>
                                        {
                                            product.images[activeColor].map((img, ind) => (
                                                <div className={`single_image ${img === activeThumbnilImage ? 'active' : ''}`} key={ind} onMouseOver={e => changeImage(e, img)}>
                                                    <img src={`http://localhost:5000/${img}`} alt='product-image' />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {/* --------------- Thumbnil ----------- */}
                                    <div className="product__thumbnil">
                                        <div className='img'>
                                            <img src={`http://localhost:5000/${activeThumbnilImage}`} alt='product-thumbnil' />
                                        </div>

                                        <div className='product__btns'>
                                            <button className='btn__share'>
                                                Share<i className='fa-solid fa-share'></i>
                                            </button>
                                            <button className='btn__buy' onClick={e => placeOrder(e)}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* -------------------Mobile-Left--------------------------- */}

                                <div className='product2-left-mobile'>
                                    <div className='mobile-slider-image-wrapper'>
                                    <Slider  {...settings}>
                                    {
                                            product.images[activeColor].map((img, ind) => (
                                                <div className={`slider_single_image ${img === activeThumbnilImage ? 'active' : ''}`} key={ind} onMouseOver={e => changeImage(e, img)}>
                                                    <img src={`http://localhost:5000/${img}`} alt='product-image' />
                                                </div>
                                            ))
                                        }
                                            
                                    </Slider>
                                    </div>
                                        {/* --------------------------Mobile-Left-Buttons----------------------- */}
                                    <div className='product__btns__mobile'>
                                            <button className='btn__share'>
                                                Share<i className='fa-solid fa-share'></i>
                                            </button>
                                            <button className='btn__buy' onClick={e => placeOrder(e)}>Buy Now</button>
                                        </div>
                                    
                                </div>


                                {/* right div */}
                                <div className='product2-right'>
                                    <div className='right__title'>
                                        <h4>{product.productName}</h4>
                                        <h2>Own Shoes: The AI enabled Tech Shoes</h2>
                                    </div>

                                    {/* ------------------- pricing section --------------------- */}
                                    <div className='right__price'>
                                        <h3>{product.price}   <span className='old__price'>₹ 8,559</span> <span>( MRP )</span> &nbsp; <span>40%</span></h3>
                                        <small>(inclusive of taxes)</small>
                                    </div>
                                    <div className='right__color'>
                                        <h4 className='product2__section-title' >Color</h4>
                                        <div className='color__wrapper'>

                                            {
                                                product.colors.map((color, ind) => (
                                                    <div className='color_box' >
                                                        <div className={`color__img  ${color === activeColor ? 'active' : ''}`} onClick={e => switchColor(e, color)}>
                                                            <img src={`http://localhost:5000/${product.images[color][0]}`} alt='color-image' />
                                                        </div>

                                                        <h6>{color === activeColor ? color : ""}</h6>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* ----------- size section --------------------- */}
                                    <div className='right__size'>
                                        <div className='size-bar'>
                                            <h4 className='product2__section-title'>Size</h4>
                                            <span><i class="fas fa-ruler-horizontal"></i>Size Chart</span>
                                        </div>
                                        <div className='size-box-wrapper'>

                                            {
                                                product.sizes.map((number) => (
                                                    <div className={`size-box ${number === size ? "active" : ""}`} onClick={e => setSize(number)}>
                                                        {number}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <p>Is your size is not available? <a href='#'>Get notified.</a></p>
                                    </div>

                                    {/* ---------------- pincode ------------------ */}
                                    <div className='delivery-options'>
                                        <h2 className='product2__section-title'>Delivery Options</h2>

                                        <div className='delivery_option_check'>
                                            <div className='input-wrapper'>
                                                <input type="text" placeholder='Enter Pincode' />
                                                <a href="#">Check</a>
                                            </div>
                                        </div>

                                        <div className='delivery_info'>
                                            <ul>
                                                <li>
                                                    <i className='fas fa-calendar-days'></i>
                                                    Enter Pincode for Delivery Date
                                                </li>

                                                <li>
                                                    <i className='fas fa-truck'></i>
                                                    All India Free Shipping
                                                </li>

                                                <li>
                                                    <i className='fas fa-right-left'></i>
                                                    30 day Returns <a href='#'>View Return policy</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/*------ Deal of the Day-------- */}
                                    <div className='offer_of_the_day'>
                                        <h2 className='product2__section-title'>Deal of the Day</h2>
                                        <div className='offer_wrapper'>
                                            <div className='left'>
                                                <h4>Use <strong>COUPONCODE100</strong></h4>
                                                <p>Signup with Reebok to get 15% off on your 1st Purchase <br />
                                                </p>

                                                <a href='#'>View T&C</a>
                                            </div>
                                            <div className='right'>
                                                <span>
                                                    <i className='fas fa-copy'></i>
                                                    copy
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --------Product Details----------- */}
                                    <div className='product_details'>
                                        <h2 className='product2__section-title'>Product Details</h2>
                                        <div className='product_specs'>
                                            <h4>Description:</h4>
                                            <h5>RESPONSIVE RUNNING SHOES THAT ARE PART OF REEBOKS [REE]CYCLED COLLECTION</h5>
                                            <p>The future is now. Step right in and see where it takes you in these womens Reebok running shoes. The sleek mesh upper rides on a chunky zigzag midsole that provides a snappy, energetic ride. Lightweight FuelFoam delivers the optimal balance of cushioning and support for heel-to-toe comfort.</p>
                                            <br />
                                            <h4>Details:</h4>
                                            <ul>
                                                <li>[REE]CYCLED: Made with at least 30% recycled or repurposed materials</li>
                                                <li>Regular fit</li>
                                                <li>Mesh upper</li>
                                                <li>Lace closure</li>
                                                <li>Textile lining</li>
                                                <li>FuelFoam midsole</li>
                                                <li>All-surface rubber outsole</li>
                                            </ul>
                                            {/* --- description */}
                                            <div className='description-wrapper'>
                                                <div className='desc-row'>
                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>


                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>

                                                </div>


                                                <div className='desc-row'>
                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>


                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>

                                                </div>


                                                <div className='desc-row'>
                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>


                                                    <div className='single-description-point'>
                                                        <span className='label'>Style Code: </span>
                                                        <p>GW1541</p>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* ----------------------- whats in the box --------------- */}

                            <div className='whats_in_box'>
                                <h2 className='main_section_title'>What's In Box</h2>

                                <div className='box_items_wrapper'>
                                    <div className='box_item'>
                                        <div className='box_item_img'>
                                            <img src='https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-3731.jpg?size=626&ext=jpg' />
                                        </div>
                                        <span>Shoes</span>
                                    </div>


                                    <div className='box_item'>
                                        <div className='box_item_img'>
                                            <img src='https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-2904.jpg?size=626&ext=jpg' />
                                        </div>
                                        <span>Adapter</span>
                                    </div>


                                    <div className='box_item'>
                                        <div className='box_item_img'>
                                            <img src='https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-3603.jpg?size=626&ext=jpg' />
                                        </div>
                                        <span>USB Type-C</span>
                                    </div>



                                    <div className='box_item'>
                                        <div className='box_item_img'>
                                            <img src='https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-3735.jpg?size=626&ext=jpg' />
                                        </div>
                                        <span>Warrantry</span>
                                    </div>
                                </div>
                            </div>

                            {/* -------------- FAQ's ------------ */}

                            <div className='faq_section'>
                                <h2 className='main_section_title'>Frequently Assked Questions</h2>
                                <div className='faq_wrapper'>
                                    <div className='single_faq active'>
                                        <div className='faq_question'>
                                            <h4>How long does the delivery take?</h4>
                                            <i class="fas fa-angle-down"></i>
                                        </div>
                                        <div className='faq_answer'>
                                            <p>RS Chrono has fulfilment centres based in the US, UK, Europe & Asia allowing faster delivery times worldwide.
                                                USA Shipping Standard (3-5 days): FREE
                                                UK Shipping Standard (3-7 days): FREE
                                                Europe Shipping Standard (3-9 days): FREE
                                                Canada Shipping Standard (3-7 days): FREE
                                                India Shipping Standard (5-14 days): FREE
                                                Rest of World - International Express (5-14 days): FREE
                                            </p>
                                        </div>
                                    </div>
                                    <div className='single_faq'>
                                        <div className='faq_question'>
                                            <h4>How long does the delivery take?</h4>
                                            <i class="fas fa-angle-down"></i>
                                        </div>
                                        <div className='faq_answer'>
                                            <p>RS Chrono has fulfilment centres based in the US, UK, Europe & Asia allowing faster delivery times worldwide.
                                                USA Shipping Standard (3-5 days): FREE
                                                UK Shipping Standard (3-7 days): FREE
                                                Europe Shipping Standard (3-9 days): FREE
                                                Canada Shipping Standard (3-7 days): FREE
                                                India Shipping Standard (5-14 days): FREE
                                                Rest of World - International Express (5-14 days): FREE
                                            </p>
                                        </div>
                                    </div>
                                    <div className='single_faq'>
                                        <div className='faq_question'>
                                            <h4>How long does the delivery take?</h4>
                                            <i class="fas fa-angle-down"></i>
                                        </div>
                                        <div className='faq_answer'>
                                            <p>RS Chrono has fulfilment centres based in the US, UK, Europe & Asia allowing faster delivery times worldwide.
                                                USA Shipping Standard (3-5 days): FREE
                                                UK Shipping Standard (3-7 days): FREE
                                                Europe Shipping Standard (3-9 days): FREE
                                                Canada Shipping Standard (3-7 days): FREE
                                                India Shipping Standard (5-14 days): FREE
                                                Rest of World - International Express (5-14 days): FREE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </>

            }
        </section>
    )
}

export default Product2; 

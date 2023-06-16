import React, {useState} from 'react'
import './product.css'; 
import { useEffect } from 'react';
import axios from '../../config/axios';
import { useDispatch } from 'react-redux';
import { addOrderData } from '../../store/orderSlice';
import { useNavigate } from 'react-router-dom';
import { changeStep } from '../../store/paymentStepSlice';
import Spinner from '../../components/Spinner/Spinner';
import { loadAllProducts, loadProduct } from '../../http';
import Loader from '../../components/Loader/Loader';


const Product = () => {
    const navigate = useNavigate(); 
    const [products, setProducts] = useState([]); 
    const [product, setProduct] = useState({}); 
    const [productImage, setProductImage] = useState(""); 
    const [productColor, setProductColor] = useState("");   
    const [shoeSize, setShoeSize] = useState(0); 
    const [isLoading, setIsLoading] = useState(false); 

    const dispatch = useDispatch(); 
    // setSize
    

    //  use Effect
    useEffect(() => {

        // loading the product
        const loadProduct = async () => { 
                        
            try{
                const prod = await loadAllProducts();
                setProduct(prod.data[0]);
                setProducts(prod.data);
                let defaultColor = prod.data[0].colors[0];
                setProductColor(defaultColor); 
                setShoeSize(prod.data[0].sizes[0]); 
                setProductImage(`${process.env.REACT_APP_BACKEND_URL}/${prod.data[0].images[defaultColor][0]}`);
            }catch(e){
                console.log('something went wrong');
            }
        }
        loadProduct(); 
    }, []);
    


    const changeColor = (colorInd)  => { 
        setProductColor(product.colors[colorInd]); 
        
        setProductImage(`${process.env.REACT_APP_BACKEND_URL}/${product.images[product.colors[colorInd]][0]}`); 
    }  

    let defaultColor =  product.colors?product.colors[0] : ""; 
    
    // getting images and colors    
    let images = product.images?product.images[productColor]:[]; 
    let colors = product.colors?product.colors: []; 
    let sizes = product.sizes?product.sizes: []; 


    //  set image function 
    const setImage = (e) => {
        let prodImage = e.currentTarget;
        prodImage = prodImage.children[0]; 
        let imageUrl = prodImage.src; 
        setProductImage(imageUrl); 
    } 
    
    // set shoes size


    // proceedOrder 


    async function proceedOrder() { 
        setIsLoading(true); 

        axios.post('/order/place-order', {customerId: "6464a4bdee73f0c3f33d5722", item: product._id, color: productColor, size: shoeSize, quantity: 1, paymentMode: "online", totalPrice: product.price}).then((res) => {
            const  {_id, customerId}  =  res.data; 
            navigate(`/order/order-summary/${_id}`);
        }).catch((e) => {

        });
    }



    // return 

    return (        
        <div className='page-product' id='page-procuct'>
            <div className='container'>
                {
                    products.length === 0 ? 
                    <div className='empty-product'>
                        <h2>No Products Available</h2>
                    </div>
                    :<> 
                    <div className='product-wrapper'>
                        

                        <div className='product-other-images-section'>
                                {
                                    images.map((image) => (
                                        <div className='product-small-image' onClick={e => setImage(e)}>
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} />
                                        </div>
                                    ))
                                }                            
                        </div>

                        <div className='left'>
                            <div className='product'>
                                <img src={`${productImage}`} />
                            </div>

                            {/* <div className='product-other-images'>
                                {
                                    images.map((image) => (
                                        <div className='product-image' onClick={e => setImage(e)}>
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} />
                                        </div>
                                    ))
                                }                            
                            </div> */}
                            
                            <div className='button'>
                                {
                                    isLoading?
                                    <button style={{padding: ".8rem 4rem"}} className='btn btn-primary'><Spinner /></button>: 
                                    <button onClick={e => proceedOrder(e)} className='btn btn-primary'>Buy Now 
                                    </button>

                                }
                            </div>
                        </div>

                        <div className='right'>
                            <h2>{product.productName}  Canon EOS M200 Mirrorless Camera Body with Single </h2>
                            {/* <div className='product-stats'>
                                <ul>
                                    <li><a href='#'>    
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <span style={{marginLeft: "2rem"}}>Ratings </span></a></li>
                                    <li><a href='#'>1 Review</a></li>
                                    <li><a href='#'>1 Have a Question</a></li>

                                </ul>
                            </div> */}

                            <div className='product-specification'>

                                <div className='price'>
                                    <p>MRP <span>$ 1000 </span>  &nbsp;   (Inclusive of all taxes)</p>
                                    <h2>  ${product.price}</h2>
                            </div>

                            
                            <div className='colors'>
                                    <h3>Colors: </h3>   

                                    <div className='product-colors'>
                                        { 
                                            colors.map((color, ind) => (
                                                <div className={color === productColor ?"active": ""} onClick={e => changeColor(ind)}>
                                                    <img src='https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/j/f/o/-original-imaggcb5hs3wfbrv.jpeg?q=70' />
                                                    <h6>{color}</h6>
                                                </div>
                                            ))
                                        }

                                    </div>
                            </div>

                            <div className='specification'>
                                    <h3>Produt Specification</h3>
                                        <p style={{margintop: "2rem"}}>
                                            {product.description}
                                        </p>
                            </div>


                                <div className='sizes'>
                                    <h3>Sizes:</h3>
                                    
                                    <div className='product-sizes'>
                                        <ul>
                                            { 
                                                sizes.map((size, ind) => (
                                                    <li className={size === shoeSize?"active": ""} onClick={e => setShoeSize(size)} key={ind}><a>{size}</a></li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        
                        </div>
                </div>

                <div className='product-specification'>
                    <h2 className='section-title'>Lorem ipsum</h2>
                    <img src='https://www.pngmart.com/files/6/Shoe-PNG-Photo.png' alt='product-specification-image' />

                    <div className='product-specification-details'>
                        <div className='product-product-specification'>
                        <h3>Product Spcifications</h3>
                           <ul>
                                <li>It is a established</li>
                                <li>fact that a reader will be distracted</li>
                                <li>It is a long established</li>
                                <li>It is a established</li>
                            </ul>
                            <button className='btn btn-primary-outline'>Learn More</button>
                        </div>

                        <div className='product-general-specification'>
                            <h3>General Spcifications</h3>
                              <ul>
                                    <li>It is a established</li>
                                    <li>fact that a reader will be distracted</li>
                                    <li>It is a long established</li>
                                    <li>It is a established</li>
                                </ul>
                            <button className='btn btn-primary-outline'>Learn More</button>

                        </div>

                        <div className='product-technical-specification'>
                           <h3>Technical Spcifications</h3>
                           <ul>
                                <li>It is a established</li>
                                <li>fact that a reader will be distracted</li>
                                <li>It is a long established</li>
                                <li>It is a established</li>
                            </ul>

                            <button className='btn btn-primary-outline'>Learn More</button>

                        </div>
                    </div>
                </div>

                <div className='whats-in-box'>
                    <div className='container'>
                        <h2 className='section-title'>What's in Box</h2>
                        <div className='box-content-wrapper'>
                            <div className='box-content'>
                                
                                <img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/49-titanium-case?wid=196&hei=372&fmt=jpeg&qlt=95&.v=1660832673948' />
                                
                                <p>Titanium Case</p>
                            </div>

                            <div className='box-content'>
                                
                                <img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/alpine-loop-orange-band?wid=196&hei=372&fmt=jpeg&qlt=95&.v=1660832707903' />
                     
                                
                                <p>Titanium Case</p>
                            </div>

                            <div className='box-content'>
                               
                                    <img src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-ultra-witb-charger-202209?wid=196&hei=372&fmt=jpeg&qlt=95&.v=1660832691362  ' />
                                
                                <p>Titanium Case</p>
                            </div>
                        </div>
                    </div>
                </div> </>
                }
            </div>
        </div>
    )
}

export default Product

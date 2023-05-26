import React, {useEffect, useState} from 'react'; 
import axios from 'axios';


const AddressStep = ({product, order, setStep}) => {

    const [user, setUser] = useState({}); 
    const [loading, setLoading] = useState(true); 
    const [showAddres, setShowAddress] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-user/${'6464a4bdee73f0c3f33d5722'}`).then((res) => {
            setUser(res.data); 
            setLoading(false);  
        }).catch((e) => { 
            setUser({}); 
        }); 
    }, []); 


    return (
        <div className="left">
            {/* ---------------- Login -------------------- */}
            <div className="login-wrapper">
                <div className="login-title section-title">
                    <div className="left">
                        <span className="section-number">1</span>
                        <div>
                            <h4>LOGIN</h4>
                            <p>+91 8830194017</p>
                        </div>
                    </div>

                    <button className="btn btn-primary">LOGIN</button>
                </div>

            </div>

            {/* ---------------- Adress select ----------- */}
            <div className="address-seletor-wrapper">
                <div className="section-title active">
                    <div className="left">
                        <span className="section-number">2</span>
                        <div>
                            <h4>DELIVERY ADDRESS</h4>
                        </div>
                    </div>
                </div>

                <div className='address-expand'>
                    
                    {
                        loading? <h2>loding....</h2>: 

                        <>
                            {
                                user.addresses.map((address) => (
                                    <>
                                        <div className='top'> 
                                            <input type='radio'  checked /> <h4>{user.firstName} {user.lastName}</h4>
                                            <span>Home</span>
                                            <b>{user.phoneNo}</b>
                                         </div>

                                        <div className='bottom'>
                                            {`${address.houseNoOrRoomNo} , ${address.buildingNoOrArea}, ${address.landmark}, ${address.cityOrVillage}, ${address.state} , ${address.pincode}`}
                                        </div>

                                    </>
                                ))
                            }

                            <button className='btn btn-primary' onClick={e => setStep((prev) => prev+1)}>Delivery Here</button>
                        
                        </>

                    }
                    
                    
                </div>
            </div>

            <div className='add-address-wrapper'>
                <div className='add-address' onClick={e  => { setShowAddress((add) => !add)}} > 
                     {showAddres?     <h3>Add Address</h3>: <h3><i className='fas fa-plus'></i> {'  '}  Add Address</h3>}

                </div>

                {
                    showAddres?<div className='address-expand'>

                    <div className='row'>
                        <div className='form-group'>
                            <label>First Name</label>
                            <input placeholder='firstName' name='firstName' />
                        </div>


                        <div className='form-group'>
                            <label>Lastname</label>
                            <input placeholder='Last Name' name='lastName' />
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                            <label>House or Room No</label>
                            <input placeholder='House No / Room No' name='houseOrRoomNo' />
                        </div>


                        <div className='form-group'>
                            <label>Building Or Area</label>
                            <input placeholder='Building / Area' name='buildingNoOrArea' />
                        </div>
                        
                    </div>


                    <div className='row'>
                        <div className='form-group'>
                            <label>Landmark</label>
                            <input placeholder='landmark' name='landmark' />
                        </div>


                        <div className='form-group'>
                            <label>City/Village</label>
                            <input placeholder='City / Village' name='cityOrVillage' />
                        </div>
                        
                    </div>



                    <div className='row'>
                        <div className='form-group'>
                            <label>State</label>
                            <input placeholder='State' name='state' />
                        </div>


                        <div className='form-group'>
                            <label>Pincode</label>
                            <input placeholder='pincode' name='pincode' />
                        </div>
                        
                    </div>


                    <div className='row'>
                        <div className='form-group'>
                            <label>Country</label>
                            <input placeholder='Country' name='country' />
                        </div>  

                        <div className='form-group'>
                            <label>Phone No</label>
                            <input placeholder='PHone No' name='phone' />
                        </div>  
                        
                    </div>

                    <div className='btn'>
                        <button className='btn btn-primary'>Add Address</button>
                    </div>

                </div>: ""
                }
                
            </div>
                    
            {/* ---------------- order-summary ------------ */}
            <div className="order-summary-wrapper">
                <div className="section-title inactive">
                    <div className="left">
                        <span className="section-number">3</span>
                        <h2>Order Summary</h2>
                    </div>  
                </div>
            </div>


            {/* payment summary */}
            <div className="payment-wrapper ">
                <div className="section-title inactive">
                    <div className="left">
                        <span className="section-number active">4</span>
                        <h2>Payment Summary</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressStep; 
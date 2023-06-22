import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
import { addAddress, getAddresses, getOrder, getUser, updateDeliveryAddress } from '../../http';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddressStep = ({product, orderId, setStep}) => {
    const [order, setOrder] = useState({}); 
    const [user, setUser] = useState({}); 
    const [loading, setLoading] = useState(true); 
    const [showAddres, setShowAddress] = useState(false); 
    const [addresses, setAddresses] = useState([]); 

    const [addressId, setAddressId] = useState(order.deliveryAddress?order.deliveryAddress.addresId:0); 


    const [selectedAddress, setSelectedAddress] = useState(0); 

    const id = order._id; 

    // load the order
    useEffect(() => { 
        async function fetchOrder() { 
            let orderData = await getOrder(orderId); 
            setOrder(orderData.data); 
        }

        fetchOrder();

    }, []); 


    

    useState(() => { 

        loadUserAddresses(); 
    }, []); 


    // load all the addresses of  the user
    async function loadUserAddresses() { 
        try { 
            const address = await getAddresses(); 
            setAddresses(address.data.addresses); 
            setSelectedAddress(order.deliveryAddress? order.deliveryAddress.addressId:0); 
        }catch(e) { 
            console.log(e); 
        }
    }

    const [validationErrors, setValidationErrors] = useState({});
    const [addressParams, setAddressParams] = useState({
        firstName: "", 
        lastName: "", 
        houseOrRoomNo: "", 
        buildingOrArea: "", 
        landmark: "", 
        cityOrVillage: "", 
        state: "", 
        pincode: "", 
        country: "", 
        phoneNo: "", 
        markAs: ""
    })
    const { firstName, 
            lastName, 
            houseOrRoomNo, 
            buildingOrArea, 
            landmark, 
            cityOrVillage, 
            state, 
            pincode, 
            country, 
            phoneNo, 
            markAs
    } = addressParams; 


  

    
   const auth = useSelector(state => state.auth); 
   const {_id} = auth.user; 





    useEffect(() => {
        async function loadUser() { 
            try{ 
                let res  = await getUser(_id); 
                setUser(res.data); 
                setLoading(false); 
            }catch(e){
             setUser({});
            }
        }

        loadUser(); 
    }, []); 

    // submit address 
    async function submitAddress(e) { 
        e.preventDefault();     
        try {
            
            let res = await addAddress(addressParams); 
            setShowAddress(false); 
            loadUserAddresses();
        }catch(e){ 
            setValidationErrors(e.response.data);
            console.log(e); 
        }

    }


    // update Address 
    async function updateAddress (e, selectedAddress) { 
        try { 
            await updateDeliveryAddress({addressId: selectedAddress, orderId: id}); 
            setStep((prev) => prev+1);
        }catch(e) {
            console.log(e);
        }
    }


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

                    <button className="btn btn-primary" onClick={e => setStep(1)}   disabled=""  >Change</button>
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
                 
                 {
                    addresses.length !== 0?
                    <div className='address-expand'>
                    
                    {
                        loading? <h2>loding....</h2>: 

                        <>
                            {
                                
                                addresses.map((address, ind) => (
                                    <div className='address-wrapper' key={ind}>
                                        <div className='top'> 
                                            <input type='radio' name='addressId' value={ind} 
                                            onChange={e => setAddressId(ind)}
                                            onClick={e => setSelectedAddress(ind, selectedAddress)}
                                            checked={ind === selectedAddress}
                                            />
                                            
                                             <h4>{address.firstName} {address.lastName}</h4>
                                            <span>{address.markAs}</span>
                                            <b>{address.phoneNo}</b>
                                         </div>

 
                                        <div className='bottom'>
                                            {`${address.houseOrRoomNo} , ${address.buildingOrArea}, ${address.landmark}, ${address.cityOrVillage}, ${address.state} , ${address.pincode}`}
                                        </div>

                                    </div>
                                ))
                            }

                            <button className='btn btn-primary' onClick={e => updateAddress(e, selectedAddress)}>Deliver Here</button>
                        </>

                    }
                    
                    
                </div>:''
                 }
                
            </div>

            <div className='add-address-wrapper'>
                <div className='add-address'> 
                     {showAddres?     <h3>Add Address</h3>: <h3><i className='fas fa-plus'></i> &nbsp;   Add Address</h3>}

                     <button className='btn btn-primary' onClick={e  => { setShowAddress((add) => !add)}}>Add Address</button>

                </div>

                {
                    showAddres?<div className='address-expand'>
                <form onSubmit={e => submitAddress(e)}>


                    <div className='row'>
                        <div className='form-group'>
                            <label>First Name  *</label>
                            <input placeholder='firstName' name='firstName' 
                            value={firstName}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required/>

                            {validationErrors.firstName? <p>{validationErrors.firstName}</p>: "" }
                        </div>


                        <div className='form-group'>
                            <label>Lastname *</label>
                            <input placeholder='Last Name' name='lastName'
                            value={lastName}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required/>
                            {validationErrors.lastName? <p>{validationErrors.lastName}</p>: "" }
                            
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='form-group'>
                            <label>House or Room No *</label>
                            <input placeholder='House No / Room No' name='houseOrRoomNo'  
                            value={houseOrRoomNo}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required/>
                            {validationErrors.houseOrRoomNo? <p>{validationErrors.houseOrRoomNo}</p>: "" }

                        </div>


                        <div className='form-group'>
                            <label>Building Or Area * </label>
                            <input placeholder='Building / Area' name='buildingOrArea' 
                            value={buildingOrArea}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required/>
                            {validationErrors.buildingOrArea? <p>{validationErrors.buildingOrArea}</p>: "" }

                        </div>
                        
                    </div>


                    <div className='row'>
                        <div className='form-group'>
                            <label>Landmark (optional) </label>
                            <input placeholder='landmark' name='landmark' 
                            value={landmark}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            />
                            {validationErrors.landmark? <p>{validationErrors.landmark}</p>: "" }

                        </div>


                        <div className='form-group'>
                            <label>City/Village * </label>
                            <input placeholder='City / Village' name='cityOrVillage' 
                            value={cityOrVillage}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required />
                            {validationErrors.cityOrVillage? <p>{validationErrors.cityOrVillage}</p>: "" }

                        </div>
                        
                    </div>



                    <div className='row'>
                        <div className='form-group'>
                            <label>State  * </label>
                            <input placeholder='State' name='state'
                            value={state}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required />
                            {validationErrors.state? <p>{validationErrors.state}</p>: "" }

                        </div>


                        <div className='form-group'>
                            <label>Pincode *</label>
                            <input placeholder='pincode' name='pincode' 
                            value={pincode}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required/>
                            {validationErrors.pincode? <p>{validationErrors.pincode}</p>: "" }

                        </div>
                        
                    </div>


                    <div className='row'>
                        <div className='form-group'>
                            <label>Country *</label>
                            <input placeholder='Country' name='country' 
                            value={country}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required />
                            <div>
                                {validationErrors.country? <p>{validationErrors.country}</p>: "" }
                            </div>

                        </div>  

                        <div className='form-group'>
                            <label>Phone No *</label>
                            <input placeholder='PHone No' name='phoneNo'
                            value={phoneNo}
                            onChange={ e => setAddressParams({...addressParams, [e.target.name]: e.target.value})}
                            required />
                            {validationErrors.phoneNo? <p>{validationErrors.phoneNo}</p>: "" }

                        </div>  
                        
                    </div>

                    <div className='row'>
                        <div className='form-group'>
                            <label>Mark Address As *</label>
                            <div className='radio-wrapper'>
                                <div>
                                    <input type='radio'  
                                    value={markAs}
                                    onChange={e  => setAddressParams({...addressParams, [e.target.name]: "home"})}
                                    name='markAs' required/>
                                    <label>Home</label>
                                </div>

                                <div>
                                    <input type='radio'  name='markAs'
                                     value={markAs}
                                     onChange={e  => setAddressParams({...addressParams, [e.target.name]: "office"})}
                                    required/>
                                    <label>Office</label    >
                                </div>

                                <div>
                                    <input type='radio' name='markAs'
                                     value={markAs}
                                     onChange={e  => setAddressParams({...addressParams, [e.target.name]: "friend"})}
                                    required/>
                                    <label>Friend</label>
                                </div>


                                <div>
                                    <input type='radio' name='markAs' 
                                    onChange={e  => setAddressParams({...addressParams, [e.target.name]: "other"})}

                                    required/>
                                    <label>Other</label>
                                </div>  
                            </div>
                        </div>
                    </div>

                    <div className='btn'>
                        <button type='submit' className='btn btn-primary'>Add Address</button>
                    </div>
                </form>

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
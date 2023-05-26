import React, {useEffect, useState, useRef} from 'react'; 
import './popup.css'; 
import axios from 'axios'; 


const Popup = () => {

    const [active, setActive] = useState(false); 
    const [iconClass, setIconClass] = useState("fas fa-message"); 

    const popUpRef = useRef(null); 

    const nameRef = useRef(null); 
    const emailRef = useRef(null); 
    const messageRef = useRef(null); 


    // useEffect 
    useEffect(() => {
        function handleClickOutside(event) {
          if (popUpRef.current && !popUpRef.current.contains(event.target)) {
            // alert("something is happening"); 
            setActive(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [popUpRef]);
    

    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        message: "" 
    }); 

    const {name, email, message} = formData; 
    
    let activeIcon = "fas fa-times"; 
    let inActive = "fas fa-message"; 


    //  popup form 
    const popUpForm = (e) => {
        let style = active; 
        setActive(!style);    


        setIconClass(style?inActive:active);    
    }

    // style for the popup form 
    let activeStyle = {  

        display: active?"block": "none", 
        transition: '.4s ease-in-out'
    }


    // form submit function 
     function onSubmit(e){
      e.preventDefault(); 
      const {name, email, message} = formData; 

      if(!name){ 
          let nameInput = nameRef.current; 
          // nameInput.style.border = "2px solid red"; 
          return; 
      }
      
      axios.post("http://localhost:5000/api/send-message", {name, email, message}).then((response) => { 
          
      }).catch((e) => { 

      }); 
    }


  return (
    <div className='popup' id="popup" ref={popUpRef}>
        <div className='form-icon' onClick={popUpForm}>
            {/* <i className="fas fa-times"></i> */}
            <i className="fas fa-message"></i>
        </div>

        <div className='popup-form' style={activeStyle}>
            <div className='section-title'>
                <h2>Own Wearables</h2>
                <p>Hi! Let us know how we can help and we’ll respond shortly.</p>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className={`form-control `} 
                        placeholder='Your Name'
                        name="name" 
                        value={name}
                        ref={nameRef}
                        onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                        required
                     />
                    <input className='form-control' placeholder='Your Email' 
                    ref ={emailRef}
                    name="email" 
                    value={email}
                    onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                    required />
                    <textarea className='form-control' placeholder='How can we help you?'
                     value={message} name='message'
                     ref={messageRef}
                     onChange={e => setFormData({...formData, [e.target.name]: e.target.value})}
                    rows={10}  required>
                    </textarea>
                </div>
                
                <div className='button'>
                   <button type='submit' className='btn btn-primary'>SEND</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Popup

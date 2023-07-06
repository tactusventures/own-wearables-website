import axios from 'axios'; 
import { Notyf } from 'notyf';


var notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
      },
});



const deleteProductBtn = document.querySelectorAll('.product-delete-btn'); 


if(deleteProductBtn) { 
    deleteProductBtn.forEach((element) => {
        element.addEventListener('click', (e) => { 
            const id = element.dataset.id; 
            
            axios.post(`/products/delete-product`, {id}).then(() => { 
                notyf.success("Product deleted Successfully"); 
            }).catch((e) => { 
                notyf.error("Something went wrong"); 
            }); 
        })
    });
}



// Add color form 

const prodId = document.querySelector('.prod-id');
const addColorBtn = document.querySelector('.add-clor-btn'); 

if(addColorBtn) {
    addColorBtn.addEventListener('click', (e)  => {
        let id = addColorBtn.dataset.prodid; 
        console.log(id); 
        prodId.value = id; 
    }); 
}


// delete the enquiry
const  deleteEnquiry = document.querySelectorAll('.delete-enquiry'); 

if(deleteEnquiry){
   deleteEnquiry.forEach((btn) => { 
       btn.addEventListener('click', (e)  => { 
        const id = btn.dataset.id; 

        axios.post('/messages/delete-message', {id}).then((res)  => { 
            setTimeout(() => {
                location.href = "/messages/enquiries"
            }, 500); 
            notyf.success('Message Deleted Succesfully..'); 
        }).catch((err) => {
            notyf.error('Something went Wrong'); 
        }); 
    });
   })
}




const showModalBtn = document.querySelectorAll('.view-enquiry-message'); 


if(showModalBtn) { 
    showModalBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
           const data = JSON.parse(button.dataset.enquiry); 
            let {name, email, message}  = data; 

 
            const emailPlace = document.querySelector('.enq-modal-email'); 
            const namePlace = document.querySelector('.enq-modal-name'); 
            const messagePlace = document.querySelector('.enq_modal_message'); 
            emailPlace.innerText = email; 
            namePlace.innerText = name; 
            messagePlace.innerText = message; 
        });  
    }); 
}


const imageDeleteBtn = document.querySelectorAll('.delete-image-btn'); 

if(imageDeleteBtn) { 
    imageDeleteBtn.forEach((btn) => { 
        btn.addEventListener('click', (e) => { 
            const {id, image, color} = btn.dataset; 
            axios.post('/products/delete-product-image' ,{id, image, color}).then(() => { 
                setTimeout(() => { 
                    location.href = "/products/edit-product/" + id; 
                }, 500); 
                notyf.success("Image deleted Successfully"); 
            }).catch((e) => { 

                setTimeout(() => { 
                    location.href = "/products/edit-product/" + id; 
                }, 500); 
                notyf.error("Something went Wrong");
            }); 
        })
    })
}


const addImageToColorBtn = document.querySelectorAll('.add-image-to-color'); 

if(addImageToColorBtn) { 
    addImageToColorBtn.forEach((btn) => {
        btn.addEventListener('click', () => { 
            let {id, color} = btn.dataset;

            const productId = document.querySelector('.modal-product-id');
            const productColor = document.querySelector('.modal-color-name')
            
            productId.value = id;
            productColor.value = color; 
        })
    })
}



// change the delivery status


const deliveryStatus = document.getElementById('delivery_status'); 
console.log(deliveryStatus); 
if(deliveryStatus) {
    deliveryStatus.addEventListener('change', (e) => { 

        const value = e.target.value; 
        const orderId = deliveryStatus.dataset.orderid; 
        console.log(orderId)
        axios.post('/order/change-delivery-status', {orderId: orderId, value: value }).then((res) => { 
            notyf.success("Order Status Changed"); 
            console.log('working...'); 
        }).catch((e) => {
            console.log('not working....'); 
            notyf.error("Something went wrong");  
        }); 
    }); 
}


// delete the user

const allUsers = document.querySelectorAll('.delete__user'); 

if(allUsers){ 
    Array.from(allUsers).forEach((user) => { 
        user.addEventListener('click', (e) => { 
            let userId = user.dataset.userid; 
            
            axios.post('/users/delete-user', {userId}).then((res) =>  {
                notyf.success("User Deleted Successfully"); 
                setTimeout(() => {
                    window.location.href = "/users/all-users"; 
                }, 1000); 
            }).catch((e) => { 
                console.log(e); 
                notyf.error("Something went wrong"); 
            });
        });
    });
}



// disable the user 

const disableBtns = document.querySelectorAll('.disable__user'); 
 
if(disableBtns){
    Array.from(disableBtns).forEach((btn)  => {
        btn.addEventListener('click', (e) => { 
            
            let userId = btn.dataset.userid; 
            
            axios.post('/users/disable-user', {userId}).then((res) =>  {

                console.log(res.data.message); 
                notyf.success("User Disabled Successfully"); 
                setTimeout(() => {
                    window.location.href = "/users/all-users"; 
                }, 1000); 
            }).catch((e) => { 
                notyf.error("Something went wrong"); 
            });
        });
    })
}


// restore  the user 
const resotreBtn = document.querySelectorAll('.restore_deleted_users'); 

if(resotreBtn) { 
    Array.from(resotreBtn).forEach((btn) => { 
        btn.addEventListener('click', (e) => {
            let userId = btn.dataset.userid; 

            axios.post('/users/restore-user', {userId}).then((res) =>  {
                
                notyf.success("User Disabled Successfully"); 
                setTimeout(() => {
                    window.location.href = "/users/all-deleted-users"; 
                }, 1000); 
            }).catch((e) => { 
                console.log(e); 
                notyf.error("Something went wrong"); 
            });

        });
    }); 
}


// unblock user 

const unblockBtn = document.querySelectorAll('.unblock_user');


if(unblockBtn) {
    Array.from(unblockBtn).forEach((btn) => { 
       btn.addEventListener('click', (e) => { 
            let userId = btn.dataset.userid; 
            console.log(userId); 
            alert('asdf'); 
            axios.post('/users/unblock-user', {userId}).then((res) =>  {

                notyf.success("User Disabled Successfully");
                setTimeout(() => {
                    window.location.href = "/users/all-disabled-users";
                }, 1000);
            }).catch((e) => {
                console.log(e); 
                notyf.error("Something went wrong"); 
            });
       });
    }); 
}
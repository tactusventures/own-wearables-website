
const notificationTypes = Object.freeze({
    message: "/messages/enquiries"
})

class Notification { 
    static sendNotification(type, message) {
        console.log("Notification has been sent"); 
    }
}


export default Notification;
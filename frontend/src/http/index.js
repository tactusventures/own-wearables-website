import axios from 'axios'; 


const api = axios.create({ 
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    withCredentials: true, 
    headers: {
        "Content-Type": 'application/json', 
        Accept: "application/json"
    }
});


export const loadAllProducts = () => api.get("/prdocuts/all"); 
export const createOrder = (data) => api.post('/payment/create-order', data);
export const getOrder = (id) => api.get(`/order/get-order/${id}`);
export const loadItem = (item) => api.get(`/product/get/${item}`); 
export const login = (data) => api.post(`/login`, data);
export const register = (data) => api.post('/register', data);
export const getUser = (id) => api.get(`/get-user/${id}`); 
export const logout = () => api.post(`/logout`);
export const addAddress = (data) => api.post('/user/add-address', data);
export const getAddresses = ()  => api.get('/user/get-addresses');
export const updateDeliveryAddress = (data) => api.post('/order/update-address', data); 
export const orderPlace = (data) => api.post('/order/place-order', data); 
export const getUsersAddresses = () => api.get('user/get-addresses');
export const updateSizeAndColor = (data) => api.post('/order/update-color-and-size', data); 
export const capturePayment = (data) => api.post('/payment/capture-payment', data); 

api.interceptors.response.use(
    config => {
      return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) { 
           
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `http://localhost:5000/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
       
       throw error; 
    }
);


export default api; 
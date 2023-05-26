import axios from 'axios'; 


const api = axios.create({ 
    baseURL: "http://localhost:5000/api", 
    withCredentials: true, 
    headers: { 
        "Content-Type": 'application/json', 
        Accept: "application/json"
    }
});

export const loadAllProducts = () => api.get("/prdocuts/all"); 


api.interceptors.response.use(
    config => {
    //   config.baseURL = 'http://localhost:5000/api';
    //   config.withCredentials = true; // Add this line to include withCredentials
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
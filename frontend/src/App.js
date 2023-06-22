import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Product from './pages/Product/Product';
// import Register from './components/Auth/Register/Register';
import Popup from './components/Popup/Popup';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import OrderSummary from './pages/OrderSummary/OrderSummary';
import axios from 'axios';
import PaymentDetails from './pages/PaymentDetails/PaymentDetails';
import CapturePayment from './pages/CapturePayment/CapturePayment';
import Protected from './components/AuthRoutes/Protected';

import { PersistGate } from 'redux-persist/integration/react';
import Product2 from './pages/Product2/Product2';
import Home2 from './pages/Home2/Home2';
 


function App() {

  axios.interceptors.request.use(
    config => {
      config.baseURL = 'http://localhost:5000/api';
      config.withCredentials = true; // Add this line to include withCredentials
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="App"> 
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
              <Header />
              <Routes>  
                  <Route path='/' element={<Home />} />
                  <Route path='/home'  element={<Home2 />} />

                  <Route path='/product' element={
                    <Protected> 
                      <Product /> 
                    </Protected>                  
                  } />

                  
                  <Route path='/buy-now' element={
                    // <Protected>
                      <Product2 /> 
                    // </Protected>               
                  } />

                  <Route path='/product2' element={<Product2 />} />

                  <Route path='/order/order-summary/:id' element={<OrderSummary />} />
                  <Route path='/order/payment-details' element={<PaymentDetails  />} />
                  <Route path='/order/capture-payment' element={<CapturePayment />} />
              </Routes>   

              <Footer />
            <Popup />

          </Router>
        </PersistGate>

        </Provider>
    </div>
  );
}

export default App;
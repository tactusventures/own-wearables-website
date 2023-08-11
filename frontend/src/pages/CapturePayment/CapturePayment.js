import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './capture.css';
import { capturePayment } from '../../http';

const CapturePayment = () => {
  const [loading, setLoading] = useState();
  const selector = useSelector(state => state.order);

  useEffect(() => {
    const capture = async () => {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');

      setLoading(true);
      

      try  {
        const res  = await capturePayment({orderId: token}); 
           setTimeout(() => {
              setLoading(false);          
            }, 2000);
      }catch(e){
        console.log(e); 
        setTimeout(() => { 
              setLoading(false);
            }, 2000);
            console.log(e); 
      }

    }

    capture();
  }, []);

  return (
    <div>  {
      loading ? (
          <OwnLoadingAnimation />
      )
       :

        <>
          <div className='order-success'>
            <img src='https://icon-library.com/images/checkmark-icon-transparent/checkmark-icon-transparent-10.jpg'></img>
            <h2>Order Placed</h2>
            <p>
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id consequatur dolore inventore voluptates dolorum maxime omnis quidem magnam veritatis non?Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <button className='go-ba-btn'>Go Back</button>
          </div>

        </>
    }

    </div>
  )
}

export default CapturePayment




function OwnLoadingAnimation() {

  useEffect(() => {
    function animation() {
      const elts = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2")
      };

      const texts = [
        'OWN',
        'Wearables'
      ];

      const morphTime = 1;
      const cooldownTime = 0.25;

      let textIndex = texts.length - 1;
      let time = new Date();
      let morph = 0;
      let cooldown = cooldownTime;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];

      function doMorph() {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
        }

        setMorph(fraction);
      }

      function setMorph(fraction) {
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }

      function doCooldown() {
        morph = 0;

        elts.text2.style.filter = "";
        elts.text2.style.opacity = "100%";

        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
      }

      function animate() {
        requestAnimationFrame(animate);

        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
          if (shouldIncrementIndex) {
            textIndex++;
          }

          doMorph();
        } else {
          doCooldown();
        }
      }

      animate();

    }

    animation(); 
  }, []);
  return (
    <div id='animated-own-logo-text'>
      <div id="container">
        <span id="text1"></span>
        <span id="text2"></span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>

    </div>

  )
}
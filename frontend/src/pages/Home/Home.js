import React, {useEffect, useRef} from 'react';
import "./home.css";
import "animate.css/animate.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import ScrollMagic from 'scrollmagic'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Home = () => {
    
    const introRef = useRef(); 
    
    useEffect(() => {
        AOS.init({
            startEvent: 'DOMContentLoaded', // Wait for DOMContentLoaded event
            offset: 200,
        });
      }, []);


      useEffect(() => {
        window.addEventListener('load', function() {
            AOS.refresh();
          });
      }, []);


      useEffect(() => { 
        // const intro = introRef.current;
        // const video = intro.querySelector('#video');
        // const text = intro.querySelector('#h1');
        
        const controller = new ScrollMagic.Controller();

        // let scene = new ScrollMagic.Scene({
        //     duration: 4000,
        //     triggerElement: intro,
        //     triggerHook: 0
        //   }).addIndicators()
        //   .setPin(intro)
        //   .addTo(controller);

        // // Register ScrollTrigger plugin
        // gsap.registerPlugin(ScrollTrigger);
    
        // Text Animation
        // const textAnim = gsap.fromTo(text, { opacity: 1 }, { opacity: 0, scrollTrigger: { trigger: intro, start: 'top center', end: 'bottom center', scrub: true } });
          

        // let scene2 = new ScrollMagic.Scene({
        //     duration: 2000,
        //     triggerElement: intro,
        //     triggerHook: 0
        //   })
        //     .setTween(textAnim)
        //     .addTo(controller);

        // Video Animation
        // let accelamount = 0.1;
        // let scrollpos = 0;
        // let delay = 0;
          
        // const updateScrollPos = () => {
        // //   scrollpos = ScrollTrigger.scrollPos() / 1000;
        //    scrollpos = ScrollTrigger.scrollPos() / 1000;
        //     delay += (scrollpos - delay) * accelamount;
        //     video.currentTime = delay * 1.5;
        // };

        // scene.on("update", e => {
        //     scrollpos = e.scrollPos / 1000;
        //   });
    
        // setInterval(() => {
        //   delay += (scrollpos - delay) * accelamount;
        //   video.currentTime = delay * 1.5;
        // }, 33.3);
        
        // Listen for scroll events
        // ScrollTrigger.addEventListener('scroll', updateScrollPos);

        // return () => {
        //   // Clean up event listener
        //   ScrollTrigger.removeEventListener('scroll', updateScrollPos);
        // };
      }, []); 



    return (
      
        <div className='page-home'>

          {/* <div class="intro" ref={introRef}> */}
            {/* <h1 id='h1'>The New Dev Ed Pro</h1> */}
            {/* <video id='video' src="/images/vid1.mp4"></video> */}
            {/* <video id='video' src="/images/airpods_pro_gen2.webm"></video> */}
            {/* <video id='video' src="/images/video.mp4"></video> */}
        {/* </div> */}
            <div className='hero'>
                <div className='head-content'>
                    <h2>World's First AI Enabled Shoe</h2>
                     <img src='/images/shoe-image.jpg' />
                </div>
                {/* <video src="/images/vid1.mp4" autoPlay muted loop>
                </video> */}
            </div>

            {/* ---------------- sepcification ---------------------------- */}
            {/* <div className='specifications'> */}
                {/* <div className='container'>
                    <div className='specification-content'>
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Smart and Tough <br /></h2>
                           
                        <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100" data-aos-offset="300">
                            But toughness is also a key consideration for consumers, and some companies are rising to the challenge by creating shoes that are both intelligent and durable, with features such as waterproofing and reinforced soles.  
                        </p>
                    </div> */}

                    {/* ----------- specification image ------------- */}
                    {/* <div className='specification-image'>
                        <div className='shoe-image'>
                            <img src='/images/own-shoe-specification.jpg' alt='specification' />
                        </div>

                       <div className='specificationWrapper'> 
                       <div className='left'>
                            <div className='block'>
                                <h2 className='with-underline'> GPS Tracking</h2>
                            </div>



                            <div className='block'>
                                <h2 className='with-underline'>Waterproof and dust-free</h2>
                            </div>

                        
                        </div>

                        <div className='right'>
                            <div className='block'>
                                <h2 className='with-underline'> Equipped with range of sensors.</h2>
                            </div>


                            <div className='block'>
                                <h2 className='with-underline'> Long Lasting Battery</h2>
                            </div>


                        </div>
                       </div>
                    </div> */}

                    
                {/* </div>
            </div> */}

            <div className='technical-specification' >
                
                <h2 className='section-title' data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Technical Specification</h2>

                <div className='container tech-specification-wrapper'>
                    

                    
                <div className='shoe-body' >
                        {/* <img src='/images/shoes/red-teal-shoe.png'></img> */}
                        <img data-aos="zoom-in" data-aos-offset="1" data-aos-duration="900" data-aos-delay="100" src='/images/own-shoe-specification.jpg' alt='specification' />

                </div>

                <div className='specification-wrapper'>
                    <div className='left-block'>
                        <div className='block'  data-aos="fade-right" data-aos-duration="900" data-aos-delay="1300" data-aos-offset="1">
                            <h2 className='with-underline'> Powerful Sensors</h2>
                            <p>Enhanced sensing capabilities for optimized performance.
                            </p>

                            {/* <button className='btn btn-white-outline'>Learn More</button> */}
                        </div>
                

                        <div className='block'  data-aos="fade-right" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="1">
                            <h2 className='with-underline'> GAIT Analysis</h2>
                            <p>Precise assessment of your walking and running patterns</p>

                            {/* <button className='btn btn-white-outline'>Learn More</button> */}

                        </div>
                    </div>

                    <div className='right-block'>
                        <div className='block'  data-aos="fade-left" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="1">
                            <h2 className='with-underline'>Reflexology</h2>
                            <p>Stimulates pressure points in your feet to improve your health and well-being.</p>

                        </div>

                        <div className='block'  data-aos="fade-left" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="10" >
                            <h2 className='with-underline'>Wireless Charging</h2>
                            <p>Go cord-free with wireless charging</p>

                        </div>
                    </div>
                </div>
                </div>
            </div>


            <div className='reflexology'>
                <video src="/images/vid1.mp4" autoPlay muted loop>
                </video>
            </div>

            {/* ------------------------- technical specification ---------------- */}

            <div className='technical-specification' >
                
                <h2 className='section-title' data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Technical Specification</h2>
                <div className='container tech-specification-wrapper'>
                    

                    
                <div className='shoe-body' >
                        <img data-aos="zoom-in" data-aos-offset="1" data-aos-duration="900" data-aos-delay="100" src='/images/own-shoe-specification.jpg' alt='specification' />

                </div>

                    <div className='specification-wrapper'>
                        <div className='left-block'>
                            <div className='block'  data-aos="fade-right" data-aos-duration="900" data-aos-delay="1300" data-aos-offset="1">
                                <h2 className='with-underline'> Powerful Sensors</h2>
                                <p>Enhanced sensing capabilities for optimized performance.
                                </p>

                              
                            </div>
                

                            <div className='block'  data-aos="fade-right" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="1">
                                <h2 className='with-underline'> GAIT Analysis</h2>
                                <p>Precise assessment of your walking and running patterns</p>

                                

                            </div>
                        </div>

                        <div className='right-block'>
                            <div className='block'  data-aos="fade-left" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="1">
                                <h2 className='with-underline'>Reflexology</h2>
                                <p>Stimulates pressure points in your feet to improve your health and well-being.</p>

                            </div>

                            <div className='block'  data-aos="fade-left" data-aos-duration="700" data-aos-delay="1300" data-aos-offset="10" >
                                <h2 className='with-underline'>Wireless Charging</h2>
                                <p>Go cord-free with wireless charging</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* ----------------  Health Reports ------------------------ */}
            <div className='health-reports'>
                <div className='container'>
                    <h2 className='title-head' data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="200">Download Customized and user Friendly Reports</h2>
                    <div className='flex align-center jutify-center'>
                        <div className='left' data-aos="fade-up" data-aos-offset="200" data-aos-duration="1500" data-aos-delay="200">
                            <img src='/images/mobile-app.png' />
                        </div>

                        <div className='right'  data-aos="fade-left" data-aos-offset="350" data-aos-duration="900" data-aos-delay="300">
                            <h2>Get Our App on iOS and Android</h2>

                            <p>Download our app today on iOS and Android and enjoy seamless access to all our features right at your fingertips. Stay up-to-date with the latest health updates with Customized Health reports of different Parameters.</p>


                            <div className='app-download-buttons'>
                                <button className='btn btn-primary'>Download Android</button>
                                <button className='btn btn-primary-outline'>Download IOS</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* -------------------------- Display reports ----------------- */}
            {/* Reports */}
            <div className='reports'>

                <h2 className='section-title'  data-aos="fade-up" data-aos-offset="200" data-aos-duration="900" data-aos-delay="300">Download Your Customized Health Report
                </h2>
                <div className='container'>


                    <div className='report-image-wrapper'>
                            <div data-aos="fade-right" data-aos-offset="200" data-aos-delay="300" >
                                <img src='/images/report-image-1.png' />                           
                            </div>

                     
                            <div data-aos="fade-down" data-aos-offset="200"  data-aos-delay="600">
                                <img src='/images/report-image-2.png' />
                            </div>
                       
                            <div data-aos="fade-up" data-aos-offset="200"  data-aos-delay="900">
                                <img src='/images/report-image-3.png' />
                            </div>                

                            <div data-aos="fade-left" data-aos-offset="200"  data-aos-delay="1100">
                                <img src='/images/report-image-4.png' />
                            </div>
                    </div>

                    <div className='text-center'>
                    </div>
                    <div className='more-report-features'>
                        <div className='feature'>
                            <img src='/images/icon-1.png' />
                            <h3>Secure</h3>
                            <p>
                                Users entrust their personal and sensitive data to these apps, and it's the responsibility of the app developers to ensure that the data is secure and protected
                            </p>
                        </div>


                        <div className='feature'>
                            <img src='/images/icon-1.png' />
                            <h3>Personalized</h3>
                            <p>
                                By analyzing data such as a user's vitals, gait analysis, and reflexology, smart shoe mobile apps can provide personalized insights and recommendations that are tailored to each user's unique needs and preferences.
                            </p>
                        </div>


                        <div className='feature'>
                            <img src='/images/icon-1.png' />
                            <h3>Customized</h3>
                            <p>
                                Depending on their location or personal preference, users may prefer to track their fitness and health data using different units of measurement
                            </p>
                        </div>
                    </div>

                </div>
            </div>


            {/* --------------  Mesh shoe ------------------- */}
            <div className='mesh'>
                <div className='flex align-center'>
                    <div className='left'>
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Elevating the Quality of Shoe Design</h2>
                    </div>

                    <div className='right'>
                        <div>
                            <img src='/images/shoe-image.jpg' />
                        </div>
                    </div>
                </div>
            </div>


            {/* -----------------------   Shoe sole -------------------- */}

            <div className='sole'>
                <div className='container flex align-center'>

                    <div className='left'>
                        <img src='/images/shoe-image.jpg' />
                    </div>

                    <div className='right'>
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Shoe Soles for Ultimate Comfort and Support</h2>

                    </div>

                </div>
            </div>



            {/* -------------------- shoe heels --------------- */}
            <div className='mesh'>
                <div className='flex align-center'>
                    <div className='left'>
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Tracking Your Steps with Smart Heels</h2>

                        <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Track and locate with precision using GPS-enabled shoes with built-in chip.</p>


                    </div>

                    <div className='right'>
                        <div>
                            <img src='/images/own-shoe-specification.jpg' alt='shoe-heel' />

                        </div>
                    </div>
                </div>
            </div>


            {/*   GPs Tracking Details   */}

            {/* -----------------------   Shoe sole -------------------- */}

            <div className='sole gps'>
                <div className='container flex align-center'>

                    <div className='left'>
                        <img src='/images/shoe-image-2.webp' />
                    </div>

                    <div className='right'>
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Stay on Track with GPS-Enabled Shoes </h2>
                    </div>

                </div>
            </div>

            {/* ----------------- Gps tracking video ---------------- */}
            <div className='gps-tracking-video'>
                <div className=''>
                </div>
            </div>


            {/* -------------------------- Battery Info ------------------------- */}
            <div className='battery-info'>
                <div className='container'>
                    <div className='top-block'>
                        <img src='https://www.apple.com/v/apple-watch-ultra/e/images/overview/design/design_icon_battery__blxp7wcr5jqu_large.png' />
                        <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Powerful Battery</h2>

                    </div>
                </div>
            </div>

            {/* ----------------------- endurance ------------------------- */}
            <div className='endurance'>
                <div className='container'>
                    <h6 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Endurance</h6>
                    <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Path To.</h2>
                    <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Greatness.</h2>
                </div>
            </div>



            {/* ---------------------------   shoe charging -   ---------------------- */}
{/* 
            <div className='shoe-charging'>
                <div className='container'>
                    <div className='shoe-charging-wrapper'>
                        <div className='shoe-chargning-left'>
                            <img src='/images/shoe-charging.png' alt='shoe-chargning' />
                        </div>


                        <div className='shoe-chargning-right'>
                            <img src='https://www.apple.com/v/apple-watch-ultra/e/images/overview/design/design_icon_battery__blxp7wcr5jqu_large.png' />

                            <h2>Wireless Charge Your Steps!</h2>
                            <p>Our smart shoe is equipped with wireless charging technology, allowing for convenient and hassle-free charging. Simply place your shoes on the charging pad, and the battery will quickly charge without the need for cords or cables. With this feature, you can easily stay connected and track your activity without worrying about running out of power.
                            </p>
                        </div>
                    </div>

                    <div className='shoe-charging-video'>
                        <video src="/images/charger-assemble.mp4" autoPlay muted loop>
                        </video>
                    </div>
                </div>

            </div> */}


            {/* ------------------   Ar ------------------------- */}
            <div className='ar'>
                <div className='container'>
                    <div className='ar-wrapper flex'>
                        <div className='left'>
                            <img src='https://www.apple.com/v/apple-watch-ultra/e/images/overview/routers/icon_qt_logo__el1j43p2nygm_large.png' />

                            <h2 data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Use AR to see Own Shoe.</h2>
                            <p data-aos="fade-up" data-aos-duration="900" data-aos-delay="300" data-aos-offset="10">Immerse in virtual shoe try-ons with AR</p>
                        </div>

                        <div className='right'> 
                            <img src='images/own-shoe-specification.jpg' />                          
                        </div>

                    </div>
                </div>
            </div>


            
                           
        </div>
    )
}

export default Home; 

import React, {useEffect, useRef} from 'react';
import "./home.css";
import { initSocket } from '../../socket';
import Primary from '../../components/Header/Primary/Primary';

const Home = () => {

    

    const socketRef = useRef(null); 


    useEffect(() => { 
        const init = async () => { 
            socketRef.current = await initSocket(); 
            socketRef.current.on('connect_error', (err) => console.log(err));
            socketRef.current.on('connect_failed', (err) => console.log(err));


            
            socketRef.current.on("display-message", (data) => { 
                console.log(data); 
            });
        }

      

        init(); 
    }, []); 
    

    return (
        <div className='page-home'>
            <div className='hero' >
                

                <div className='head-content'>
                    <h2>World's First AI Enabled Shoe</h2>
                     <img src='/images/shoe-image.jpg' />
                </div>
                {/* <video src="/images/vid1.mp4" autoPlay muted loop>
                </video> */}
            </div>

            {/* ---------------- sepcification ---------------------------- */}
            <div className='specifications'>
                <div className='container'>
                    <div className='specification-content'>
                        <h2>Smart and Tough <br />
                        </h2>
                        {/* hide */}
                        <p>
                            But toughness is also a key consideration for consumers, and some companies are rising to the challenge by creating shoes that are both intelligent and durable, with features such as waterproofing and reinforced soles.  
                        </p>
                    </div>

                    {/* ----------- specification image ------------- */}
                    <div className='specification-image'>
                        <div className='shoe-image'>
                            <img src='/images/own-shoe-specification.jpg' alt='specification' />
                        </div>

                       <div className='specificationWrapper'> 
                       <div className='left'>
                            <div className='block'>
                                <h2 className='with-underline'> GPS Tracking</h2>
                        {/* hide */}

                                {/* <p>GPS tracking smart shoes are a new wave in the world of wearable technology. With built-in GPS, these shoes can track your every step, providing data on distance, speed, and location</p> */}

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}
                            </div>


                            <div className='block'>
                                <h2 className='with-underline'>Waterproof and dust-free</h2>
                                {/* <p>The right combination of smart technology and premium materials, these shoes provide the best of both worlds, making them a must-have for fashion-conscious tech enthusiasts.

                                </p> */}

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}
                            </div>
                        </div>

                        <div className='right'>
                            <div className='block'>
                                <h2 className='with-underline'> Equipped with range of sensors.</h2>
                                {/* <p>Smart shoes equipped with a range of sensors are changing the game for fitness and health tracking. These shoes can detect a variety of metrics, including steps taken, distance traveled, calories burned, and even heart rate.


                                </p> */}

                                {/* <butt   on className='btn btn-white-outline'>Learn More</button> */}
                            </div>


                            <div className='block'>
                                <h2 className='with-underline'> Long Lasting Battery</h2>
                                {/* <p>To ensure that the shoes are able to function for an extended period of time, it's important to have a long-lasting battery.

                                </p> */}

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}
                            </div>


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
                
                <h2 className='section-title'>Technical Specification</h2>
                <div className='container tech-specification-wrapper'>
                    

                    
                <div className='shoe-body'>
                        {/* <img src='/images/shoes/red-teal-shoe.png'></img> */}
                        <img src='/images/own-shoe-specification.jpg' alt='specification' />

                </div>

                    <div className='specification-wrapper'>
                        <div className='left-block'>
                            <div className='block'>
                                <h2 className='with-underline'> Powerful Sensors</h2>
                                <p>Enhanced sensing capabilities for optimized performance.
                                </p>

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}
                            </div>
                

                            <div className='block'>
                                <h2 className='with-underline'> GAIT Analysis</h2>
                                <p>Precise assessment of your walking and running patterns</p>

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}

                            </div>
                        </div>

                        <div className='right-block'>
                            <div className='block'>
                                <h2 className='with-underline'>Reflexology</h2>
                                <p>Stimulates pressure points in your feet to improve your health and well-being.</p>

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}

                                {/* <div className='stats'>
                                        <div className='stat'>
                                            <h5 className='with-underline'>Lorem</h5>
                                            <p>15</p>
                                        </div>

                                        <div className='stat'>
                                            <h5 className='with-underline'>Battery</h5>
                                            <p>165<span>mAh</span></p>
                                        </div>
                                    </div> */}
                            </div>

                            <div className='block'>
                                <h2 className='with-underline'>Wireless Charging</h2>
                                <p>Go cord-free with wireless charging</p>

                                {/* <button className='btn btn-white-outline'>Learn More</button> */}

                                {/* <div className='stats'>
                                        <div className='stat'>
                                            <h5 className='with-underline'>Lorem</h5>
                                            <p>15</p>
                                        </div>

                                        <div className='stat'>
                                            <h5 className='with-underline'>Battery</h5>
                                            <p>165<span>mAh</span></p>
                                        </div>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* ----------------  Health Reports ------------------------ */}
            <div className='health-reports'>
                <div className='container'>
                    <h2 className='title-head'>Download Customized and user Friendly Reports</h2>
                    <div className='flex align-center justify-center'>
                        <div className='left'>
                            <img src='/images/mobile-app.png' />
                        </div>

                        <div className='right'>
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

                <h2 className='section-title'>Download Your Customized Health Report
                </h2>
                <div className='container'>


                    <div className='report-image-wrapper'>
                        <div>
                            <img src='/images/report-image-1.png' />

                            {/* <p>This data can be used to set realistic fitness goals and monitor progress over time</p> */}
                        </div>


                        <div>
                            <img src='/images/report-image-2.png' />
                            {/* <p>users can get an idea of their overall health status and make informed decisions about their diet and exercise routine. </p> */}
                        </div>


                        <div>
                            <img src='/images/report-image-3.png' />
                            {/* <p>Step count is a widely used metric to measure physical activity and can be used to track progress towards fitness goals</p> */}
                        </div>

                        <div>
                            <img src='/images/report-image-4.png' />
                            {/* <p>ECG reports through a smart shoe mobile app, users can get a better understanding of their heart health and identify any potential issues early on
                            </p> */}
                        </div>

                    </div>


                    <div className='text-center'>
                        {/* <h2 className='with-underline' style={{marginBottom: "6rem"}}>LOrme ipsusmsdf</h2> */}
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
                        <h2>Elevating the Quality of Shoe Design</h2>
                        {/* <p>
                            Our mesh is made from a blend of premium materials, including recycled polyester and nylon, which gives it a unique texture and feel. This blend of materials also makes our mesh incredibly strong and resistant to wear and tear. We use a special weaving technique to create a tight-knit mesh that provides excellent support and stability for your foot.
                        </p> */}

                        {/* <button className='btn btn-primary'>Learn Mores</button> */}


                    </div>

                    <div className='right'>
                        <div>
                            {/* <img src='/images/shoes/blue-tone-shoe.png' /> */}
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
                        <h2>Shoe Soles for Ultimate Comfort and Support</h2>
                        {/* <p>
                            Smart shoe technology has led to the development of a shoe sole with air bubbles, providing unparalleled comfort and support. The tiny air pockets compress and expand with each step, reducing pressure and promoting better posture. This innovative technology is ideal for athletes and professionals who spend long hours on their feet.
                        </p> */}

                        {/* <button className='btn btn-primary'>Learn More</button> */}


                    </div>

                </div>
            </div>



            {/* -------------------- shoe heels --------------- */}
            <div className='mesh'>
                <div className='flex align-center'>
                    <div className='left'>
                        <h2>Tracking Your Steps with Smart Heels</h2>
                        {/* <p>
                            Own shoe has advance features like an advanced smart heel with GPS tracking technology to monitor speed and distance during outdoor activities. The durable and supportive design includes impact absorption technology, making it perfect for tackling any terrain. Whether hiking or running, our shoes offer the perfect blend of comfort and performance for every adventure.
                        </p> */} 

                        <p>Track and locate with precision using GPS-enabled shoes with built-in chip.</p>

                        {/* <button className='btn btn-primary'>Learn More</button> */}


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
                        <h2>Stay on Track with GPS-Enabled Shoes </h2>
                        {/* <p>
                            Our shoes now feature advanced GPS tracking technology, allowing users to accurately track their location and monitor their outdoor activities. This technology has been seamlessly integrated into the shoe's design, providing a discreet and easy-to-use tracking solution for runners, hikers, and other outdoor enthusiasts. With this feature, users can stay on track with their goals and enjoy their adventures with added peace of mind.
                        </p> */}

                        {/* <button className='btn btn-primary'>Learn More</button> */}


                    </div>

                </div>
            </div>

            {/* ----------------- Gps tracking video ---------------- */}
            <div className='gps-tracking-video'>
                <div className=''>
                    {/* <video src="/images/gps-tracking.mp4" autoPlay muted loop> */}
                    {/* </video> */}
                </div>
            </div>


            {/* -------------------------- Battery Info ------------------------- */}
            <div className='battery-info'>
                <div className='container'>
                    <div className='top-block'>
                        <img src='https://www.apple.com/v/apple-watch-ultra/e/images/overview/design/design_icon_battery__blxp7wcr5jqu_large.png' />

                        {/* <p>
                            <span> Battery life for days.</span> Our smart shoe battery is a game-changer for those who value uninterrupted tracking and convenience. It is designed to last for hours on a single charge and features advanced energy-saving capabilities to maximize its lifespan. Moreover, the easily replaceable battery provides users with the freedom to extend the life of their shoes, making it a smart investment for those looking to stay connected and monitor their activity without worrying about running out of power

                        </p> */}
                    </div>

                    <div className='bottom-block'>
                        <div className='left-block'>
                            <span>Up to</span>
                            <h2>36 hours</h2>
                            <span>Of nornal use.</span>
                        </div>

                        <div className='right-block'>
                            <span>Up to</span>
                            <h2>60 hours</h2>
                            <span>on low power settings .</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------------------- endurance ------------------------- */}
            <div className='endurance'>
                <div className='container'>
                    <h6>Endurance</h6>
                    <h2>Path To.</h2>
                    <h2>Greatness.</h2>
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

                            <h2>Use AR to see Own Shoe.</h2>
                            {/* <p>Our website features an exciting AR (augmented reality) component that lets you get up close and personal with our products like never before. By simply scanning the product with our app, you can view it in 3D, rotate it, and even see how it would look on your own feet! This innovative feature is perfect for those who want to experience our products in a whole new way and make more informed purchase decisions. Give it a try and step into the future of shopping with us.
                            </p> */}
                            <p>Immerse in virtual shoe try-ons with AR</p>
                        </div>

                        <div className='right'>
                            {/* <video src="/images/shoe-360-ar.mp4" autoPlay muted loop>
                            </video> */}
                            <img src='images/own-shoe-specification.jpg' />

                            
                        </div>

                    </div>
                </div>
            </div>


            
                           
        </div>
    )
}

export default Home; 

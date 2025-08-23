import { useEffect } from "react";

// UI and icons
import Jumbotron from "./component/layout/Jumbotron";
import WelcomeHome from "./component/layout/WelcomeHome";
import NewItemEvent from "./component/layout/NewItemEvent";
import AOS from 'aos';


function Home() {

    // Initialize AOS
    useEffect(() => {
        AOS.init({ once: false, duration: 1000, easing: 'ease-in-out' });
    })

    return (
        <div id="home-page" className="overflow-hidden">

            {/* start kpop swiper */}
            <Jumbotron />
            {/* end kpop swiper */}
            
            {/* start wrapper of main */}
            <main className="bg-[#73946B]">

                {/* start welcome */}
                <WelcomeHome />
                {/* end welcome */}
                
                {/* start new event & item */}
                <NewItemEvent />
                {/* end new event & item */}

            </main>
            {/* end wrapper of main */}
            
        </div>
    )
}

export default Home;
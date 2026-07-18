import Footer from "./componets/footer";
import MainContent from "./componets/mainContent";
import Navbar from "./componets/navbar";
import ProviderCTA from "./componets/providerCta";

function Home() {
    return ( 
        <div>
        <Navbar/>
        <MainContent/>
        <ProviderCTA/> 
        <Footer/>   
        </div>
     );
}

export default Home;
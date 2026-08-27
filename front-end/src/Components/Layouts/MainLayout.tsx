import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ScrollToTop from "../Shared/ScrollToTop";

const MainLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <Navbar />
            <Outlet/>
            <Footer />
        </div>
    );
};

export default MainLayout;

import { Outlet } from "react-router-dom";

import Navbar from "../3_components/layout/Navbar";
import Footer from "../3_components/layout/Footer";
import BottomNavigation from "../3_components/layout/BottomNavigation";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-orange-50">

      <Navbar />

      {/* Remove pt-20 because Navbar is sticky, not fixed */}

      <main className="flex-1">

        <Outlet />

      </main>

      <Footer />

      <BottomNavigation />

    </div>
  );
};

export default MainLayout;
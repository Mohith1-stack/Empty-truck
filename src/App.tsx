import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

// Dealer
import DealerDashboard from './pages/dealer/DealerDashboard';
import OverviewMap from './pages/dealer/OverviewMap';
import BroadcastLoad from './pages/dealer/BroadcastLoad';
import OrdersRequests from './pages/dealer/OrdersRequests';

// Driver
import DriverStatus from './pages/driver/DriverStatus';
import DriverInbox from './pages/driver/DriverInbox';
import OpenLoadsMap from './pages/driver/OpenLoadsMap';
import SocialCharity from './pages/driver/SocialCharity';
import ActiveNavigation from './pages/driver/ActiveNavigation';

// Emergency
import UrgentBroadcast from './pages/emergency/UrgentBroadcast';
import CharityMeetups from './pages/emergency/CharityMeetups';

// Shared
import Settings from './pages/shared/Settings';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      
      <Route element={<DashboardLayout />}>
        {/* Dealer Routes */}
        <Route path="/dealer" element={<DealerDashboard />} />
        <Route path="/dealer/map" element={<OverviewMap />} />
        <Route path="/dealer/broadcast" element={<BroadcastLoad />} />
        <Route path="/dealer/orders" element={<OrdersRequests />} />
        <Route path="/dealer/settings" element={<Settings />} />

        {/* Driver Routes */}
        <Route path="/driver" element={<DriverStatus />} />
        <Route path="/driver/inbox" element={<DriverInbox />} />
        <Route path="/driver/map" element={<OpenLoadsMap />} />
        <Route path="/driver/social" element={<SocialCharity />} />
        <Route path="/driver/navigation" element={<ActiveNavigation />} />
        <Route path="/driver/settings" element={<Settings />} />

        {/* Emergency Routes */}
        <Route path="/emergency" element={<div className="animate-fade-in"><h2>Emergency Dashboard</h2><p>Please select an option from the sidebar.</p></div>} />
        <Route path="/emergency/urgent" element={<UrgentBroadcast />} />
        <Route path="/emergency/charity" element={<CharityMeetups />} />
        <Route path="/emergency/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;

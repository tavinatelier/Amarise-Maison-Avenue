import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RitualBagProvider } from "@/components/ritual-bag/RitualBagContext";
import { RitualBagDrawer } from "@/components/ritual-bag/RitualBagDrawer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ScrollToTopOnNavigate } from "@/components/common/ScrollToTopOnNavigate";

// Public pages
import Index from "./pages/Index";
import Beauty from "./pages/Beauty";
import VeilLipRitual from "./pages/beauty/VeilLipRitual";
import RadianceSerum from "./pages/beauty/RadianceSerum";
import Rituals from "./pages/beauty/Rituals";
import IngredientsPhilosophy from "./pages/beauty/IngredientsPhilosophy";
import Atelier from "./pages/Atelier";
import Collections from "./pages/atelier/Collections";
import Lookbook from "./pages/atelier/Lookbook";
import CraftDesign from "./pages/atelier/CraftDesign";
import ElanSilkDress from "./pages/atelier/ElanSilkDress";
import Lifestyle from "./pages/Lifestyle";
import Accessories from "./pages/lifestyle/Accessories";
import Objects from "./pages/lifestyle/Objects";
import CalmaVessel from "./pages/lifestyle/CalmaVessel";
import LumiereCandle from "./pages/lifestyle/LumiereCandle";
import Journal from "./pages/Journal";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import Archive from "./pages/Archive";
import Discover from "./pages/Discover";
import RitualDetail from "./pages/discover/RitualDetail";
import MoodDetail from "./pages/discover/MoodDetail";
import StoryDetail from "./pages/discover/StoryDetail";
import NotFound from "./pages/NotFound";

// Legal pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import RefundPolicy from "./pages/legal/RefundPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import DataRequest from "./pages/legal/DataRequest";
import EmailPreferences from "./pages/legal/EmailPreferences";

// Checkout pages
import Cart from "./pages/checkout/Cart";
import Shipping from "./pages/checkout/Shipping";
import Payment from "./pages/checkout/Payment";
import Confirmation from "./pages/checkout/Confirmation";

// Account pages
import AccountHome from "./pages/account/AccountHome";
import AccountOrders from "./pages/account/AccountOrders";
import AccountWardrobe from "./pages/account/AccountWardrobe";
import AccountSaved from "./pages/account/AccountSaved";
import AccountAddresses from "./pages/account/AccountAddresses";
import AccountPreferences from "./pages/account/AccountPreferences";
import AccountMessages from "./pages/account/AccountMessages";
import AccountService from "./pages/account/AccountService";

// Private Client pages
import PrivateClientDashboard from "./pages/private-client/PrivateClientDashboard";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetail from "./pages/admin/OrderDetail";
import AdminCustomers from "./pages/admin/Customers";
import AdminCustomerDetail from "./pages/admin/CustomerDetail";
import AdminApprovals from "./pages/admin/Approvals";
import AdminAuditLog from "./pages/admin/AuditLog";
import AdminIncidents from "./pages/admin/Incidents";
import AdminInventory from "./pages/admin/Inventory";
import AdminInventoryDetail from "./pages/admin/InventoryDetail";
import AdminFinance from "./pages/admin/Finance";
import AdminFinanceReports from "./pages/admin/FinanceReports";
import AdminFinanceTaxes from "./pages/admin/FinanceTaxes";
import AdminTeam from "./pages/admin/Team";
import AdminTeamRoles from "./pages/admin/TeamRoles";
import AdminTeamActivity from "./pages/admin/TeamActivity";
import AdminAnalyticsFunnel from "./pages/admin/AnalyticsFunnel";
import AdminAnalyticsProducts from "./pages/admin/AnalyticsProducts";
import AdminAnalyticsCountries from "./pages/admin/AnalyticsCountries";
import AdminRefunds from "./pages/admin/Refunds";
import AdminReturns from "./pages/admin/Returns";
import AdminSystem from "./pages/admin/System";
import AdminSystemFlags from "./pages/admin/SystemFlags";
import AdminSystemMaintenance from "./pages/admin/SystemMaintenance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RitualBagProvider>
        <Toaster />
        <Sonner />
        <RitualBagDrawer />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/beauty" element={<Beauty />} />
            <Route path="/beauty/signature-lips" element={<VeilLipRitual />} />
            <Route path="/beauty/radiance-serum" element={<RadianceSerum />} />
            <Route path="/beauty/rituals" element={<Rituals />} />
            <Route path="/beauty/ingredients-philosophy" element={<IngredientsPhilosophy />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/atelier/collections" element={<Collections />} />
            <Route path="/atelier/lookbook" element={<Lookbook />} />
            <Route path="/atelier/craft-design" element={<CraftDesign />} />
            <Route path="/atelier/elan-silk-dress" element={<ElanSilkDress />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/lifestyle/accessories" element={<Accessories />} />
            <Route path="/lifestyle/objects" element={<Objects />} />
            <Route path="/lifestyle/calma-vessel" element={<CalmaVessel />} />
            <Route path="/lifestyle/lumiere-candle" element={<LumiereCandle />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about-amarise" element={<About />} />
            <Route path="/values-sustainability" element={<Sustainability />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/discover/ritual/:slug" element={<RitualDetail />} />
            <Route path="/discover/mood/:slug" element={<MoodDetail />} />
            <Route path="/discover/story/:slug" element={<StoryDetail />} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/data-request" element={<DataRequest />} />
            <Route path="/email-preferences" element={<EmailPreferences />} />

            {/* Checkout Routes */}
            <Route path="/checkout/cart" element={<Cart />} />
            <Route path="/checkout/shipping" element={<Shipping />} />
            <Route path="/checkout/payment" element={<Payment />} />
            <Route path="/checkout/confirmation" element={<Confirmation />} />

            {/* Account Routes */}
            <Route path="/account" element={<AccountHome />} />
            <Route path="/account/orders" element={<AccountOrders />} />
            <Route path="/account/wardrobe" element={<AccountWardrobe />} />
            <Route path="/account/saved" element={<AccountSaved />} />
            <Route path="/account/addresses" element={<AccountAddresses />} />
            <Route path="/account/preferences" element={<AccountPreferences />} />
            <Route path="/account/messages" element={<AccountMessages />} />
            <Route path="/account/service" element={<AccountService />} />

            {/* Private Client Routes */}
            <Route path="/private-client" element={<PrivateClientDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
            <Route path="/admin/approvals" element={<AdminApprovals />} />
            <Route path="/admin/audit" element={<AdminAuditLog />} />
            <Route path="/admin/incidents" element={<AdminIncidents />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/inventory/:sku" element={<AdminInventoryDetail />} />
            <Route path="/admin/finance" element={<AdminFinance />} />
            <Route path="/admin/finance/reports" element={<AdminFinanceReports />} />
            <Route path="/admin/finance/taxes" element={<AdminFinanceTaxes />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/team/roles" element={<AdminTeamRoles />} />
            <Route path="/admin/team/activity" element={<AdminTeamActivity />} />
            <Route path="/admin/analytics/funnel" element={<AdminAnalyticsFunnel />} />
            <Route path="/admin/analytics/products" element={<AdminAnalyticsProducts />} />
            <Route path="/admin/analytics/countries" element={<AdminAnalyticsCountries />} />
            <Route path="/admin/refunds" element={<AdminRefunds />} />
            <Route path="/admin/returns" element={<AdminReturns />} />
            <Route path="/admin/system" element={<AdminSystem />} />
            <Route path="/admin/system/flags" element={<AdminSystemFlags />} />
            <Route path="/admin/system/maintenance" element={<AdminSystemMaintenance />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RitualBagProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

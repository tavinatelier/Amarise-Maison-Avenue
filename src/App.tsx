import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RitualBagProvider } from "@/components/ritual-bag/RitualBagContext";
import { RitualBagDrawer } from "@/components/ritual-bag/RitualBagDrawer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ScrollToTopOnNavigate } from "@/components/common/ScrollToTopOnNavigate";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
import Contact from "./pages/Contact";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import CustomerCare from "./pages/CustomerCare";
import RitualDetail from "./pages/discover/RitualDetail";
import MoodDetail from "./pages/discover/MoodDetail";
import StoryDetail from "./pages/discover/StoryDetail";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";

// Legal pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import RefundPolicy from "./pages/legal/RefundPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import DataRequest from "./pages/legal/DataRequest";
import EmailPreferences from "./pages/legal/EmailPreferences";
import Authenticity from "./pages/legal/Authenticity";

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
import AdminCategories from "./pages/admin/Categories";
import AdminCategoryAnalytics from "./pages/admin/CategoryAnalytics";
import AdminGovernance from "./pages/admin/GovernanceControl";
import AdminHomepageBuilder from "./pages/admin/HomepageBuilder";
import AdminNavigationBuilder from "./pages/admin/NavigationBuilder";
import AdminCollections from "./pages/admin/CollectionsControl";
import AdminPageBuilder from "./pages/admin/PageBuilder";
import AdminPricing from "./pages/admin/PricingCurrency";
import AdminOrdersControl from "./pages/admin/OrdersControl";
import AdminInventoryControl from "./pages/admin/InventoryControl";
import AdminRoles from "./pages/admin/RolesPermissions";
import AdminAuditTimeline from "./pages/admin/AuditTimeline";
import AdminSystemSettings from "./pages/admin/SystemSettings";
import AdminAnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import AdminExecutive from "./pages/admin/ExecutiveDashboard";
import AdminEditorial from "./pages/admin/EditorialManager";
import AdminPerformance from "./pages/admin/PerformanceSettings";
import AdminHoldingRegions from "./pages/admin/HoldingRegions";
import AdminHoldingAnalytics from "./pages/admin/HoldingAnalytics";
import AdminHoldingRegionControl from "./pages/admin/HoldingRegionControl";
import AdminTaskBoard from "./pages/admin/TaskBoard";
import AdminSEOManager from "./pages/admin/SEOManager";
import AdminContentManagement from "./pages/admin/ContentManagement";
import AdminAutomation from "./pages/admin/AutomationCenter";
import AdminAds from "./pages/admin/AdNetworkManager";
import AdminApi from "./pages/admin/ApiManager";
import AdminSystemHealth from "./pages/admin/SystemHealth";
import AdminSitemaps from "./pages/admin/SitemapManager";
import AdminUsers from "./pages/admin/UserManagement";

// Shop pages
import PillarPage from "./pages/shop/PillarPage";
import FamilyPage from "./pages/shop/FamilyPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import NewArrivals from "./pages/shop/NewArrivals";
import BestSellers from "./pages/shop/BestSellers";

// Brand Authority pages
import Press from "./pages/Press";
import Craftsmanship from "./pages/Craftsmanship";
import CareGuides from "./pages/CareGuides";

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/customer-care" element={<CustomerCare />} />
            <Route path="/press" element={<Press />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/care-guides" element={<CareGuides />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/best-sellers" element={<BestSellers />} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/data-request" element={<DataRequest />} />
            <Route path="/email-preferences" element={<EmailPreferences />} />
            <Route path="/authenticity" element={<Authenticity />} />

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
            <Route path="/admin/orders" element={<AdminOrdersControl />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
            <Route path="/admin/approvals" element={<AdminApprovals />} />
            <Route path="/admin/audit" element={<AdminAuditTimeline />} />
            <Route path="/admin/incidents" element={<AdminIncidents />} />
            <Route path="/admin/inventory" element={<AdminInventoryControl />} />
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
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/categories/analytics" element={<AdminCategoryAnalytics />} />
            <Route path="/admin/governance" element={<AdminGovernance />} />
            <Route path="/admin/homepage" element={<AdminHomepageBuilder />} />
            <Route path="/admin/navigation" element={<AdminNavigationBuilder />} />
            <Route path="/admin/collections" element={<AdminCollections />} />
            <Route path="/admin/pages" element={<AdminPageBuilder />} />
            <Route path="/admin/pricing" element={<AdminPricing />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="/admin/settings" element={<AdminSystemSettings />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsDashboard />} />
            <Route path="/admin/executive" element={<AdminExecutive />} />
            <Route path="/admin/editorial" element={<AdminEditorial />} />
            <Route path="/admin/performance" element={<AdminPerformance />} />
            <Route path="/admin/holding/regions" element={<AdminHoldingRegions />} />
            <Route path="/admin/holding/analytics" element={<AdminHoldingAnalytics />} />
            <Route path="/admin/holding/region-control" element={<AdminHoldingRegionControl />} />
            <Route path="/admin/tasks" element={<AdminTaskBoard />} />
            <Route path="/admin/seo" element={<AdminSEOManager />} />
            <Route path="/admin/content" element={<AdminContentManagement />} />
            <Route path="/admin/automation" element={<AdminAutomation />} />
            <Route path="/admin/ads" element={<AdminAds />} />
            <Route path="/admin/api" element={<AdminApi />} />
            <Route path="/admin/system-health" element={<AdminSystemHealth />} />
            <Route path="/admin/sitemaps" element={<AdminSitemaps />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            {/* Shop Routes */}
            <Route path="/shop/:pillar" element={<PillarPage />} />
            <Route path="/shop/:pillar/:family" element={<FamilyPage />} />
            <Route path="/shop/:pillar/:family/:product" element={<ProductDetailPage />} />

            {/* Maintenance */}
            <Route path="/maintenance" element={<Maintenance />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </RitualBagProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

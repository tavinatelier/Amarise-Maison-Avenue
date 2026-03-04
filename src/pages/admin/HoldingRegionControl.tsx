/**
 * AMARISÉ Admin — Holding: Region Governance Control
 * Emergency controls, compliance, and country-level governance.
 */
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAdminStore } from '@/stores/adminStore';
import { COUNTRIES } from '@/config/countries.config';
import { getEffectiveCountries, updateCountryOverride, activateCountry, deactivateCountry } from '@/services/countryExpansion.service';
import { BRANDS, getMatrix, updateMatrixEntry } from '@/config/brandRegionMatrix';
import { getFulfillmentCenters } from '@/services/fulfillment.service';
import { Shield, AlertTriangle, Globe, Package, Truck, ShieldOff } from 'lucide-react';

export default function HoldingRegionControl() {
  const addAudit = useAdminStore(s => s.addAudit);
  const globalFreeze = useAdminStore(s => s.globalFreeze);
  const setGlobalFreeze = useAdminStore(s => s.setGlobalFreeze);
  const [countries, setCountries] = useState(getEffectiveCountries());
  const [matrix, setMatrix] = useState(getMatrix());
  const centers = getFulfillmentCenters();

  const refresh = () => { setCountries(getEffectiveCountries()); setMatrix(getMatrix()); };

  const frozenCount = countries.filter(c => c.overrides.checkoutFrozen).length;
  const blackoutCount = countries.filter(c => c.overrides.shippingBlackout).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Region Governance</h1>
        <p className="text-sm text-muted-foreground mt-1">Country-level controls, compliance, and emergency actions</p>
      </div>
      {/* Global Controls */}
      <Card className="p-6 mb-6 border-destructive/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold text-sm">Global Commerce Freeze</p>
              <p className="text-xs text-muted-foreground">Halts all checkout across every country</p>
            </div>
          </div>
          <Switch checked={globalFreeze} onCheckedChange={setGlobalFreeze} />
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold">{countries.length}</p>
          <p className="text-xs text-muted-foreground">Configured</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold text-primary">{countries.filter(c => c.active).length}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold text-accent-foreground">{frozenCount}</p>
          <p className="text-xs text-muted-foreground">Checkout Frozen</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold text-destructive">{blackoutCount}</p>
          <p className="text-xs text-muted-foreground">Shipping Blackout</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-semibold">{centers.filter(c => c.status === 'operational').length}/{centers.length}</p>
          <p className="text-xs text-muted-foreground">Fulfillment Active</p>
        </Card>
      </div>

      {/* Country Controls Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium tracking-widest uppercase">Country-Level Controls</h3>
        {countries.map(c => {
          const countryBrands = matrix.filter(e => e.countryId === c.id);
          const activeBrands = countryBrands.filter(e => e.status === 'active' || e.status === 'soft-launch').length;
          const center = centers.find(fc => fc.countryId === c.id);

          return (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{c.name}</h4>
                    <Badge variant={c.active ? 'default' : 'secondary'} className="text-xs">{c.active ? 'Active' : 'Inactive'}</Badge>
                    {c.overrides.softLaunch && <Badge variant="outline" className="text-xs">Soft Launch</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.currency} · VAT {c.vatRate}% · {activeBrands}/{BRANDS.length} brands</p>
                </div>
                <div className="flex gap-2">
                  {c.active ? (
                    <Button size="sm" variant="outline" className="text-destructive text-xs" onClick={() => { deactivateCountry(c.id); addAudit('Country deactivated via governance', 'Governance', c.name); refresh(); }}>
                      <ShieldOff className="h-3 w-3 mr-1" /> Deactivate
                    </Button>
                  ) : (
                    <Button size="sm" className="text-xs" onClick={() => { activateCountry(c.id); addAudit('Country activated via governance', 'Governance', c.name); refresh(); }}>
                      Activate
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Checkout Frozen</span>
                  <Switch
                    checked={c.overrides.checkoutFrozen}
                    onCheckedChange={(v) => { updateCountryOverride(c.id, { checkoutFrozen: v }); addAudit(`Checkout ${v ? 'frozen' : 'unfrozen'}`, 'Governance', c.name); refresh(); }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Shipping Blackout</span>
                  <Switch
                    checked={c.overrides.shippingBlackout}
                    onCheckedChange={(v) => { updateCountryOverride(c.id, { shippingBlackout: v }); addAudit(`Shipping ${v ? 'blackout' : 'restored'}`, 'Governance', c.name); refresh(); }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Compliance Banner</span>
                  <Switch
                    checked={c.overrides.complianceBannerEnabled}
                    onCheckedChange={(v) => { updateCountryOverride(c.id, { complianceBannerEnabled: v }); refresh(); }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Soft Launch</span>
                  <Switch
                    checked={c.overrides.softLaunch}
                    onCheckedChange={(v) => { updateCountryOverride(c.id, { softLaunch: v }); addAudit(`Soft launch ${v ? 'enabled' : 'disabled'}`, 'Governance', c.name); refresh(); }}
                  />
                </div>
              </div>

              {center && (
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="h-3 w-3" />
                  <span>Fulfillment: {center.name} — {center.capacityUtilization}% capacity — {center.activeOrders} active orders</span>
                  <Badge variant={center.status === 'operational' ? 'default' : 'destructive'} className="text-xs">{center.status}</Badge>
                </div>
              )}

              {/* Brand restrictions */}
              <div className="mt-3 flex flex-wrap gap-2">
                {BRANDS.map(brand => {
                  const entry = countryBrands.find(e => e.brandId === brand.id);
                  const isActive = entry?.status === 'active' || entry?.status === 'soft-launch';
                  return (
                    <button
                      key={brand.id}
                      className={`text-xs px-2 py-1 rounded border transition-colors ${isActive ? 'bg-primary/10 border-primary/30 text-foreground' : 'bg-muted/30 border-border text-muted-foreground'}`}
                      onClick={() => {
                        const m = updateMatrixEntry(brand.id, c.id, { status: isActive ? 'frozen' : 'active', checkoutEnabled: !isActive, navVisible: !isActive, homepageVisible: !isActive });
                        setMatrix(m);
                        addAudit(`Brand ${isActive ? 'frozen' : 'activated'}`, 'Governance', `${brand.name} in ${c.name}`);
                      }}
                    >
                      {brand.name.replace('AMARISÉ ', '')}
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </AdminLayout>
  );
}

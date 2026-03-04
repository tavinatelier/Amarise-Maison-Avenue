/**
 * AMARISÉ Admin — Holding: Region Management
 * One-click country activation with full governance controls.
 */
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/stores/adminStore';
import { COUNTRIES, CountryConfig } from '@/config/countries.config';
import {
  getEffectiveCountries, activateCountry, deactivateCountry, updateCountryOverride, CountryOverride
} from '@/services/countryExpansion.service';
import { BRANDS, getMatrix, updateMatrixEntry, BrandCountryEntry } from '@/config/brandRegionMatrix';
import { Globe, Zap, ShieldCheck, Package, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function HoldingRegions() {
  const addAudit = useAdminStore(s => s.addAudit);
  const [countries, setCountries] = useState(getEffectiveCountries());
  const [matrix, setMatrix] = useState(getMatrix());
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const refresh = () => {
    setCountries(getEffectiveCountries());
    setMatrix(getMatrix());
  };

  const handleActivate = (id: string) => {
    activateCountry(id);
    // Auto-activate all brands for this country
    BRANDS.forEach(b => {
      updateMatrixEntry(b.id, id, { status: 'active', checkoutEnabled: true, navVisible: true, homepageVisible: true });
    });
    addAudit('Country activated', 'Holding', `${id} — One-click activation with all brands enabled`);
    refresh();
  };

  const handleDeactivate = (id: string) => {
    deactivateCountry(id);
    BRANDS.forEach(b => {
      updateMatrixEntry(b.id, id, { status: 'inactive', checkoutEnabled: false, navVisible: false, homepageVisible: false });
    });
    addAudit('Country deactivated', 'Holding', id);
    refresh();
  };

  const handleOverride = (id: string, update: Partial<CountryOverride>) => {
    updateCountryOverride(id, update);
    addAudit('Country override', 'Holding', `${id}: ${Object.keys(update).join(', ')}`);
    refresh();
  };

  const activeCount = countries.filter(c => c.active).length;
  const selected = selectedCountry ? countries.find(c => c.id === selectedCountry) : null;
  const selectedBrands = selectedCountry ? matrix.filter(e => e.countryId === selectedCountry) : [];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Region Management</h1>
        <p className="text-sm text-muted-foreground mt-1">One-click country activation and governance</p>
      </div>
      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <Globe className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-2xl font-semibold">{countries.length}</p>
          <p className="text-xs text-muted-foreground">Total Countries</p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-600" />
          <p className="text-2xl font-semibold">{activeCount}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </Card>
        <Card className="p-4 text-center">
          <Package className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-2xl font-semibold">{BRANDS.length}</p>
          <p className="text-xs text-muted-foreground">Brands</p>
        </Card>
        <Card className="p-4 text-center">
          <ShieldCheck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-2xl font-semibold">{countries.filter(c => c.overrides.checkoutFrozen).length}</p>
          <p className="text-xs text-muted-foreground">Checkout Frozen</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Country List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium tracking-widest uppercase mb-3">Countries</h3>
          {countries.map(c => (
            <Card
              key={c.id}
              className={`p-4 cursor-pointer transition-colors ${selectedCountry === c.id ? 'ring-1 ring-primary' : 'hover:bg-muted/30'}`}
              onClick={() => setSelectedCountry(c.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.currencySymbol} {c.currency} · VAT {c.vatRate}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={c.active ? 'default' : 'secondary'} className="text-xs">
                    {c.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">{c.luxuryTier}</Badge>
                </div>
              </div>
              {!c.active && (
                <Button
                  size="sm"
                  className="mt-3 w-full gap-2"
                  onClick={(e) => { e.stopPropagation(); handleActivate(c.id); }}
                >
                  <Zap className="h-3 w-3" /> Activate Country
                </Button>
              )}
              {c.active && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 w-full text-destructive"
                  onClick={(e) => { e.stopPropagation(); handleDeactivate(c.id); }}
                >
                  Deactivate
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-1">{selected.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selected.complianceNotes}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Currency:</span> {selected.currencySymbol} {selected.currency}</div>
                  <div><span className="text-muted-foreground">VAT Rate:</span> {selected.vatRate}%</div>
                  <div><span className="text-muted-foreground">Duty Rate:</span> {selected.dutyRate}%</div>
                  <div><span className="text-muted-foreground">Fulfillment:</span> {selected.fulfillmentCenter}</div>
                  <div><span className="text-muted-foreground">Free Shipping:</span> {selected.currencySymbol}{selected.freeShippingThreshold}</div>
                  <div><span className="text-muted-foreground">Pricing Multiplier:</span> ×{selected.pricingMultiplier}</div>
                </div>

                {selected.regulatoryBanner && (
                  <div className="mt-4 p-3 bg-muted/50 rounded text-xs">{selected.regulatoryBanner}</div>
                )}
              </Card>

              {/* Governance Controls */}
              <Card className="p-6 space-y-4">
                <h4 className="text-sm font-medium tracking-widest uppercase">Governance Controls</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Checkout Frozen</span>
                  <Switch
                    checked={selected.overrides.checkoutFrozen}
                    onCheckedChange={(v) => handleOverride(selected.id, { checkoutFrozen: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shipping Blackout</span>
                  <Switch
                    checked={selected.overrides.shippingBlackout}
                    onCheckedChange={(v) => handleOverride(selected.id, { shippingBlackout: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compliance Banner</span>
                  <Switch
                    checked={selected.overrides.complianceBannerEnabled}
                    onCheckedChange={(v) => handleOverride(selected.id, { complianceBannerEnabled: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Soft Launch Mode</span>
                  <Switch
                    checked={selected.overrides.softLaunch}
                    onCheckedChange={(v) => handleOverride(selected.id, { softLaunch: v })}
                  />
                </div>
              </Card>

              {/* Brand × Country Matrix */}
              <Card className="p-6">
                <h4 className="text-sm font-medium tracking-widest uppercase mb-4">Brand Availability</h4>
                <div className="space-y-3">
                  {BRANDS.map(brand => {
                    const entry = selectedBrands.find(e => e.brandId === brand.id);
                    const isActive = entry?.status === 'active' || entry?.status === 'soft-launch';
                    return (
                      <div key={brand.id} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                        <div>
                          <p className="text-sm font-medium">{brand.name}</p>
                          <p className="text-xs text-muted-foreground">{brand.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={isActive ? 'default' : 'secondary'} className="text-xs capitalize">
                            {entry?.status || 'inactive'}
                          </Badge>
                          <Switch
                            checked={isActive}
                            onCheckedChange={(v) => {
                              const m = updateMatrixEntry(brand.id, selected.id, {
                                status: v ? 'active' : 'inactive',
                                checkoutEnabled: v,
                                navVisible: v,
                                homepageVisible: v,
                              });
                              setMatrix(m);
                              addAudit('Brand availability toggled', 'Holding', `${brand.name} → ${selected.name}: ${v ? 'active' : 'inactive'}`);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Shipping Zones */}
              <Card className="p-6">
                <h4 className="text-sm font-medium tracking-widest uppercase mb-4">Shipping Zones</h4>
                <div className="space-y-2">
                  {selected.shippingZones.map(zone => (
                    <div key={zone.id} className="flex items-center justify-between p-3 bg-muted/20 rounded text-sm">
                      <span>{zone.name}</span>
                      <div className="flex gap-4 text-muted-foreground">
                        <span>{zone.estimatedDays.min}-{zone.estimatedDays.max} days</span>
                        <span>{selected.currencySymbol}{zone.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center text-muted-foreground">
              <Globe className="h-10 w-10 mx-auto mb-4 opacity-30" />
              <p>Select a country to view details and controls</p>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

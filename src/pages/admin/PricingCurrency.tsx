import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function PricingCurrency() {
  const { currencies, updateCurrency, baseCurrency, setBaseCurrency, taxInclusion, setTaxInclusion, can } = useAdminStore();

  if (!can("pricing")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Pricing & Currency</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage currencies, conversion rates, and tax settings</p>
        </div>

        {/* Global settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border p-4 bg-card">
            <label className="text-xs text-muted-foreground">Base Currency</label>
            <select
              value={baseCurrency}
              onChange={(e) => { setBaseCurrency(e.target.value); toast.success("Base currency updated"); }}
              className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm"
            >
              {currencies.filter((c) => c.enabled).map((c) => (
                <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
              ))}
            </select>
          </div>
          <div className="border border-border p-4 bg-card flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Tax Included in Price</p>
              <p className="text-xs text-muted-foreground">Visual display only</p>
            </div>
            <Switch checked={taxInclusion} onCheckedChange={(v) => { setTaxInclusion(v); toast.success("Tax setting updated"); }} />
          </div>
        </div>

        {/* Currency table */}
        <div className="border border-border">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
            <span>Currency</span>
            <span>Symbol</span>
            <span>Conversion Rate</span>
            <span>Country Multiplier</span>
            <span>Enabled</span>
            <span>Actions</span>
          </div>
          {currencies.map((c) => (
            <div key={c.code} className="grid grid-cols-6 gap-4 p-4 border-b border-border last:border-0 items-center">
              <span className="font-medium text-sm">{c.code}</span>
              <span className="text-sm">{c.symbol}</span>
              <Input
                type="number"
                step="0.01"
                value={c.rate}
                onChange={(e) => updateCurrency(c.code, { rate: parseFloat(e.target.value) || 1 })}
                className="text-sm"
              />
              <Input
                type="number"
                step="0.01"
                value={c.multiplier}
                onChange={(e) => updateCurrency(c.code, { multiplier: parseFloat(e.target.value) || 1 })}
                className="text-sm"
              />
              <Switch
                checked={c.enabled}
                onCheckedChange={(v) => { updateCurrency(c.code, { enabled: v }); toast.success(`${c.code} ${v ? "enabled" : "disabled"}`); }}
              />
              <Button variant="outline" size="sm" onClick={() => { updateCurrency(c.code, { rate: c.rate, multiplier: 1.0 }); toast.success("Reset"); }}>
                Reset
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

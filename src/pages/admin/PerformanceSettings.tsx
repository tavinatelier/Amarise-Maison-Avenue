import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Monitor, Smartphone, Gauge, Eye } from "lucide-react";
import { toast } from "sonner";

type PerfMode = "high" | "standard" | "low";

const PERF_KEY = "amarise-perf-mode";
const MOTION_KEY = "amarise-reduced-motion";

export default function PerformanceSettings() {
  const { can, addAudit } = useAdminStore();
  const [mode, setMode] = useState<PerfMode>(() => (localStorage.getItem(PERF_KEY) as PerfMode) || "standard");
  const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem(MOTION_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(PERF_KEY, mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(MOTION_KEY, String(reducedMotion));
  }, [reducedMotion]);

  if (!can("settings")) {
    return <AdminLayout><div className="p-8 text-center text-muted-foreground">Performance settings restricted.</div></AdminLayout>;
  }

  const handleModeChange = (newMode: PerfMode) => {
    setMode(newMode);
    addAudit("Performance mode changed", "System", `Mode set to ${newMode}`);
    toast.success(`Performance mode: ${newMode}`);
  };

  const handleMotionToggle = (v: boolean) => {
    setReducedMotion(v);
    addAudit("Reduced motion toggled", "System", v ? "Enabled" : "Disabled");
    toast.success(v ? "Reduced motion enabled" : "Reduced motion disabled");
  };

  // Simulated device detection
  const deviceInfo = {
    memory: (navigator as any).deviceMemory || "Unknown",
    cores: navigator.hardwareConcurrency || "Unknown",
    connection: (navigator as any).connection?.effectiveType || "Unknown",
    userAgent: /Mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
  };

  const modes: { key: PerfMode; label: string; desc: string; icon: React.ReactNode }[] = [
    { key: "high", label: "High Performance", desc: "All animations, parallax, blur effects, and cinematic transitions enabled. Best for powerful devices.", icon: <Zap className="w-5 h-5" /> },
    { key: "standard", label: "Standard", desc: "Balanced experience with essential animations. Suitable for most devices.", icon: <Monitor className="w-5 h-5" /> },
    { key: "low", label: "Low Performance", desc: "Minimal animations, no parallax, simplified transitions. Best for low-powered devices or slow connections.", icon: <Smartphone className="w-5 h-5" /> },
  ];

  const features = [
    { name: "Parallax scrolling", high: true, standard: false, low: false },
    { name: "Blur effects", high: true, standard: true, low: false },
    { name: "Hero transitions", high: true, standard: true, low: false },
    { name: "Image zoom on hover", high: true, standard: true, low: false },
    { name: "Film grain overlay", high: true, standard: false, low: false },
    { name: "Cinematic fade-in", high: true, standard: true, low: false },
    { name: "Smooth scrolling", high: true, standard: true, low: true },
    { name: "Lazy loading", high: true, standard: true, low: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Performance Engine</h1>
          <p className="text-muted-foreground mt-1">Control animation quality and rendering performance</p>
        </div>

        {/* Device Detection */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4" />
            <h3 className="text-caption">Detected Device Capabilities</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="text-muted-foreground">Type:</span> <span className="font-medium">{deviceInfo.userAgent}</span></div>
            <div><span className="text-muted-foreground">Memory:</span> <span className="font-medium">{deviceInfo.memory}GB</span></div>
            <div><span className="text-muted-foreground">Cores:</span> <span className="font-medium">{deviceInfo.cores}</span></div>
            <div><span className="text-muted-foreground">Connection:</span> <span className="font-medium">{deviceInfo.connection}</span></div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-3">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => handleModeChange(m.key)}
              className={`w-full text-left border p-5 transition-colors ${
                mode === m.key ? "border-accent bg-accent/5" : "border-border bg-card hover:border-foreground/20"
              }`}
            >
              <div className="flex items-center gap-3">
                {m.icon}
                <div className="flex-1">
                  <div className="font-medium">{m.label}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{m.desc}</div>
                </div>
                {mode === m.key && <div className="w-2 h-2 rounded-full bg-accent" />}
              </div>
            </button>
          ))}
        </div>

        {/* Reduced Motion */}
        <div className="border border-border bg-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5" />
            <div>
              <p className="font-medium text-sm">Reduced Motion</p>
              <p className="text-xs text-muted-foreground">Override: disable all animations regardless of mode</p>
            </div>
          </div>
          <Switch checked={reducedMotion} onCheckedChange={handleMotionToggle} />
        </div>

        {/* Feature Matrix */}
        <div className="border border-border bg-card p-5">
          <h3 className="text-caption mb-4">Feature Matrix by Mode</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left py-2">Feature</th>
                <th className="text-center py-2">High</th>
                <th className="text-center py-2">Standard</th>
                <th className="text-center py-2">Low</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name} className="border-b border-border/50">
                  <td className="py-2">{f.name}</td>
                  <td className="text-center py-2">{f.high ? "✓" : "—"}</td>
                  <td className="text-center py-2">{f.standard ? "✓" : "—"}</td>
                  <td className="text-center py-2">{f.low ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

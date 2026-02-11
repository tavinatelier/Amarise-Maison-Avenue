import { AdminLayout } from "@/components/admin/AdminLayout";
import { pillars, microCategories } from "@/data/catalog-hierarchy";
import { useState } from "react";
import { PillarSlug } from "@/types/catalog";
import { ChevronRight, Eye, EyeOff, Globe, Tag, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function AdminCategories() {
  const [expandedPillar, setExpandedPillar] = useState<PillarSlug | null>("women");
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);

  const totalFamilies = pillars.reduce((acc, p) => acc + p.families.length, 0);
  const totalMicro = microCategories.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">Category Hierarchy</h1>
          <p className="text-muted-foreground mt-1">
            Manage pillars, families, and micro-categories
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border p-4">
            <div className="flex items-center gap-2 text-caption mb-1">
              <Layers className="h-3.5 w-3.5" />
              Pillars
            </div>
            <p className="text-2xl font-light">{pillars.length}</p>
          </div>
          <div className="border border-border p-4">
            <div className="flex items-center gap-2 text-caption mb-1">
              <Tag className="h-3.5 w-3.5" />
              Families
            </div>
            <p className="text-2xl font-light">{totalFamilies}</p>
          </div>
          <div className="border border-border p-4">
            <div className="flex items-center gap-2 text-caption mb-1">
              <Globe className="h-3.5 w-3.5" />
              Micro-categories
            </div>
            <p className="text-2xl font-light">{totalMicro}</p>
          </div>
        </div>

        {/* Hierarchy Tree */}
        <div className="border border-border divide-y divide-border">
          {pillars.map((pillar) => (
            <div key={pillar.slug}>
              {/* Pillar Row */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                onClick={() => setExpandedPillar(expandedPillar === pillar.slug ? null : pillar.slug)}
              >
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    expandedPillar === pillar.slug ? "rotate-90" : ""
                  }`}
                />
                <span className="font-medium text-sm">{pillar.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {pillar.families.length} families
                </span>
              </button>

              {/* Families */}
              {expandedPillar === pillar.slug && (
                <div className="bg-muted/30">
                  {pillar.families.map((family) => {
                    const familyMicros = microCategories.filter(
                      (mc) => mc.pillarSlug === pillar.slug && mc.familySlug === family.slug
                    );
                    const isExpanded = expandedFamily === family.slug;

                    return (
                      <div key={family.slug}>
                        <button
                          className="w-full flex items-center gap-3 pl-10 pr-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
                          onClick={() => setExpandedFamily(isExpanded ? null : family.slug)}
                        >
                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                          <span className="text-sm">{family.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {family.productCount} products
                          </span>
                          {familyMicros.length > 0 && (
                            <Badge variant="secondary" className="ml-auto text-[10px]">
                              {familyMicros.length} micro
                            </Badge>
                          )}
                        </button>

                        {/* Micro-categories */}
                        {isExpanded && familyMicros.length > 0 && (
                          <div className="bg-muted/50">
                            {familyMicros.map((mc) => (
                              <div
                                key={mc.id}
                                className="flex items-center gap-3 pl-16 pr-4 py-2 text-sm"
                              >
                                <span className="text-muted-foreground">{mc.name}</span>
                                <Badge
                                  variant="outline"
                                  className="text-[9px] tracking-wider uppercase ml-auto"
                                >
                                  {mc.visibility}
                                </Badge>
                                <div className="flex items-center gap-1.5">
                                  {mc.isNavigationVisible ? (
                                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                                  ) : (
                                    <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                                  )}
                                  <Switch checked={mc.isNavigationVisible} className="scale-75" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Add Pillar
          </Button>
          <Button variant="outline" size="sm">
            Add Family
          </Button>
          <Button variant="outline" size="sm">
            Add Micro-Category
          </Button>
          <Button variant="outline" size="sm" className="ml-auto">
            Bulk Assignment
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

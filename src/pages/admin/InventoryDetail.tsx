import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  ArrowUpDown,
  Plus,
  Minus,
  Archive,
  RotateCcw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import inventoryData from "@/data/mock/inventory.json";

export default function InventoryDetail() {
  const { sku } = useParams();
  const navigate = useNavigate();

  const item = inventoryData.inventory.find((i) => i.sku === sku);
  const warehouses = inventoryData.warehouses;

  if (!item) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground">Inventory item not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/inventory")}>
            Back to Inventory
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "completed";
      case "low_stock":
        return "processing";
      case "out_of_stock":
        return "failed";
      case "archived":
        return "refunded";
      default:
        return "pending";
    }
  };

  const getWarehouseName = (code: string) => {
    const warehouse = warehouses.find((w) => w.code === code);
    return warehouse ? warehouse.name : code;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/inventory")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-light tracking-tight">{item.title}</h1>
              <StatusBadge status={getStatusVariant(item.status) as any} />
            </div>
            <p className="text-muted-foreground mt-1 font-mono">{item.sku}</p>
          </div>
          {item.status === "archived" ? (
            <Button variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reactivate
            </Button>
          ) : (
            <Button variant="outline" className="gap-2">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stock by Country */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Stock by Warehouse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(item.stockByCountry).map(([code, stock]) => (
                    <div key={code} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{getWarehouseName(code)}</p>
                        <p className="text-sm text-muted-foreground">{code}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl font-light ${stock <= 10 ? 'text-amber-600' : ''}`}>
                          {stock}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Transfer Stock Between Warehouses
                </Button>
              </CardContent>
            </Card>

            {/* Stock Movement Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Stock Movement History</CardTitle>
              </CardHeader>
              <CardContent>
                {item.movements && item.movements.length > 0 ? (
                  <div className="space-y-4">
                    {item.movements.map((movement: any) => (
                      <div key={movement.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          movement.type === 'inbound' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {movement.type === 'inbound' ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">
                              {movement.type === 'inbound' ? '+' : ''}{movement.quantity} units
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(movement.timestamp), { addSuffix: true })}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">{movement.reason}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {movement.country} • {movement.performedBy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No movements recorded</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-4xl font-light">{item.totalStock}</p>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Low Stock Threshold</span>
                    <span>{item.lowStockThreshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reorder Point</span>
                    <span>{item.reorderPoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Restocked</span>
                    <span>{new Date(item.lastRestocked).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thresholds */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lowStock">Low Stock Warning</Label>
                  <Input
                    id="lowStock"
                    type="number"
                    defaultValue={item.lowStockThreshold}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reorder">Reorder Point</Label>
                  <Input
                    id="reorder"
                    type="number"
                    defaultValue={item.reorderPoint}
                    className="mt-1"
                  />
                </div>
                <Button className="w-full">Update Thresholds</Button>
              </CardContent>
            </Card>

            {/* Archived Info */}
            {item.status === "archived" && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Archive className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Archived Product</p>
                      <p className="text-sm text-amber-700 mt-1">
                        {(item as any).archivedReason || "No reason provided"}
                      </p>
                      {(item as any).archivedAt && (
                        <p className="text-xs text-amber-600 mt-2">
                          Archived on {new Date((item as any).archivedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
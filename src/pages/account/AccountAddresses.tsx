import { useState } from "react";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { MapPin, Plus, Edit2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import accountData from "@/data/mock/account.json";

export default function AccountAddresses() {
  const { addresses } = accountData;
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSetDefault = (addressId: string, type: string) => {
    toast({
      title: "Default address updated",
      description: `This address is now your default ${type} address.`,
    });
  };

  const handleDelete = (addressId: string) => {
    toast({
      title: "Address removed",
      description: "This address has been removed from your account.",
    });
  };

  return (
    <AccountLayout 
      title="Addresses" 
      subtitle="Manage your shipping and billing addresses"
    >
      <div className="space-y-6">
        {/* Add New Address */}
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>

        {/* Address List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-6 border transition-colors",
                address.isDefault 
                  ? "border-foreground bg-secondary/20" 
                  : "border-border/50"
              )}
            >
              {/* Address Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="flex items-center gap-1 text-xs bg-foreground text-background px-2 py-0.5">
                      <Check className="h-3 w-3" />
                      Default
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(address.id)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-1 text-sm">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-muted-foreground">{address.line1}</p>
                {address.line2 && (
                  <p className="text-muted-foreground">{address.line2}</p>
                )}
                <p className="text-muted-foreground">
                  {address.city}, {address.postalCode}
                </p>
                <p className="text-muted-foreground">{address.country}</p>
                {address.phone && (
                  <p className="text-muted-foreground pt-2">{address.phone}</p>
                )}
              </div>

              {/* Set as Default */}
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id, address.type)}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Set as default {address.type}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Country Note */}
        <div className="p-6 bg-secondary/20 mt-8">
          <h3 className="font-medium mb-2">Shipping to multiple countries?</h3>
          <p className="text-sm text-muted-foreground">
            AMARISÉ ships to over 50 countries worldwide. Add addresses in any supported 
            country and select the appropriate one during checkout. Currency and duties 
            will be calculated based on the destination.
          </p>
        </div>
      </div>
    </AccountLayout>
  );
}

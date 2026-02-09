import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { MessageSquare, Mail, Package, Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import accountData from "@/data/mock/account.json";

export default function AccountMessages() {
  const { communications } = accountData;

  const getIcon = (type: string) => {
    switch (type) {
      case "order_shipped": return Package;
      case "private_preview": return Eye;
      case "care_reminder": return Heart;
      default: return Mail;
    }
  };

  return (
    <AccountLayout title="Messages" subtitle="Communications from AMARISÉ">
      <div className="space-y-2">
        {communications.map((msg, index) => {
          const Icon = getIcon(msg.type);
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-start gap-4 p-4 border border-border/50 cursor-pointer hover:bg-secondary/30 transition-colors",
                !msg.read && "bg-secondary/20"
              )}
            >
              <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("font-medium truncate", !msg.read && "font-semibold")}>{msg.subject}</p>
                  {!msg.read && <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground">{msg.date}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AccountLayout>
  );
}

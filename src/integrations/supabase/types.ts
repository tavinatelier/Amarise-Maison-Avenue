export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      client_notes: {
        Row: {
          author_id: string | null
          client_id: string
          created_at: string
          id: string
          is_private: boolean | null
          note: string
        }
        Insert: {
          author_id?: string | null
          client_id: string
          created_at?: string
          id?: string
          is_private?: boolean | null
          note: string
        }
        Update: {
          author_id?: string | null
          client_id?: string
          created_at?: string
          id?: string
          is_private?: boolean | null
          note?: string
        }
        Relationships: []
      }
      client_preferences: {
        Row: {
          allergies: string[] | null
          favorite_colors: string[] | null
          favorite_materials: string[] | null
          fragrance_preferences: string | null
          gift_occasions: Json | null
          id: string
          sizes: Json | null
          skincare_concerns: string[] | null
          style_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          favorite_colors?: string[] | null
          favorite_materials?: string[] | null
          fragrance_preferences?: string | null
          gift_occasions?: Json | null
          id?: string
          sizes?: Json | null
          skincare_concerns?: string[] | null
          style_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          favorite_colors?: string[] | null
          favorite_materials?: string[] | null
          fragrance_preferences?: string | null
          gift_occasions?: Json | null
          id?: string
          sizes?: Json | null
          skincare_concerns?: string[] | null
          style_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      concierge_appointments: {
        Row: {
          appointment_type: string
          client_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          location: string | null
          notes: string | null
          scheduled_at: string
          status: string | null
          stylist_id: string | null
          updated_at: string
        }
        Insert: {
          appointment_type: string
          client_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          scheduled_at: string
          status?: string | null
          stylist_id?: string | null
          updated_at?: string
        }
        Update: {
          appointment_type?: string
          client_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: string | null
          stylist_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      preview_invitations: {
        Row: {
          id: string
          invited_at: string
          preview_id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          invited_at?: string
          preview_id: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          invited_at?: string
          preview_id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preview_invitations_preview_id_fkey"
            columns: ["preview_id"]
            isOneToOne: false
            referencedRelation: "private_previews"
            referencedColumns: ["id"]
          },
        ]
      }
      private_previews: {
        Row: {
          collection_slug: string | null
          created_at: string
          description: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          is_invitation_only: boolean | null
          min_tier: Database["public"]["Enums"]["vip_tier"] | null
          starts_at: string
          title: string
        }
        Insert: {
          collection_slug?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_invitation_only?: boolean | null
          min_tier?: Database["public"]["Enums"]["vip_tier"] | null
          starts_at: string
          title: string
        }
        Update: {
          collection_slug?: string | null
          created_at?: string
          description?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_invitation_only?: boolean | null
          min_tier?: Database["public"]["Enums"]["vip_tier"] | null
          starts_at?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          assigned_stylist_id: string | null
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          lifetime_value: number | null
          phone: string | null
          preferred_currency: string | null
          preferred_language: string | null
          tier: Database["public"]["Enums"]["vip_tier"]
          total_orders: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_stylist_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          lifetime_value?: number | null
          phone?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          tier?: Database["public"]["Enums"]["vip_tier"]
          total_orders?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_stylist_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          lifetime_value?: number | null
          phone?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          tier?: Database["public"]["Enums"]["vip_tier"]
          total_orders?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlists: {
        Row: {
          converted_at: string | null
          id: string
          joined_at: string
          notified_at: string | null
          priority: number | null
          product_id: string
          product_title: string
          user_id: string
        }
        Insert: {
          converted_at?: string | null
          id?: string
          joined_at?: string
          notified_at?: string | null
          priority?: number | null
          product_id: string
          product_title: string
          user_id: string
        }
        Update: {
          converted_at?: string | null
          id?: string
          joined_at?: string
          notified_at?: string | null
          priority?: number | null
          product_id?: string
          product_title?: string
          user_id?: string
        }
        Relationships: []
      }
      wardrobe_history: {
        Row: {
          color: string | null
          currency: string | null
          id: string
          order_id: string | null
          price: number | null
          product_category: string | null
          product_id: string
          product_image: string | null
          product_title: string
          purchase_date: string
          size: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_category?: string | null
          product_id: string
          product_image?: string | null
          product_title: string
          purchase_date?: string
          size?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_category?: string | null
          product_id?: string
          product_image?: string | null
          product_title?: string
          purchase_date?: string
          size?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_tier: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["vip_tier"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "stylist" | "concierge" | "user"
      vip_tier: "standard" | "gold" | "black" | "private_circle"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "stylist", "concierge", "user"],
      vip_tier: ["standard", "gold", "black", "private_circle"],
    },
  },
} as const

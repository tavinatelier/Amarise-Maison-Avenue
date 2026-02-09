-- ========================================
-- AMARISÉ LUXURY CLIENTELING SYSTEM
-- Enterprise-grade VIP customer management
-- ========================================

-- 1. VIP Tier Enum
CREATE TYPE public.vip_tier AS ENUM ('standard', 'gold', 'black', 'private_circle');

-- 2. User Roles Enum (for admin access)
CREATE TYPE public.app_role AS ENUM ('admin', 'stylist', 'concierge', 'user');

-- 3. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  tier vip_tier NOT NULL DEFAULT 'standard',
  lifetime_value DECIMAL(12,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  assigned_stylist_id UUID,
  preferred_language TEXT DEFAULT 'en',
  preferred_currency TEXT DEFAULT 'EUR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. User Roles Table (for RBAC)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 5. Client Preferences Table
CREATE TABLE public.client_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  sizes JSONB DEFAULT '{}',
  favorite_colors TEXT[],
  favorite_materials TEXT[],
  style_notes TEXT,
  fragrance_preferences TEXT,
  skincare_concerns TEXT[],
  allergies TEXT[],
  gift_occasions JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Client Notes Table (stylist notes per client)
CREATE TABLE public.client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Concierge Appointments Table
CREATE TABLE public.concierge_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stylist_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  appointment_type TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Private Previews Table (exclusive drops)
CREATE TABLE public.private_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  collection_slug TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  min_tier vip_tier DEFAULT 'gold',
  is_invitation_only BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Preview Invitations Table
CREATE TABLE public.preview_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  preview_id UUID REFERENCES public.private_previews(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  viewed_at TIMESTAMPTZ,
  UNIQUE (preview_id, user_id)
);

-- 10. Wardrobe History Table
CREATE TABLE public.wardrobe_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  product_image TEXT,
  product_category TEXT,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  order_id TEXT,
  size TEXT,
  color TEXT,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR'
);

-- 11. Waitlists Table
CREATE TABLE public.waitlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  priority INTEGER DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notified_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  UNIQUE (product_id, user_id)
);

-- ========================================
-- ENABLE RLS
-- ========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concierge_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_previews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preview_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlists ENABLE ROW LEVEL SECURITY;

-- ========================================
-- SECURITY DEFINER FUNCTIONS
-- ========================================

-- Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Check if user is admin or stylist (staff)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'stylist', 'concierge')
  )
$$;

-- Get user's VIP tier
CREATE OR REPLACE FUNCTION public.get_user_tier(_user_id UUID)
RETURNS vip_tier
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tier FROM public.profiles WHERE user_id = _user_id
$$;

-- ========================================
-- RLS POLICIES
-- ========================================

-- Profiles: Users can read/update their own, staff can read all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Roles: Only admins can manage roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Client Preferences: Own data only
CREATE POLICY "Users can manage own preferences" ON public.client_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view client preferences" ON public.client_preferences
  FOR SELECT USING (public.is_staff(auth.uid()));

-- Client Notes: Staff can manage, clients can view non-private notes
CREATE POLICY "Staff can manage client notes" ON public.client_notes
  FOR ALL USING (public.is_staff(auth.uid()));

CREATE POLICY "Clients can view their non-private notes" ON public.client_notes
  FOR SELECT USING (auth.uid() = client_id AND is_private = false);

-- Concierge Appointments: Own appointments + staff access
CREATE POLICY "Users can view own appointments" ON public.concierge_appointments
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = stylist_id OR public.is_staff(auth.uid()));

CREATE POLICY "Users can create own appointments" ON public.concierge_appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Staff can manage all appointments" ON public.concierge_appointments
  FOR ALL USING (public.is_staff(auth.uid()));

-- Private Previews: Based on tier + invitation
CREATE POLICY "Staff can manage previews" ON public.private_previews
  FOR ALL USING (public.is_staff(auth.uid()));

CREATE POLICY "Eligible users can view previews" ON public.private_previews
  FOR SELECT USING (
    public.is_staff(auth.uid())
    OR (
      is_invitation_only = false 
      AND public.get_user_tier(auth.uid()) >= min_tier
      AND now() BETWEEN starts_at AND COALESCE(ends_at, now() + interval '1 year')
    )
    OR EXISTS (
      SELECT 1 FROM public.preview_invitations
      WHERE preview_id = private_previews.id AND user_id = auth.uid()
    )
  );

-- Preview Invitations
CREATE POLICY "Staff can manage invitations" ON public.preview_invitations
  FOR ALL USING (public.is_staff(auth.uid()));

CREATE POLICY "Users can view own invitations" ON public.preview_invitations
  FOR SELECT USING (auth.uid() = user_id);

-- Wardrobe History: Own data only
CREATE POLICY "Users can manage own wardrobe" ON public.wardrobe_history
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view wardrobe history" ON public.wardrobe_history
  FOR SELECT USING (public.is_staff(auth.uid()));

-- Waitlists: Own data + staff access
CREATE POLICY "Users can manage own waitlist" ON public.waitlists
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all waitlists" ON public.waitlists
  FOR SELECT USING (public.is_staff(auth.uid()));

-- ========================================
-- TRIGGERS
-- ========================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at
  BEFORE UPDATE ON public.client_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.concierge_appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
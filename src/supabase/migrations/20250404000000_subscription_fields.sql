-- Add subscription-related fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS subscription_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS monthly_leads INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS leads_received_this_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_leads_received INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_lead_reset_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create a function to reset monthly leads
CREATE OR REPLACE FUNCTION reset_monthly_leads()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if it's a new month
  IF (NEW.last_lead_reset_date IS NULL OR 
      DATE_TRUNC('month', NEW.last_lead_reset_date) < DATE_TRUNC('month', CURRENT_TIMESTAMP)) THEN
    -- Reset leads received this month
    NEW.leads_received_this_month := 0;
    NEW.last_lead_reset_date := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically reset monthly leads
CREATE TRIGGER reset_monthly_leads_trigger
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION reset_monthly_leads(); 
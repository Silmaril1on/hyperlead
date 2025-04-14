-- Create user_leads table to track which leads have been given to which users
CREATE TABLE IF NOT EXISTS user_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, lead_id)
);

-- Add RLS policies for user_leads table
ALTER TABLE user_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own leads"
  ON user_leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert leads for users"
  ON user_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_leads_user_id ON user_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_user_leads_lead_id ON user_leads(lead_id); 
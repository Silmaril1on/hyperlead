-- Create user_leads_history table to track all leads a user has ever received
CREATE TABLE IF NOT EXISTS user_leads_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, lead_id)
);

-- Add RLS policies for user_leads_history table
ALTER TABLE user_leads_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lead history"
  ON user_leads_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert lead history"
  ON user_leads_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_leads_history_user_id ON user_leads_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_leads_history_lead_id ON user_leads_history(lead_id); 
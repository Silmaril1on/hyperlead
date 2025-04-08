/*
  # Add RLS policies for profiles table

  1. Security Updates
    - Add insert policy for authenticated users
    - Add update policy for authenticated users
    - Add select policy for authenticated users
    
  2. Changes
    - Ensures users can create their own profile during signup
    - Allows users to update their own profile
    - Permits users to read their own profile data
*/

-- Drop existing policies if they exist
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Users can read their own profile" on profiles;

-- Create new policies
create policy "Users can insert their own profile"
  on profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can read their own profile"
  on profiles
  for select
  to authenticated
  using (auth.uid() = id);
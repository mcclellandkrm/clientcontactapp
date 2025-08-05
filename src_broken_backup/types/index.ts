export type ClientDetails = {
  business_name: string;
  contact_name: string;
  first_name: string;
  business_email: string;
  telephone: string;
  notes: string;
  business_type: string;
  business_location: string;
  return_date: string;
  copy_to: string; // <-- This line is required!
};
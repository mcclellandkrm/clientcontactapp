export type ClientDetails = {
  business_name: string;
  contact_name: string;
  first_name: string;
  business_email: string;
  telephone: string;
  notes: string;
  business_type: string;
  business_location: string; // <-- new
  return_date: string;       // <-- new (store as string for simplicity)
};
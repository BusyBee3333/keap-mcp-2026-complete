// Keap API Types

export interface KeapConfig {
  accessToken: string;
  baseUrl?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  next?: string;
  previous?: string;
}

// Contact Types
export interface Contact {
  id: number;
  email_addresses?: EmailAddress[];
  phone_numbers?: PhoneNumber[];
  addresses?: Address[];
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  company_name?: string;
  job_title?: string;
  birthday?: string;
  anniversary?: string;
  spouse_name?: string;
  website?: string;
  time_zone?: string;
  opted_in?: boolean;
  opt_in_reason?: string;
  owner_id?: number;
  source_type?: string;
  contact_type?: string;
  tags?: Tag[];
  custom_fields?: CustomField[];
  date_created?: string;
  last_updated?: string;
}

export interface EmailAddress {
  email: string;
  field: 'EMAIL1' | 'EMAIL2' | 'EMAIL3';
}

export interface PhoneNumber {
  number: string;
  field: 'PHONE1' | 'PHONE2' | 'PHONE3' | 'PHONE4' | 'PHONE5';
  type?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  locality?: string;
  region?: string;
  zip_code?: string;
  country_code?: string;
  field: 'BILLING' | 'SHIPPING' | 'OTHER';
}

// Deal/Opportunity Types
export interface Deal {
  id: number;
  contact?: Contact;
  title: string;
  stage_id: number;
  stage?: Stage;
  user_id?: number;
  projected_revenue_high?: number;
  projected_revenue_low?: number;
  actual_revenue?: number;
  estimated_close_date?: string;
  next_action_date?: string;
  next_action_notes?: string;
  probability?: number;
  affiliate_id?: number;
  date_created?: string;
  last_updated?: string;
  custom_fields?: CustomField[];
}

export interface Pipeline {
  id: number;
  name: string;
  stages: Stage[];
}

export interface Stage {
  id: number;
  name: string;
  order: number;
  check_list_items?: ChecklistItem[];
}

export interface ChecklistItem {
  id: number;
  description: string;
  required: boolean;
}

// Company Types
export interface Company {
  id: number;
  company_name: string;
  email_address?: string;
  phone_number?: string;
  fax_number?: string;
  website?: string;
  address?: Address;
  notes?: string;
  custom_fields?: CustomField[];
  date_created?: string;
  last_updated?: string;
}

// Task Types
export interface Task {
  id: number;
  title: string;
  description?: string;
  contact?: Contact;
  completed: boolean;
  completion_date?: string;
  due_date?: string;
  priority?: number;
  type?: string;
  user_id?: number;
  date_created?: string;
  last_updated?: string;
}

// Appointment Types
export interface Appointment {
  id: number;
  title: string;
  description?: string;
  location?: string;
  start_date: string;
  end_date: string;
  all_day?: boolean;
  contact?: Contact;
  user_id?: number;
  attendees?: number[];
  date_created?: string;
  last_updated?: string;
}

// Campaign Types
export interface Campaign {
  id: number;
  name: string;
  goals?: string[];
  created_by?: number;
  published_status?: 'Draft' | 'Published' | 'Archived';
  published_date?: string;
  time_zone?: string;
  error_message?: string;
  locked?: boolean;
  date_created?: string;
  last_updated?: string;
}

export interface CampaignStats {
  campaign_id: number;
  total_contacts: number;
  active_contacts: number;
  completed_contacts: number;
  stopped_contacts: number;
}

// Email Types
export interface Email {
  id: number;
  sent_to_address: string;
  sent_to_contact_id?: number;
  sent_from_address: string;
  subject: string;
  html_content?: string;
  text_content?: string;
  sent_date?: string;
  opened?: boolean;
  clicked?: boolean;
  bounced?: boolean;
  headers?: Record<string, string>;
}

export interface EmailTemplate {
  id: number;
  name: string;
  subject?: string;
  html_content?: string;
  text_content?: string;
  categories?: string[];
  date_created?: string;
  last_updated?: string;
}

// Order Types
export interface Order {
  id: number;
  contact_id: number;
  title: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Refunded';
  order_date?: string;
  total: number;
  total_due?: number;
  total_paid?: number;
  notes?: string;
  order_items?: OrderItem[];
  transactions?: Transaction[];
  date_created?: string;
  last_updated?: string;
}

export interface OrderItem {
  id: number;
  product_id?: number;
  description: string;
  quantity: number;
  price: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface Transaction {
  id: number;
  contact_id: number;
  order_id?: number;
  amount: number;
  currency: string;
  gateway?: string;
  gateway_account_id?: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  type: 'Sale' | 'Refund' | 'Chargeback';
  transaction_date: string;
  test?: boolean;
  errors?: string;
}

// Product Types
export interface Product {
  id: number;
  product_name: string;
  product_short_desc?: string;
  product_desc?: string;
  sku?: string;
  product_price?: number;
  status: 'Active' | 'Inactive';
  subscription_plans?: SubscriptionPlan[];
  date_created?: string;
  last_updated?: string;
}

export interface SubscriptionPlan {
  id: number;
  cycle: 'Day' | 'Week' | 'Month' | 'Year';
  frequency: number;
  number_of_cycles?: number;
  price: number;
  subscription_plan_name: string;
  active: boolean;
}

// Tag Types
export interface Tag {
  id: number;
  name: string;
  description?: string;
  category?: TagCategory;
  date_created?: string;
}

export interface TagCategory {
  id: number;
  name: string;
  description?: string;
}

// Note Types
export interface Note {
  id: number;
  contact_id?: number;
  user_id?: number;
  title?: string;
  body: string;
  type?: 'Appointment' | 'Call' | 'Email' | 'Fax' | 'Letter' | 'Other';
  date_created?: string;
  last_updated?: string;
}

// Custom Field Types
export interface CustomField {
  id: number;
  content: string | number | boolean;
}

// Automation Types
export interface Automation {
  id: number;
  name: string;
  category?: string;
  active: boolean;
  date_created?: string;
  last_updated?: string;
}

// Report Types
export interface ContactGrowthReport {
  date: string;
  new_contacts: number;
  total_contacts: number;
}

export interface RevenueReport {
  date: string;
  revenue: number;
  transactions: number;
  average_order_value: number;
}

export interface CampaignPerformanceReport {
  campaign_id: number;
  campaign_name: string;
  total_sent: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  open_rate: number;
  click_rate: number;
}

// Error Types
export interface KeapError {
  message: string;
  error?: string;
  fault?: {
    faultstring: string;
    detail?: {
      errorcode: string;
    };
  };
}

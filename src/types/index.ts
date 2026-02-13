// Keap API TypeScript Interfaces

export interface KeapContact {
  id?: number;
  given_name?: string;
  family_name?: string;
  email_addresses?: EmailAddress[];
  phone_numbers?: PhoneNumber[];
  addresses?: Address[];
  company?: Company;
  custom_fields?: CustomField[];
  tag_ids?: number[];
  opt_in_reason?: string;
  owner_id?: number;
  lead_source_id?: number;
  date_created?: string;
  last_updated?: string;
  score_value?: number;
  preferred_name?: string;
  preferred_locale?: string;
  time_zone?: string;
  website?: string;
  job_title?: string;
  anniversary?: string;
  birthday?: string;
  suffix?: string;
  middle_name?: string;
  prefix?: string;
  spouse_name?: string;
  social_accounts?: SocialAccount[];
  fax_numbers?: FaxNumber[];
  contact_type?: string;
}

export interface EmailAddress {
  email: string;
  field?: string;
}

export interface PhoneNumber {
  number: string;
  field?: string;
  extension?: string;
  type?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country_code?: string;
  zip_code?: string;
  zip_four?: string;
  field?: string;
}

export interface Company {
  id?: number;
  company_name?: string;
}

export interface CustomField {
  id: number;
  content?: any;
}

export interface SocialAccount {
  name?: string;
  type?: string;
}

export interface FaxNumber {
  number?: string;
  field?: string;
}

export interface KeapTag {
  id?: number;
  name?: string;
  description?: string;
  category?: TagCategory;
}

export interface TagCategory {
  id?: number;
  name?: string;
  description?: string;
}

export interface KeapOpportunity {
  id?: number;
  opportunity_title?: string;
  contact?: ContactReference;
  stage?: StageReference;
  user?: number;
  date_created?: string;
  estimated_close_date?: string;
  opportunity_notes?: string;
  next_action_notes?: string;
  next_action_date?: string;
  last_updated?: string;
  projected_revenue_low?: number;
  projected_revenue_high?: number;
  custom_fields?: CustomField[];
  include_in_forecast?: number;
  affiliate_id?: number;
}

export interface ContactReference {
  id: number;
}

export interface StageReference {
  id: number;
  name?: string;
}

export interface KeapTask {
  id?: number;
  title?: string;
  description?: string;
  contact?: ContactReference;
  due_date?: string;
  remind_time?: number;
  completed?: boolean;
  completion_date?: string;
  type?: string;
  priority?: number;
  user_id?: number;
  creation_date?: string;
  modification_date?: string;
  url?: string;
}

export interface KeapAppointment {
  id?: number;
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  contact?: ContactReference;
  location?: string;
  remind_time?: number;
  all_day?: boolean;
  user?: number;
}

export interface KeapCampaign {
  id?: number;
  name?: string;
  description?: string;
  created_by_global_id?: number;
  error_message?: string;
  goals?: CampaignGoal[];
  time_zone?: string;
  published_date?: string;
  published_status?: boolean;
  published_by_user_id?: number;
}

export interface CampaignGoal {
  id?: number;
  name?: string;
  historical_contact_count?: number;
  historical_contact_count_completed?: number;
}

export interface KeapProduct {
  id?: number;
  product_name?: string;
  product_short_desc?: string;
  product_desc?: string;
  product_price?: number;
  sku?: string;
  subscription_only?: boolean;
  subscription_plans?: SubscriptionPlan[];
  url?: string;
  status?: number;
}

export interface SubscriptionPlan {
  id?: number;
  cycle?: string;
  frequency?: number;
  number_of_cycles?: number;
  plan_price?: number;
  subscription_plan_index?: number;
  subscription_plan_name?: string;
}

export interface KeapOrder {
  id?: number;
  contact_id?: number;
  order_date?: string;
  order_title?: string;
  order_type?: string;
  order_items?: OrderItem[];
  status?: string;
  total?: number;
  total_paid?: number;
  total_due?: number;
  shipping_information?: ShippingInformation;
  allow_payment?: boolean;
  lead_affiliate_id?: number;
  sales_affiliate_id?: number;
  promo_codes?: string[];
}

export interface OrderItem {
  id?: number;
  product_id?: number;
  quantity?: number;
  price?: number;
  discount?: number;
  product_name?: string;
  description?: string;
  notes?: string;
  type?: string;
  subscription_plan_id?: number;
}

export interface ShippingInformation {
  first_name?: string;
  last_name?: string;
  company?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  method?: string;
}

export interface KeapTransaction {
  id?: number;
  contact_id?: number;
  amount?: number;
  currency?: string;
  gateway?: string;
  gateway_account_name?: string;
  order_ids?: number[];
  orders?: OrderReference[];
  paymentDate?: string;
  status?: string;
  test?: boolean;
  type?: string;
}

export interface OrderReference {
  id?: number;
}

export interface KeapSubscription {
  id?: number;
  active?: boolean;
  billing_amount?: number;
  billing_cycle?: string;
  billing_frequency?: number;
  contact_id?: number;
  credit_card_id?: number;
  end_date?: string;
  next_bill_date?: string;
  payment_gateway_id?: string;
  product_id?: number;
  quantity?: number;
  start_date?: string;
  subscription_plan_id?: number;
}

export interface KeapNote {
  id?: number;
  contact_id?: number;
  user_id?: number;
  date_created?: string;
  last_updated?: string;
  body?: string;
  title?: string;
  type?: string;
}

export interface KeapEmail {
  id?: number;
  sent_from_address?: string;
  sent_to_address?: string;
  sent_from_reply_address?: string;
  subject?: string;
  html_content?: string;
  text_content?: string;
  attachments?: Attachment[];
  contacts?: number[];
  sent_date?: string;
  received_date?: string;
  opened_date?: string;
  clicked_date?: string;
}

export interface Attachment {
  file_name?: string;
  file_data?: string;
}

export interface KeapFile {
  id?: number;
  file_name?: string;
  file_box_id?: number;
  contact_id?: number;
  file_size?: number;
  file_association?: string;
  file_data?: string;
  file_url?: string;
  is_public?: boolean;
}

export interface KeapAffiliate {
  id?: number;
  code?: string;
  contact_id?: number;
  name?: string;
  parent_id?: number;
  status?: number;
  track_leads_for?: number;
}

export interface KeapCommission {
  id?: number;
  affiliate_id?: number;
  amount?: number;
  contact_id?: number;
  date_earned?: string;
  invoice_id?: number;
  order_id?: number;
  product_id?: number;
}

export interface KeapAccount {
  address?: string;
  business_goals?: string[];
  business_primary_color?: string;
  business_secondary_color?: string;
  business_type?: string;
  currency_code?: string;
  email?: string;
  language_tag?: string;
  logo_url?: string;
  name?: string;
  phone?: string;
  phone_ext?: string;
  time_zone?: string;
  website?: string;
}

export interface KeapUser {
  id?: number;
  email_address?: string;
  family_name?: string;
  given_name?: string;
  infusionsoft_id?: string;
  partner?: boolean;
  status?: string;
}

export interface KeapHook {
  key?: string;
  eventKey?: string;
  hookUrl?: string;
  status?: string;
}

export interface KeapPipeline {
  id?: number;
  name?: string;
  stages?: PipelineStage[];
}

export interface PipelineStage {
  id?: number;
  name?: string;
  details?: StageDetails;
  target_num_days?: number;
  target_revenue?: number;
}

export interface StageDetails {
  check_list_items?: CheckListItem[];
}

export interface CheckListItem {
  description?: string;
  required?: boolean;
}

export interface KeapCreditCard {
  id?: number;
  card_number?: string;
  card_type?: string;
  expiration_month?: string;
  expiration_year?: string;
  name_on_card?: string;
  email?: string;
  status?: string;
}

export interface ApiResponse<T> {
  data?: T;
  count?: number;
  next?: string;
  previous?: string;
  error?: ApiError;
}

export interface ApiError {
  message?: string;
  code?: string;
  details?: any;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface SearchParams extends PaginationParams {
  email?: string;
  given_name?: string;
  family_name?: string;
  order?: string;
  order_direction?: string;
  since?: string;
  until?: string;
}

# Keap MCP Server

Complete Model Context Protocol server for Keap (formerly Infusionsoft) with 111 tools and 22 React apps.

## Features

### 🛠️ Comprehensive Tool Coverage (111 tools)

- **Contacts**: Full CRUD, search, tagging, custom fields, bulk operations, merge, email opt status
- **Companies**: CRUD, search, company-contact associations
- **Opportunities**: Complete sales pipeline (CRUD, stages, stage moves, search, bulk operations)
- **Tasks**: CRUD, completion tracking, search, bulk updates
- **Appointments**: CRUD, scheduling, calendar integration, search
- **Campaigns**: CRUD, sequence management, contact additions, achievement tracking
- **Tags**: CRUD, category management, contact tagging/untagging, bulk operations
- **Notes**: CRUD, contact/opportunity associations, search
- **Emails**: Send transactional and marketing emails, templates, tracking, opt status
- **Files**: Upload, retrieve, associate with contacts/companies
- **E-commerce**: Products, orders, subscriptions, payments, refunds, transaction history
- **Automations**: Campaign builder sequences, goal tracking, link triggers
- **Settings**: Account info, user management, custom fields, settings configuration
- **Affiliates**: Program management, commissions, payouts, clawbacks, summaries

### 🎨 MCP Apps (22 React Apps)

1. **Contact Dashboard** - Contact list with metrics and search
2. **Contact Detail** - Comprehensive contact profile view
3. **Contact Grid** - Data grid with filtering and bulk actions
4. **Contact Timeline** - Activity timeline and interaction history
5. **Company Dashboard** - Company overview and metrics
6. **Company Detail** - Detailed company information
7. **Company Grid** - Companies data grid with search
8. **Deal Dashboard** - Sales pipeline overview
9. **Deal Detail** - Opportunity details and stage tracking
10. **Pipeline Kanban** - Visual drag-and-drop pipeline management
11. **Pipeline Funnel** - Conversion funnel visualization
12. **Task Manager** - Task list with priorities and due dates
13. **Appointment Calendar** - Calendar view with scheduling
14. **Campaign Dashboard** - Campaign performance metrics
15. **Campaign Detail** - Campaign sequence and analytics
16. **Email Composer** - Rich email composition interface
17. **Tag Manager** - Tag organization and bulk tagging
18. **Automation Dashboard** - Campaign builder overview
19. **Product Catalog** - E-commerce product management
20. **Order Dashboard** - Order tracking and fulfillment
21. **Order Detail** - Detailed order information
22. **Revenue Dashboard** - Revenue analytics and reporting

## Installation

```bash
npm install @mcpengine/keap
```

## Configuration

### Environment Variables

```bash
KEAP_API_KEY=your_personal_access_token
```

### Personal Access Token Setup

1. Log in to your Keap account
2. Navigate to **Admin** → **Settings** → **Application**
3. Click on **API** tab
4. Generate a new **Personal Access Token**
5. Copy the token and use it as `KEAP_API_KEY`

### MCP Settings (Claude Desktop)

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "keap": {
      "command": "npx",
      "args": ["-y", "@mcpengine/keap"],
      "env": {
        "KEAP_API_KEY": "your_personal_access_token"
      }
    }
  }
}
```

## Usage Examples

### Create a Contact

```typescript
{
  "tool": "keap_create_contact",
  "arguments": {
    "given_name": "John",
    "family_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-0123",
    "company_name": "Acme Corp",
    "job_title": "CTO",
    "tag_ids": [123, 456]
  }
}
```

### Search Contacts

```typescript
{
  "tool": "keap_search_contacts",
  "arguments": {
    "email": "john@example.com",
    "given_name": "John",
    "order": "email",
    "limit": 50
  }
}
```

### Create an Opportunity

```typescript
{
  "tool": "keap_create_opportunity",
  "arguments": {
    "title": "New Website Project",
    "contact_id": 12345,
    "stage_id": 789,
    "projected_revenue": 15000,
    "opportunity_notes": "Interested in complete redesign"
  }
}
```

### Move Opportunity Stage

```typescript
{
  "tool": "keap_move_opportunity_stage",
  "arguments": {
    "opportunity_id": 98765,
    "stage_id": 790,
    "notes": "Proposal sent, awaiting review"
  }
}
```

### Tag Contacts

```typescript
{
  "tool": "keap_apply_tags_to_contacts",
  "arguments": {
    "contact_ids": [123, 456, 789],
    "tag_ids": [10, 20]
  }
}
```

### Send Email

```typescript
{
  "tool": "keap_send_email",
  "arguments": {
    "contact_ids": [12345],
    "subject": "Welcome to our service!",
    "html_content": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
    "text_content": "Welcome! Thank you for joining us."
  }
}
```

### Create a Product

```typescript
{
  "tool": "keap_create_product",
  "arguments": {
    "product_name": "Premium Subscription",
    "product_price": 99.99,
    "product_desc": "Monthly premium access",
    "sku": "PREM-001",
    "status": 1
  }
}
```

### Create an Order

```typescript
{
  "tool": "keap_create_order",
  "arguments": {
    "contact_id": 12345,
    "order_items": [
      {
        "product_id": 456,
        "quantity": 2,
        "price": 99.99
      }
    ],
    "order_title": "Q1 Subscription"
  }
}
```

## Tool Reference

### Contact Tools (19 tools)

- `keap_create_contact` - Create new contact
- `keap_get_contact` - Get contact by ID
- `keap_update_contact` - Update contact details
- `keap_delete_contact` - Delete contact
- `keap_list_contacts` - List all contacts (paginated)
- `keap_search_contacts` - Search contacts by criteria
- `keap_get_contact_emails` - Get contact's email addresses
- `keap_create_contact_email` - Add email to contact
- `keap_update_contact_email` - Update email address
- `keap_delete_contact_email` - Remove email address
- `keap_apply_tags_to_contact` - Tag a single contact
- `keap_remove_tags_from_contact` - Remove tags from contact
- `keap_get_contact_tags` - List contact's tags
- `keap_merge_contacts` - Merge duplicate contacts
- `keap_apply_tags_to_contacts` - Bulk tag multiple contacts
- `keap_remove_tags_from_contacts` - Bulk remove tags
- `keap_get_contact_opt_status` - Check email opt-in status
- `keap_opt_in_contact` - Opt in contact for emails
- `keap_opt_out_contact` - Opt out contact from emails

### Company Tools (5 tools)

- `keap_create_company` - Create new company
- `keap_get_company` - Get company by ID
- `keap_update_company` - Update company details
- `keap_list_companies` - List all companies (paginated)
- `keap_search_companies` - Search companies by criteria

### Opportunity Tools (9 tools)

- `keap_create_opportunity` - Create new opportunity
- `keap_get_opportunity` - Get opportunity by ID
- `keap_update_opportunity` - Update opportunity details
- `keap_list_opportunities` - List opportunities (paginated)
- `keap_search_opportunities` - Search opportunities by criteria
- `keap_move_opportunity_stage` - Move opportunity to new stage
- `keap_get_opportunity_pipeline` - Get pipeline stages
- `keap_bulk_update_opportunities` - Update multiple opportunities
- `keap_get_opportunity_stage_details` - Get stage information

### Task Tools (8 tools)

- `keap_create_task` - Create new task
- `keap_get_task` - Get task by ID
- `keap_update_task` - Update task details
- `keap_delete_task` - Delete task
- `keap_list_tasks` - List tasks (paginated)
- `keap_search_tasks` - Search tasks by criteria
- `keap_complete_task` - Mark task as complete
- `keap_bulk_update_tasks` - Update multiple tasks

### Appointment Tools (6 tools)

- `keap_create_appointment` - Create new appointment
- `keap_get_appointment` - Get appointment by ID
- `keap_update_appointment` - Update appointment details
- `keap_delete_appointment` - Delete appointment
- `keap_list_appointments` - List appointments (paginated)
- `keap_search_appointments` - Search appointments by criteria

### Campaign Tools (7 tools)

- `keap_create_campaign` - Create new campaign
- `keap_get_campaign` - Get campaign by ID
- `keap_list_campaigns` - List campaigns (paginated)
- `keap_add_contact_to_campaign` - Add contact to campaign sequence
- `keap_remove_contact_from_campaign` - Remove contact from campaign
- `keap_get_campaign_sequence` - Get campaign sequence details
- `keap_get_campaign_achievements` - Get campaign completion data

### Tag Tools (5 tools)

- `keap_create_tag` - Create new tag
- `keap_get_tag` - Get tag by ID
- `keap_list_tags` - List all tags
- `keap_create_tag_category` - Create tag category
- `keap_list_tag_categories` - List tag categories

### Note Tools (6 tools)

- `keap_create_note` - Create new note
- `keap_get_note` - Get note by ID
- `keap_update_note` - Update note content
- `keap_delete_note` - Delete note
- `keap_list_notes` - List notes (paginated)
- `keap_search_notes` - Search notes by criteria

### Email Tools (7 tools)

- `keap_send_email` - Send email to contacts
- `keap_create_email_template` - Create email template
- `keap_get_email_template` - Get template by ID
- `keap_list_email_templates` - List email templates
- `keap_send_template_email` - Send templated email
- `keap_get_email_stats` - Get email sending statistics
- `keap_check_email_deliverability` - Check email configuration

### File Tools (4 tools)

- `keap_upload_file` - Upload file to Keap
- `keap_get_file` - Download file by ID
- `keap_list_files` - List uploaded files
- `keap_delete_file` - Delete file

### E-commerce Tools (15 tools)

- `keap_create_product` - Create new product
- `keap_get_product` - Get product by ID
- `keap_update_product` - Update product details
- `keap_delete_product` - Delete product
- `keap_list_products` - List products (paginated)
- `keap_create_order` - Create new order
- `keap_get_order` - Get order by ID
- `keap_update_order` - Update order details
- `keap_list_orders` - List orders (paginated)
- `keap_create_subscription` - Create recurring subscription
- `keap_get_subscription` - Get subscription by ID
- `keap_cancel_subscription` - Cancel subscription
- `keap_create_payment` - Record payment
- `keap_refund_payment` - Process refund
- `keap_get_transaction_history` - Get payment history

### Automation Tools (6 tools)

- `keap_create_campaign_sequence` - Create automation sequence
- `keap_get_campaign_sequence` - Get sequence details
- `keap_update_campaign_sequence` - Update sequence
- `keap_create_campaign_goal` - Create campaign goal
- `keap_get_campaign_goals` - List campaign goals
- `keap_trigger_link_click` - Trigger link-based automation

### Settings Tools (5 tools)

- `keap_get_account_info` - Get account information
- `keap_list_users` - List account users
- `keap_get_user` - Get user details
- `keap_list_custom_fields` - List custom fields
- `keap_create_custom_field` - Create custom field

### Affiliate Tools (9 tools)

- `keap_create_affiliate` - Create affiliate account
- `keap_get_affiliate` - Get affiliate by ID
- `keap_list_affiliates` - List affiliates (paginated)
- `keap_update_affiliate` - Update affiliate details
- `keap_get_affiliate_commissions` - Get commission history
- `keap_create_affiliate_payout` - Create payout
- `keap_create_affiliate_clawback` - Reverse commission
- `keap_get_affiliate_summary` - Get performance summary
- `keap_search_affiliates` - Search affiliates by criteria

## Architecture

```
src/
├── server.ts              # MCP server setup
├── main.ts                # Entry point
├── clients/
│   └── keap.ts           # Keap API client (REST API, rate limiting, error handling)
├── tools/                 # Tool definitions (14 files)
│   ├── contacts-tools.ts
│   ├── companies-tools.ts
│   ├── opportunities-tools.ts
│   ├── tasks-tools.ts
│   ├── appointments-tools.ts
│   ├── campaigns-tools.ts
│   ├── tags-tools.ts
│   ├── notes-tools.ts
│   ├── emails-tools.ts
│   ├── files-tools.ts
│   ├── ecommerce-tools.ts
│   ├── automations-tools.ts
│   ├── settings-tools.ts
│   └── affiliates-tools.ts
├── types/
│   └── index.ts          # TypeScript interfaces
└── ui/
    └── react-app/        # MCP Apps (22 apps)
        ├── contact-dashboard/
        ├── contact-detail/
        ├── contact-grid/
        ├── contact-timeline/
        ├── company-dashboard/
        ├── company-detail/
        ├── company-grid/
        ├── deal-dashboard/
        ├── deal-detail/
        ├── pipeline-kanban/
        ├── pipeline-funnel/
        ├── task-manager/
        ├── appointment-calendar/
        ├── campaign-dashboard/
        ├── campaign-detail/
        ├── email-composer/
        ├── tag-manager/
        ├── automation-dashboard/
        ├── product-catalog/
        ├── order-dashboard/
        ├── order-detail/
        └── revenue-dashboard/
```

## API Coverage

- ✅ Contacts API (complete)
- ✅ Companies API (complete)
- ✅ Opportunities API (complete)
- ✅ Tasks API (complete)
- ✅ Appointments API (complete)
- ✅ Campaigns API (complete)
- ✅ Tags API (complete)
- ✅ Notes API (complete)
- ✅ Emails API (complete)
- ✅ Files API (complete)
- ✅ E-commerce API (complete - products, orders, subscriptions, payments)
- ✅ Automations API (campaign sequences, goals, triggers)
- ✅ Settings API (account info, users, custom fields)
- ✅ Affiliates API (complete)

## Rate Limiting

The Keap API enforces rate limits:

- **Burst limit**: 10 requests per second
- **Daily limit**: 10,000 requests per day (may vary by plan)

The MCP client automatically handles rate limiting with:
- Exponential backoff on 429 responses
- Request queuing
- Automatic retry logic

## Error Handling

All tools provide comprehensive error messages:

```json
{
  "isError": true,
  "content": [
    {
      "type": "text",
      "text": "Error: Contact not found (ID: 12345)"
    }
  ]
}
```

Common error scenarios:
- Invalid authentication (401)
- Rate limit exceeded (429)
- Resource not found (404)
- Validation errors (400)
- Server errors (500)

## Development

### Build from source

```bash
git clone https://github.com/BusyBee3333/mcpengine
cd mcpengine/servers/keap
npm install
npm run build
```

### Run in development mode

```bash
npm run dev
```

### Type checking

```bash
npx tsc --noEmit
```

### Build React apps

```bash
cd src/ui/react-app
npm install
npm run build
```

## Best Practices

### Contact Management

1. **Use tags effectively**: Organize contacts with meaningful tags for segmentation
2. **Custom fields**: Leverage custom fields for industry-specific data
3. **Merge duplicates**: Regularly use `keap_merge_contacts` to maintain data quality
4. **Opt-in compliance**: Always check opt status before sending marketing emails

### Sales Pipeline

1. **Consistent stage moves**: Use `keap_move_opportunity_stage` to track progression
2. **Revenue tracking**: Keep projected revenue updated for accurate forecasting
3. **Pipeline hygiene**: Regularly review and close stale opportunities

### Automation

1. **Campaign sequences**: Build automated follow-up sequences for lead nurturing
2. **Goal tracking**: Set clear goals to measure campaign effectiveness
3. **Link triggers**: Use link-based triggers for behavior-based automation

### E-commerce

1. **Product catalog**: Maintain accurate SKUs and pricing
2. **Order tracking**: Use order IDs consistently across systems
3. **Subscription management**: Monitor subscription status and renewal dates
4. **Payment reconciliation**: Regular transaction history reviews

## Keap Plans & Features

Different Keap plans provide varying API capabilities:

- **Lite**: Basic contact and email tools
- **Pro**: Full CRM, sales pipeline, and automation
- **Max**: E-commerce, advanced automations, affiliate management
- **Max Classic**: Legacy features, additional e-commerce capabilities

Ensure your plan supports the features you intend to use via the API.

## Troubleshooting

### Authentication Issues

```bash
# Verify your API key
curl -H "X-Keap-API-Key: YOUR_API_KEY" https://api.infusionsoft.com/crm/rest/v1/account/profile
```

### Rate Limiting

If you encounter frequent rate limits:
1. Reduce concurrent request volume
2. Implement longer delays between operations
3. Consider upgrading your Keap plan for higher limits

### Contact Not Found

Ensure contact IDs are valid:
```typescript
// First search for the contact
const result = await keap_search_contacts({
  email: "user@example.com"
});
// Then use the returned ID
```

## Migration from Infusionsoft XML-RPC

If migrating from the legacy XML-RPC API:

1. **Authentication**: Replace legacy keys with Personal Access Tokens
2. **Endpoints**: Update from XML-RPC to REST API patterns
3. **Data format**: Convert XML structures to JSON
4. **Field mappings**: Review custom field IDs (may have changed)

## License

MIT

## Support

For issues and feature requests, please visit:
https://github.com/BusyBee3333/mcpengine/issues

## Related

- [Keap API Documentation](https://developer.keap.com/docs/rest/)
- [Keap Developer Portal](https://keys.developer.keap.com/)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [MCPEngine Repository](https://github.com/BusyBee3333/mcpengine)

## Changelog

### Version 1.0.0

- Initial release
- 111 tools across 14 categories
- 22 React apps for visual interfaces
- Full Keap REST API coverage
- Rate limiting and error handling
- Comprehensive TypeScript types

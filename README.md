> **🚀 Don't want to self-host?** [Join the waitlist for our fully managed solution →](https://mcpengage.com/keap)
> 
> Zero setup. Zero maintenance. Just connect and automate.

---

# 🚀 Keap MCP Server — 2026 Complete Version

## 💡 What This Unlocks

**This MCP server gives AI direct access to your entire Keap workspace.** Instead of clicking through interfaces, you just *tell* it what you need — and Claude becomes your intelligent CRM & marketing automation assistant.

Keap (formerly Infusionsoft) is a powerful CRM and marketing automation platform built for small businesses. This MCP server lets Claude manage your contacts, opportunities, tasks, and tags with natural language — bridging sales and marketing seamlessly.

### 🎯 CRM & Marketing Automation Power Moves — Keap Edition

Real workflows you can automate with natural language:

1. **📧 Smart Contact Segmentation** — "Find all contacts added this month with 'webinar' tag, no recent tasks, and email addresses ending in @gmail.com — create personalized follow-up tasks for each"
   
2. **💼 Opportunity Pipeline Management** — "List all opportunities in 'Proposal' stage for >10 days, calculate total value, and create reminder tasks for sales team members"

3. **🏷️ Tag-Based Intelligence** — "Show me all contacts tagged 'hot-lead' but without an opportunity, create opportunities for those with email domains matching our target industries, and assign them round-robin"

4. **✅ Task Automation & Follow-up** — "Pull all incomplete tasks from last week, reassign overdue ones to managers, and create 'check-in' tasks for today"

5. **📊 Contact Enrichment & Cleanup** — "Find all contacts without a phone number or company name, flag them with 'needs-enrichment' tag, and generate a CSV for our data team to complete"

### 🔗 The Real Power: Combining Tools

AI can chain multiple Keap operations together intelligently:

- Query contacts → Filter by tags → Create opportunities → Assign tasks → Track completion
- Search contacts → Analyze custom fields → Segment by behavior → Tag strategically → Trigger campaigns
- List tasks → Identify patterns → Bulk update → Generate reports → Notify team

## 📦 What's Inside

**8 powerful API tools** covering core Keap CRM and automation operations:

- **Contact Management** — `list_contacts`, `get_contact`, `create_contact`, `update_contact`
- **Opportunity/Deal Pipeline** — `list_opportunities`
- **Task Management** — `list_tasks`, `create_task`
- **Tagging & Segmentation** — `list_tags`

All with proper error handling, OAuth2 authentication, and TypeScript types.

## 🚀 Quick Start

### Option 1: Claude Desktop (Local)

1. **Clone and build:**
   ```bash
   git clone https://github.com/BusyBee3333/Keap-MCP-2026-Complete.git
   cd keap-mcp-2026-complete
   npm install
   npm run build
   ```

2. **Get your Keap OAuth2 access token:**
   - Create an app in [Keap Developer Portal](https://developer.infusionsoft.com/)
   - Complete OAuth2 flow to get an access token
   - Or use a Personal Access Token (PAT) if available for your plan

3. **Configure Claude Desktop:**
   
   On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "keap": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/keap-mcp-2026-complete/dist/index.js"],
         "env": {
           "KEAP_ACCESS_TOKEN": "your-oauth2-access-token"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop** — Keap tools will appear in Claude's context

### Option 2: Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/keap-mcp)

1. Click the button above
2. Set `KEAP_ACCESS_TOKEN` in Railway dashboard
3. Use the Railway URL as your MCP server endpoint

### Option 3: Docker

```bash
docker build -t keap-mcp .
docker run -p 3000:3000 \
  -e KEAP_ACCESS_TOKEN=your-token \
  keap-mcp
```

## 🔐 Authentication

Keap uses **OAuth2 Bearer Token authentication**.

**How to get your access token:**

### Option A: OAuth2 Flow (Recommended)
1. Create a developer account at [Keap Developer Portal](https://developer.infusionsoft.com/)
2. Register a new application
3. Note your Client ID and Client Secret
4. Implement OAuth2 authorization code flow
5. Exchange authorization code for access token
6. Use the access token in your MCP server config

### Option B: Personal Access Token (PAT)
1. Log into Keap
2. Navigate to Settings → Application Settings (if available on your plan)
3. Generate a Personal Access Token
4. Copy the token and use it as `KEAP_ACCESS_TOKEN`

**Security:** Access tokens expire and need refresh. For production use, implement token refresh logic using your refresh token.

**Documentation:** 
- [Keap API Reference](https://developer.infusionsoft.com/docs/rest/)
- [OAuth2 Authentication Guide](https://developer.infusionsoft.com/docs/rest/#authentication)

The MCP server automatically includes your token in the `Authorization: Bearer` header.

## 🎯 Example Prompts

Once connected to Claude, use natural language to control Keap:

### Contact Management
- *"Show me all contacts created in the last 7 days"*
- *"Create a new contact: Mike Chen, mike@startup.io, phone +1-555-0199, company 'StartupCo'"*
- *"Update contact 12345 with job title 'VP of Sales' and add custom field 'Industry' = 'SaaS'"*
- *"List all contacts with email domain @enterprise.com and no recent activity"*
- *"Find contacts tagged 'newsletter-subscriber' and show their engagement history"*

### Opportunity Pipeline
- *"Show me all open opportunities assigned to user 5"*
- *"List opportunities in 'Negotiation' stage worth more than $20k"*
- *"Calculate total pipeline value by stage and user"*
- *"Find opportunities created >60 days ago still in 'Discovery' stage"*

### Task Management
- *"List all my incomplete tasks sorted by due date"*
- *"Create a task: 'Follow up with Acme Corp' for contact 789, due tomorrow, priority 4"*
- *"Show overdue tasks across the entire team"*
- *"Create follow-up tasks for all contacts who attended last week's webinar"*

### Tagging & Segmentation
- *"List all available tags in my Keap account"*
- *"Show me contacts with both 'hot-lead' and 'enterprise' tags"*
- *"Find all tags in the 'Lead Source' category"*
- *"Identify contacts with >3 tags who haven't been contacted in 30 days"*

### Advanced Workflows
- *"Find contacts without opportunities, filter for those with 'decision-maker' tag, create demo opportunities for each"*
- *"Pull all contacts from webinar tag, create personalized follow-up tasks, schedule for next 3 business days round-robin"*
- *"Generate a contact enrichment report: contacts missing phone, company, or job title fields"*

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Keap account with API access
- OAuth2 app registered in Keap Developer Portal

### Setup

```bash
git clone https://github.com/BusyBee3333/Keap-MCP-2026-Complete.git
cd keap-mcp-2026-complete
npm install
cp .env.example .env
# Edit .env and add your KEAP_ACCESS_TOKEN
npm run build
npm start
```

### Testing

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Project Structure

```
keap-mcp-2026-complete/
├── src/
│   └── index.ts          # Main server with 8 tool definitions
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
├── .env.example          # Template for environment variables
└── README.md             # This file
```

## 🐛 Troubleshooting

### "Authentication failed" / "Unauthorized"
- Verify your access token is valid and not expired
- OAuth2 tokens expire — you may need to refresh your token
- Check that your app has the necessary scopes/permissions
- PATs have different permissions than OAuth tokens

### "Tools not appearing in Claude"
- Restart Claude Desktop completely (Quit → Reopen)
- Verify the path in `claude_desktop_config.json` is absolute
- Confirm `dist/index.js` exists after `npm run build`
- Check Claude Desktop logs: `tail -f ~/Library/Logs/Claude/mcp*.log` (macOS)

### "Rate limit exceeded"
- Keap enforces rate limits (typically 1000 requests/day for some plans)
- Higher-tier plans have increased limits
- Add delays between bulk operations
- Check [Keap API limits](https://developer.infusionsoft.com/docs/rest/#rate-limiting)

### "Invalid contact_id / opportunity_id"
- Keap IDs are numeric integers
- Use `list_*` commands first to get valid IDs
- Contact IDs, Opportunity IDs, Task IDs, Tag IDs are all separate

### "Custom field not found"
- Custom fields use numeric IDs, not names
- Get custom field IDs from Keap Admin or via API
- Custom field values must match field type (text, dropdown, number, etc.)

### Token refresh required
- OAuth2 access tokens expire (typically after 24 hours)
- Implement refresh token logic in production
- See [Keap OAuth refresh docs](https://developer.infusionsoft.com/docs/rest/#token-refresh)

## 📖 Resources

- **[Keap API Documentation](https://developer.infusionsoft.com/docs/rest/)** — Official REST API reference
- **[Keap Developer Portal](https://developer.infusionsoft.com/)** — Register apps and manage OAuth
- **[Keap Help Center](https://help.keap.com/)** — CRM and automation best practices
- **[Keap Campaign Builder](https://help.keap.com/help/campaign-builder)** — Visual automation workflows
- **[MCP Protocol Specification](https://modelcontextprotocol.io/)** — Learn about MCP
- **[Claude Desktop Documentation](https://claude.ai/desktop)** — Setup and usage

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Add tests for new tools
4. Commit your changes (`git commit -m 'Add amazing tool'`)
5. Push to the branch (`git push origin feature/amazing-tool`)
6. Open a Pull Request

### Ideas for Contributions
- Implement OAuth2 token refresh logic
- Add email campaign management tools
- Create tag application/removal helpers
- Add company/organization management
- Build custom field mapping utilities
- Implement note and appointment management
- Add webhook integration for real-time triggers

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Credits

Built by [MCPEngage](https://mcpengage.com) — AI infrastructure for business software.

Want more MCP servers? Check out our [full catalog](https://mcpengage.com) covering 30+ business platforms including Close, Pipedrive, HubSpot, Salesforce, and more.

---

**Questions?** Open an issue or join our [Discord community](https://discord.gg/mcpengine).

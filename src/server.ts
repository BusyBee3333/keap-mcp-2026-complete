import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { KeapClient } from './clients/keap.js';

// Import all tool creators and handlers
import { createContactsTools, handleContactsTool } from './tools/contacts-tools.js';
import { createCompaniesTools, handleCompaniesTool } from './tools/companies-tools.js';
import { createOpportunitiesTools, handleOpportunitiesTool } from './tools/opportunities-tools.js';
import { createTasksTools, handleTasksTool } from './tools/tasks-tools.js';
import { createAppointmentsTools, handleAppointmentsTool } from './tools/appointments-tools.js';
import { createCampaignsTools, handleCampaignsTool } from './tools/campaigns-tools.js';
import { createTagsTools, handleTagsTool } from './tools/tags-tools.js';
import { createNotesTools, handleNotesTool } from './tools/notes-tools.js';
import { createEmailsTools, handleEmailsTool } from './tools/emails-tools.js';
import { createFilesTools, handleFilesTool } from './tools/files-tools.js';
import { createEcommerceTools, handleEcommerceTool } from './tools/ecommerce-tools.js';
import { createAutomationsTools, handleAutomationsTool } from './tools/automations-tools.js';
import { createSettingsTools, handleSettingsTool } from './tools/settings-tools.js';
import { createAffiliatesTools, handleAffiliatesTool } from './tools/affiliates-tools.js';

export class KeapServer {
  private server: Server;
  private client: KeapClient;
  private allTools: Tool[] = [];

  constructor() {
    this.server = new Server(
      {
        name: 'keap-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize Keap client
    this.client = new KeapClient();

    // Register all tools
    this.registerTools();

    // Set up request handlers
    this.setupHandlers();

    // Error handling
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private registerTools(): void {
    // Collect all tools from different domains
    this.allTools = [
      ...createContactsTools(this.client),
      ...createCompaniesTools(this.client),
      ...createOpportunitiesTools(this.client),
      ...createTasksTools(this.client),
      ...createAppointmentsTools(this.client),
      ...createCampaignsTools(this.client),
      ...createTagsTools(this.client),
      ...createNotesTools(this.client),
      ...createEmailsTools(this.client),
      ...createFilesTools(this.client),
      ...createEcommerceTools(this.client),
      ...createAutomationsTools(this.client),
      ...createSettingsTools(this.client),
      ...createAffiliatesTools(this.client),
    ];

    console.error(`[Keap MCP] Registered ${this.allTools.length} tools`);
  }

  private setupHandlers(): void {
    // Handle list_tools request
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.allTools,
    }));

    // Handle call_tool request
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Route to appropriate handler based on tool name prefix
        if (name.startsWith('keap_create_contact') || 
            name.startsWith('keap_get_contact') || 
            name.startsWith('keap_update_contact') || 
            name.startsWith('keap_delete_contact') || 
            name.startsWith('keap_list_contact') || 
            name.startsWith('keap_search_contact') || 
            name.startsWith('keap_merge_contact') || 
            name.startsWith('keap_apply_tag') || 
            name.startsWith('keap_remove_tag')) {
          return await handleContactsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_compan')) {
          return await handleCompaniesTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_opportunit')) {
          return await handleOpportunitiesTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_task')) {
          return await handleTasksTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_appointment')) {
          return await handleAppointmentsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_campaign')) {
          return await handleCampaignsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_tag')) {
          return await handleTagsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_note')) {
          return await handleNotesTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_email')) {
          return await handleEmailsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && name.includes('_file')) {
          return await handleFilesTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && (name.includes('_product') || 
            name.includes('_order') || 
            name.includes('_transaction') || 
            name.includes('_subscription'))) {
          return await handleEcommerceTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && (name.includes('_hook') || name.includes('_automation'))) {
          return await handleAutomationsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && (name.includes('_account') || 
            name.includes('_application') || 
            name.includes('_user') || 
            name.includes('_custom_field'))) {
          return await handleSettingsTool(name, args, this.client);
        }

        if (name.startsWith('keap_') && (name.includes('_affiliate') || name.includes('_commission'))) {
          return await handleAffiliatesTool(name, args, this.client);
        }

        throw new Error(`Unknown tool: ${name}`);
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('[Keap MCP] Server running on stdio');
  }
}

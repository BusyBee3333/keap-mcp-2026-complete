#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============================================
// CONFIGURATION
// ============================================
const MCP_NAME = "keap";
const MCP_VERSION = "1.0.0";
const API_BASE_URL = "https://api.infusionsoft.com/crm/rest/v1";

// ============================================
// API CLIENT - Keap uses OAuth2 Bearer token
// ============================================
class KeapClient {
  private accessToken: string;
  private baseUrl: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.baseUrl = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Keap API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    if (response.status === 204) {
      return { success: true };
    }

    return response.json();
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

// ============================================
// TOOL DEFINITIONS
// ============================================
const tools = [
  {
    name: "list_contacts",
    description: "List contacts with optional filtering and pagination",
    inputSchema: {
      type: "object" as const,
      properties: {
        limit: { type: "number", description: "Max results to return (default 50, max 1000)" },
        offset: { type: "number", description: "Pagination offset" },
        email: { type: "string", description: "Filter by email address" },
        given_name: { type: "string", description: "Filter by first name" },
        family_name: { type: "string", description: "Filter by last name" },
        order: { type: "string", description: "Field to order by (e.g., 'email', 'date_created')" },
        order_direction: { type: "string", enum: ["ASCENDING", "DESCENDING"], description: "Sort direction" },
        since: { type: "string", description: "Return contacts modified since this date (ISO 8601)" },
        until: { type: "string", description: "Return contacts modified before this date (ISO 8601)" },
      },
    },
  },
  {
    name: "get_contact",
    description: "Get a specific contact by ID with full details",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: { type: "number", description: "Contact ID" },
        optional_properties: {
          type: "array",
          items: { type: "string" },
          description: "Additional fields to include: custom_fields, fax_numbers, invoices, etc.",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "create_contact",
    description: "Create a new contact in Keap",
    inputSchema: {
      type: "object" as const,
      properties: {
        email_addresses: {
          type: "array",
          items: {
            type: "object",
            properties: {
              email: { type: "string" },
              field: { type: "string", enum: ["EMAIL1", "EMAIL2", "EMAIL3"] },
            },
          },
          description: "Email addresses for the contact",
        },
        given_name: { type: "string", description: "First name" },
        family_name: { type: "string", description: "Last name" },
        phone_numbers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              number: { type: "string" },
              field: { type: "string", enum: ["PHONE1", "PHONE2", "PHONE3", "PHONE4", "PHONE5"] },
            },
          },
          description: "Phone numbers",
        },
        addresses: {
          type: "array",
          items: {
            type: "object",
            properties: {
              line1: { type: "string" },
              line2: { type: "string" },
              locality: { type: "string", description: "City" },
              region: { type: "string", description: "State/Province" },
              postal_code: { type: "string" },
              country_code: { type: "string" },
              field: { type: "string", enum: ["BILLING", "SHIPPING", "OTHER"] },
            },
          },
          description: "Addresses",
        },
        company: {
          type: "object",
          properties: {
            company_name: { type: "string" },
          },
          description: "Company information",
        },
        job_title: { type: "string", description: "Job title" },
        lead_source_id: { type: "number", description: "Lead source ID" },
        opt_in_reason: { type: "string", description: "Reason for opting in to marketing" },
        source_type: { type: "string", enum: ["WEBFORM", "LANDINGPAGE", "IMPORT", "MANUAL", "API", "OTHER"], description: "Source type" },
        custom_fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              content: { type: "string" },
            },
          },
          description: "Custom field values",
        },
      },
    },
  },
  {
    name: "update_contact",
    description: "Update an existing contact",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: { type: "number", description: "Contact ID" },
        email_addresses: { type: "array", items: { type: "object" }, description: "Updated email addresses" },
        given_name: { type: "string", description: "First name" },
        family_name: { type: "string", description: "Last name" },
        phone_numbers: { type: "array", items: { type: "object" }, description: "Phone numbers" },
        addresses: { type: "array", items: { type: "object" }, description: "Addresses" },
        company: { type: "object", description: "Company information" },
        job_title: { type: "string", description: "Job title" },
        custom_fields: { type: "array", items: { type: "object" }, description: "Custom field values" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_opportunities",
    description: "List sales opportunities/deals",
    inputSchema: {
      type: "object" as const,
      properties: {
        limit: { type: "number", description: "Max results (default 50, max 1000)" },
        offset: { type: "number", description: "Pagination offset" },
        user_id: { type: "number", description: "Filter by assigned user ID" },
        stage_id: { type: "number", description: "Filter by pipeline stage ID" },
        search_term: { type: "string", description: "Search opportunities by title" },
        order: { type: "string", description: "Field to order by" },
      },
    },
  },
  {
    name: "list_tasks",
    description: "List tasks with optional filtering",
    inputSchema: {
      type: "object" as const,
      properties: {
        limit: { type: "number", description: "Max results (default 50, max 1000)" },
        offset: { type: "number", description: "Pagination offset" },
        contact_id: { type: "number", description: "Filter by contact ID" },
        user_id: { type: "number", description: "Filter by assigned user ID" },
        completed: { type: "boolean", description: "Filter by completion status" },
        since: { type: "string", description: "Tasks created/updated since (ISO 8601)" },
        until: { type: "string", description: "Tasks created/updated before (ISO 8601)" },
        order: { type: "string", description: "Field to order by" },
      },
    },
  },
  {
    name: "create_task",
    description: "Create a new task",
    inputSchema: {
      type: "object" as const,
      properties: {
        title: { type: "string", description: "Task title (required)" },
        description: { type: "string", description: "Task description" },
        contact: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          description: "Contact to associate the task with",
        },
        due_date: { type: "string", description: "Due date in ISO 8601 format" },
        priority: { type: "number", description: "Priority (1-5, 5 being highest)" },
        type: { type: "string", description: "Task type (e.g., 'Call', 'Email', 'Appointment', 'Other')" },
        user_id: { type: "number", description: "User ID to assign the task to" },
        remind_time: { type: "number", description: "Reminder time in minutes before due date" },
      },
      required: ["title"],
    },
  },
  {
    name: "list_tags",
    description: "List all tags available in the account",
    inputSchema: {
      type: "object" as const,
      properties: {
        limit: { type: "number", description: "Max results (default 50, max 1000)" },
        offset: { type: "number", description: "Pagination offset" },
        category: { type: "number", description: "Filter by tag category ID" },
        name: { type: "string", description: "Filter by tag name (partial match)" },
      },
    },
  },
];

// ============================================
// TOOL HANDLERS
// ============================================
async function handleTool(client: KeapClient, name: string, args: any) {
  switch (name) {
    case "list_contacts": {
      const params = new URLSearchParams();
      if (args.limit) params.append("limit", args.limit.toString());
      if (args.offset) params.append("offset", args.offset.toString());
      if (args.email) params.append("email", args.email);
      if (args.given_name) params.append("given_name", args.given_name);
      if (args.family_name) params.append("family_name", args.family_name);
      if (args.order) params.append("order", args.order);
      if (args.order_direction) params.append("order_direction", args.order_direction);
      if (args.since) params.append("since", args.since);
      if (args.until) params.append("until", args.until);
      const query = params.toString();
      return await client.get(`/contacts${query ? `?${query}` : ""}`);
    }

    case "get_contact": {
      const { id, optional_properties } = args;
      let endpoint = `/contacts/${id}`;
      if (optional_properties && optional_properties.length > 0) {
        endpoint += `?optional_properties=${optional_properties.join(",")}`;
      }
      return await client.get(endpoint);
    }

    case "create_contact": {
      const payload: any = {};
      if (args.email_addresses) payload.email_addresses = args.email_addresses;
      if (args.given_name) payload.given_name = args.given_name;
      if (args.family_name) payload.family_name = args.family_name;
      if (args.phone_numbers) payload.phone_numbers = args.phone_numbers;
      if (args.addresses) payload.addresses = args.addresses;
      if (args.company) payload.company = args.company;
      if (args.job_title) payload.job_title = args.job_title;
      if (args.lead_source_id) payload.lead_source_id = args.lead_source_id;
      if (args.opt_in_reason) payload.opt_in_reason = args.opt_in_reason;
      if (args.source_type) payload.source_type = args.source_type;
      if (args.custom_fields) payload.custom_fields = args.custom_fields;
      return await client.post("/contacts", payload);
    }

    case "update_contact": {
      const { id, ...updates } = args;
      return await client.patch(`/contacts/${id}`, updates);
    }

    case "list_opportunities": {
      const params = new URLSearchParams();
      if (args.limit) params.append("limit", args.limit.toString());
      if (args.offset) params.append("offset", args.offset.toString());
      if (args.user_id) params.append("user_id", args.user_id.toString());
      if (args.stage_id) params.append("stage_id", args.stage_id.toString());
      if (args.search_term) params.append("search_term", args.search_term);
      if (args.order) params.append("order", args.order);
      const query = params.toString();
      return await client.get(`/opportunities${query ? `?${query}` : ""}`);
    }

    case "list_tasks": {
      const params = new URLSearchParams();
      if (args.limit) params.append("limit", args.limit.toString());
      if (args.offset) params.append("offset", args.offset.toString());
      if (args.contact_id) params.append("contact_id", args.contact_id.toString());
      if (args.user_id) params.append("user_id", args.user_id.toString());
      if (args.completed !== undefined) params.append("completed", args.completed.toString());
      if (args.since) params.append("since", args.since);
      if (args.until) params.append("until", args.until);
      if (args.order) params.append("order", args.order);
      const query = params.toString();
      return await client.get(`/tasks${query ? `?${query}` : ""}`);
    }

    case "create_task": {
      const payload: any = {
        title: args.title,
      };
      if (args.description) payload.description = args.description;
      if (args.contact) payload.contact = args.contact;
      if (args.due_date) payload.due_date = args.due_date;
      if (args.priority) payload.priority = args.priority;
      if (args.type) payload.type = args.type;
      if (args.user_id) payload.user_id = args.user_id;
      if (args.remind_time) payload.remind_time = args.remind_time;
      return await client.post("/tasks", payload);
    }

    case "list_tags": {
      const params = new URLSearchParams();
      if (args.limit) params.append("limit", args.limit.toString());
      if (args.offset) params.append("offset", args.offset.toString());
      if (args.category) params.append("category", args.category.toString());
      if (args.name) params.append("name", args.name);
      const query = params.toString();
      return await client.get(`/tags${query ? `?${query}` : ""}`);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================
// SERVER SETUP
// ============================================
async function main() {
  const accessToken = process.env.KEAP_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error("Error: KEAP_ACCESS_TOKEN environment variable required");
    console.error("Get your access token from the Keap Developer Portal after OAuth2 authorization");
    process.exit(1);
  }

  const client = new KeapClient(accessToken);

  const server = new Server(
    { name: `${MCP_NAME}-mcp`, version: MCP_VERSION },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      const result = await handleTool(client, name, args || {});
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${MCP_NAME} MCP server running on stdio`);
}

main().catch(console.error);

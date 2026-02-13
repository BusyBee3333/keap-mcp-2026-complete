#!/usr/bin/env node
import { config } from 'dotenv';
import { KeapServer } from './server.js';

// Load environment variables
config();

// Create and run the server
const server = new KeapServer();
server.run().catch(console.error);

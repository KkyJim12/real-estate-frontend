import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists (for local development)
const ensureDataDir = () => {
  if (!isProduction && !fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Generic database operations
export const db = {
  // Get all items from a collection
  async getAll<T>(collection: string): Promise<T[]> {
    if (isProduction) {
      try {
        const data = await kv.get<T[]>(collection);
        return data || [];
      } catch (error) {
        console.error(`KV get error for ${collection}:`, error);
        return [];
      }
    } else {
      ensureDataDir();
      const filePath = path.join(dataDir, `${collection}.json`);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
      }
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data || '[]');
    }
  },

  // Set all items in a collection
  async setAll<T>(collection: string, data: T[]): Promise<void> {
    if (isProduction) {
      try {
        await kv.set(collection, data);
      } catch (error) {
        console.error(`KV set error for ${collection}:`, error);
        throw error;
      }
    } else {
      ensureDataDir();
      const filePath = path.join(dataDir, `${collection}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  },

  // Get a single item by ID
  async getById<T extends { id: string }>(collection: string, id: string): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    return items.find((item) => item.id === id) || null;
  },

  // Create a new item
  async create<T extends { id: string }>(collection: string, item: T): Promise<T> {
    const items = await this.getAll<T>(collection);
    items.push(item);
    await this.setAll(collection, items);
    return item;
  },

  // Update an item by ID
  async update<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    const index = items.findIndex((item) => item.id === id);
    
    if (index === -1) {
      return null;
    }
    
    items[index] = { ...items[index], ...updates };
    await this.setAll(collection, items);
    return items[index];
  },

  // Delete an item by ID
  async delete<T extends { id: string }>(collection: string, id: string): Promise<boolean> {
    const items = await this.getAll<T>(collection);
    const filtered = items.filter((item) => item.id !== id);
    
    if (filtered.length === items.length) {
      return false; // Item not found
    }
    
    await this.setAll(collection, filtered);
    return true;
  },
};

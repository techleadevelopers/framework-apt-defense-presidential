import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const threats = pgTable("threats", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // "critical", "high", "medium", "low"
  mitreId: text("mitre_id"),
  sourceIp: text("source_ip"),
  targetHost: text("target_host"),
  confidence: integer("confidence").notNull(), // percentage 0-100
  status: text("status").notNull(), // "active", "monitoring", "blocked", "dismissed"
  detectedAt: timestamp("detected_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const networkDevices = pgTable("network_devices", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address").notNull(),
  hostname: text("hostname"),
  deviceType: text("device_type"),
  operatingSystem: text("operating_system"),
  services: jsonb("services"), // array of discovered services
  vulnerabilities: jsonb("vulnerabilities"), // array of vulnerabilities
  lastScanned: timestamp("last_scanned").defaultNow(),
  status: text("status").notNull(), // "online", "offline", "unknown"
});

export const securityEvents = pgTable("security_events", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(),
  source: text("source").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
});

export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "tacticore", "mission_ops", "detection"
  status: text("status").notNull(), // "active", "training", "offline"
  accuracy: integer("accuracy"), // percentage 0-100
  lastUpdated: timestamp("last_updated").defaultNow(),
  predictions: integer("predictions").default(0),
  responseTime: integer("response_time"), // milliseconds
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertThreatSchema = createInsertSchema(threats).omit({
  id: true,
  detectedAt: true,
});

export const insertNetworkDeviceSchema = createInsertSchema(networkDevices).omit({
  id: true,
  lastScanned: true,
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).omit({
  id: true,
  timestamp: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type Threat = typeof threats.$inferSelect;
export type InsertNetworkDevice = z.infer<typeof insertNetworkDeviceSchema>;
export type NetworkDevice = typeof networkDevices.$inferSelect;
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;
export type SecurityEvent = typeof securityEvents.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;
export type AiModel = typeof aiModels.$inferSelect;

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

// Learning Management System Tables
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // "beginner", "intermediate", "advanced"
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  instructor: text("instructor").notNull(),
  price: integer("price").default(0),
  rating: integer("rating").default(0), // 0-500 (5.0 stars * 100)
  totalModules: integer("total_modules").notNull(),
  prerequisites: jsonb("prerequisites"), // array of strings
  learningObjectives: jsonb("learning_objectives"), // array of strings
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courseModules = pgTable("course_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(), // structured content
  duration: text("duration").notNull(),
  orderIndex: integer("order_index").notNull(),
  exercises: jsonb("exercises"), // array of exercises
  resources: jsonb("resources"), // additional resources
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentProgress = pgTable("student_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  moduleId: integer("module_id"),
  progress: integer("progress").default(0), // percentage 0-100
  isCompleted: boolean("is_completed").default(false),
  timeSpent: integer("time_spent").default(0), // minutes
  lastAccessed: timestamp("last_accessed").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  level: text("level").notNull(),
  requiredCourses: jsonb("required_courses"), // array of course IDs
  duration: text("duration").notNull(),
  badgeUrl: text("badge_url"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentCertifications = pgTable("student_certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  certificationId: integer("certification_id").notNull(),
  progress: integer("progress").default(0), // percentage 0-100
  isEarned: boolean("is_earned").default(false),
  earnedAt: timestamp("earned_at"),
  expiresAt: timestamp("expires_at"),
  certificateUrl: text("certificate_url"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  points: integer("points").notNull(),
  rarity: text("rarity").notNull(), // "common", "rare", "epic", "legendary"
  category: text("category"),
  requirements: jsonb("requirements"), // achievement criteria
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentAchievements = pgTable("student_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  isEarned: boolean("is_earned").default(false),
  earnedAt: timestamp("earned_at"),
  progress: integer("progress").default(0), // percentage 0-100
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

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseModuleSchema = createInsertSchema(courseModules).omit({
  id: true,
  createdAt: true,
});

export const insertStudentProgressSchema = createInsertSchema(studentProgress).omit({
  id: true,
  lastAccessed: true,
  completedAt: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true,
});

export const insertStudentCertificationSchema = createInsertSchema(studentCertifications).omit({
  id: true,
  earnedAt: true,
  expiresAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertStudentAchievementSchema = createInsertSchema(studentAchievements).omit({
  id: true,
  earnedAt: true,
});

// Type exports
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

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertCourseModule = z.infer<typeof insertCourseModuleSchema>;
export type CourseModule = typeof courseModules.$inferSelect;

export type InsertStudentProgress = z.infer<typeof insertStudentProgressSchema>;
export type StudentProgress = typeof studentProgress.$inferSelect;

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;

export type InsertStudentCertification = z.infer<typeof insertStudentCertificationSchema>;
export type StudentCertification = typeof studentCertifications.$inferSelect;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export type InsertStudentAchievement = z.infer<typeof insertStudentAchievementSchema>;
export type StudentAchievement = typeof studentAchievements.$inferSelect;

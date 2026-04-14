import { pgTable, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { roleTypeEnum, householdMemberRoleEnum } from './enums'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  preferredLanguage: text('preferred_language').default('es'),
  preferredCurrency: text('preferred_currency').default('USD'),
  timezone: text('timezone').default('America/Panama'),
  isActive: boolean('is_active').notNull().default(true),
  notificationPreferences: jsonb('notification_preferences').default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userRoles = pgTable('user_roles', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: roleTypeEnum('role').notNull(),
  contextType: text('context_type'),
  contextId: text('context_id'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const households = pgTable('households', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  ownerUserId: text('owner_user_id').notNull().references(() => users.id),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const householdMembers = pgTable('household_members', {
  id: text('id').primaryKey(),
  householdId: text('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  memberRole: householdMemberRoleEnum('member_role').notNull().default('MEMBER'),
  permissions: jsonb('permissions').notNull().default({}),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  householdMemberships: many(householdMembers),
}))

export const householdsRelations = relations(households, ({ one, many }) => ({
  owner: one(users, { fields: [households.ownerUserId], references: [users.id] }),
  members: many(householdMembers),
}))

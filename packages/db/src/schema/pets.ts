import { pgTable, text, boolean, timestamp, numeric, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import {
  petSexEnum, petSizeEnum, reproductiveStatusEnum,
  vitalStatusEnum, ownershipRoleEnum, petDocumentTypeEnum,
  healthConditionTypeEnum
} from './enums'
import { households, users } from './users'

export const speciesCatalog = pgTable('species_catalog', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const breedCatalog = pgTable('breed_catalog', {
  id: text('id').primaryKey(),
  speciesId: text('species_id').notNull().references(() => speciesCatalog.id),
  name: text('name').notNull(),
  code: text('code'),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const pets = pgTable('pets', {
  id: text('id').primaryKey(),
  householdId: text('household_id').notNull().references(() => households.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  speciesId: text('species_id').notNull().references(() => speciesCatalog.id),
  breedId: text('breed_id').references(() => breedCatalog.id),
  sex: petSexEnum('sex').notNull().default('UNKNOWN'),
  birthDate: timestamp('birth_date'),
  approximateAgeMonths: integer('approximate_age_months'),
  primaryColor: text('primary_color'),
  secondaryColor: text('secondary_color'),
  size: petSizeEnum('size'),
  currentWeightKg: numeric('current_weight_kg', { precision: 6, scale: 2 }),
  microchipId: text('microchip_id').unique(),
  tattooId: text('tattoo_id'),
  qrCollarId: text('qr_collar_id'),
  reproductiveStatus: reproductiveStatusEnum('reproductive_status'),
  vitalStatus: vitalStatusEnum('vital_status').notNull().default('ALIVE'),
  deathDate: timestamp('death_date'),
  primaryPhotoUrl: text('primary_photo_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const petOwnership = pgTable('pet_ownership', {
  id: text('id').primaryKey(),
  petId: text('pet_id').notNull().references(() => pets.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: ownershipRoleEnum('role').notNull().default('OWNER'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const petDocuments = pgTable('pet_documents', {
  id: text('id').primaryKey(),
  petId: text('pet_id').notNull().references(() => pets.id, { onDelete: 'cascade' }),
  documentType: petDocumentTypeEnum('document_type').notNull(),
  title: text('title'),
  fileUrl: text('file_url').notNull(),
  mimeType: text('mime_type'),
  uploadedByUserId: text('uploaded_by_user_id').references(() => users.id),
  isArchived: boolean('is_archived').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const petHealthConditions = pgTable('pet_health_conditions', {
  id: text('id').primaryKey(),
  petId: text('pet_id').notNull().references(() => pets.id, { onDelete: 'cascade' }),
  conditionType: healthConditionTypeEnum('condition_type').notNull(),
  name: text('name').notNull(),
  severity: text('severity'),
  notes: text('notes'),
  diagnosedAt: timestamp('diagnosed_at'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const petsRelations = relations(pets, ({ one, many }) => ({
  household: one(households, { fields: [pets.householdId], references: [households.id] }),
  species: one(speciesCatalog, { fields: [pets.speciesId], references: [speciesCatalog.id] }),
  breed: one(breedCatalog, { fields: [pets.breedId], references: [breedCatalog.id] }),
  ownership: many(petOwnership),
  documents: many(petDocuments),
  healthConditions: many(petHealthConditions),
}))

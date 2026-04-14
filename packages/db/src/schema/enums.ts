import { pgEnum } from 'drizzle-orm/pg-core'

export const roleTypeEnum = pgEnum('role_type', [
  'PET_OWNER', 'CLINIC_OWNER', 'STORE_OWNER', 'WALKER', 'ADMIN'
])

export const providerTypeEnum = pgEnum('provider_type', [
  'CLINIC', 'STORE', 'WALKER', 'GROOMING', 'DAYCARE', 'BOARDING', 'OTHER'
])

export const providerStatusEnum = pgEnum('provider_status', [
  'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED', 'INACTIVE'
])

export const approvalStatusEnum = pgEnum('approval_status', [
  'PENDING', 'APPROVED', 'REJECTED', 'REQUIRES_INFO'
])

export const petSexEnum = pgEnum('pet_sex', ['MALE', 'FEMALE', 'UNKNOWN'])

export const petSizeEnum = pgEnum('pet_size', [
  'TOY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT'
])

export const reproductiveStatusEnum = pgEnum('reproductive_status', [
  'INTACT', 'STERILIZED', 'CASTRATED'
])

export const vitalStatusEnum = pgEnum('vital_status', ['ALIVE', 'DECEASED'])

export const ownershipRoleEnum = pgEnum('ownership_role', [
  'OWNER', 'CO_OWNER', 'EMERGENCY_CONTACT'
])

export const householdMemberRoleEnum = pgEnum('household_member_role', [
  'ADMIN', 'MEMBER', 'VIEWER'
])

export const bookingStatusEnum = pgEnum('booking_status', [
  'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED'
])

export const appointmentStatusEnum = pgEnum('appointment_status', [
  'REQUESTED', 'CONFIRMED', 'COMPLETED',
  'CANCELED_BY_USER', 'CANCELED_BY_CLINIC', 'NO_SHOW'
])

export const orderStatusEnum = pgEnum('order_status', [
  'CREATED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELED'
])

export const paymentStatusEnum = pgEnum('payment_status', [
  'PENDING', 'PAID', 'FAILED', 'REFUNDED'
])

export const supportCaseStatusEnum = pgEnum('support_case_status', [
  'OPEN', 'IN_REVIEW', 'WAITING_USER', 'RESOLVED', 'CLOSED'
])

export const activityTypeEnum = pgEnum('activity_type', [
  'WALK', 'PLAY', 'TRAINING', 'DAYCARE', 'OTHER'
])

export const activityOriginEnum = pgEnum('activity_origin', [
  'OWNER', 'WALKER', 'CLINIC', 'IOT_DEVICE', 'OTHER'
])

export const clinicalEventTypeEnum = pgEnum('clinical_event_type', [
  'DIAGNOSIS', 'TREATMENT', 'VACCINE', 'PROCEDURE', 'OTHER'
])

export const clinicServiceTypeEnum = pgEnum('clinic_service_type', [
  'GENERAL_CONSULTATION', 'VACCINATION', 'SURGERY', 'EMERGENCY', 'OTHER'
])

export const petDocumentTypeEnum = pgEnum('pet_document_type', [
  'VACCINATION_CARD', 'HEALTH_CERTIFICATE', 'LAB_RESULT',
  'INSURANCE_POLICY', 'OTHER'
])

export const healthConditionTypeEnum = pgEnum('health_condition_type', [
  'ALLERGY', 'CHRONIC_DISEASE', 'PREVIOUS_SURGERY', 'OTHER'
])

export const billingTypeEnum = pgEnum('billing_type', [
  'SUBSCRIPTION', 'TRANSACTION_FEE', 'MIXED'
])

export const notificationChannelEnum = pgEnum('notification_channel', [
  'PUSH', 'EMAIL', 'SMS'
])

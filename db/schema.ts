import { pgTable, serial, text, timestamp, integer, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  password: text('password'),
  phoneNumber: text('phone_number').unique(),
  role: text('role', { enum: ['USER', 'ADMIN', 'SHIPPING_AGENT'] }),
});

export const shipments = pgTable('shipments', {
  id: serial('id').primaryKey(),
  description: text('description'),
  weight: integer('weight'),
  origin: text('origin'),
  destination: text('destination'),
  price: integer('price'),
  senderId: integer('sender_id').references(() => customers.id),
  receiverId: integer('receiver_id').references(() => customers.id),
  type: text('type', { enum: ['FREIGHT', 'EXPRESS'] }),
  status: text('status', { enum: ['PENDING', 'IN_TRANSIT', 'ARRIVED', 'DELIVERED', 'CANCELLED'] }),
  trackingNumber: varchar('tracking_number', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow(),
  estimatedValue: integer('estimated_value'),
  userId: integer('user_id').references(() => users.id),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  email: text('email').unique(),
  phoneNumber: text('phone_number').unique(),
  address: text('address'),
  city: text('city'),
  type: text('type', { enum: ['SENDER', 'RECEIVER'] }),
});

// Add other tables as needed
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { seedServices } from '../data/seedServices.js';

dotenv.config();

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'vednetra',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
});

// Fallback in-memory storage if local PostgreSQL service is not yet initialized by user
export const memoryStore = {
  services: [...seedServices.map((s, idx) => ({ id: idx + 1, ...s }))],
  bookings: [],
  consultations: [],
  inquiries: [],
  users: [
    {
      id: 1,
      role: 'admin',
      email: 'shiwansh8888@gmail.com',
      name: 'व्यवस्थापक (Admin)',
      phone: '9876543210',
      password_hash: '$2b$10$UAWuybDsM.rOmvwhokhgp.yntTz6tBoKBTXLFFbAMakVug5cg7LcW',
      otp_code: null,
      otp_expires_at: null,
      reset_token: null,
      reset_token_expires_at: null,
      created_at: new Date()
    },
    {
      id: 2,
      role: 'panditji',
      email: 'panditrakeshrawal26@gmail.com',
      name: 'पं. राकेश चन्द्र रावल',
      phone: '9827514489',
      password_hash: '$2b$10$9qiaxYgxpx4jUxSR9eyjc.Lq1lEhwr8.3U73wKn1iPC8m16V3wiMS',
      otp_code: null,
      otp_expires_at: null,
      reset_token: null,
      reset_token_expires_at: null,
      created_at: new Date()
    }
  ]
};

export let isPostgresConnected = false;

export async function testConnectionAndInit() {
  try {
    const client = await pool.connect();
    isPostgresConnected = true;
    console.log('✓ Successfully connected to PostgreSQL database:', process.env.PGDATABASE || 'vednetra');
    
    // Create tables if not exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_en VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        description_en TEXT NOT NULL,
        modes JSONB NOT NULL,
        duration VARCHAR(100),
        significance TEXT,
        samagri_included BOOLEAN DEFAULT true,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        devotee_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        service_id INT,
        service_title VARCHAR(255) NOT NULL,
        ritual_mode VARCHAR(50) NOT NULL,
        preferred_date DATE NOT NULL,
        second_date DATE,
        third_date DATE,
        preferred_time VARCHAR(50),
        gotra VARCHAR(100),
        nakshatra VARCHAR(100),
        rashi VARCHAR(100),
        venue_address TEXT,
        city VARCHAR(100),
        special_sankalp TEXT,
        terms_accepted BOOLEAN DEFAULT true,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS second_date DATE;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS third_date DATE;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT true;

      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        devotee_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        dob DATE NOT NULL,
        tob VARCHAR(50) NOT NULL,
        pob VARCHAR(255) NOT NULL,
        consultation_type VARCHAR(100) NOT NULL,
        partner_name VARCHAR(255),
        partner_dob DATE,
        partner_tob VARCHAR(50),
        partner_pob VARCHAR(255),
        query TEXT,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role VARCHAR(50) NOT NULL,
        phone VARCHAR(50) UNIQUE,
        email VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        password_hash VARCHAR(255),
        otp_code VARCHAR(10),
        otp_expires_at TIMESTAMP WITH TIME ZONE,
        reset_token VARCHAR(255),
        reset_token_expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed services if table is empty
    const checkRes = await client.query('SELECT COUNT(*) FROM services');
    if (parseInt(checkRes.rows[0].count, 10) === 0) {
      console.log('Seeding initial Vedic services into PostgreSQL...');
      for (const s of seedServices) {
        await client.query(
          `INSERT INTO services (title, title_en, category, subcategory, description, description_en, modes, duration, significance, samagri_included, featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [s.title, s.title_en, s.category, s.subcategory, s.description, s.description_en, JSON.stringify(s.modes), s.duration, s.significance, s.samagri_included, s.featured]
        );
      }
      console.log('✓ Seeded services into PostgreSQL.');
    }

    // Seed admin and panditji if users table is empty
    const checkUsers = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(checkUsers.rows[0].count, 10) === 0) {
      console.log('Seeding initial Admin & Panditji credentials into PostgreSQL...');
      await client.query(
        `INSERT INTO users (role, email, name, phone, password_hash)
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin', 'shiwansh8888@gmail.com', 'व्यवस्थापक (Admin)', '9876543210', '$2b$10$UAWuybDsM.rOmvwhokhgp.yntTz6tBoKBTXLFFbAMakVug5cg7LcW']
      );
      await client.query(
        `INSERT INTO users (role, email, name, phone, password_hash)
         VALUES ($1, $2, $3, $4, $5)`,
        ['panditji', 'panditrakeshrawal26@gmail.com', 'पं. राकेश चन्द्र रावल', '9827514489', '$2b$10$9qiaxYgxpx4jUxSR9eyjc.Lq1lEhwr8.3U73wKn1iPC8m16V3wiMS']
      );
      console.log('✓ Seeded default Admin and Panditji users into PostgreSQL.');
    }

    client.release();
    return true;
  } catch (err) {
    isPostgresConnected = false;
    console.warn('⚠️  PostgreSQL connection not established (' + err.message + ').');
    console.log('ℹ️  Seamlessly running with memory data engine. Configure credentials in backend/.env when ready.');
    return false;
  }
}

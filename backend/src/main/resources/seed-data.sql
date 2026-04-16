-- ============================================================
-- UMTCEMS Seed Data (PostgreSQL / Supabase)
-- Run this ONCE after the database tables are created
-- Import via: Supabase Dashboard → SQL Editor → paste and Run
-- ============================================================

-- Reference data
INSERT INTO user_roles (name) VALUES
  ('ADMIN'),
  ('HOD'),
  ('STUDENT'),
  ('ADVISOR')
ON CONFLICT DO NOTHING;

-- Users
INSERT INTO users (name, email, password, role, club_name) VALUES
  ('Admin User', 'admin@umt.edu.my', 'admin123', 'ADMIN', NULL),
  ('Dr. Ahmad Razak', 'ahmad@umt.edu.my', 'hod123', 'HOD', NULL),
  ('Aidil Syazwan', 'aidil@umt.edu.my', 'student123', 'STUDENT', 'Aidy Events'),
  ('Alyssa Tan', 'alyssa@umt.edu.my', 'student123', 'STUDENT', 'Tech Club'),
  ('Haban Ali', 'haban@umt.edu.my', 'student123', 'STUDENT', 'Coding Society')
ON CONFLICT DO NOTHING;

-- Categories (add your own if needed — Category entity not yet created in the app)
-- INSERT INTO categories (name) VALUES ('Workshop'), ('Seminar'), ('Competition');

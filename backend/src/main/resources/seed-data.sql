-- ============================================================
-- UMTCEMS Seed Data
-- Run this ONCE after the database is created
-- Import via: phpMyAdmin → Select 'umtcems' DB → Import → choose this file
-- OR: mysql -u root -p umtcems < seed-data.sql
-- ============================================================

-- Reference data
INSERT INTO roles (name) VALUES 
  ('ADMIN'),
  ('HOD'),
  ('STUDENT'),
  ('ADVISOR');

-- Users
INSERT INTO users (id, name, email, password, role_id, student_id) VALUES
  (1, 'Admin User', 'admin@umt.edu.my', 'admin123', 1, NULL),
  (2, 'Dr. Ahmad Razak', 'ahmad@umt.edu.my', 'hod123', 2, NULL),
  (3, 'Aidil Syazwan', 'aidil@umt.edu.my', 'student123', 3, '2021001234'),
  (4, 'Alyssa Tan', 'alyssa@umt.edu.my', 'student123', 3, '2021005678'),
  (5, 'Haban Ali', 'haban@umt.edu.my', 'student123', 3, '2021009012');

-- Categories
INSERT INTO categories (name) VALUES 
  ('Workshop'),
  ('Seminar'),
  ('Competition'),
  ('Webinar'),
  ('Hackathon');

-- Proponents
INSERT INTO proponents (user_id, organization) VALUES
  (3, 'Aidy Events'),
  (4, 'Tech Club'),
  (5, 'Coding Society');

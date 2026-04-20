-- ============================================================
-- UMTCEMS Seed Data (PostgreSQL / Supabase)
-- Run this ONCE after the database tables are created
-- Import via: Supabase Dashboard → SQL Editor → paste and Run
-- Shared setup only: this intentionally avoids building anyone's
-- assigned feature/demo flow for them.
-- ============================================================

INSERT INTO roles (role_id, role_name, description) VALUES
  (1, 'CLUB_REP', 'Club Representative'),
  (2, 'ADVISOR', 'Club Advisor'),
  (3, 'MPP_EXCO', 'MPP Club EXCO'),
  (4, 'HEPA_STAFF', 'HEPA Staff')
ON CONFLICT (role_id) DO UPDATE
SET role_name = EXCLUDED.role_name,
    description = EXCLUDED.description;

INSERT INTO users (role_id, full_name, email, password_hash, club_name) VALUES
  (4, 'HEPA Staff Demo', 'hepa@umt.edu.my', 'hepa123', NULL),
  (2, 'Dr. Advisor Demo', 'advisor@umt.edu.my', 'advisor123', 'Tech Club'),
  (3, 'MPP Exco Demo', 'mpp@umt.edu.my', 'mpp123', NULL),
  (1, 'Club Rep Demo', 'clubrep@umt.edu.my', 'clubrep123', 'Tech Club')
ON CONFLICT (email) DO NOTHING;

INSERT INTO clubs (club_name, description, club_rep_user_id)
SELECT
  'Tech Club',
  'Sample club for shared setup',
  u.user_id
FROM users u
WHERE u.email = 'clubrep@umt.edu.my'
ON CONFLICT (club_name) DO NOTHING;

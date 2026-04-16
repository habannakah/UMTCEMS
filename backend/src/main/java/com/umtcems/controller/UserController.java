package com.umtcems.umtcems.controller;

import com.umtcems.umtcems.model.User;
import com.umtcems.umtcems.model.UserRole;
import com.umtcems.umtcems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * ============================================
 * HABAN - FILL IN THIS FILE
 * ============================================
 *
 * This controller handles:
 * - User registration
 * - User login
 * - Change password
 * - Update email
 *
 * Each method has a TODO comment explaining what to implement.
 * JPA repository methods are already in UserRepository.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ============================================
    // TODO #1: Register a new user
    // ============================================
    // POST /api/users/register
    // Body: { "name": "John", "email": "john@umt.edu.my", "password": "123", "role": "CLUB_REP", "clubName": "CS Club" }
    // Return: The created user (201)
    // Error: If email already exists, return 400
    //
    // Steps:
    // 1. Check if email already exists using userRepository.existsByEmail(email)
    // 2. If exists, return bad request
    // 3. If not, create new User object and save using userRepository.save(user)
    // 4. Return the created user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement registration");
    }

    // ============================================
    // TODO #2: Login
    // ============================================
    // POST /api/users/login
    // Body: { "email": "john@umt.edu.my", "password": "123" }
    // Return: The user if found and password matches (200)
    // Error: If user not found or wrong password, return 401
    //
    // Steps:
    // 1. Find user by email using userRepository.findByEmail(email)
    // 2. If not found, return 401
    // 3. If found, check if password matches
    // 4. If password matches, return user (without password field - use a response DTO)
    // 5. If password doesn't match, return 401
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement login");
    }

    // ============================================
    // TODO #3: Change password
    // ============================================
    // PUT /api/users/{id}/password
    // Body: { "currentPassword": "old123", "newPassword": "new456" }
    // Return: Success message (200)
    // Error: If user not found, return 404
    //        If current password wrong, return 400
    //        If new password is too short (< 6 chars), return 400
    //
    // Steps:
    // 1. Find user by ID
    // 2. Check if current password matches
    // 3. Check if new password is at least 6 characters
    // 4. Update password and save
    // 5. Return success message
    @PutMapping("/{id}/password")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement change password");
    }

    // ============================================
    // TODO #4: Update email
    // ============================================
    // PUT /api/users/{id}/email
    // Body: { "email": "newemail@umt.edu.my" }
    // Return: Updated user (200)
    // Error: If user not found, return 404
    //        If email already taken by another user, return 400
    //
    // Steps:
    // 1. Find user by ID
    // 2. Check if new email is already used by another user
    // 3. Update email and save
    // 4. Return updated user
    @PutMapping("/{id}/email")
    public ResponseEntity<?> updateEmail(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement update email");
    }

    // ============================================
    // TODO #5: Get all users (for testing)
    // ============================================
    // GET /api/users
    // Return: List of all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // ============================================
    // TODO #6: Get user by ID
    // ============================================
    // GET /api/users/{id}
    // Return: User if found (200), else 404
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        // FILL THIS IN
        return ResponseEntity.ok(userRepository.findById(id));
    }
}

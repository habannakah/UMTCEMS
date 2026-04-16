package com.umtcems.umtcems.controller;

import com.umtcems.umtcems.model.Comment;
import com.umtcems.umtcems.model.Proposal;
import com.umtcems.umtcems.model.ProposalStatus;
import com.umtcems.umtcems.repository.CommentRepository;
import com.umtcems.umtcems.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

/**
 * ============================================
 * ALYSSA - FILL IN THIS FILE
 * ============================================
 *
 * This controller handles:
 * - Submit a new proposal
 * - Get all proposals
 * - Get proposal by ID
 * - Advisor: Approve or Request Changes
 * - MPP: Final Approve or Reject
 * - Add comments
 *
 * Each method has a TODO comment explaining what to implement.
 * JPA repository methods are already in ProposalRepository and CommentRepository.
 */
@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private CommentRepository commentRepository;

    // ============================================
    // TODO #1: Submit a new proposal
    // ============================================
    // POST /api/proposals
    // Body: { "title": "...", "clubName": "...", "submitterName": "...",
    //        "eventDate": "...", "venue": "...", "objective": "...",
    //        "participants": "...", "description": "...", "budget": "...",
    //        "committee": "...", "logistics": "...", "outcomes": "..." }
    // Return: The created proposal (201)
    //
    // Steps:
    // 1. Create a new Proposal object
    // 2. Set status to PENDING_ADVISOR
    // 3. Set dateSubmitted to today's date
    // 4. Save using proposalRepository.save(proposal)
    // 5. Return the created proposal
    @PostMapping
    public ResponseEntity<?> submitProposal(@RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement submit proposal");
    }

    // ============================================
    // TODO #2: Get all proposals
    // ============================================
    // GET /api/proposals
    // Return: List of all proposals
    @GetMapping
    public ResponseEntity<List<Proposal>> getAllProposals() {
        return ResponseEntity.ok(proposalRepository.findAll());
    }

    // ============================================
    // TODO #3: Get proposals by club
    // ============================================
    // GET /api/proposals/club/{clubName}
    // Return: List of proposals for that club
    @GetMapping("/club/{clubName}")
    public ResponseEntity<List<Proposal>> getProposalsByClub(@PathVariable String clubName) {
        return ResponseEntity.ok(proposalRepository.findByClubName(clubName));
    }

    // ============================================
    // TODO #4: Get proposal by ID
    // ============================================
    // GET /api/proposals/{id}
    // Return: Proposal if found (200), else 404
    @GetMapping("/{id}")
    public ResponseEntity<?> getProposalById(@PathVariable Long id) {
        return ResponseEntity.ok(proposalRepository.findById(id));
    }

    // ============================================
    // TODO #5: Advisor - Approve Proposal
    // ============================================
    // PUT /api/proposals/{id}/approve-advisor
    // Body: { "advisorName": "Dr. Ahmad" }
    // Return: Updated proposal (200)
    //
    // When advisor approves:
    // 1. Change status to PENDING_MPP
    // 2. Add comment: "Approved by advisor"
    // 3. Update history (append to existing history JSON)
    // 4. Save and return
    @PutMapping("/{id}/approve-advisor")
    public ResponseEntity<?> approveAsAdvisor(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement advisor approval");
    }

    // ============================================
    // TODO #6: Advisor/MPP - Request Changes
    // ============================================
    // PUT /api/proposals/{id}/request-changes
    // Body: { "reviewerName": "Dr. Ahmad", "comment": "Please include budget breakdown" }
    // Return: Updated proposal (200)
    //
    // Steps:
    // 1. Change status to NEEDS_IMPROVEMENT
    // 2. Add comment with type "amendment_request"
    // 3. Update history
    // 4. Save and return
    @PutMapping("/{id}/request-changes")
    public ResponseEntity<?> requestChanges(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement request changes");
    }

    // ============================================
    // TODO #7: MPP - Final Approve
    // ============================================
    // PUT /api/proposals/{id}/approve-mpp
    // Body: { "mppName": "President MPP" }
    // Return: Updated proposal (200)
    //
    // When MPP approves:
    // 1. Change status to APPROVED
    // 2. Add comment: "Final approval by MPP"
    // 3. Update history
    // 4. Save and return
    @PutMapping("/{id}/approve-mpp")
    public ResponseEntity<?> approveAsMpp(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement MPP approval");
    }

    // ============================================
    // TODO #8: MPP - Reject Proposal
    // ============================================
    // PUT /api/proposals/{id}/reject
    // Body: { "mppName": "President MPP", "reason": "Budget exceeds limit" }
    // Return: Updated proposal (200)
    //
    // Steps:
    // 1. Change status to REJECTED
    // 2. Add comment with type "rejection_reason"
    // 3. Update history
    // 4. Save and return
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectProposal(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement reject proposal");
    }

    // ============================================
    // TODO #9: Club Rep - Resubmit after changes
    // ============================================
    // PUT /api/proposals/{id}/resubmit
    // Body: { "submitterName": "Ali", "updates": { "budget": "new budget..." } }
    // Return: Updated proposal (200)
    //
    // When club rep resubmits after making changes:
    // 1. Update the proposal fields with the new values
    // 2. Change status back to PENDING_ADVISOR
    // 3. Add comment: "Resubmitted with changes"
    // 4. Update history
    // 5. Save and return
    @PutMapping("/{id}/resubmit")
    public ResponseEntity<?> resubmitProposal(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement resubmit proposal");
    }

    // ============================================
    // TODO #10: Add comment to proposal
    // ============================================
    // POST /api/proposals/{id}/comments
    // Body: { "authorName": "...", "authorRole": "ADVISOR", "content": "...", "type": "general" }
    // Return: The created comment (201)
    //
    // Steps:
    // 1. Find the proposal
    // 2. Create a new Comment object
    // 3. Set timestamp to current date
    // 4. Set the proposal reference
    // 5. Save comment
    // 6. Also add to proposal's comment list and save proposal
    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement add comment");
    }
}

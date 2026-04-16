package com.umtcems.umtcems.controller;

import com.umtcems.umtcems.model.PostEventReport;
import com.umtcems.umtcems.model.Proposal;
import com.umtcems.umtcems.model.ProposalStatus;
import com.umtcems.umtcems.repository.PostEventReportRepository;
import com.umtcems.umtcems.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * ============================================
 * AIDIL - FILL IN THIS FILE
 * ============================================
 *
 * This controller handles:
 * - Submit post-event report
 * - Get all reports
 * - Get report by proposal ID
 * - Get analytics/statistics
 * - Check venue clashes
 *
 * Each method has a TODO comment explaining what to implement.
 */
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private PostEventReportRepository reportRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    // ============================================
    // TODO #1: Submit post-event report
    // ============================================
    // POST /api/reports
    // Body: { "proposalId": 1,
    //        "reportFile": "report.pdf",
    //        "photos": "['photo1.jpg','photo2.jpg']",
    //        "actualAttendance": 150,
    //        "outcomesSummary": "Event was successful...",
    //        "budgetSpent": "RM 500",
    //        "problemsFaced": "Late start...",
    //        "improvements": "Next time book venue earlier..." }
    // Return: The created report (201)
    //
    // Steps:
    // 1. Find the proposal by ID
    // 2. Create a new PostEventReport object
    // 3. Set submittedDate to today
    // 4. Set the proposal reference
    // 5. Save the report
    // 6. Update the proposal status to COMPLETED
    // 7. Save the proposal
    // 8. Return the created report
    @PostMapping
    public ResponseEntity<?> submitReport(@RequestBody Map<String, Object> body) {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement submit report");
    }

    // ============================================
    // TODO #2: Get all reports
    // ============================================
    // GET /api/reports
    // Return: List of all post-event reports
    @GetMapping
    public ResponseEntity<List<PostEventReport>> getAllReports() {
        return ResponseEntity.ok(reportRepository.findAll());
    }

    // ============================================
    // TODO #3: Get report by proposal ID
    // ============================================
    // GET /api/reports/proposal/{proposalId}
    // Return: Report if found (200), else 404
    @GetMapping("/proposal/{proposalId}")
    public ResponseEntity<?> getReportByProposalId(@PathVariable Long proposalId) {
        return ResponseEntity.ok(reportRepository.findByProposalId(proposalId));
    }

    // ============================================
    // TODO #4: Get analytics/statistics
    // ============================================
    // GET /api/reports/analytics
    // Return: JSON with statistics
    // { "totalProposals": 20,
    //   "pendingAdvisor": 5,
    //   "pendingMpp": 3,
    //   "approved": 8,
    //   "completed": 4,
    //   "rejected": 2 }
    //
    // Steps:
    // 1. Count all proposals using proposalRepository.count()
    // 2. Count by status using proposalRepository.findByStatus()
    // 3. Return the statistics
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement analytics");
    }

    // ============================================
    // TODO #5: Check venue clashes
    // ============================================
    // GET /api/reports/venue-clashes
    // Return: List of venue clash warnings
    // [{ "date": "2024-10-15", "venue": "Auditorium",
    //   "events": ["Tech Talk", "Career Fair"] },
    //  { "date": "2024-11-02", "venue": "Dewan",
    //   "events": [" AGM", "Workshop"] }]
    //
    // Steps:
    // 1. Get all approved proposals
    // 2. Group them by eventDate + venue
    // 3. Find groups with more than 1 proposal
    // 4. Return the clash information
    @GetMapping("/venue-clashes")
    public ResponseEntity<?> checkVenueClashes() {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement venue clash detection");
    }

    // ============================================
    // TODO #6: Get proposals pending report
    // ============================================
    // GET /api/reports/pending
    // Return: List of approved proposals that don't have a report yet
    //
    // Steps:
    // 1. Get all proposals with status APPROVED
    // 2. Filter out ones that already have a postEventReport
    // 3. Return the list
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReports() {
        // FILL THIS IN
        return ResponseEntity.badRequest().body("TODO: Implement pending reports list");
    }
}

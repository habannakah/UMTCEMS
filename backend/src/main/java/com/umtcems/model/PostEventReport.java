package com.umtcems.umtcems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "post_event_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEventReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportFile;

    private String photos; // JSON array string

    private String submittedDate;

    // Additional fields
    private Integer actualAttendance;

    private String outcomesSummary;

    private String budgetSpent;

    private String problemsFaced;

    private String improvements;

    @OneToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;
}

package com.umtcems.umtcems.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "post_event_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostEventReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @Column(name = "report_file")
    private String reportFile;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> photos = new ArrayList<>();

    @Column(name = "submission_date")
    private String submittedDate;

    // Additional fields
    @Column(name = "attendance_count")
    private Integer actualAttendance;

    @Column(name = "event_summary", length = 2000)
    private String outcomesSummary;

    @Column(name = "total_expenses")
    private String budgetSpent;

    @Column(name = "problems_faced", length = 2000)
    private String problemsFaced;

    @Column(length = 2000)
    private String improvements;

    @Column(name = "submitted_by")
    private Long submittedBy;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;
}

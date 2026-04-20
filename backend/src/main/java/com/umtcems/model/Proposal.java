package com.umtcems.umtcems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event_proposals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proposal_id")
    private Long id;

    @Column(name = "club_id")
    private Long clubId;

    @Column(name = "submitted_by")
    private Long submittedBy;

    @Column(nullable = false)
    private String title;

    @Column(name = "club_name", nullable = false)
    private String clubName;

    @Column(name = "submitter_name")
    private String submitterName;

    @Column(name = "date_submitted")
    private String dateSubmitted;

    @Column(name = "event_date")
    private String eventDate;

    private String venue;

    @Column(length = 2000)
    private String objective;

    private String participants;

    @Column(length = 2000)
    private String description;

    private String budget;

    @Column(length = 2000)
    private String committee;

    @Column(length = 2000)
    private String logistics;

    @Column(length = 2000)
    private String outcomes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus status;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true)
    private PostEventReport postEventReport;

    @Column(length = 4000)
    private String history; // JSON string of status history

    @Column(name = "created_at")
    private String createdAt;

    // Helper method to add comment
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setProposal(this);
    }
}

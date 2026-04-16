package com.umtcems.umtcems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "proposals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String clubName;

    private String submitterName;

    private String dateSubmitted;

    private String eventDate;

    private String venue;

    private String objective;

    private String participants;

    @Column(length = 2000)
    private String description;

    private String budget;

    private String committee;

    private String logistics;

    private String outcomes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus status;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true)
    private PostEventReport postEventReport;

    private String history; // JSON string of status history

    // Helper method to add comment
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setProposal(this);
    }
}

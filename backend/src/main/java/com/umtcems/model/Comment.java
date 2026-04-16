package com.umtcems.umtcems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authorName;

    @Enumerated(EnumType.STRING)
    private UserRole authorRole;

    @Column(length = 1000)
    private String content;

    private String timestamp;

    private String type; // general, amendment_request, rejection_reason, compliance_note

    private String tag;

    @ManyToOne
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;
}

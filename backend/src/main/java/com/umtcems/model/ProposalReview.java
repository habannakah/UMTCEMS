package com.umtcems.umtcems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proposal_reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposalReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @Column(name = "proposal_id", nullable = false)
    private Long proposalId;

    @Column(name = "reviewer_id", nullable = false)
    private Long reviewerId;

    @Column(name = "review_role", nullable = false)
    private String reviewRole;

    @Column(nullable = false)
    private String decision;

    private String comments;

    @Column(name = "review_date")
    private String reviewDate;
}

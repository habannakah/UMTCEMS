package com.umtcems.umtcems.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proposal_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Long id;

    @Column(name = "document_name", nullable = false)
    private String name;

    @Column(name = "document_url", nullable = false)
    private String url;

    @Column(name = "document_type")
    private String type;

    @Column(name = "uploaded_at")
    private String uploadedAt;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "proposal_id", nullable = false)
    private Proposal proposal;

    public void setProposal(Proposal proposal) {
        this.proposal = proposal;
    }
}

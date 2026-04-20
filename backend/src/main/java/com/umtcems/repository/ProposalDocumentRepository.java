package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.ProposalDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProposalDocumentRepository extends JpaRepository<ProposalDocument, Long> {

    List<ProposalDocument> findByProposalId(Long proposalId);
}

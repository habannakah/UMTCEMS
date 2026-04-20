package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.ProposalReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProposalReviewRepository extends JpaRepository<ProposalReview, Long> {

    List<ProposalReview> findByProposalIdOrderByReviewDateDesc(Long proposalId);
}

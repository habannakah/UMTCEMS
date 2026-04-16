package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.Proposal;
import com.umtcems.umtcems.model.ProposalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    // Find all proposals by club
    List<Proposal> findByClubName(String clubName);

    // Find all proposals by status
    List<Proposal> findByStatus(ProposalStatus status);

    // Find all proposals by club AND status
    List<Proposal> findByClubNameAndStatus(String clubName, ProposalStatus status);

    // Find all proposals that need advisor review
    List<Proposal> findByStatusOrderByDateSubmittedDesc(ProposalStatus status);
}

package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.PostEventReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PostEventReportRepository extends JpaRepository<PostEventReport, Long> {

    // Find report by proposal ID
    Optional<PostEventReport> findByProposalId(Long proposalId);
}

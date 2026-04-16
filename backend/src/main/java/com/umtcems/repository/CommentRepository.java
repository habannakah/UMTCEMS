package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Find all comments for a proposal
    List<Comment> findByProposalId(Long proposalId);
}

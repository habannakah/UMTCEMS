package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    Optional<Club> findByClubName(String clubName);

    List<Club> findByClubRepUserId(Long clubRepUserId);
}

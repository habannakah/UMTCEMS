package com.umtcems.umtcems.repository;

import com.umtcems.umtcems.model.User;
import com.umtcems.umtcems.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (for login)
    Optional<User> findByEmail(String email);

    // Check if email already exists (for registration)
    boolean existsByEmail(String email);

    // Find all users by role
    @Query(value = "SELECT * FROM users WHERE role_id = :roleId", nativeQuery = true)
    List<User> findByRoleId(@Param("roleId") Long roleId);

    default List<User> findByRole(UserRole role) {
        return findByRoleId(role.getRoleId());
    }

    // Find all users by club name
    List<User> findByClubName(String clubName);
}

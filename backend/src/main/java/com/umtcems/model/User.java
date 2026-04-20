package com.umtcems.umtcems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Column(name = "full_name", nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(name = "contact_no")
    private String contactNo;

    @Column(name = "club_name")
    private String clubName;

    @Transient
    public UserRole getRole() {
        return UserRole.fromRoleId(roleId);
    }

    public void setRole(UserRole role) {
        this.roleId = role != null ? role.getRoleId() : null;
    }
}

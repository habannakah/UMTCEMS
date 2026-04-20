package com.umtcems.umtcems.model;

public enum UserRole {
    CLUB_REP(1L),
    ADVISOR(2L),
    MPP_EXCO(3L),
    HEPA_STAFF(4L);

    private final long roleId;

    UserRole(long roleId) {
        this.roleId = roleId;
    }

    public long getRoleId() {
        return roleId;
    }

    public static UserRole fromRoleId(Long roleId) {
        if (roleId == null) {
            return null;
        }

        for (UserRole role : values()) {
            if (role.roleId == roleId) {
                return role;
            }
        }

        throw new IllegalArgumentException("Unknown role ID: " + roleId);
    }
}

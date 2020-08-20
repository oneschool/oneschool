package com.google.sps.constants;

public enum AccountRole {
    ADMIN("admin"),
    EDUCATOR("educator"),
    STUDENT("student");

    private final String label;

    AccountRole(String label) {
        this.label = label;
    }

    public static AccountRole valueOfLabel(String label) {
        for (AccountRole e : values()) {
            if (e.label.equals(label)) {
                return e;
            }
        }
        return null;
    }
}

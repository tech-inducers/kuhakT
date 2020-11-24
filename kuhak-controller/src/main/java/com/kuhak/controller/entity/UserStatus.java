package com.kuhak.controller.entity;

public enum  UserStatus {

    NEW("Created"), ACTIVE("Active"), DEACTIVE("DEACTIVE");

    private String userStatus;

    UserStatus(String userStatus){
        this.userStatus = userStatus;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }
}

package com.kuhak.controller.dto;

import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.entity.UserStatus;

import java.time.LocalDateTime;

public class UserDto {

    Long userExtId;
    Long userId;
    String userName;
    String status;
    LocalDateTime validUpto;
    LocalDateTime activated_on;
    Long providerId;


    public Long getUserExtId() {
        return userExtId;
    }

    public void setUserExtId(Long userExtId) {
        this.userExtId = userExtId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getValidUpto() {
        return validUpto;
    }

    public void setValidUpto(LocalDateTime validUpto) {
        this.validUpto = validUpto;
    }

    public LocalDateTime getActivated_on() {
        return activated_on;
    }

    public void setActivated_on(LocalDateTime activated_on) {
        this.activated_on = activated_on;
    }

    public Long getProvider() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

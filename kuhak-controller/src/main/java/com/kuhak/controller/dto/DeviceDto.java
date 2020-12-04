package com.kuhak.controller.dto;


import java.time.LocalDateTime;

public class DeviceDto {

    Long deviceExtId;
    String deviceName;
    String status;
    LocalDateTime validUpto;
    LocalDateTime activated_on;
    Long userId;

    public Long getDeviceExtId() {
        return deviceExtId;
    }

    public void setDeviceExtId(Long deviceExtId) {
        this.deviceExtId = deviceExtId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

package com.kuhak.controller.dto;


import java.time.LocalDateTime;

public class DeviceDto {

    String deviceExtId;
    Long deviceId;
    String deviceName;
    String status;
    LocalDateTime validUpto;
    LocalDateTime activated_on;

    public Long getDeviceGroupId() {
        return deviceGroupId;
    }

    public void setDeviceGroupId(Long deviceGroupId) {
        this.deviceGroupId = deviceGroupId;
    }

    Long deviceGroupId;

    String deviceGroupName;

    public String getDeviceGroupName() {
        return deviceGroupName;
    }

    public void setDeviceGroupName(String deviceGroupName) {
        this.deviceGroupName = deviceGroupName;
    }

    String deviceType;
    

    public String  getDeviceExtId() {
        return deviceExtId;
    }

    public void setDeviceExtId(String  deviceExtId) {
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



    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }
}

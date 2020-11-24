package com.kuhak.controller.entity;

public enum  DeviceStatus {

    NEW("Created"), ACTIVE("Active"), DEACTIVE("DEACTIVE");

    private String deviceStatus;

    DeviceStatus(String deviceStatus){
        this.deviceStatus = deviceStatus;
    }

    public String getDeviceStatus() {
        return deviceStatus;
    }

    public void setDeviceStatus(String deviceStatus) {
        this.deviceStatus = deviceStatus;
    }
}

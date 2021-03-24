package com.kuhak.controller.entity;


public enum DeviceType {

    STATIONATY("stationary"), MOVIABLE("moviable");

    private String deviceStatus;

    DeviceType(String deviceStatus) {
        this.deviceStatus = deviceStatus;
    }

    public String getDeviceStatus() {
        return deviceStatus;
    }

    public void setDeviceStatus(String deviceStatus) {
        this.deviceStatus = deviceStatus;
    }
}

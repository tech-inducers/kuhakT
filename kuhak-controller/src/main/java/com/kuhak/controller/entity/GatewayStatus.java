package com.kuhak.controller.entity;

/**
 * Created by snigdha on 22-03-2021.
 */
public enum GatewayStatus {

    NEW("Created"), ACTIVE("Active"), DEACTIVE("DEACTIVE");

    private String gatewayStatus;

    GatewayStatus(String gatewayStatus) {
        this.gatewayStatus = gatewayStatus;
    }

    public String getGatewayStatus() {
        return gatewayStatus;
    }

    public void setGatewayStatus(String gatewayStatus) {
        this.gatewayStatus = gatewayStatus;
    }
}

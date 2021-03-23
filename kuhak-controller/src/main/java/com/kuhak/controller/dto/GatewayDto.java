package com.kuhak.controller.dto;

import java.time.LocalDateTime;


public class GatewayDto {

    Long gatewayId;
    String gatewayIp;
    String gatewayPort;
    String gatwwayPrefix;
    String gatewaySuffix;
    Integer deviceLimit;
    Integer deviceCount;
    String status;
    LocalDateTime activated_on;
    Long protocolId;

    public Long getGatewayId() {
        return gatewayId;
    }

    public void setGatewayId(Long gatewayId) {
        this.gatewayId = gatewayId;
    }

    public String getGatewayIp() {
        return gatewayIp;
    }

    public void setGatewayIp(String gatewayIp) {
        this.gatewayIp = gatewayIp;
    }

    public String getGatewayPort() {
        return gatewayPort;
    }

    public void setGatewayPort(String gatewayPort) {
        this.gatewayPort = gatewayPort;
    }

    public String getGatwwayPrefix() {
        return gatwwayPrefix;
    }

    public void setGatwwayPrefix(String gatwwayPrefix) {
        this.gatwwayPrefix = gatwwayPrefix;
    }

    public String getGatewaySuffix() {
        return gatewaySuffix;
    }

    public void setGatewaySuffix(String gatewaySuffix) {
        this.gatewaySuffix = gatewaySuffix;
    }

    public Integer getDeviceLimit() {
        return deviceLimit;
    }

    public void setDeviceLimit(Integer deviceLimit) {
        this.deviceLimit = deviceLimit;
    }

    public Integer getDeviceCount() {
        return deviceCount;
    }

    public void setDeviceCount(Integer deviceCount) {
        this.deviceCount = deviceCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getActivated_on() {
        return activated_on;
    }

    public void setActivated_on(LocalDateTime activated_on) {
        this.activated_on = activated_on;
    }

    public Long getProtocolId() {
        return protocolId;
    }

    public void setProtocolId(Long protocolId) {
        this.protocolId = protocolId;
    }
}

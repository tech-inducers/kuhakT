package com.kuhak.controller.dto;

import com.kuhak.controller.entity.ProviderStatus;

import java.time.LocalDateTime;

public class ProviderDto {


    String providerExtId;
    Long providerId;
    String providerName;
    String status;
    LocalDateTime validUpto;
    LocalDateTime activated_on;



    public String getProviderExtId() {
        return providerExtId;
    }

    public void setProviderExtId(String providerExtId) {
        this.providerExtId = providerExtId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
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

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }
}

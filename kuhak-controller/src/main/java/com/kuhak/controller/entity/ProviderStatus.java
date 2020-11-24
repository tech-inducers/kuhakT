package com.kuhak.controller.entity;

public enum ProviderStatus {

    NEW("Created"), ACTIVE("Active"), DEACTIVE("DEACTIVE");

    private String providerStatus;

    ProviderStatus(String providerStatus) {
        this.providerStatus = providerStatus;
    }
    public String getProviderStatus(){
        return providerStatus;
    }

    public void setProviderStatus(String providerStatus){
        this.providerStatus = providerStatus;
    }
}


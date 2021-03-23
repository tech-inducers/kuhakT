package com.kuhak.controller.dto;

import java.util.Set;

/**
 * Created by snigdha on 22-03-2021.
 */
public class ProtocolDto {

    Long protocolId;
    String protocolName;

    public Long getProtocolId() {
        return protocolId;
    }

    public void setProtocolId(Long protocolId) {
        this.protocolId = protocolId;
    }

    public String getProtocolName() {
        return protocolName;
    }

    public void setProtocolName(String protocolName) {
        this.protocolName = protocolName;
    }

}

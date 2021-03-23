package com.kuhak.controller.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.models.auth.In;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name ="k_gateway")
public class Gateway implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gateway_id", nullable = false)
    private Long gatewayId;

    @Column(name="gateway_ip")
    private String gatewayIp;

    @Column(name="gateway_port")
    private String gatewayPort;

    @Column(name="gateway_prefix")
    private String gatwwayPrefix;

    @Column(name="gateway_suffix")
    private String gatewaySuffix;

    @Column(name="device_limit")
    private Integer deviceLimit;

    @Column(name="device_count")
    private Integer deviceCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GatewayStatus status;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "activated_on", nullable = false)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime activated_on;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "created_at")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime created_At;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "updated_at")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime updated_At;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @NotNull
    private Protocol protocol;

    @PrePersist
    protected void onCreate() {
        this.created_At = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = LocalDateTime.now();
    }

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

    public Protocol getProtocol() {
        return protocol;
    }

    public void setProtocol(Protocol protocol) {
        this.protocol = protocol;
    }

    public GatewayStatus getStatus() {
        return status;
    }

    public void setStatus(GatewayStatus status) {
        this.status = status;
    }

    public LocalDateTime getActivated_on() {
        return activated_on;
    }

    public void setActivated_on(LocalDateTime activated_on) {
        this.activated_on = activated_on;
    }

    public LocalDateTime getCreated_At() {
        return created_At;
    }

    public void setCreated_At(LocalDateTime created_At) {
        this.created_At = created_At;
    }

    public LocalDateTime getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(LocalDateTime updated_At) {
        this.updated_At = updated_At;
    }
}

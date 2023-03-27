package com.kuhak.controller.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "k_device")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @Column(name = "device_ext_id", nullable = false,unique = true)
    private String deviceExtId;

    @Column(name = "device_name")
    private String deviceName;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DeviceStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name="device_type", nullable = false)
    private DeviceType deviceType;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "valid_upto")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime validUpto;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "activated_on")
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



    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("deviceGroup")
    private DeviceGroup deviceGroup;

//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name="protocol_id", nullable = false)
//    @NotNull
//    private Protocol protocol;
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name="gateway_id", nullable = false)
//    @NotNull
//    private Gateway gateway;

    @PrePersist
    protected void onCreate() {
        this.created_At = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = LocalDateTime.now();
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceExtId() {
        return deviceExtId;
    }

    public void setDeviceExtId(String deviceExtId) {
        this.deviceExtId = deviceExtId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
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



    public DeviceType getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(DeviceType deviceType) {
        this.deviceType = deviceType;
    }

//    public Protocol getProtocol() {
//        return protocol;
//    }
//
//    public void setProtocol(Protocol protocol) {
//        this.protocol = protocol;
//    }
//
//    public Gateway getGateway() {
//        return gateway;
//    }
//
//    public void setGateway(Gateway gateway) {
//        this.gateway = gateway;
//    }

    public DeviceGroup getDeviceGroup() {
        return deviceGroup;
    }

    public void setDeviceGroup(DeviceGroup deviceGroup) {
        this.deviceGroup = deviceGroup;
    }
}
package com.kuhak.controller.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "k_devicegroup")
public class DeviceGroup {




    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "devicegroup_id", nullable = false)
    private Long deviceGroupId;

    @Column(name = "devicegroup_name", nullable = false, unique=true)
    private String deviceGroupName;

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
    private User user;


    public Long getDeviceGroupId() {
        return deviceGroupId;
    }

    public void setDeviceGroupId(Long deviceGroupId) {
        this.deviceGroupId = deviceGroupId;
    }

    public String getDeviceGroupName() {
        return deviceGroupName;
    }

    public void setDeviceGroupName(String deviceGroupName) {
        this.deviceGroupName = deviceGroupName;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }



}

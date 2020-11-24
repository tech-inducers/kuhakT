package com.kuhak.controller.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "provider")
public class Provider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id", nullable = false)
    private Long providerId;

    @Column(name = "provider_ext_id", nullable = false,unique = true)
    private Long providerExtId;

    @Column(name = "provider_name", nullable = false)
    private Long providerName;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProviderStatus status;

    @JsonFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    @Column(name = "valid_upto", nullable = false)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime validUpto;

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

    /*@OneToMany(mappedBy = "provider", cascade = { CascadeType.ALL })
    private Set<User> users = new HashSet<>();*/

    @PrePersist
    protected void onCreate() {
        this.created_At = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_At = LocalDateTime.now();
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getProviderExtId() {
        return providerExtId;
    }

    public void setProviderExtId(Long providerExtId) {
        this.providerExtId = providerExtId;
    }

    public Long getProviderName() {
        return providerName;
    }

    public void setProviderName(Long providerName) {
        this.providerName = providerName;
    }

    public ProviderStatus getStatus() {
        return status;
    }

    public void setStatus(ProviderStatus status) {
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
}

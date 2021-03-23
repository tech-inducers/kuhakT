package com.kuhak.controller.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "k_protocol")
public class Protocol implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "protocol_id", nullable = false)
    private Long protocolId;

    @Column(name = "protocol_name", nullable = false, unique = true)
    private String protocolName;

    /*@OneToMany(fetch = FetchType.LAZY, mappedBy = "protocol")
    private Set<Gateway> gateways;*/

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

    /*public Set<Gateway> getGateways() {
        return gateways;
    }

    public void setGateways(Set<Gateway> gateways) {
        this.gateways = gateways;
    }*/
}
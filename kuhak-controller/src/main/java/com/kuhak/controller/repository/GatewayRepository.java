package com.kuhak.controller.repository;

import com.kuhak.controller.entity.Gateway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GatewayRepository extends JpaRepository<Gateway, Long>{

    List<Gateway> findByProtocolProtocolId(Long protocolId);
    Optional<Gateway> findByGatewayIdAndProtocolProtocolId(Long id, Long protocolId);
}

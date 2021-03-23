package com.kuhak.controller.repository;

import com.kuhak.controller.entity.Protocol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProtocolRepository extends JpaRepository<Protocol, Long>{

    Optional<Protocol> findByProtocolName(String protocolName);

}

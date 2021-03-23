package com.kuhak.controller.service;


import com.kuhak.controller.dto.GatewayDto;
import com.kuhak.controller.entity.Gateway;
import org.springframework.stereotype.Service;

import java.util.List;


public interface GatewayService {

    GatewayDto createOrUpdateGateway(GatewayDto gatewayDto);
    List<GatewayDto> getAllGateways();
    GatewayDto getGatewayByGatewayId(Long gatewayId);
    List<GatewayDto> gatAllGatewayByProtocolId(Long protocolId);
}

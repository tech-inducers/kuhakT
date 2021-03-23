package com.kuhak.controller.service.impl;

import com.kuhak.controller.dto.GatewayDto;
import com.kuhak.controller.entity.Gateway;
import com.kuhak.controller.entity.GatewayStatus;
import com.kuhak.controller.repository.GatewayRepository;
import com.kuhak.controller.repository.ProtocolRepository;
import com.kuhak.controller.service.GatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GatewayServiceImpl implements GatewayService {

    @Autowired
    ProtocolRepository protocolRepository;

    @Autowired
    GatewayRepository gatewayRepository;

    @Override
    public GatewayDto createOrUpdateGateway(GatewayDto gatewayDto) {
        Gateway gwR =protocolRepository.findById(gatewayDto.getProtocolId()).map(protocol -> {
            Gateway gw = new Gateway();
            gw.setProtocol(protocol);
            gw.setActivated_on(gatewayDto.getActivated_on());
            gw.setDeviceCount(0);
            gw.setGatewayIp(gatewayDto.getGatewayIp());
            gw.setDeviceLimit(gatewayDto.getDeviceLimit());
            gw.setGatewayPort(gatewayDto.getGatewayPort());
            gw.setGatewaySuffix(gatewayDto.getGatewaySuffix());
            gw.setGatwwayPrefix(gatewayDto.getGatwwayPrefix());
            gw.setStatus(GatewayStatus.NEW);

            return gatewayRepository.save(gw);
        }).get();

        GatewayDto gwdR = new GatewayDto();
        gwdR.setProtocolId(gwR.getProtocol().getProtocolId());
        gwdR.setGatewayId(gwR.getGatewayId());
        gwdR.setGatewayIp(gwR.getGatewayIp());
        gwdR.setGatewayPort(gwR.getGatewayPort());
        gwdR.setGatewaySuffix(gwR.getGatewaySuffix());
        gwdR.setGatwwayPrefix(gwR.getGatwwayPrefix());
        gwdR.setDeviceLimit(gwR.getDeviceLimit());
        gwdR.setDeviceCount(gwR.getDeviceCount());
        gwdR.setStatus(gwR.getStatus().toString());

        return gwdR;
    }

    @Override
    public List<GatewayDto> getAllGateways() {
        return gatewayRepository.findAll().stream().map(gwR -> {
            GatewayDto gwdR = new GatewayDto();
            gwdR.setProtocolId(gwR.getProtocol().getProtocolId());
            gwdR.setGatewayId(gwR.getGatewayId());
            gwdR.setGatewayIp(gwR.getGatewayIp());
            gwdR.setGatewayPort(gwR.getGatewayPort());
            gwdR.setGatewaySuffix(gwR.getGatewaySuffix());
            gwdR.setGatwwayPrefix(gwR.getGatwwayPrefix());
            gwdR.setDeviceLimit(gwR.getDeviceLimit());
            gwdR.setDeviceCount(gwR.getDeviceCount());
            gwdR.setStatus(gwR.getStatus().toString());

            return gwdR;
        }).collect(Collectors.toList());
    }

    @Override
    public GatewayDto getGatewayByGatewayId(Long gatewayId) {
        return gatewayRepository.findById(gatewayId).map(gwR ->{
            GatewayDto gwdR = new GatewayDto();
            gwdR.setProtocolId(gwR.getProtocol().getProtocolId());
            gwdR.setGatewayId(gwR.getGatewayId());
            gwdR.setGatewayIp(gwR.getGatewayIp());
            gwdR.setGatewayPort(gwR.getGatewayPort());
            gwdR.setGatewaySuffix(gwR.getGatewaySuffix());
            gwdR.setGatwwayPrefix(gwR.getGatwwayPrefix());
            gwdR.setDeviceLimit(gwR.getDeviceLimit());
            gwdR.setDeviceCount(gwR.getDeviceCount());
            gwdR.setStatus(gwR.getStatus().toString());

            return gwdR;
        }).get();
    }




    @Override
    public List<GatewayDto> gatAllGatewayByProtocolId(Long protocolId) {
        return gatewayRepository.findByProtocolProtocolId(protocolId).stream().map(gwR ->{
            GatewayDto gwdR = new GatewayDto();
            gwdR.setProtocolId(gwR.getProtocol().getProtocolId());
            gwdR.setGatewayId(gwR.getGatewayId());
            gwdR.setGatewayIp(gwR.getGatewayIp());
            gwdR.setGatewayPort(gwR.getGatewayPort());
            gwdR.setGatewaySuffix(gwR.getGatewaySuffix());
            gwdR.setGatwwayPrefix(gwR.getGatwwayPrefix());
            gwdR.setDeviceLimit(gwR.getDeviceLimit());
            gwdR.setDeviceCount(gwR.getDeviceCount());
            gwdR.setStatus(gwR.getStatus().toString());

            return gwdR;
        }).collect(Collectors.toList());
    }
}

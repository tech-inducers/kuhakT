package com.kuhak.controller.service.impl;

import com.kuhak.controller.dto.ProtocolDto;
import com.kuhak.controller.entity.Protocol;
import com.kuhak.controller.repository.ProtocolRepository;
import com.kuhak.controller.service.ProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ProtocolServiceImpl implements ProtocolService{

    @Autowired
    ProtocolRepository protocolRepository;
    @Override
    public ProtocolDto createOrUpdate(ProtocolDto protocolDto) {
        Protocol protocol = new Protocol();
        protocol.setProtocolName(protocolDto.getProtocolName());
        Protocol protocolR = protocolRepository.save(protocol);
        ProtocolDto protocolDtoR = new ProtocolDto();
        protocolDtoR.setProtocolId(protocolR.getProtocolId());
        protocolDtoR.setProtocolName(protocolR.getProtocolName());
        return protocolDtoR;
    }

    @Override
    public List<ProtocolDto> getAllProtocol() {

        return protocolRepository.findAll().stream().map(protocol -> {
            ProtocolDto protocolDtoR = new ProtocolDto();
            protocolDtoR.setProtocolId(protocol.getProtocolId());
            protocolDtoR.setProtocolName(protocol.getProtocolName());
            return protocolDtoR;
        }).collect(Collectors.toList());
    }

    @Override
    public ProtocolDto getProtocolByProtocolName(String protocolName) {
        return protocolRepository.findByProtocolName(protocolName).map(protocol -> {
            ProtocolDto protocolDtoR = new ProtocolDto();
            protocolDtoR.setProtocolId(protocol.getProtocolId());
            protocolDtoR.setProtocolName(protocol.getProtocolName());
            return protocolDtoR;
        }).get();
    }

    @Override
    public ProtocolDto getProtocolByProtocolId(Long id) {
        return protocolRepository.findById(id).map(protocol -> {
            ProtocolDto protocolDtoR = new ProtocolDto();
            protocolDtoR.setProtocolId(protocol.getProtocolId());
            protocolDtoR.setProtocolName(protocol.getProtocolName());
            return protocolDtoR;
        }).get();
    }
}

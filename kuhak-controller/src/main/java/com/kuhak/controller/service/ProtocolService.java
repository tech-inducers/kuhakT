package com.kuhak.controller.service;


import com.kuhak.controller.dto.ProtocolDto;
import com.kuhak.controller.entity.Protocol;

import java.util.List;

public interface ProtocolService {

    ProtocolDto createOrUpdate(ProtocolDto protocolDto);
    List<ProtocolDto> getAllProtocol();

    ProtocolDto getProtocolByProtocolName(String protocolName);

    ProtocolDto getProtocolByProtocolId(Long id);


}

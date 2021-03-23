package com.kuhak.controller.rest;

import com.kuhak.controller.dto.ProtocolDto;
import com.kuhak.controller.service.ProtocolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collector;

@RestController
@CrossOrigin(origins = "*")
public class ProtocolController {

    @Autowired
    private ProtocolService protocolService;

    @GetMapping("/api/protocol")
    public List<ProtocolDto> getAllProtocol(){
        return protocolService.getAllProtocol();
    }

    @PostMapping("/api/protocol")
    public ProtocolDto createProtocol(@Valid @RequestBody ProtocolDto pd){
        return protocolService.createOrUpdate(pd);
    }
}

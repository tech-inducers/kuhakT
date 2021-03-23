package com.kuhak.controller.rest;

import com.kuhak.controller.dto.GatewayDto;
import com.kuhak.controller.service.GatewayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @GetMapping("/api/gateway")
    public List<GatewayDto> gatAllGateway(){
        return gatewayService.getAllGateways();
    }

    @GetMapping("/api/protocol/{protocolId}/gateways")
    public List<GatewayDto> getAllGatewaysByProtocolId(@PathVariable (value = "protocolId") Long protocolId){
        return gatewayService.gatAllGatewayByProtocolId(protocolId);
    }

    @PostMapping("/api/gateway")
    public GatewayDto createGateway(@RequestBody GatewayDto gwd){
        return gatewayService.createOrUpdateGateway(gwd);
    }
}

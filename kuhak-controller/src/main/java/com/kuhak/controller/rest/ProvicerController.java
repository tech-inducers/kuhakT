package com.kuhak.controller.rest;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.service.ProviderService;
import com.kuhak.controller.util.ProviderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/provider")
public class ProvicerController {

    @Autowired
    private ProviderService providerService;

    @Autowired
    private ProviderMapper providerMapper;

    //get all provider
    @GetMapping
    public List<ProviderDto> getAllProviderDtos(){
        return providerService.getAllProvider().stream().map(p -> providerMapper.mapProviderToProviderDto(p)).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProviderDto getProviderById(@PathVariable (value = "id") Long providerId){
        Provider provider = providerService.getProvider(providerId);
        return providerMapper.mapProviderToProviderDto(provider);
    }

    // Create Provider
    @PostMapping
    public ProviderDto createProvider(@RequestBody ProviderDto providerDto){
        Provider provider = providerService.createORupdateProvider(providerMapper.mapProviderDtoToProvider(providerDto));
        return providerMapper.mapProviderToProviderDto(provider);
    }
}

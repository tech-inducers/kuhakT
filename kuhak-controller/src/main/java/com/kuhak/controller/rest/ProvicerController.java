package com.kuhak.controller.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.service.ProviderService;
import com.kuhak.controller.util.ProviderMapper;

@RestController
@RequestMapping("/api/provider")
@CrossOrigin(origins = "*")
public class ProvicerController {

	@Autowired
	private ProviderService providerService;

	@Autowired
	private ProviderMapper providerMapper;

	// get all provider
	@GetMapping
	public List<ProviderDto> getAllProviderDtos() {
		return providerService.getAllProvider().stream().map(p -> providerMapper.mapProviderToProviderDto(p))
				.collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ProviderDto getProviderById(@PathVariable(value = "id") Long providerId) {
		Provider provider = providerService.getProvider(providerId);
		return providerMapper.mapProviderToProviderDto(provider);
	}

	@GetMapping("/externalid/{extid}")
	public ProviderDto getProviderByExtId(@PathVariable(value = "extid") Long providerExtId) {
		Provider provider = providerService.getProviderByExtId(providerExtId);
		return providerMapper.mapProviderToProviderDto(provider);
	}

	// Create Provider
	@PostMapping
	public ProviderDto createProvider(@RequestBody ProviderDto providerDto) {
		Provider provider = providerService
				.createORupdateProvider(providerMapper.mapProviderDtoToProvider(providerDto));
		return providerMapper.mapProviderToProviderDto(provider);
	}

	// Status Change
	@PostMapping("/status-change")
	public ResponseEntity<?> changeStatus(@Valid @RequestBody ProviderDto provider) {
		try {
			return new ResponseEntity<ProviderDto>(providerService.changeStatus(provider), HttpStatus.OK);
		} catch (Exception Ex) {
			return new ResponseEntity<ProviderDto>(providerService.changeStatus(provider), HttpStatus.OK);
		}
	}
}

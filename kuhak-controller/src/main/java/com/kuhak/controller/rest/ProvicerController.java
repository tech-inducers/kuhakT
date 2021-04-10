package com.kuhak.controller.rest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.kuhak.controller.exception.ResourceNotFoundException;
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
	public ProviderDto getProviderByExtId(@PathVariable(value = "extid") String providerExtId) {
		Provider provider = providerService.getProviderByExtId(providerExtId);
		return providerMapper.mapProviderToProviderDto(provider);
	}

	// Create Provider
	@PostMapping
	public ProviderDto createProvider(@RequestBody ProviderDto providerDto) {
		providerDto.setStatus("NEW");
		Provider provider = providerService
				.createORupdateProvider(providerMapper.mapProviderDtoToProvider(providerDto));
		return providerMapper.mapProviderToProviderDto(provider);
	}

	// Status Change
	@PostMapping("/update")
	public ResponseEntity<?> changeStatus(@Valid @RequestBody ProviderDto provider) {
		try {
			return new ResponseEntity<ProviderDto>(providerService.update(provider), HttpStatus.OK);
		} catch (Exception Ex) {
			throw new ResourceNotFoundException("Error while changing the status of provider with ID ===>"
					+provider.getProviderId());
		}
	}

	@PostMapping("/activate")
	public ResponseEntity<?> activate(@Valid @RequestBody ProviderDto provider) {
		ProviderDto providerToActivated = providerMapper.mapProviderToProviderDto(providerService.getProvider(provider.getProviderId()));
		providerToActivated.setStatus("ACTIVE");
		provider.setActivated_on(LocalDateTime.now());
			try {
				return new ResponseEntity<ProviderDto>(providerService.update(providerToActivated), HttpStatus.OK);
			} catch (Exception Ex) {
				throw new ResourceNotFoundException("Error while activating provider with ID ===>"
						+ provider.getProviderId());
			}

	}

	@PostMapping("/deactivate")
	public ResponseEntity<?> deactivate(@Valid @RequestBody ProviderDto provider) {
		ProviderDto providerToDeActivated = providerMapper.mapProviderToProviderDto(providerService.getProvider(provider.getProviderId()));
		providerToDeActivated.setStatus("DEACTIVE");
		provider.setValidUpto(LocalDateTime.now());
			try {
				return new ResponseEntity<ProviderDto>(providerService.update(providerToDeActivated), HttpStatus.OK);
			} catch (Exception Ex) {
				throw new ResourceNotFoundException("Error while activating provider with ID ===>"
						+ provider.getProviderId());
			}

	}
}

package com.kuhak.controller.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.ProviderRepository;
import com.kuhak.controller.service.ProviderService;
import com.kuhak.controller.util.ProviderMapper;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private ProviderRepository providerRepo;

	@Autowired
	private ProviderMapper providerMapper;

	@Override
	public Provider createORupdateProvider(Provider provider) {
		return providerRepo.save(provider);
	}

	@Override
	public List<Provider> getAllProvider() {
		return providerRepo.findAll();

	}

	@Override
	public Provider getProvider(Long providerId) {
		return providerRepo.findById(providerId).orElseThrow(
				() -> new ResourceNotFoundException("Provider not found with id :" + providerId.toString()));

	}

	@Override
	public void deleteProvider(Long providerId) {

	}

	@Override
	public ProviderDto changeStatus(ProviderDto provider) {
		Provider updatedProvider = providerRepo.saveAndFlush(providerMapper.mapProviderDtoToProvider(provider));
		return providerMapper.mapProviderToProviderDto(updatedProvider);
	}
}

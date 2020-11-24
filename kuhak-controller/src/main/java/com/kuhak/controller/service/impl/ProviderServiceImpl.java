package com.kuhak.controller.service.impl;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.repository.ProviderRepository;
import com.kuhak.controller.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProviderServiceImpl implements ProviderService {

    @Autowired
    private ProviderRepository providerRepo;

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
        Optional<Provider> provider = providerRepo.findById(providerId);
        if(provider.isPresent()){
            return provider.get();
        }else{
            return null;
        }
    }

    @Override
    public void deleteProvider(Long providerId) {

    }
}

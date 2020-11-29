package com.kuhak.controller.service;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProviderService {

        Provider createORupdateProvider(Provider providerReq);
        List<Provider> getAllProvider();
        Provider getProvider(Long providerId);
        void deleteProvider(Long providerId);

}

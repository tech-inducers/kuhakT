package com.kuhak.controller.service;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ProviderService {

        public Provider createORupdateProvider(Provider providerReq);
        public List<Provider> getAllProvider();
        public Provider getProvider(Long providerId);
        public void deleteProvider(Long providerId);

}

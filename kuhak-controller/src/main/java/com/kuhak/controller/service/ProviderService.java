package com.kuhak.controller.service;

import java.util.List;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;

public interface ProviderService {

	Provider createORupdateProvider(Provider providerReq);

	List<Provider> getAllProvider();

	Provider getProvider(Long providerId);

	Provider getProviderByExtId(Long providerExtId);

	void deleteProvider(Long providerId);

	ProviderDto update(ProviderDto device);

}

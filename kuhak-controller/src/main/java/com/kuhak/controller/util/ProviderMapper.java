package com.kuhak.controller.util;

import com.kuhak.controller.dto.ProviderDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.entity.ProviderStatus;

public class ProviderMapper {

    public static ProviderDto mapProviderToProviderDto(Provider provider){
        ProviderDto providerDto = new ProviderDto();
        providerDto.setProviderExtId(provider.getProviderExtId());
        providerDto.setStatus(provider.getStatus().toString());
        providerDto.setProviderName(provider.getProviderName());
        providerDto.setActivated_on(provider.getActivated_on());
        providerDto.setValidUpto(provider.getValidUpto());

        return providerDto;
    }

    public static Provider mapProviderDtoToProvider(ProviderDto providerDto){
        Provider provider = new Provider();
        provider.setProviderExtId(providerDto.getProviderExtId());
        provider.setProviderName(providerDto.getProviderName());
        provider.setStatus(ProviderStatus.valueOf(providerDto.getStatus()));
        provider.setActivated_on(providerDto.getActivated_on());
        provider.setValidUpto(providerDto.getValidUpto());

        return provider;
    }
}

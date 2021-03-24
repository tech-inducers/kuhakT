package com.kuhak.controller.util;

import com.kuhak.controller.entity.*;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.GatewayRepository;
import com.kuhak.controller.repository.ProtocolRepository;
import com.kuhak.controller.service.GatewayService;
import com.kuhak.controller.service.ProtocolService;
import net.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.service.UserService;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class DeviceMapper {

	@Autowired
	UserService userService;

	/*@Autowired
	ProtocolService protocolService;*//*

	@Autowired
	GatewayService gatewayService;*/

	@Autowired
	ProtocolRepository protocolRepository;

	@Autowired
	GatewayRepository gatewayRepository;

	public DeviceDto mapDeviceToDeviceDto(Device device) {
		DeviceDto deviceDto = new DeviceDto();
		deviceDto.setDeviceExtId(device.getDeviceExtId());
		deviceDto.setDeviceId(device.getDeviceId());
		deviceDto.setDeviceName(device.getDeviceName());
		deviceDto.setStatus(device.getStatus().toString());
		deviceDto.setActivated_on(device.getActivated_on());
		deviceDto.setValidUpto(device.getValidUpto());
		deviceDto.setUserId(device.getUser().getUserId());

		return deviceDto;
	}

	public Device mapDeviceDtoToDevice(DeviceDto deviceDto) {
		Device device = new Device();
		device.setDeviceExtId(deviceDto.getDeviceExtId());
		device.setDeviceId(deviceDto.getDeviceId());
		device.setDeviceName(deviceDto.getDeviceName());
		device.setStatus(DeviceStatus.valueOf(deviceDto.getStatus()));
		device.setActivated_on(deviceDto.getActivated_on());
		device.setValidUpto(deviceDto.getValidUpto());
		device.setUser(userService.getUserById(deviceDto.getUserId()));
		device.setDeviceType(DeviceType.valueOf(deviceDto.getDeviceType()));
		/*if(protocolRepository.findById(deviceDto.getProtocolId()).isPresent()){
			System.out.println(protocolRepository.findById(deviceDto.getProtocolId()).get().getProtocolId());
			device.setProtocol(protocolRepository.findById(deviceDto.getProtocolId()).get());
		}
		List<Gateway> gwL =gatewayRepository.findByProtocolProtocolId(deviceDto.getProtocolId()).stream()
				.filter(gw -> gw.getDeviceCount()< gw.getDeviceLimit()).collect(Collectors.toList());
		if(gwL.size() != 0){
			if(gwL.stream().sorted().findFirst().isPresent()){
				System.out.println(gwL.stream().sorted().findFirst().get().getGatewayId());
				device.setGateway(gwL.stream().sorted().findFirst().get());
			}
		}*/
		Optional<Protocol> pro = protocolRepository.findById(deviceDto.getProtocolId());
		if(pro.isPresent()){
			device.setProtocol(pro.get());
		}else{
			throw new ResourceNotFoundException("Protocol details not found with protocol id supplied ===>"
					+deviceDto.getProtocolId());
		}
		Optional<Gateway> gateway = gatewayRepository.findByProtocolProtocolId(deviceDto.getProtocolId())
				.stream().filter(gw -> gw.getDeviceCount()< gw.getDeviceLimit())
				.sorted(Comparator.comparing(Gateway::getGatewayId)).findFirst();

		if(gateway.isPresent()){
			device.setGateway(gateway.get());
		}else{
			throw new ResourceNotFoundException("No gateway found for the protocol id supplied ====>"
			+deviceDto.getProtocolId());
		}



		return device;
	}
}

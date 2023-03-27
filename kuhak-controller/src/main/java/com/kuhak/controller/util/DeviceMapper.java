package com.kuhak.controller.util;

import com.kuhak.controller.entity.*;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.DeviceGroupRepository;
import com.kuhak.controller.repository.GatewayRepository;
import com.kuhak.controller.repository.ProtocolRepository;
import com.kuhak.controller.service.DeviceGroupService;
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
	DeviceGroupService deviceGroupService;




	public DeviceDto mapDeviceToDeviceDto(Device device ) {
		DeviceDto deviceDto = new DeviceDto();
		deviceDto.setDeviceExtId(device.getDeviceExtId());
		deviceDto.setDeviceId(device.getDeviceId());
		deviceDto.setDeviceName(device.getDeviceName());
		deviceDto.setStatus(device.getStatus().toString());
		deviceDto.setActivated_on(device.getActivated_on());
		deviceDto.setValidUpto(device.getValidUpto());
		//deviceDto.setUserId(device.getUser().getUserId());
		deviceDto.setDeviceType(device.getDeviceType().toString());
		deviceDto.setDeviceGroupId(device.getDeviceGroup().getDeviceGroupId());
		//deviceDto.setProtocolId(device.getProtocol().getProtocolId());


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
		//device.setUser(userService.getUserById(deviceDto.getUserId()));
		device.setDeviceType(DeviceType.valueOf(deviceDto.getDeviceType()));
		device.setDeviceGroup(deviceGroupService.getDeviceGroupById(deviceDto.getDeviceGroupId()));




		return device;
	}
}

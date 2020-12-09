package com.kuhak.controller.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.entity.DeviceStatus;
import com.kuhak.controller.service.UserService;

@Component
public class DeviceMapper {

	@Autowired
	UserService userService;

	public DeviceDto mapDeviceToDeviceDto(Device device) {
		DeviceDto deviceDto = new DeviceDto();
		deviceDto.setDeviceExtId(device.getDeviceExtId());
		deviceDto.setDeviceName(device.getDeviceName());
		deviceDto.setStatus(device.getStatus().toString());
		deviceDto.setActivated_on(device.getActivated_on());
		deviceDto.setValidUpto(device.getValidUpto());

		return deviceDto;
	}

	public Device mapDeviceDtoToDevice(DeviceDto deviceDto) {
		Device device = new Device();
		device.setDeviceExtId(deviceDto.getDeviceExtId());
		device.setDeviceName(deviceDto.getDeviceName());
		device.setStatus(DeviceStatus.valueOf(deviceDto.getStatus()));
		device.setActivated_on(deviceDto.getActivated_on());
		device.setValidUpto(deviceDto.getValidUpto());
		device.setUser(userService.getUserById(deviceDto.getUserId()));

		return device;
	}
}

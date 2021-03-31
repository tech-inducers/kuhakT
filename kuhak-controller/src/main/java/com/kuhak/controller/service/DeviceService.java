package com.kuhak.controller.service;

import java.util.List;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.entity.Gateway;

public interface DeviceService {
	Device createOrUpdateDevice(Device device);

	List<Device> getAllDevice();

	Device getDeviceById(Long id);

	Device getDeviceByExtId(Long extId);

	void deleteDevice(Long id);

	DeviceDto update(DeviceDto device);
}

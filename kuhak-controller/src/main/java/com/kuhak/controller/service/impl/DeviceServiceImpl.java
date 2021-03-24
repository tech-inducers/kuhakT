package com.kuhak.controller.service.impl;

import java.util.List;
import java.util.Optional;

import com.kuhak.controller.entity.Gateway;
import com.kuhak.controller.repository.GatewayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.DeviceRepository;
import com.kuhak.controller.service.DeviceService;
import com.kuhak.controller.util.DeviceMapper;

@Service
public class DeviceServiceImpl implements DeviceService {

	@Autowired
	DeviceRepository deviceRepo;

	@Autowired
	GatewayRepository gatewayRepository;

	@Autowired
	DeviceMapper deviceMapper;

	@Override
	public Device createOrUpdateDevice(Device device) {
		Device d = deviceRepo.save(device);
		incrementGatewayDeviceCount(device.getGateway().getGatewayId());
		return d;
	}

	@Override
	public List<Device> getAllDevice() {
		return deviceRepo.findAll();
	}

	@Override
	public Device getDeviceById(Long deviceId) {
		return deviceRepo.findById(deviceId)
				.orElseThrow(() -> new ResourceNotFoundException("Device not found with id:" + deviceId.toString()));

	}

	@Override
	public Device getDeviceByExtId(Long extId) {
		return deviceRepo.findByDeviceExtId(extId).orElseThrow(()-> new ResourceNotFoundException(
				"Device not found with id"+ extId.toString()
		));
	}

	@Override
	public void deleteDevice(Long deviceId) {

	}

	@Override
	public DeviceDto changeStatus(DeviceDto device) {

		Device updatedDevice = deviceRepo.saveAndFlush(deviceMapper.mapDeviceDtoToDevice(device));
		return deviceMapper.mapDeviceToDeviceDto(updatedDevice);
	}

	private void incrementGatewayDeviceCount(Long gatewayId){
		Gateway gwO = gatewayRepository.findById(gatewayId).get();
		gwO.setDeviceCount(gwO.getDeviceCount()+1);
		gatewayRepository.save(gwO);
	}
}

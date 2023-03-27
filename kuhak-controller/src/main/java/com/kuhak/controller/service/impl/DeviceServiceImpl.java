package com.kuhak.controller.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.kuhak.controller.entity.Gateway;
import com.kuhak.controller.repository.GatewayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.DeviceRepository;
import com.kuhak.controller.service.DeviceService;
//import com.kuhak.controller.util.DeviceMapper;

@Service
public class DeviceServiceImpl implements DeviceService {

	@Autowired
	DeviceRepository deviceRepo;

	@Autowired
	GatewayRepository gatewayRepository;

//	@Autowired
//	DeviceMapper deviceMapper;

	@Override
	public Device createOrUpdateDevice(Device device) {
		Device d = deviceRepo.save(device);
		//incrementGatewayDeviceCount(device.getGateway().getGatewayId());
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

//	@Override
////	public Device getDeviceByExtId(String extId) {
////		return deviceRepo.findByDeviceExtId(extId).orElseThrow(()-> new ResourceNotFoundException(
////				"Device not found with id"+ extId.toString()
////		));
////	}

	@Override
	public void deleteDevice(Long deviceId) {

	}



	@Override
	public Device update(Device device) {

		/*Device updatedDevice = deviceRepo.saveAndFlush(deviceMapper.mapDeviceDtoToDevice(device));
		return deviceMapper.mapDeviceToDeviceDto(updatedDevice);*/

		/*Optional<Device> deviceO = deviceRepo.findById(device.getDeviceId());
		if(!deviceO.isPresent()){
			System.out.println(deviceO.isPresent());
			throw new ResourceNotFoundException("Device not found with id:"
					+device.getDeviceId()+" ext id:"+device.getDeviceExtId());
		}
		Optional<Device> deviceEntity = deviceRepo.findById(device.getDeviceId());
		Gateway gatewayForDevice = deviceEntity.get().getGateway();
		Device deviceToUpdate = deviceMapper.mapDeviceDtoToDevice(device);
		deviceToUpdate.setGateway(gatewayForDevice);
		Device updatedDevice = deviceRepo.saveAndFlush(deviceToUpdate);
		return deviceMapper.mapDeviceToDeviceDto(updatedDevice);*/
		Optional<Device> deviceO = deviceRepo.findById(device.getDeviceId());
		if(!deviceO.isPresent()){
			System.out.println(deviceO.isPresent());
			throw new ResourceNotFoundException("Device not found with id:"
					+device.getDeviceId()+" ext id:"+device.getDeviceExtId());
		}
//		Gateway gatewayForDevice = deviceO.get().getGateway();
//		device.setGateway(gatewayForDevice);
		return deviceRepo.saveAndFlush(device);
	}

	@Override
	public List<DeviceDto> getAllDeviceByDeviceGroupId(Long deviceGroupId) {
		return deviceRepo.findByDeviceGroupDeviceGroupId(deviceGroupId).stream().map(devR ->{
			DeviceDto deviceDto = new DeviceDto();
			deviceDto.setDeviceId(devR.getDeviceId());
			deviceDto.setDeviceExtId(devR.getDeviceExtId());
			deviceDto.setDeviceName(devR.getDeviceName());
			deviceDto.setStatus(devR.getStatus().toString());
			deviceDto.setDeviceType(devR.getDeviceType().toString());
			//devdR.setUserId(devR.getUser().getUserId());
			deviceDto.setDeviceGroupId(devR.getDeviceGroup().getDeviceGroupId());
			deviceDto.setValidUpto(devR.getValidUpto());
			deviceDto.setActivated_on(devR.getActivated_on());
			//deviceDto.setProtocolId(devR.getProtocol().getProtocolId());
			 return deviceDto;
		}).collect(Collectors.toList());

	}

	private void incrementGatewayDeviceCount(Long gatewayId){
		Gateway gwO = gatewayRepository.findById(gatewayId).get();
		gwO.setDeviceCount(gwO.getDeviceCount()+1);
		gatewayRepository.save(gwO);
	}
}

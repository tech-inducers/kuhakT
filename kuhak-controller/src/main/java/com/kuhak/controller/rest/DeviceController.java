package com.kuhak.controller.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.service.DeviceService;
import com.kuhak.controller.util.DeviceMapper;

@RestController
@RequestMapping("/api/device")
@CrossOrigin(origins = "*")
public class DeviceController {

	@Autowired
	DeviceService deviceService;

	@Autowired
	DeviceMapper deviceMapper;

	// get all user
	@GetMapping
	public List<DeviceDto> getAllDevice() {
		return deviceService.getAllDevice().stream().map(device -> deviceMapper.mapDeviceToDeviceDto(device))
				.collect(Collectors.toList());
	}

	// Get User by Id
	@GetMapping("/{id}")
	public DeviceDto getDeviceById(@PathVariable(value = "id") Long deviceId) {
		Device device = deviceService.getDeviceById(deviceId);
		return deviceMapper.mapDeviceToDeviceDto(device);
	}

	// Create User
	@PostMapping
	public DeviceDto createDevice(@RequestBody DeviceDto deviceDto) {
		Device device = deviceService.createOrUpdateDevice(deviceMapper.mapDeviceDtoToDevice(deviceDto));
		return deviceMapper.mapDeviceToDeviceDto(device);
	}

	//Status Change
	@PostMapping("/status-change")
	public ResponseEntity<?> changeStatus(@Valid @RequestBody DeviceDto device) {
		try {
			return new ResponseEntity<DeviceDto>(deviceService.changeStatus(device), HttpStatus.OK);
		} catch (Exception Ex) {
			return new ResponseEntity<DeviceDto>(deviceService.changeStatus(device), HttpStatus.OK);
		}
	}
}

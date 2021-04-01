package com.kuhak.controller.rest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.kuhak.controller.exception.ResourceNotFoundException;
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


	@GetMapping("/{id}")
	public DeviceDto getDeviceById(@PathVariable(value = "id") Long deviceId) {
		Device device = deviceService.getDeviceById(deviceId);
		return deviceMapper.mapDeviceToDeviceDto(device);
	}

	@GetMapping("/externalid/{extid}")
	public DeviceDto getDeviceByExtId(@PathVariable(value = "extid") Long deviceExtId) {
		Device device = deviceService.getDeviceByExtId(deviceExtId);
		return deviceMapper.mapDeviceToDeviceDto(device);
	}


	@PostMapping
	public DeviceDto createDevice(@RequestBody DeviceDto deviceDto) {
		deviceDto.setStatus("NEW");
		Device device = deviceService.createOrUpdateDevice(deviceMapper.mapDeviceDtoToDevice(deviceDto));
		return deviceMapper.mapDeviceToDeviceDto(device);
	}

	//Status Change
	@PostMapping("/update")
	public ResponseEntity<?> update(@Valid @RequestBody DeviceDto device) {
		try {
			return new ResponseEntity<DeviceDto>(deviceService.update(device), HttpStatus.OK);
		} catch (Exception Ex) {
			throw new ResourceNotFoundException("Error while changing the status of Device with ID ===>"
					+device.getDeviceId());
		}
	}

	@PostMapping("/activate")
	public ResponseEntity<?> activate(@Valid @RequestBody DeviceDto device) {
		DeviceDto deviceToActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()));
		deviceToActivated.setStatus("ACTIVE"); ;
		deviceToActivated.setActivated_on(LocalDateTime.now());
			try {
				return new ResponseEntity<DeviceDto>(deviceService.update(deviceToActivated), HttpStatus.OK);
			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw new ResourceNotFoundException("Error while activating Device with ID ===>"
						+ device.getDeviceId());
			}

	}

	@PostMapping("/dactivate")
	public ResponseEntity<?> dactivate(@Valid @RequestBody DeviceDto device) {
		DeviceDto deviceToDeActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()));
		deviceToDeActivated.setStatus("DEACTIVE");
		deviceToDeActivated.setValidUpto(LocalDateTime.now());
			try {
				return new ResponseEntity<DeviceDto>(deviceService.update(deviceToDeActivated), HttpStatus.OK);
			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw new ResourceNotFoundException("Error while deactivating Device with ID ===>"
						+ device.getDeviceId());
			}

	}

	@GetMapping("/getalldevice/user/{userid}")
	public List<DeviceDto> getAllDeviceByUserId(@PathVariable (value = "userid") Long userId){
		return deviceService.getAllDeviceByUserId(userId);
	}
}

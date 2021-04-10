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
		Boolean isCreae = false;
		return deviceService.getAllDevice().stream().map(device -> deviceMapper.mapDeviceToDeviceDto(device, isCreae))
				.collect(Collectors.toList());
	}


	@GetMapping("/{id}")
	public DeviceDto getDeviceById(@PathVariable(value = "id") Long deviceId) {
		Boolean isCreae = false;
		Device device = deviceService.getDeviceById(deviceId);
		return deviceMapper.mapDeviceToDeviceDto(device, isCreae);
	}

	@GetMapping("/externalid/{extid}")
	public DeviceDto getDeviceByExtId(@PathVariable(value = "extid") String deviceExtId) {
		Boolean isCreae = false;
		Device device = deviceService.getDeviceByExtId(deviceExtId);
		return deviceMapper.mapDeviceToDeviceDto(device, isCreae);
	}


	@PostMapping
	public DeviceDto createDevice(@RequestBody DeviceDto deviceDto) {
		Boolean isCreate = true;
		deviceDto.setStatus("NEW");
		Device device = deviceService.createOrUpdateDevice(deviceMapper.mapDeviceDtoToDevice(deviceDto, isCreate));
		return deviceMapper.mapDeviceToDeviceDto(device, isCreate);
	}

	//Status Change
	@PostMapping("/update")
	public ResponseEntity<?> update(@Valid @RequestBody DeviceDto device) {
		Boolean isCreae = false;
		try {

			/*return new ResponseEntity<DeviceDto> deviceService.update
					(deviceMapper.mapDeviceDtoToDevice(device,isCreae)),isCreae), HttpStatus.OK);*/
			Device deviceE = deviceMapper.mapDeviceDtoToDevice(device,isCreae);
			deviceE = deviceService.update(deviceE);
			return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE,isCreae), HttpStatus.OK);
		} catch (Exception Ex) {
			throw new ResourceNotFoundException("Error while changing the status of Device with ID ===>"
					+device.getDeviceId());
		}
	}

	@PostMapping("/activate")
	public ResponseEntity<?> activate(@Valid @RequestBody DeviceDto device) {
		Boolean isCreae = false;
		DeviceDto deviceToActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()),isCreae);
		deviceToActivated.setStatus("ACTIVE"); ;
		deviceToActivated.setActivated_on(LocalDateTime.now());
			try {
				Device deviceE = deviceMapper.mapDeviceDtoToDevice(deviceToActivated,isCreae);
				deviceE = deviceService.update(deviceE);
				return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE,isCreae)
						, HttpStatus.OK);
			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw new ResourceNotFoundException("Error while activating Device with ID ===>"
						+ device.getDeviceId());
			}

	}

	@PostMapping("/dactivate")
	public ResponseEntity<?> dactivate(@Valid @RequestBody DeviceDto device) {
		Boolean isCreae = false;
		DeviceDto deviceToDeActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()), isCreae);
		deviceToDeActivated.setStatus("DEACTIVE");
		deviceToDeActivated.setValidUpto(LocalDateTime.now());
			try {
				Device deviceE = deviceMapper.mapDeviceDtoToDevice(deviceToDeActivated,isCreae);
				deviceE = deviceService.update(deviceE);
				return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE,isCreae), HttpStatus.OK);
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

package com.kuhak.controller.rest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.kuhak.controller.dto.AppDto;
import com.kuhak.controller.entity.Gateway;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.service.ProtocolService;
import com.kuhak.controller.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.service.DeviceService;
import com.kuhak.controller.util.DeviceMapper;

@RestController
@RequestMapping("/api/device")
@CrossOrigin(origins = "*")
public class  DeviceController {

	@Autowired
	DeviceService deviceService;


	@Autowired
	ProtocolService protocolService;

	@Autowired
	DeviceMapper deviceMapper;

	// get all user
	@GetMapping
	public List<DeviceDto> getAllDevice() {
		Boolean isCreae = false;
		return deviceService.getAllDevice().stream().map(device -> deviceMapper.mapDeviceToDeviceDto
						(device))
				.collect(Collectors.toList());
	}


	@GetMapping("/{id}")
	public DeviceDto getDeviceById(@PathVariable(value = "id") Long deviceId) {
		Boolean isCreae = false;
		Device device = deviceService.getDeviceById(deviceId);
		return deviceMapper.mapDeviceToDeviceDto(device);
	}

//	@GetMapping("/externalid/{extid}")
//	public DeviceDto getDeviceByExtId(@PathVariable(value = "extid") String deviceExtId) {
//		Boolean isCreae = false;
//		Device device = deviceService.getDeviceByExtId(deviceExtId);
//		return deviceMapper.mapDeviceToDeviceDto(device, isCreae);
//	}

//	@PostMapping("/app")
//	public ResponseEntity<?> createApp(@RequestBody AppDto appDto){
//		Boolean isCreate = true;
//		Long userId;
//		try{
//			userId = userService.getUserByExtId(appDto.getUserExtId()).getUserId();
//		}catch(Exception ex){
//			throw new ResourceNotFoundException("Supplied userExtId is not valid");
//		}
//		DeviceDto deviceDto = new DeviceDto();
//		deviceDto.setDeviceExtId(appDto.getAppExtId());
//		deviceDto.setDeviceName(appDto.getAppExtId());
//		deviceDto.setStatus("ACTIVE");
//		deviceDto.setValidUpto(null);
//		deviceDto.setActivated_on(null);
//		deviceDto.setUserId(userId);
//		deviceDto.setDeviceType("MOVIABLE");
//		deviceDto.setProtocolId(protocolService.getProtocolByProtocolName("http").getProtocolId());
//		Device device;
//		try {
//			device = deviceService.createOrUpdateDevice(deviceMapper.mapDeviceDtoToDevice(deviceDto, isCreate));
//		}catch (Exception ex){
//			throw new ResourceNotFoundException("Error while creating app");
//		}
//		Gateway gateway = device.getGateway();
//		String gatewayURL = gateway.getGatwwayPrefix()+gateway.getGatewayIp()+":" +
//				""+gateway.getGatewayPort()+gateway.getGatewaySuffix();
//
//		return new ResponseEntity<String>(gatewayURL, HttpStatus.OK);
//	}
	@PostMapping
	public ResponseEntity<?> createDevice(@RequestBody DeviceDto deviceDto) {
//		Boolean isCreate = true;
//		deviceDto.setStatus("NEW");
		try {
			Device device = deviceService.createDevice(deviceDto);

			return new ResponseEntity<String>("Device created succesfuly with id: "
					+deviceDto.getDeviceId(),HttpStatus.OK);
		}catch (Exception ex){
			ex.printStackTrace();
			throw new RuntimeException("Error while creating device with id: "+deviceDto.getDeviceId());
		}
	}

	//Status Change
	@PostMapping("/update")
	public ResponseEntity<?> update(@Valid @RequestBody DeviceDto device) {
		Boolean isCreae = false;
		try {

			/*return new ResponseEntity<DeviceDto> deviceService.update
					(deviceMapper.mapDeviceDtoToDevice(device,isCreae)),isCreae), HttpStatus.OK);*/
			Device deviceE = deviceMapper.mapDeviceDtoToDevice(device);
			deviceE = deviceService.update(deviceE);
			return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE), HttpStatus.OK);
		} catch (Exception Ex) {
			throw new ResourceNotFoundException("Error while changing the status of Device with ID ===>"
					+device.getDeviceId());
		}
	}

	@PostMapping("/activate")
	public ResponseEntity<?> activate(@Valid @RequestBody DeviceDto device) {
		Boolean isCreae = false;
		DeviceDto deviceToActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()) );
		deviceToActivated.setStatus("ACTIVE"); ;
		deviceToActivated.setActivated_on(LocalDateTime.now());
			try {
				Device deviceE = deviceMapper.mapDeviceDtoToDevice(deviceToActivated);
				deviceE = deviceService.update(deviceE);
				return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE)
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
		DeviceDto deviceToDeActivated = deviceMapper.mapDeviceToDeviceDto(deviceService.getDeviceById(device.getDeviceId()));
		deviceToDeActivated.setStatus("DEACTIVE");
		deviceToDeActivated.setValidUpto(LocalDateTime.now());
			try {
				Device deviceE = deviceMapper.mapDeviceDtoToDevice(deviceToDeActivated);
				deviceE = deviceService.update(deviceE);
				return new ResponseEntity<DeviceDto>(deviceMapper.mapDeviceToDeviceDto(deviceE), HttpStatus.OK);
			} catch (Exception Ex) {
				Ex.printStackTrace();
				throw new ResourceNotFoundException("Error while deactivating Device with ID ===>"
						+ device.getDeviceId());
			}

	}

	@GetMapping("/getalldevice/user/{userid}")
	public List<DeviceDto> getAllDeviceByUserId(@PathVariable (value = "userid") Long userId){
		return deviceService.getAllDeviceByDeviceGroupId(userId);
	}

	@DeleteMapping("/device/{id}")
	public void delete(@PathVariable("id") Long id){
		deviceService.deleteDevice(id);
	}
}

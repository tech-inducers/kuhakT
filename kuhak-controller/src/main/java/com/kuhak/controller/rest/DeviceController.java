package com.kuhak.controller.rest;

import com.kuhak.controller.dto.DeviceDto;
import com.kuhak.controller.entity.Device;
import com.kuhak.controller.service.DeviceService;
import com.kuhak.controller.util.DeviceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/device")
public class DeviceController {

    @Autowired
    DeviceService deviceService;

    @Autowired
    DeviceMapper deviceMapper;

    // get all user
    @GetMapping
    public List<DeviceDto> getAllDevice(){
        return deviceService.getAllDevice().stream().map(device -> deviceMapper.mapDeviceToDeviceDto(device)).collect(Collectors.toList());
    }

    //Get User by Id
    @GetMapping("/{id}")
    public DeviceDto getDeviceById(@PathVariable(value = "id") Long deviceId){
        Device device = deviceService.getDeviceById(deviceId);
        return deviceMapper.mapDeviceToDeviceDto(device);
    }

    //Create User
    @PostMapping
    public DeviceDto createDevice(@RequestBody DeviceDto deviceDto){
        Device device = deviceService.createOrUpdateDevice(deviceMapper.mapDeviceDtoToDevice(deviceDto));
        return deviceMapper.mapDeviceToDeviceDto(device);
    }
}

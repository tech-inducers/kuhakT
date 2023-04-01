package com.kuhak.controller.rest;


import com.kuhak.controller.dto.DeviceGroupDto;
import com.kuhak.controller.entity.DeviceGroup;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.service.DeviceGroupService;
import com.kuhak.controller.util.DeviceGroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/devicegroup")
@CrossOrigin(origins = "*")
public class DeviceGroupController {

    @Autowired
    DeviceGroupService deviceGroupService;

    @Autowired
    DeviceGroupMapper deviceGroupMapper;

    @GetMapping
    public List<DeviceGroupDto> getAllDeviceGroup() {
        return deviceGroupService.getAllDeviceGroup().stream().map(deviceGroup ->
                deviceGroupMapper.mapDeviceGroupToDeviceGroupDto(deviceGroup)).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public DeviceGroupDto getDeviceGroupById(@PathVariable(value = "di") Long deviceGroupId){
            DeviceGroupDto deviceGroupDto = new DeviceGroupDto();
            deviceGroupDto = deviceGroupMapper.mapDeviceGroupToDeviceGroupDto(
                    deviceGroupService.getDeviceGroupById(deviceGroupId));
            return deviceGroupDto;

        }

    @PostMapping
    public DeviceGroupDto createDeviceGroup(@RequestBody DeviceGroupDto deviceGroupDtoIn){

        return deviceGroupMapper.mapDeviceGroupToDeviceGroupDto(deviceGroupService.createDeviceGroup
                (deviceGroupMapper.mapDeviceGroupDtoToDeviceGroup(deviceGroupDtoIn)));
    }

    @PostMapping("/update")
    ResponseEntity<?> update(@Valid @RequestBody DeviceGroupDto deviceGroupDtoIn){

        try{
            return new ResponseEntity<DeviceGroupDto>(deviceGroupMapper.mapDeviceGroupToDeviceGroupDto(deviceGroupService.updateDeviceGroup
                    (deviceGroupMapper.mapDeviceGroupDtoToDeviceGroup(deviceGroupDtoIn))),
                    HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
            throw new ResourceNotFoundException("DeviceGroup not found with deviceGroupId:"+deviceGroupDtoIn.getDeviceGroupId());
        }
    }

    @DeleteMapping("/devicegroup/{id}")
    public void delete(@PathVariable("id") Long id){
        deviceGroupService.deleteDeviceGroup(id);
    }
}

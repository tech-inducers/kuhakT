package com.kuhak.controller.service.impl;

import com.kuhak.controller.entity.DeviceGroup;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.DeviceGroupRepository;
import com.kuhak.controller.service.DeviceGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class DeviceGroupServiceImpl implements DeviceGroupService {


    @Autowired
    DeviceGroupRepository deviceGroupRepository;

    @Override
    public DeviceGroup createDeviceGroup(DeviceGroup deviceGroup) {
        return deviceGroupRepository.save(deviceGroup);
    }

    @Override
    public List<DeviceGroup> getAllDeviceGroup() {
        return deviceGroupRepository.findAll();
    }

    @Override
    public DeviceGroup getDeviceGroupById(Long deviceGroupId) {
        return deviceGroupRepository.findById(deviceGroupId).orElseThrow(()-> new ResourceNotFoundException(
                "DeviceGroup not found with id :" + deviceGroupId.toString()
        ));
    }



    @Override
    public void deleteDeviceGroup(Long deviceGroupId) {
        Optional<DeviceGroup> deviceGroupOp = deviceGroupRepository.findByDeviceGroupId(deviceGroupId);
        if(deviceGroupOp.isPresent()){
            deviceGroupRepository.delete(deviceGroupOp.get());
        } else {
            throw new ResourceNotFoundException("Device Group not found with id :"+deviceGroupId);
        }

    }

    @Override
    public DeviceGroup updateDeviceGroup(DeviceGroup deviceGroup) {

        if(!deviceGroupRepository.existsById(deviceGroup.getDeviceGroupId())){
            throw new ResourceNotFoundException("User not found with id:"+
                    deviceGroup.getDeviceGroupId()+" ext id:"+deviceGroup.getDeviceGroupId());
        }
        return deviceGroupRepository.save(deviceGroup);
    }
}

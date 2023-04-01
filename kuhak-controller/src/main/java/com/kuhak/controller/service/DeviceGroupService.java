package com.kuhak.controller.service;

import com.kuhak.controller.entity.DeviceGroup;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DeviceGroupService {

    public DeviceGroup createDeviceGroup(DeviceGroup deviceGroup);

    public List<DeviceGroup> getAllDeviceGroup();

    public DeviceGroup getDeviceGroupById(Long deviceGroupId);



    public void deleteDeviceGroup (Long deviceGroupId);

    public DeviceGroup updateDeviceGroup(DeviceGroup deviceGroup);
}

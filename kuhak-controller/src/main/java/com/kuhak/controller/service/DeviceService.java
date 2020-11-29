package com.kuhak.controller.service;

import com.kuhak.controller.entity.Device;

import java.util.List;

public interface DeviceService {

    Device createDevice(Device device);
    List<Device> getAllDevice();
    Device getDeviceById(Long id);
    void deleteDevice(Long id);


}

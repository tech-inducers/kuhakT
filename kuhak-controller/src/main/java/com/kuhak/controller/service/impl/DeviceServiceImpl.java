package com.kuhak.controller.service.impl;

import com.kuhak.controller.entity.Device;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.DeviceRepository;
import com.kuhak.controller.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    DeviceRepository deviceRepo;
    @Override
    public Device createOrUpdateDevice(Device device) {
        return deviceRepo.save(device);
    }

    @Override
    public List<Device> getAllDevice() {
        return deviceRepo.findAll();
    }

    @Override
    public Device getDeviceById(Long deviceId) {
        return deviceRepo.findById(deviceId).orElseThrow(() -> new ResourceNotFoundException(
                "Device not found with id:" +deviceId.toString()
        ));

    }

    @Override
    public void deleteDevice(Long deviceId) {

    }
}

package com.kuhak.controller.repository;

import com.kuhak.controller.entity.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceGroupRepository extends JpaRepository<DeviceGroup, Long> {
    Optional<DeviceGroup> findByDeviceGroupId(Long deviceGroupId);
    Optional<DeviceGroup> findByDeviceGroupName(String deviceGroupName);
}

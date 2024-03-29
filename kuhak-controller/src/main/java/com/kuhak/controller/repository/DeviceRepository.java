package com.kuhak.controller.repository;

import com.kuhak.controller.entity.Device;
import com.kuhak.controller.entity.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
	
	Optional<Device> findByDeviceExtId(String deviceExtId);
	//List<Device> findByUserUserId(Long userId);

	List<Device> findByDeviceGroupDeviceGroupId(Long deviceGroupId);
}

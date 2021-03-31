package com.kuhak.controller.repository;

import com.kuhak.controller.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserExtId(Long userExtId);
    List<User> findByProviderProviderId(Long providerId);
}

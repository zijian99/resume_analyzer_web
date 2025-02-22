package com.zj.resume_analyzer.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.zj.resume_analyzer.models.ERole;
import com.zj.resume_analyzer.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}

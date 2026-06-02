package com.dhoinformatica.spring_angular_2026.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhoinformatica.spring_angular_2026.entities.FollowUp;

@Repository
public interface FollowUpRepository extends CrudRepository<FollowUp, UUID> {

}

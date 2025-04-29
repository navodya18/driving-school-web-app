package com.example.drivingschoolbackend.repository;

import com.example.drivingschoolbackend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}

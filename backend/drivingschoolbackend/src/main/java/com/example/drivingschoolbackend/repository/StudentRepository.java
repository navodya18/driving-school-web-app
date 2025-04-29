package com.example.drivingschoolbackend.repository;

import com.example.drivingschoolbackend.entity.Payment;
import com.example.drivingschoolbackend.entity.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentProgress, Integer> {
}


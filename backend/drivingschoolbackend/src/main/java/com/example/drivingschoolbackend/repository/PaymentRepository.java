package com.example.drivingschoolbackend.repository;

import com.example.drivingschoolbackend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}

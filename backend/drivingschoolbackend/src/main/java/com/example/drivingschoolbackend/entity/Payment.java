package com.example.drivingschoolbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table





public class Payment {

    @Id
    @SequenceGenerator(
            name ="payment_sequence",
            sequenceName ="payment_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "payment_sequence"

    )


    private int paymentId;
    private int fullPayment;
    private int currentPayment;
}

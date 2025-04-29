package com.example.drivingschoolbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table



public class Feedback {

    @Id
    @SequenceGenerator(
            name ="feedback_sequence",
            sequenceName ="feedback_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "feedback_sequence"

    )


    private int feedbackId;
    private String comment;
    private LocalDate date;
}

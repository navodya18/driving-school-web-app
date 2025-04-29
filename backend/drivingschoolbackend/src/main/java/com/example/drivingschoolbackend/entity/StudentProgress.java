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

public class StudentProgress {
    @Id
    @SequenceGenerator(
            name ="studentprogress_sequence",
            sequenceName ="studentprogress_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "studentprogress_sequence"

    )


    private int studentProgressId;
    private String status;
    private LocalDate date;
}



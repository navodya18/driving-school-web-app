package com.example.drivingschoolbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table




public class Session {

    @Id
    @SequenceGenerator(
            name ="session_sequence",
            sequenceName ="session_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "session_sequence"

    )


    private int sessionId;
    private String sessionType;
    private LocalDate date;
    private LocalTime time;
}

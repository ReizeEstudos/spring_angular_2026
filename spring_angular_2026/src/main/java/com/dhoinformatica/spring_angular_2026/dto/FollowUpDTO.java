package com.dhoinformatica.spring_angular_2026.dto;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowUpDTO {
    private LocalDate date;
    private String text;
    private UUID studentId;
}

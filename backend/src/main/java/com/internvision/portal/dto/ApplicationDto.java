package com.internvision.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {

    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String college;
    private String degree;
    private String skills;
    private String duration;
    private Date createdAt;
}

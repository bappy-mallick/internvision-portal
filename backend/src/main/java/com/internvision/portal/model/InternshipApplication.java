package com.internvision.portal.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InternshipApplication {

    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String college;
    private String degree;
    private String skills;
    private String duration; // "1 Month", "3 Months", "6 Months"
    private Date createdAt;
}

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
public class Course {

    private String id;
    private String title;
    private String description;
    private double price;
    private String duration;
    private boolean isActive;
    private Date createdAt;
}

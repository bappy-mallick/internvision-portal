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
public class Admin {

    private String id;
    private String name;
    private String email;
    private String password;
    private String role; // "ADMIN"
    private Date createdAt;
}

package com.internvision.portal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InternshipApplicationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phone;

    @NotBlank(message = "College is required")
    private String college;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Skills are required")
    private String skills;

    @NotBlank(message = "Duration is required")
    @Pattern(regexp = "^(1 Month|3 Months|6 Months)$", message = "Duration must be '1 Month', '3 Months', or '6 Months'")
    private String duration;
}

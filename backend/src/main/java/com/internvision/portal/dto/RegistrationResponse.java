package com.internvision.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {

    private String registrationId;
    private String orderId;
    private long amount; // in paise (e.g., 99900)
    private String currency; // "INR"
    private String keyId; // Razorpay key id for frontend SDK initialization
}

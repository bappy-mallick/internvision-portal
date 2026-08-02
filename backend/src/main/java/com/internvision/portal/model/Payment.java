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
public class Payment {

    private String id;
    private String registrationId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private double amount;
    private String currency; // "INR"
    private String status; // "PENDING", "SUCCESS", "FAILED"
    private Date paidAt;
}

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
public class Registration {

    private String id;
    private String studentName;
    private String email;
    private String phone;
    private String courseId;
    private String paymentStatus; // "PENDING", "SUCCESS", "FAILED"
    private String paymentId;
    private String razorpayOrderId;
    private Date registeredAt;
}

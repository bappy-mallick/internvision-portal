package com.internvision.portal.service;

import com.internvision.portal.dto.PaymentVerifyRequest;

public interface PaymentService {
    void verifyPayment(PaymentVerifyRequest request);
}

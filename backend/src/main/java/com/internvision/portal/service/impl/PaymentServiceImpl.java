package com.internvision.portal.service.impl;

import com.internvision.portal.dto.PaymentVerifyRequest;
import com.internvision.portal.exception.PaymentVerificationException;
import com.internvision.portal.exception.ResourceNotFoundException;
import com.internvision.portal.model.Payment;
import com.internvision.portal.model.Registration;
import com.internvision.portal.repository.PaymentRepository;
import com.internvision.portal.repository.RegistrationRepository;
import com.internvision.portal.service.PaymentService;
import com.internvision.portal.util.RazorpayUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RegistrationRepository registrationRepository;
    private final PaymentRepository paymentRepository;
    private final RazorpayUtil razorpayUtil;

    @Value("${razorpay.key.secret:test_secret}")
    private String razorpayKeySecret;

    @Override
    public void verifyPayment(PaymentVerifyRequest request) {
        log.info("Verifying payment for registrationId: {}, razorpayOrderId: {}, razorpayPaymentId: {}",
                request.getRegistrationId(), request.getRazorpayOrderId(), request.getRazorpayPaymentId());

        // Validate HMAC signature (allow mock bypass when using default test secret for development)
        if (!razorpayKeySecret.contains("test_secret") && !razorpayKeySecret.isBlank()) {
            boolean isValid = razorpayUtil.verifySignature(
                    request.getRazorpayOrderId(),
                    request.getRazorpayPaymentId(),
                    request.getRazorpaySignature()
            );

            if (!isValid) {
                log.error("Invalid Razorpay payment signature for orderId: {}", request.getRazorpayOrderId());
                throw new PaymentVerificationException("Invalid payment signature. Verification failed.");
            }
        }

        // Retrieve and update registration
        Registration registration = registrationRepository.findById(request.getRegistrationId())
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with ID: " + request.getRegistrationId()));

        registration.setPaymentStatus("SUCCESS");
        registration.setPaymentId(request.getRazorpayPaymentId());
        registrationRepository.save(registration);

        // Retrieve and update payment record
        Payment payment = paymentRepository.findByRegistrationId(request.getRegistrationId())
                .orElseGet(() -> Payment.builder()
                        .id("pay_rec_" + request.getRegistrationId())
                        .registrationId(request.getRegistrationId())
                        .amount(999.00)
                        .currency("INR")
                        .build());

        payment.setRazorpayOrderId(request.getRazorpayOrderId());
        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setStatus("SUCCESS");
        payment.setPaidAt(new Date());

        paymentRepository.save(payment);

        log.info("Payment successfully verified and updated for registration ID: {}", request.getRegistrationId());
    }
}

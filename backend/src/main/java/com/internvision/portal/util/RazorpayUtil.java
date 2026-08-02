package com.internvision.portal.util;

import com.internvision.portal.exception.PaymentVerificationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class RazorpayUtil {

    @Value("${razorpay.key.secret:test_secret_key}")
    private String secretKey;

    /**
     * Verifies the Razorpay payment signature using HMAC SHA-256.
     * Algorithm: HMAC-SHA256(orderId + "|" + paymentId, secretKey)
     */
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        if (orderId == null || paymentId == null || signature == null) {
            return false;
        }

        try {
            String payload = orderId + "|" + paymentId;
            Mac sha256HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256HMAC.init(secretKeySpec);

            byte[] hashBytes = sha256HMAC.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }

            String generatedSignature = sb.toString();
            boolean isValid = generatedSignature.equals(signature);
            
            if (!isValid) {
                log.warn("Razorpay signature mismatch for orderId: {}, paymentId: {}", orderId, paymentId);
            }
            return isValid;
        } catch (Exception e) {
            log.error("Error verifying Razorpay signature: {}", e.getMessage(), e);
            throw new PaymentVerificationException("Failed to calculate payment verification signature");
        }
    }
}

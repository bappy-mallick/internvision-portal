package com.internvision.portal;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * InternVision Portal — Application Context Smoke Test
 *
 * <p>Verifies that the Spring application context loads without errors.
 */
@SpringBootTest
@TestPropertySource(properties = {
        "jwt.secret=test-secret-key-minimum-256-bits-long-for-testing-only",
        "jwt.expiration=86400000",
        "razorpay.key.id=test_key_id",
        "razorpay.key.secret=test_key_secret",
        "firebase.project.id=test-project",
        "cors.allowed.origins=http://localhost:3000"
})
class InternVisionApplicationTests {

    @Test
    void contextLoads() {
        // Spring Boot context must load without exceptions.
    }
}

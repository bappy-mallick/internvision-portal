package com.internvision.portal.util;

import com.internvision.portal.model.Admin;
import com.internvision.portal.model.Course;
import com.internvision.portal.repository.AdminRepository;
import com.internvision.portal.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final CourseRepository courseRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdminAccount();
        seedFeaturedCourse();
    }

    private void seedAdminAccount() {
        try {
            if (adminRepository.findByEmail("admin@internvision.com").isEmpty()) {
                log.info("Seeding default administrator account: admin@internvision.com");
                Admin admin = Admin.builder()
                        .id("admin_default")
                        .name("System Admin")
                        .email("admin@internvision.com")
                        .password(passwordEncoder.encode("Admin@123"))
                        .role("ADMIN")
                        .createdAt(new Date())
                        .build();

                adminRepository.save(admin);
                log.info("Default admin account seeded successfully.");
            }
        } catch (Exception e) {
            log.warn("DataSeeder: Unable to seed admin account to Firestore: {}", e.getMessage());
        }
    }

    private void seedFeaturedCourse() {
        try {
            if (courseRepository.findFeaturedCourse().isEmpty()) {
                log.info("Seeding default featured course: Java Backend Development");
                Course course = Course.builder()
                        .id("course001")
                        .title("Java Backend Development")
                        .description("Master Java, Spring Boot, REST APIs, Microservices, and cloud database integrations with hands-on projects.")
                        .price(999.00)
                        .duration("8 Weeks")
                        .isActive(true)
                        .createdAt(new Date())
                        .build();

                courseRepository.save(course);
                log.info("Default featured course seeded successfully.");
            }
        } catch (Exception e) {
            log.warn("DataSeeder: Unable to seed featured course to Firestore: {}", e.getMessage());
        }
    }
}

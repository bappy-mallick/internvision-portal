package com.internvision.portal.service.impl;

import com.internvision.portal.exception.ResourceNotFoundException;
import com.internvision.portal.model.Course;
import com.internvision.portal.repository.CourseRepository;
import com.internvision.portal.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public Course getFeaturedCourse() {
        return courseRepository.findFeaturedCourse()
                .orElseGet(this::createFallbackCourse);
    }

    private Course createFallbackCourse() {
        log.info("No course found in Firestore. Returning default featured course.");
        Course defaultCourse = Course.builder()
                .id("course001")
                .title("Java Backend Development")
                .description("Master Java, Spring Boot, REST APIs, Microservices, and cloud database integrations with hands-on projects.")
                .price(999.00)
                .duration("8 Weeks")
                .isActive(true)
                .createdAt(new Date())
                .build();

        try {
            courseRepository.save(defaultCourse);
        } catch (Exception e) {
            log.warn("Failed to auto-persist fallback course to Firestore: {}", e.getMessage());
        }
        return defaultCourse;
    }
}

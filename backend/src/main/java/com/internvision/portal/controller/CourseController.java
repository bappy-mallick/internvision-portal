package com.internvision.portal.controller;

import com.internvision.portal.dto.ApiResponse;
import com.internvision.portal.model.Course;
import com.internvision.portal.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/course")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<Course>> getFeaturedCourse() {
        Course course = courseService.getFeaturedCourse();
        return ResponseEntity.ok(ApiResponse.success(course, "Featured course retrieved successfully"));
    }
}

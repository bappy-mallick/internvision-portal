package com.internvision.portal.controller;

import com.internvision.portal.dto.ApiResponse;
import com.internvision.portal.dto.InternshipApplicationRequest;
import com.internvision.portal.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/internships")
@RequiredArgsConstructor
public class InternshipController {

    private final InternshipService internshipService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitApplication(@Valid @RequestBody InternshipApplicationRequest request) {
        internshipService.submitApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application Submitted"));
    }
}

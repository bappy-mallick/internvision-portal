package com.internvision.portal.service.impl;

import com.internvision.portal.dto.InternshipApplicationRequest;
import com.internvision.portal.model.InternshipApplication;
import com.internvision.portal.repository.InternshipApplicationRepository;
import com.internvision.portal.service.InternshipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class InternshipServiceImpl implements InternshipService {

    private final InternshipApplicationRepository repository;

    @Override
    public void submitApplication(InternshipApplicationRequest request) {
        log.info("Submitting internship application for: {}, email: {}", request.getFullName(), request.getEmail());

        String appId = "app_" + UUID.randomUUID().toString().substring(0, 8);

        InternshipApplication application = InternshipApplication.builder()
                .id(appId)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .college(request.getCollege())
                .degree(request.getDegree())
                .skills(request.getSkills())
                .duration(request.getDuration())
                .createdAt(new Date())
                .build();

        repository.save(application);
        log.info("Internship application saved with ID: {}", appId);
    }
}

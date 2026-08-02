package com.internvision.portal.service;

import com.internvision.portal.dto.InternshipApplicationRequest;

public interface InternshipService {
    void submitApplication(InternshipApplicationRequest request);
}

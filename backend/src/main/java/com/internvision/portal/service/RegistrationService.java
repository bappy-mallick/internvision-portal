package com.internvision.portal.service;

import com.internvision.portal.dto.RegistrationRequest;
import com.internvision.portal.dto.RegistrationResponse;

public interface RegistrationService {
    RegistrationResponse createRegistration(RegistrationRequest request);
}

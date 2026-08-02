package com.internvision.portal.service;

import com.internvision.portal.dto.LoginRequest;
import com.internvision.portal.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}

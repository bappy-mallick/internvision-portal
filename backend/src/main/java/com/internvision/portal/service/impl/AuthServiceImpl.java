package com.internvision.portal.service.impl;

import com.internvision.portal.dto.LoginRequest;
import com.internvision.portal.dto.LoginResponse;
import com.internvision.portal.exception.UnauthorizedException;
import com.internvision.portal.model.Admin;
import com.internvision.portal.repository.AdminRepository;
import com.internvision.portal.service.AuthService;
import com.internvision.portal.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest request) {
        log.info("Attempting login for admin email: {}", request.getEmail());

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            log.warn("Invalid password attempt for admin: {}", request.getEmail());
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole());
        log.info("Admin login successful for: {}", admin.getEmail());

        return LoginResponse.builder()
                .token(token)
                .email(admin.getEmail())
                .name(admin.getName())
                .role(admin.getRole())
                .build();
    }
}

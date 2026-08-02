package com.internvision.portal.controller;

import com.internvision.portal.dto.ApiResponse;
import com.internvision.portal.dto.ApplicationDto;
import com.internvision.portal.dto.DashboardStatsDto;
import com.internvision.portal.dto.PageResponse;
import com.internvision.portal.dto.PaymentDto;
import com.internvision.portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        DashboardStatsDto stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats, "Dashboard statistics retrieved"));
    }

    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<PageResponse<ApplicationDto>>> getApplications(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        PageResponse<ApplicationDto> response = adminService.getApplications(page, size, search);
        return ResponseEntity.ok(ApiResponse.success(response, "Applications retrieved"));
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<ApiResponse<ApplicationDto>> getApplicationById(@PathVariable String id) {
        ApplicationDto app = adminService.getApplicationById(id);
        return ResponseEntity.ok(ApiResponse.success(app, "Application details retrieved"));
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse<PageResponse<PaymentDto>>> getPayments(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        PageResponse<PaymentDto> response = adminService.getPayments(page, size, status);
        return ResponseEntity.ok(ApiResponse.success(response, "Payments retrieved"));
    }

    @GetMapping("/payments/{id}")
    public ResponseEntity<ApiResponse<PaymentDto>> getPaymentById(@PathVariable String id) {
        PaymentDto payment = adminService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.success(payment, "Payment details retrieved"));
    }
}

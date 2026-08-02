package com.internvision.portal.service;

import com.internvision.portal.dto.ApplicationDto;
import com.internvision.portal.dto.DashboardStatsDto;
import com.internvision.portal.dto.PageResponse;
import com.internvision.portal.dto.PaymentDto;

public interface AdminService {

    DashboardStatsDto getDashboardStats();

    PageResponse<ApplicationDto> getApplications(int page, int size, String search);

    ApplicationDto getApplicationById(String id);

    PageResponse<PaymentDto> getPayments(int page, int size, String status);

    PaymentDto getPaymentById(String id);
}

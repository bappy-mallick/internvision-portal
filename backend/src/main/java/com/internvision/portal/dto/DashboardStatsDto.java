package com.internvision.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {

    private long totalApplications;
    private long totalRegistrations;
    private long completedPayments;
    private double totalRevenue;
}

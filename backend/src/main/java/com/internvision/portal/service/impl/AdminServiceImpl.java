package com.internvision.portal.service.impl;

import com.internvision.portal.dto.ApplicationDto;
import com.internvision.portal.dto.DashboardStatsDto;
import com.internvision.portal.dto.PageResponse;
import com.internvision.portal.dto.PaymentDto;
import com.internvision.portal.exception.ResourceNotFoundException;
import com.internvision.portal.model.InternshipApplication;
import com.internvision.portal.model.Payment;
import com.internvision.portal.model.Registration;
import com.internvision.portal.repository.InternshipApplicationRepository;
import com.internvision.portal.repository.PaymentRepository;
import com.internvision.portal.repository.RegistrationRepository;
import com.internvision.portal.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final InternshipApplicationRepository applicationRepository;
    private final RegistrationRepository registrationRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public DashboardStatsDto getDashboardStats() {
        log.info("Fetching admin dashboard statistics");

        long totalApps = applicationRepository.count();
        long totalRegs = registrationRepository.count();
        long completedPayments = paymentRepository.countByStatus("SUCCESS");
        double revenue = paymentRepository.calculateTotalRevenue();

        return DashboardStatsDto.builder()
                .totalApplications(totalApps)
                .totalRegistrations(totalRegs)
                .completedPayments(completedPayments)
                .totalRevenue(revenue)
                .build();
    }

    @Override
    public PageResponse<ApplicationDto> getApplications(int page, int size, String search) {
        log.info("Fetching applications page: {}, size: {}, search: {}", page, size, search);

        List<InternshipApplication> all = applicationRepository.findAll();

        if (StringUtils.hasText(search)) {
            String query = search.toLowerCase().trim();
            all = all.stream()
                    .filter(a -> (a.getFullName() != null && a.getFullName().toLowerCase().contains(query)) ||
                            (a.getEmail() != null && a.getEmail().toLowerCase().contains(query)) ||
                            (a.getCollege() != null && a.getCollege().toLowerCase().contains(query)) ||
                            (a.getSkills() != null && a.getSkills().toLowerCase().contains(query)))
                    .collect(Collectors.toList());
        }

        int totalElements = all.size();
        int fromIndex = Math.min((page - 1) * size, totalElements);
        int toIndex = Math.min(fromIndex + size, totalElements);

        List<ApplicationDto> content = all.subList(fromIndex, toIndex).stream()
                .map(this::mapToApplicationDto)
                .collect(Collectors.toList());

        int totalPages = (int) Math.ceil((double) totalElements / size);

        return PageResponse.<ApplicationDto>builder()
                .content(content)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages == 0 ? 1 : totalPages)
                .last(page >= totalPages)
                .build();
    }

    @Override
    public ApplicationDto getApplicationById(String id) {
        InternshipApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));
        return mapToApplicationDto(app);
    }

    @Override
    public PageResponse<PaymentDto> getPayments(int page, int size, String status) {
        log.info("Fetching payments page: {}, size: {}, status: {}", page, size, status);

        List<Payment> all = paymentRepository.findAll();

        if (StringUtils.hasText(status)) {
            all = all.stream()
                    .filter(p -> p.getStatus() != null && p.getStatus().equalsIgnoreCase(status.trim()))
                    .collect(Collectors.toList());
        }

        // Map registration details for student name
        Map<String, Registration> registrationMap = registrationRepository.findAll().stream()
                .collect(Collectors.toMap(Registration::getId, r -> r, (r1, r2) -> r1));

        int totalElements = all.size();
        int fromIndex = Math.min((page - 1) * size, totalElements);
        int toIndex = Math.min(fromIndex + size, totalElements);

        List<PaymentDto> content = all.subList(fromIndex, toIndex).stream()
                .map(p -> mapToPaymentDto(p, registrationMap.get(p.getRegistrationId())))
                .collect(Collectors.toList());

        int totalPages = (int) Math.ceil((double) totalElements / size);

        return PageResponse.<PaymentDto>builder()
                .content(content)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages(totalPages == 0 ? 1 : totalPages)
                .last(page >= totalPages)
                .build();
    }

    @Override
    public PaymentDto getPaymentById(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found with ID: " + id));
        Registration registration = registrationRepository.findById(payment.getRegistrationId()).orElse(null);
        return mapToPaymentDto(payment, registration);
    }

    private ApplicationDto mapToApplicationDto(InternshipApplication app) {
        return ApplicationDto.builder()
                .id(app.getId())
                .fullName(app.getFullName())
                .email(app.getEmail())
                .phone(app.getPhone())
                .college(app.getCollege())
                .degree(app.getDegree())
                .skills(app.getSkills())
                .duration(app.getDuration())
                .createdAt(app.getCreatedAt())
                .build();
    }

    private PaymentDto mapToPaymentDto(Payment p, Registration reg) {
        return PaymentDto.builder()
                .id(p.getId())
                .registrationId(p.getRegistrationId())
                .studentName(reg != null ? reg.getStudentName() : "N/A")
                .email(reg != null ? reg.getEmail() : "N/A")
                .razorpayOrderId(p.getRazorpayOrderId())
                .razorpayPaymentId(p.getRazorpayPaymentId())
                .amount(p.getAmount())
                .currency(p.getCurrency() != null ? p.getCurrency() : "INR")
                .status(p.getStatus())
                .paidAt(p.getPaidAt())
                .build();
    }
}

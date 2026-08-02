package com.internvision.portal.service.impl;

import com.internvision.portal.exception.FirestoreOperationException;
import com.internvision.portal.model.InternshipApplication;
import com.internvision.portal.model.Payment;
import com.internvision.portal.model.Registration;
import com.internvision.portal.repository.InternshipApplicationRepository;
import com.internvision.portal.repository.PaymentRepository;
import com.internvision.portal.repository.RegistrationRepository;
import com.internvision.portal.service.ExcelExportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelExportServiceImpl implements ExcelExportService {

    private final InternshipApplicationRepository applicationRepository;
    private final PaymentRepository paymentRepository;
    private final RegistrationRepository registrationRepository;

    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public byte[] exportApplicationsToExcel() {
        log.info("Generating Excel export for Internship Applications");

        List<InternshipApplication> applications = applicationRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Internship Applicants");

            // Header Style
            CellStyle headerStyle = createHeaderStyle(workbook);

            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Full Name", "Email", "Phone", "College", "Degree", "Skills", "Duration", "Applied At"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data Rows
            int rowNum = 1;
            for (InternshipApplication app : applications) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(app.getId() != null ? app.getId() : "");
                row.createCell(1).setCellValue(app.getFullName() != null ? app.getFullName() : "");
                row.createCell(2).setCellValue(app.getEmail() != null ? app.getEmail() : "");
                row.createCell(3).setCellValue(app.getPhone() != null ? app.getPhone() : "");
                row.createCell(4).setCellValue(app.getCollege() != null ? app.getCollege() : "");
                row.createCell(5).setCellValue(app.getDegree() != null ? app.getDegree() : "");
                row.createCell(6).setCellValue(app.getSkills() != null ? app.getSkills() : "");
                row.createCell(7).setCellValue(app.getDuration() != null ? app.getDuration() : "");
                row.createCell(8).setCellValue(app.getCreatedAt() != null ? DATE_FORMAT.format(app.getCreatedAt()) : "");
            }

            // Auto-fit columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate Excel file for applications: {}", e.getMessage(), e);
            throw new FirestoreOperationException("Failed to generate Excel report for applications", e);
        }
    }

    @Override
    public byte[] exportPaymentsToExcel() {
        log.info("Generating Excel export for Payments");

        List<Payment> payments = paymentRepository.findAll();
        Map<String, Registration> registrationMap = registrationRepository.findAll().stream()
                .collect(Collectors.toMap(Registration::getId, r -> r, (r1, r2) -> r1));

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Payments");

            // Header Style
            CellStyle headerStyle = createHeaderStyle(workbook);

            // Header Row
            Row headerRow = sheet.createRow(0);
            String[] headers = {"Payment ID", "Student Name", "Email", "Registration ID", "Order ID", "Razorpay Payment ID", "Amount (INR)", "Status", "Date"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data Rows
            int rowNum = 1;
            for (Payment p : payments) {
                Registration reg = registrationMap.get(p.getRegistrationId());
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(p.getId() != null ? p.getId() : "");
                row.createCell(1).setCellValue(reg != null && reg.getStudentName() != null ? reg.getStudentName() : "N/A");
                row.createCell(2).setCellValue(reg != null && reg.getEmail() != null ? reg.getEmail() : "N/A");
                row.createCell(3).setCellValue(p.getRegistrationId() != null ? p.getRegistrationId() : "");
                row.createCell(4).setCellValue(p.getRazorpayOrderId() != null ? p.getRazorpayOrderId() : "");
                row.createCell(5).setCellValue(p.getRazorpayPaymentId() != null ? p.getRazorpayPaymentId() : "");
                row.createCell(6).setCellValue(p.getAmount());
                row.createCell(7).setCellValue(p.getStatus() != null ? p.getStatus() : "");
                row.createCell(8).setCellValue(p.getPaidAt() != null ? DATE_FORMAT.format(p.getPaidAt()) : "");
            }

            // Auto-fit columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate Excel file for payments: {}", e.getMessage(), e);
            throw new FirestoreOperationException("Failed to generate Excel report for payments", e);
        }
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.ROYAL_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }
}

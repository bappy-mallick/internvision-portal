package com.internvision.portal.repository;

import com.internvision.portal.firebase.FirestoreService;
import com.internvision.portal.model.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PaymentRepository {

    private static final String COLLECTION_NAME = "payments";
    private final FirestoreService firestoreService;

    public String save(Payment payment) {
        return firestoreService.save(COLLECTION_NAME, payment.getId(), payment);
    }

    public Optional<Payment> findById(String id) {
        return firestoreService.findById(COLLECTION_NAME, id, Payment.class);
    }

    public Optional<Payment> findByRazorpayOrderId(String orderId) {
        List<Payment> list = firestoreService.findByField(COLLECTION_NAME, "razorpayOrderId", orderId, Payment.class);
        return list.stream().findFirst();
    }

    public Optional<Payment> findByRegistrationId(String registrationId) {
        List<Payment> list = firestoreService.findByField(COLLECTION_NAME, "registrationId", registrationId, Payment.class);
        return list.stream().findFirst();
    }

    public List<Payment> findAll() {
        List<Payment> list = firestoreService.findAll(COLLECTION_NAME, Payment.class);
        list.sort(Comparator.comparing(Payment::getPaidAt, Comparator.nullsLast(Comparator.reverseOrder())));
        return list;
    }

    public long count() {
        return firestoreService.count(COLLECTION_NAME);
    }

    public long countByStatus(String status) {
        return firestoreService.countByField(COLLECTION_NAME, "status", status);
    }

    public double calculateTotalRevenue() {
        return firestoreService.sumByField(COLLECTION_NAME, "amount", "status", "SUCCESS");
    }
}

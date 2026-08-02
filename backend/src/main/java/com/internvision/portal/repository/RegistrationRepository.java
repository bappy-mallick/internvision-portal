package com.internvision.portal.repository;

import com.internvision.portal.firebase.FirestoreService;
import com.internvision.portal.model.Registration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RegistrationRepository {

    private static final String COLLECTION_NAME = "registrations";
    private final FirestoreService firestoreService;

    public String save(Registration registration) {
        return firestoreService.save(COLLECTION_NAME, registration.getId(), registration);
    }

    public Optional<Registration> findById(String id) {
        return firestoreService.findById(COLLECTION_NAME, id, Registration.class);
    }

    public Optional<Registration> findByRazorpayOrderId(String orderId) {
        List<Registration> list = firestoreService.findByField(COLLECTION_NAME, "razorpayOrderId", orderId, Registration.class);
        return list.stream().findFirst();
    }

    public List<Registration> findByEmail(String email) {
        return firestoreService.findByField(COLLECTION_NAME, "email", email, Registration.class);
    }

    public List<Registration> findAll() {
        List<Registration> list = firestoreService.findAll(COLLECTION_NAME, Registration.class);
        list.sort(Comparator.comparing(Registration::getRegisteredAt, Comparator.nullsLast(Comparator.reverseOrder())));
        return list;
    }

    public long count() {
        return firestoreService.count(COLLECTION_NAME);
    }
}

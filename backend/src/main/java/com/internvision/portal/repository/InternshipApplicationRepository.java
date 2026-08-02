package com.internvision.portal.repository;

import com.internvision.portal.firebase.FirestoreService;
import com.internvision.portal.model.InternshipApplication;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class InternshipApplicationRepository {

    private static final String COLLECTION_NAME = "internshipApplications";
    private final FirestoreService firestoreService;

    public String save(InternshipApplication application) {
        return firestoreService.save(COLLECTION_NAME, application.getId(), application);
    }

    public Optional<InternshipApplication> findById(String id) {
        return firestoreService.findById(COLLECTION_NAME, id, InternshipApplication.class);
    }

    public List<InternshipApplication> findByEmail(String email) {
        return firestoreService.findByField(COLLECTION_NAME, "email", email, InternshipApplication.class);
    }

    public List<InternshipApplication> findAll() {
        List<InternshipApplication> list = firestoreService.findAll(COLLECTION_NAME, InternshipApplication.class);
        list.sort(Comparator.comparing(InternshipApplication::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())));
        return list;
    }

    public long count() {
        return firestoreService.count(COLLECTION_NAME);
    }
}

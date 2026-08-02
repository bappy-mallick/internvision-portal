package com.internvision.portal.repository;

import com.internvision.portal.firebase.FirestoreService;
import com.internvision.portal.model.Admin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AdminRepository {

    private static final String COLLECTION_NAME = "admins";
    private final FirestoreService firestoreService;

    public String save(Admin admin) {
        return firestoreService.save(COLLECTION_NAME, admin.getId(), admin);
    }

    public Optional<Admin> findById(String id) {
        return firestoreService.findById(COLLECTION_NAME, id, Admin.class);
    }

    public Optional<Admin> findByEmail(String email) {
        List<Admin> admins = firestoreService.findByField(COLLECTION_NAME, "email", email, Admin.class);
        return admins.stream().findFirst();
    }

    public List<Admin> findAll() {
        return firestoreService.findAll(COLLECTION_NAME, Admin.class);
    }

    public long count() {
        return firestoreService.count(COLLECTION_NAME);
    }
}

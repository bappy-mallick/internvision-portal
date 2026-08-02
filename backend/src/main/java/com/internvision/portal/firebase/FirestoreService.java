package com.internvision.portal.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.internvision.portal.exception.FirestoreOperationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirestoreService {

    private final Firestore firestore;

    public <T> String save(String collectionName, String documentId, T data) {
        try {
            CollectionReference collection = firestore.collection(collectionName);
            DocumentReference docRef = (documentId != null && !documentId.isBlank()) 
                    ? collection.document(documentId) 
                    : collection.document();

            ApiFuture<WriteResult> result = docRef.set(data);
            result.get(); // Wait for completion
            log.info("Document saved in collection '{}' with ID: {}", collectionName, docRef.getId());
            return docRef.getId();
        } catch (Exception e) {
            log.error("Error saving document to collection '{}': {}", collectionName, e.getMessage(), e);
            throw new FirestoreOperationException("Failed to save data to Firestore", e);
        }
    }

    public <T> Optional<T> findById(String collectionName, String documentId, Class<T> clazz) {
        try {
            DocumentReference docRef = firestore.collection(collectionName).document(documentId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot snapshot = future.get();

            if (snapshot.exists()) {
                T object = snapshot.toObject(clazz);
                return Optional.ofNullable(object);
            }
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error fetching document ID '{}' from collection '{}': {}", documentId, collectionName, e.getMessage(), e);
            throw new FirestoreOperationException("Failed to fetch document from Firestore", e);
        }
    }

    public <T> List<T> findAll(String collectionName, Class<T> clazz) {
        try {
            ApiFuture<QuerySnapshot> future = firestore.collection(collectionName).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<T> results = new ArrayList<>();
            for (DocumentSnapshot doc : documents) {
                T obj = doc.toObject(clazz);
                if (obj != null) {
                    results.add(obj);
                }
            }
            return results;
        } catch (Exception e) {
            log.error("Error fetching all documents from collection '{}': {}", collectionName, e.getMessage(), e);
            throw new FirestoreOperationException("Failed to fetch documents from Firestore", e);
        }
    }

    public <T> List<T> findByField(String collectionName, String fieldName, Object value, Class<T> clazz) {
        try {
            ApiFuture<QuerySnapshot> future = firestore.collection(collectionName)
                    .whereEqualTo(fieldName, value)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            List<T> results = new ArrayList<>();
            for (DocumentSnapshot doc : documents) {
                T obj = doc.toObject(clazz);
                if (obj != null) {
                    results.add(obj);
                }
            }
            return results;
        } catch (Exception e) {
            log.error("Error searching collection '{}' by field '{}': {}", collectionName, fieldName, e.getMessage(), e);
            throw new FirestoreOperationException("Failed to query Firestore by field", e);
        }
    }

    public long count(String collectionName) {
        try {
            AggregateQuery snapshot = firestore.collection(collectionName).count();
            AggregateQuerySnapshot result = snapshot.get().get();
            return result.getCount();
        } catch (Exception e) {
            log.error("Error counting documents in collection '{}': {}", collectionName, e.getMessage());
            // Fallback for emulator / environments without aggregate query support
            try {
                return firestore.collection(collectionName).get().get().size();
            } catch (Exception ex) {
                return 0L;
            }
        }
    }

    public long countByField(String collectionName, String fieldName, Object value) {
        try {
            Query query = firestore.collection(collectionName).whereEqualTo(fieldName, value);
            AggregateQuery snapshot = query.count();
            AggregateQuerySnapshot result = snapshot.get().get();
            return result.getCount();
        } catch (Exception e) {
            try {
                return firestore.collection(collectionName).whereEqualTo(fieldName, value).get().get().size();
            } catch (Exception ex) {
                return 0L;
            }
        }
    }

    public double sumByField(String collectionName, String sumFieldName, String filterFieldName, Object filterValue) {
        try {
            Query query = firestore.collection(collectionName).whereEqualTo(filterFieldName, filterValue);
            List<QueryDocumentSnapshot> docs = query.get().get().getDocuments();
            double sum = 0.0;
            for (DocumentSnapshot doc : docs) {
                Double val = doc.getDouble(sumFieldName);
                if (val != null) {
                    sum += val;
                }
            }
            return sum;
        } catch (Exception e) {
            log.error("Error calculating sum for field '{}' in collection '{}': {}", sumFieldName, collectionName, e.getMessage());
            return 0.0;
        }
    }

    public boolean delete(String collectionName, String documentId) {
        try {
            ApiFuture<WriteResult> writeResult = firestore.collection(collectionName).document(documentId).delete();
            writeResult.get();
            return true;
        } catch (Exception e) {
            log.error("Error deleting document ID '{}' from collection '{}': {}", documentId, collectionName, e.getMessage(), e);
            return false;
        }
    }
}

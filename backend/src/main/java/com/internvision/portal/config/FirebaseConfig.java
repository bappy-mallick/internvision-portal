package com.internvision.portal.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Slf4j
@Configuration
public class FirebaseConfig {

    // Only used as a human-readable label in logs. NOT passed to FirebaseOptions.
    @Value("${firebase.credentials.path:classpath:firebase-service-account.json}")
    private String credentialsPath;

    @Value("${firebase.service.account.json:}")
    private String inlineServiceAccountJson;

    private final ResourceLoader resourceLoader;

    public FirebaseConfig(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Bean
    public FirebaseApp firebaseApp() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.getInstance();
        }

        try {
            InputStream serviceAccount = getCredentialsInputStream();
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

            // Extract project ID directly from parsed service account credentials.
            // This is the ONLY correct source — never rely on env var or hardcoded default.
            String resolvedProjectId = null;
            if (credentials instanceof ServiceAccountCredentials sac) {
                resolvedProjectId = sac.getProjectId();
            }

            if (!StringUtils.hasText(resolvedProjectId)) {
                throw new IllegalStateException(
                    "Could not extract project_id from service account credentials. " +
                    "Ensure the service account JSON contains a valid 'project_id' field."
                );
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .setProjectId(resolvedProjectId)
                    .build();

            FirebaseApp app = FirebaseApp.initializeApp(options);
            log.info("Firebase Application initialized successfully with Project ID: {}", resolvedProjectId);
            return app;

        } catch (Exception e) {
            log.error("CRITICAL: Failed to initialize Firebase Admin SDK. Application cannot serve Firestore requests. Reason: {}", e.getMessage(), e);
            // Re-throw so Spring Boot fails fast and shows the real error instead of silently serving broken requests.
            throw new IllegalStateException("Firebase initialization failed — check FIREBASE_SERVICE_ACCOUNT_JSON environment variable.", e);
        }
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }

    private InputStream getCredentialsInputStream() throws Exception {
        // Priority 1: Inline JSON environment variable (Raw JSON or Base64 encoded)
        if (StringUtils.hasText(inlineServiceAccountJson)) {
            String trimmedJson = inlineServiceAccountJson.trim();
            byte[] jsonBytes;

            // Auto-detect Base64 encoded string vs raw JSON
            if (!trimmedJson.startsWith("{")) {
                log.info("Decoding Base64 encoded FIREBASE_SERVICE_ACCOUNT_JSON environment variable");
                jsonBytes = Base64.getDecoder().decode(trimmedJson);
            } else {
                log.info("Using raw FIREBASE_SERVICE_ACCOUNT_JSON environment variable");
                jsonBytes = trimmedJson.getBytes(StandardCharsets.UTF_8);
            }

            return new ByteArrayInputStream(jsonBytes);
        }

        // Priority 2: Classpath / file path resource (local dev)
        Resource resource = resourceLoader.getResource(credentialsPath);
        if (resource.exists()) {
            log.info("Using Firebase credentials file from path: {}", credentialsPath);
            return resource.getInputStream();
        }

        throw new IllegalStateException(
            "Firebase credentials not found. Set FIREBASE_SERVICE_ACCOUNT_JSON on Render, " +
            "or provide a file at: " + credentialsPath
        );
    }
}


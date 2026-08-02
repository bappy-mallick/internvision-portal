package com.internvision.portal.config;

import com.google.auth.oauth2.GoogleCredentials;
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

    @Value("${firebase.project.id:internvision-portal}")
    private String projectId;

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

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .setProjectId(projectId)
                    .build();

            FirebaseApp app = FirebaseApp.initializeApp(options);
            log.info("Firebase Application initialized successfully with Project ID: {}", projectId);
            return app;
        } catch (Exception e) {
            log.error("CRITICAL: Failed to initialize Firebase Admin SDK with primary credentials: {}", e.getMessage(), e);
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .setProjectId(projectId)
                        .build();
                log.info("Initialized FirebaseApp using Application Default Credentials.");
                return FirebaseApp.initializeApp(options);
            } catch (Exception fallbackEx) {
                log.error("Application Default Credentials also unavailable. Initializing fallback unauthenticated shell.", fallbackEx);
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.newBuilder().build())
                        .setProjectId(projectId)
                        .build();
                return FirebaseApp.initializeApp(options);
            }
        }
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }

    private InputStream getCredentialsInputStream() throws Exception {
        // Priority 1: Inline JSON environment variable (Raw JSON or Base64 encoded)
        if (StringUtils.hasText(inlineServiceAccountJson) && !inlineServiceAccountJson.contains("REPLACE_WITH")) {
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

        // Priority 2: File path / classpath resource
        Resource resource = resourceLoader.getResource(credentialsPath);
        if (resource.exists()) {
            log.info("Using Firebase credentials file from path: {}", credentialsPath);
            return resource.getInputStream();
        }

        throw new IllegalStateException("Firebase credentials not found at path: " + credentialsPath);
    }
}

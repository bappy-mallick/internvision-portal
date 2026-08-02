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
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId(projectId)
                    .build();

            FirebaseApp app = FirebaseApp.initializeApp(options);
            log.info("Firebase Application initialized successfully with Project ID: {}", projectId);
            return app;
        } catch (Exception e) {
            log.warn("Failed to initialize Firebase Admin SDK with credentials: {}. Initializing fallback/emulator mode.", e.getMessage());
            try {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .setProjectId(projectId)
                        .build();
                return FirebaseApp.initializeApp(options);
            } catch (Exception fallbackEx) {
                log.warn("Application Default Credentials unavailable. Initializing empty FirebaseApp shell.");
                FirebaseOptions options = FirebaseOptions.builder()
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
        // Priority 1: Inline JSON environment variable (for Render/Production cloud deployment)
        if (StringUtils.hasText(inlineServiceAccountJson) && !inlineServiceAccountJson.contains("REPLACE_WITH")) {
            log.info("Using inline FIREBASE_SERVICE_ACCOUNT_JSON environment variable");
            return new ByteArrayInputStream(inlineServiceAccountJson.getBytes(StandardCharsets.UTF_8));
        }

        // Priority 2: File path / classpath resource
        Resource resource = resourceLoader.getResource(credentialsPath);
        if (resource.exists()) {
            log.info("Using Firebase credentials file from: {}", credentialsPath);
            return resource.getInputStream();
        }

        throw new IllegalStateException("Firebase credentials not found at path: " + credentialsPath);
    }
}

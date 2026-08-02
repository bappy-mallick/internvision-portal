# ============================================================
# InternVision Portal — Backend Dockerfile
# Multi-stage build: Maven build → Java 25 runtime image
# ============================================================

# ── Stage 1: Build ──────────────────────────────────────────
FROM eclipse-temurin:25-jdk AS build

# Install Maven in build stage
RUN apt-get update && apt-get install -y --no-install-recommends maven && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy POM first to cache dependency downloads as a separate layer
COPY pom.xml .
RUN mvn dependency:go-offline -B --no-transfer-progress

# Copy source and build the fat JAR
COPY src ./src
RUN mvn clean package -DskipTests -B --no-transfer-progress

# ── Stage 2: Runtime ────────────────────────────────────────
FROM eclipse-temurin:25-jre AS runtime

# Install wget for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create a non-root user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy the fat JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown appuser:appgroup app.jar

USER appuser

# Expose the application port (default 8080)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# JVM tuning for container environments
ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", "app.jar"]


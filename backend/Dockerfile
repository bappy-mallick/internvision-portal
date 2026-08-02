# ============================================================
# Stage 1 - Build
# ============================================================

FROM eclipse-temurin:25-jdk-alpine AS build

RUN apk add --no-cache maven

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests -B


# ============================================================
# Stage 2 - Runtime
# ============================================================

FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=build /app/target/*.jar app.jar

RUN chown appuser:appgroup app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
# Stage 1: Build the application using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the final, lightweight image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the built JAR from the 'build' stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
# Expose the port the app runs on
EXPOSE 8080
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
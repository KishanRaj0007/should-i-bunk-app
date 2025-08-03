package com.shouldibunk.backend.web;

import com.shouldibunk.backend.domain.User;
import com.shouldibunk.backend.dto.LoginRequest;
import com.shouldibunk.backend.dto.LoginResponse;
import com.shouldibunk.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    // DTO for the reset password request
    public record ResetPasswordRequest(String token, String newPassword) {} // Field is named newPassword
    public record ForgotPasswordRequest(String email) {}

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth service is running!");
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User registeredUser = authService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.generatePasswordResetToken(request.email());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody ResetPasswordRequest request) {
        // Corrected from request.password() to request.newPassword()
        authService.resetPassword(request.token(), request.newPassword());
        return ResponseEntity.ok().build();
    }
}
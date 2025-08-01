package com.shouldibunk.backend.web;
import com.shouldibunk.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shouldibunk.backend.domain.User;

@RestController
@RequestMapping("/api/users")
// @CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor // for dependency injection
public class UserController {

    private final UserRepository userRepository;
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        // The @AuthenticationPrincipal annotation automatically retrieves the
        // User object we stored in the security context.
        return ResponseEntity.ok(user);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userRepository.count());
    }
}

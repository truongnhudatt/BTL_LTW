package com.example.backend_final.service;

import com.example.backend_final.model.User;
import com.example.backend_final.payload.request.SignUp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService extends UserDetailsService {
    Optional<User> findByUsername(String username);

    <S extends User> S save(S entity);

    Optional<User> findById(Long aLong);

    boolean existsById(Long aLong);

    long count();

    void deleteById(Long aLong);

    void delete(User entity);


    Page<User> findAll(Pageable pageable);

    User userSignup(SignUp signUp);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}

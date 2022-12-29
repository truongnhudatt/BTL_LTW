package com.example.backend_final.service.Impl;

import com.example.backend_final.model.User;
import com.example.backend_final.payload.request.SignUp;
import com.example.backend_final.repository.UserRepo;
import com.example.backend_final.security.PasswordEncoder;
import com.example.backend_final.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found with username "+ username));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public <S extends User> S save(S entity) {
        return userRepo.save(entity);
    }

    @Override
    public Optional<User> findById(Long aLong) {
        return userRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return userRepo.existsById(aLong);
    }

    @Override
    public long count() {
        return userRepo.count();
    }

    @Override
    public void deleteById(Long aLong) {
        userRepo.deleteById(aLong);
    }

    @Override
    public void delete(User entity) {
        userRepo.delete(entity);
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepo.findAll(pageable);
    }

    @Override
    public User userSignup(SignUp signUp){
        User user = new User();
        user.setEmail(signUp.getEmail());
        user.setUsername(signUp.getUsername());
        user.setFirstName(signUp.getFirstName());
        user.setLastName(signUp.getLastName());
//        user.setPassword(signUp.getPassword());
        user.setPassword(passwordEncoder.bCryptPasswordEncoder().encode(signUp.getPassword()));
        user.setRole(signUp.getRole());
        return userRepo.save(user);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }


}

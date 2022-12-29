package com.example.backend_final.service;

import com.example.backend_final.model.Cart;
import com.example.backend_final.model.CartItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public interface CartService {
    <S extends Cart> S save(S entity);

    Optional<Cart> findById(Long aLong);

    boolean existsById(Long aLong);

    long count(String username);

    void deleteById(Long aLong);

    Page<CartItem> findAll(Pageable pageable);
}

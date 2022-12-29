package com.example.backend_final.service;

import com.example.backend_final.model.CartItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public interface CartItemService{
    <S extends CartItem> S save(S entity);

    Optional<CartItem> findById(Long aLong);

    boolean existsById(Long aLong);

    long count();

    void deleteById(Long aLong);

    void delete(CartItem entity);
}

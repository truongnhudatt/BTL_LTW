package com.example.backend_final.service.Impl;

import com.example.backend_final.model.CartItem;
import com.example.backend_final.repository.CartItemRepo;
import com.example.backend_final.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepo cartItemRepo;

    @Override
    public <S extends CartItem> S save(S entity) {
        return cartItemRepo.save(entity);
    }

    @Override
    public Optional<CartItem> findById(Long aLong) {
        return cartItemRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return cartItemRepo.existsById(aLong);
    }

    @Override
    public long count() {
        return cartItemRepo.count();
    }

    @Override
    public void deleteById(Long aLong) {
        cartItemRepo.deleteById(aLong);
    }

    @Override
    public void delete(CartItem entity) {
        cartItemRepo.delete(entity);
    }
}

package com.example.backend_final.service.Impl;

import com.example.backend_final.model.Cart;
import com.example.backend_final.model.CartItem;
import com.example.backend_final.repository.CartItemRepo;
import com.example.backend_final.repository.CartRepo;
import com.example.backend_final.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private CartItemRepo cartItemRepo;

    @Override
    public <S extends Cart> S save(S entity) {
        return cartRepo.save(entity);
    }

    @Override
    public Optional<Cart> findById(Long aLong) {
        return cartRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return cartRepo.existsById(aLong);
    }

    @Override
    public long count(String username) {
        return cartItemRepo.getTotalCart(username);
    }

    @Override
    public void deleteById(Long aLong) {
        cartRepo.deleteById(aLong);
    }

    @Override
    public Page<CartItem> findAll(Pageable pageable) {
        return cartItemRepo.findAll(pageable);
    }

}

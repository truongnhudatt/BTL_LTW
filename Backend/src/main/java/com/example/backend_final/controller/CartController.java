package com.example.backend_final.controller;

import com.example.backend_final.dto.CartItemDto;
import com.example.backend_final.model.CartItem;
import com.example.backend_final.payload.response.CartItemDtoResp;
import com.example.backend_final.repository.CartItemRepo;
import com.example.backend_final.service.CartService;
import com.example.backend_final.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/carts")
public class CartController {


    @Autowired
    private CartService cartService;

    @Autowired
    private Mapper mapper;
    @Autowired
    private CartItemRepo cartItemRepo;

    @GetMapping("/all")
    public ResponseEntity<?> getALlCarts(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                         @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                         @RequestParam(value = "sortBy",defaultValue = "id") String sortBy,
                                         @RequestParam("username") String username){
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<CartItem> cartItems = cartItemRepo.findByUsername(username,pageable);
        List<CartItem> cartItems1 = cartItems.getContent();

        List<CartItemDto> cartItemDtos = cartItems1.stream().map(user -> mapper.toCartItemDto(user)).collect(Collectors.toList());
        CartItemDtoResp cartItemDtoResp = new CartItemDtoResp();
        cartItemDtoResp.setCartItemDto(cartItemDtos);
        cartItemDtoResp.setPageNo(cartItems.getNumber());
        cartItemDtoResp.setPageSize(cartItems.getSize());
        cartItemDtoResp.setTotalElements(cartItems.getTotalElements());
        cartItemDtoResp.setTotalPages(cartItems.getTotalPages());
        cartItemDtoResp.setLast(cartItems.isLast());
        return ResponseEntity.ok(cartItemDtoResp);
    }

    @GetMapping("/{username}/count")
    public ResponseEntity<?> getCount(@PathVariable("username") String username){
        return ResponseEntity.ok(cartService.count(username));
    }
}

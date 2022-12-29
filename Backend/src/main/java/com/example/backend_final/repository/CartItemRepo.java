package com.example.backend_final.repository;

import com.example.backend_final.model.Book;
import com.example.backend_final.model.Cart;
import com.example.backend_final.model.CartItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface CartItemRepo extends JpaRepository<CartItem, Long> {
    @Query("SELECT cardItem FROM CartItem cardItem WHERE cardItem.book = ?1 and cardItem.cart = ?2")
    Optional<CartItem> findCartItem(Book book, Cart cart);

    @Modifying
    @Query("DELETE FROM CartItem cardIt WHERE cardIt.id = ?1")
    void deleteCartItem(Long cartItemId);

    @Query(value = "SELECT DISTINCT c FROM CartItem c JOIN c.cart r JOIN r.user u WHERE u.username = ?1")
    Page<CartItem> findByUsername(String username, Pageable pageable);

    @Modifying
    @Query("UPDATE CartItem c SET c.quantity = ?1, c.unitPrice = c.quantity * c.price WHERE c.id = ?2")
    int updateQuantity(int quantity, Long id);

    @Query(value = "SELECT count(c) FROM CartItem c JOIN c.cart r JOIN r.user u WHERE u.username = ?1")
    long getTotalCart(String username);
}

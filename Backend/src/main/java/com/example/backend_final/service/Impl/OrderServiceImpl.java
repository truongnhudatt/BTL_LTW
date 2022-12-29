package com.example.backend_final.service.Impl;

import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.*;
import com.example.backend_final.payload.request.OrderRequest;
import com.example.backend_final.repository.CartItemRepo;
import com.example.backend_final.repository.CartRepo;
import com.example.backend_final.repository.OrderDetailRepo;
import com.example.backend_final.repository.OrderRepo;
import com.example.backend_final.service.BookService;
import com.example.backend_final.service.OrderService;
import com.example.backend_final.service.UserService;
import com.example.backend_final.util.Mapper;
import com.example.backend_final.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private Mapper mapper;
    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartItemRepo cartItemRepo;

    @Override
    public <S extends Order> S save(S entity) {
        return orderRepo.save(entity);
    }

    @Override
    public Optional<Order> findById(Long aLong) {
        return orderRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return orderRepo.existsById(aLong);
    }

    @Override
    public long count() {
        return orderRepo.count();
    }

    @Override
    public void deleteById(Long aLong) {
        orderRepo.deleteById(aLong);
    }

    @Override
    public void delete(Order entity) {
        orderRepo.delete(entity);
    }


    @Override
    public Page<Order> findAll(Pageable pageable) {
        return orderRepo.findAll(pageable);
    }

    @Override
    public Optional<Order> createOrder(OrderRequest orderRequest) throws BookNotFoundException {
        User user = userService.findByUsername(orderRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Cannot find user with username: "+ orderRequest.getUsername()));
        Optional<Order> orderTmp = orderRepo.getOrderByUsername(orderRequest.getUsername());
        Optional<Cart> cartTmp = cartRepo.getCartByUsername(orderRequest.getUsername());
        Order order;
        Cart cart;
        if(orderTmp.isPresent()) {
            order = orderTmp.get();
            cart = cartTmp.get();
            Book bookTmp = bookService.findById(orderRequest.getOrderDetailRequest().getBookId()).orElseThrow(() -> new BookNotFoundException("Cannot find book with bookId: " + orderRequest.getOrderDetailRequest().getBookId()));
            Optional<OrderDetail> orderDetailTmp = orderDetailRepo.findOrderDetail(bookTmp, order);
            Optional<CartItem> cartItemTml = cartItemRepo.findCartItem(bookTmp, cart);
            OrderDetail orderDetail;
            CartItem cartItem;
            if(orderDetailTmp.isPresent() && orderDetailTmp.get().getBill() == null){
                orderDetail = orderDetailTmp.get();
                cartItem = cartItemTml.get();
                orderDetail.setBook(bookTmp);
                cartItem.setBook(bookTmp);

                orderDetail.setQuantity(orderRequest.getOrderDetailRequest().getQuantity() + orderDetail.getQuantity());
                cartItem.setQuantity(orderRequest.getOrderDetailRequest().getQuantity() + cartItem.getQuantity());

                orderDetail.setPrice(bookTmp.getPrice());
                cartItem.setPrice(bookTmp.getPrice());

                orderDetail.setUnitPrice(orderDetail.getPrice().multiply(new BigDecimal(orderDetail.getQuantity())));
                cartItem.setUnitPrice(cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));
            }
            else {
                orderDetail = new OrderDetail();
                cartItem = new CartItem();

                orderDetail.setBook(bookTmp);
                cartItem.setBook(bookTmp);

                orderDetail.setQuantity(orderRequest.getOrderDetailRequest().getQuantity());
                cartItem.setQuantity(orderRequest.getOrderDetailRequest().getQuantity());

                orderDetail.setPrice(bookTmp.getPrice());
                cartItem.setPrice(bookTmp.getPrice());

                orderDetail.setUnitPrice(orderDetail.getPrice().multiply(new BigDecimal(orderDetail.getQuantity())));
                cartItem.setUnitPrice(cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));

                order.getOrderDetailList().add(orderDetail);
                cart.getCartItems().add(cartItem);

                orderDetail.setOrder(order);
                cartItem.setCart(cart);
            }
            }
        else {
            order = new Order();
            cart = new Cart();
            Book bookTmp = bookService.findById(orderRequest.getOrderDetailRequest().getBookId()).orElseThrow(() -> new BookNotFoundException("Cannot find book with bookId: " + orderRequest.getOrderDetailRequest().getBookId()));
            OrderDetail orderDetail = new OrderDetail();
            CartItem cartItem = new CartItem();

            orderDetail.setBook(bookTmp);
            cartItem.setBook(bookTmp);

            orderDetail.setQuantity(orderRequest.getOrderDetailRequest().getQuantity());
            cartItem.setQuantity(orderRequest.getOrderDetailRequest().getQuantity());

            orderDetail.setPrice(bookTmp.getPrice());
            cartItem.setPrice(bookTmp.getPrice());

            orderDetail.setUnitPrice(orderDetail.getPrice().multiply(new BigDecimal(orderDetail.getQuantity())));
            cartItem.setUnitPrice(cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity())));

            order.getOrderDetailList().add(orderDetail);
            cart.getCartItems().add(cartItem);

            orderDetail.setOrder(order);
            cartItem.setCart(cart);

            order.setOrderStatus(OrderStatus.NEW);

            order.setUser(user);
            cart.setUser(user);

        }
        user.getOrderList().add(order);
        user.getCartList().add(cart);
        cartRepo.save(cart);
        return Optional.of(orderRepo.save(order));
    }


    @Override
    public Optional<Order> getOrderByUserName(String username){
        return orderRepo.getOrderByUsername(username);
    }

    @Override
    public void deleteOrderDetail(Long id){
        orderDetailRepo.deleteOrderDetail(id);
    }

    @Override
    public int updateQuantity(int quantity, Long ordDetailId){
            cartItemRepo.updateQuantity(quantity,ordDetailId);
        return orderDetailRepo.updateQuantity(quantity,ordDetailId);
    }

    @Override
    public Optional<OrderDetail> getOrderDetailById(Long id){
        return orderDetailRepo.findById(id);
    }
}

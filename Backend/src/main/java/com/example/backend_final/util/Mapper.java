package com.example.backend_final.util;


import com.example.backend_final.dto.*;
import com.example.backend_final.model.*;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Component
public class Mapper {

    public User toUser(UserDto userDto){
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setRole(userDto.getRole());
        return user;
    }

    public UserDto toUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRole());
        return userDto;
    }

    public Book toBook(@Valid BookDto bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setTypeBook(bookDTO.getTypeBook());
        book.setDescription(bookDTO.getDescription());
        book.setTotalPage(bookDTO.getTotalPage());
        book.setPrice(new BigDecimal(bookDTO.getPrice()));
        book.setDateRelease(bookDTO.getDateRelease());
//        book.setRating(bookDTO.getRating());
        book.setImageList(bookDTO.getImageList().stream().map(item -> this.toImage(item)).collect(Collectors.toList()));
        book.getImageList().forEach(item -> item.setBook(book));
        return book;
    }

    public BookDto toBookDto(Book book){
        BookDto bookDto = new BookDto();
        bookDto.setId(book.getId());
        bookDto.setTitle(book.getTitle());
        bookDto.setAuthor(book.getAuthor());
        bookDto.setTypeBook(book.getTypeBook());
        bookDto.setDescription(book.getDescription());
        bookDto.setTotalPage(book.getTotalPage());
        bookDto.setDateRelease(book.getDateRelease());
        bookDto.setPrice(book.getPrice().floatValue());
        bookDto.setRating(book.getRating());
//        bookDto.setRating((float) book.getReviewList().stream().mapToDouble(Review::getScore).average().getAsDouble());
        bookDto.setImageList(book.getImageList().stream().map(item->this.toImageDto(item)).collect(Collectors.toList()));
        return bookDto;
    }

    public ImageDto toImageDto(Image image){
        ImageDto imageDto = new ImageDto();
        imageDto.setId(image.getId());
        imageDto.setFileName(image.getFileName());
        return imageDto;
    }

    public Image toImage(ImageDto imageDto){
        Image image = new Image();
        image.setFileName(imageDto.getFileName());
        return image;
    }

    public OrderDto toOrderDto(Order order){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUsername(order.getUser().getUsername());
//        orderDto.setCreated(order.getCreated());
        orderDto.setOrderDetailDtoList(order.getOrderDetailList().stream().map(item -> this.toOrderDetailDto(item)).collect(Collectors.toList()));
//        orderDto.setTotalPrice(order.getOrderDetailList().stream().map(OrderDetail::getUnitPrice).reduce(BigDecimal.ZERO,BigDecimal::add));
        return orderDto;
    }

    public OrderDetailDto toOrderDetailDto(OrderDetail orderDetail){
        OrderDetailDto orderDetailDto = new OrderDetailDto();
        orderDetailDto.setId(orderDetail.getId());
        orderDetailDto.setBookDto(this.toBookDto(orderDetail.getBook()));
        orderDetailDto.setPrice(orderDetail.getPrice());
        orderDetailDto.setQuantity(orderDetail.getQuantity());
        orderDetailDto.setUnitPrice(orderDetail.getUnitPrice());
        return orderDetailDto;
    }

    public ReviewDto toReviewDto(Review review){
        ReviewDto reviewDto = new ReviewDto();
        User user = review.getUser();
        Book book = review.getBook();
        reviewDto.setBookDto(this.toBookDto(book));
        reviewDto.setUserDto(this.toUserDto(user));
        reviewDto.setId(review.getId());
        reviewDto.setScore(review.getScore());
        reviewDto.setComment(review.getComment());
        return  reviewDto;
    }

    public BillDto toBillDto(Bill bill){
        BillDto billDto = new BillDto();
        billDto.setId(bill.getId());
        billDto.setUserDto(this.toUserDto(bill.getUser()));
        billDto.setPhone(bill.getPhone());
        billDto.setAddress(bill.getAddress());
        billDto.setOrderDetailDto(bill.getOrderDetailList().stream().map(ord -> this.toOrderDetailDto(ord)).collect(Collectors.toList()));
        billDto.setTotalPrice(bill.getTotalPrice().floatValue());
        billDto.setCreated(bill.getCreated());
        return billDto;
    }

    public CartItemDto toCartItemDto(CartItem cartItem){
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItem.getId());
        cartItemDto.setBookDto(this.toBookDto(cartItem.getBook()));
        cartItemDto.setPrice(cartItem.getPrice());
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setUnitPrice(cartItem.getUnitPrice());
        return cartItemDto;
    }

}

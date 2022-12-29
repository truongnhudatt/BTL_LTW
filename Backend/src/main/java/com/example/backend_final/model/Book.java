package com.example.backend_final.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
//@Table(name = "books", uniqueConstraints = {
//        @UniqueConstraint(name = "Tồn tại tiêu đề", columnNames = {"title"})})
@Table(name = "books")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotBlank(message = "Vui lòng nhập tiêu đề")
    @Column( unique = true)
//    @Unique(message = "hhhh")
    private String title;
    @NotBlank(message = "Vui lòng nhập tác giả")
    private String author;
    @NotBlank(message = "Vui lòng nhập mô tả")
    @Column(length = 500)
    @Lob
    private String description;
    @NotBlank(message = "Vui lòng chọn thể loại sách")
    private String typeBook;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @NotNull(message = "Vui lòng nhập ngày xuất bản")
    @Past(message = "Nhap ngay xuat ban di thang cho")
    private Date dateRelease;
    @NotNull(message = "Vui lòng nhập số trang")
    private int totalPage;
    @NotNull(message = "Vui lòng nhập giá")
    private BigDecimal price;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "book")
    private List<Image> imageList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<OrderDetail> orderDetailList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<CartItem> cartItems = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    private List<Review> reviewList = new ArrayList<>();

    private float rating = 0;


}

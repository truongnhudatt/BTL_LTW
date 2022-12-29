package com.example.backend_final.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartItemDto {
    private long id;
    private BookDto bookDto;
    private int quantity;
    private BigDecimal price;
    private BigDecimal unitPrice;
}

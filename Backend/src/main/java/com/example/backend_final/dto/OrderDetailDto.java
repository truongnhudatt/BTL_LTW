package com.example.backend_final.dto;

import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
public class OrderDetailDto implements Serializable {
    private long id;
    private BookDto bookDto;
    private int quantity;
    private BigDecimal price;
    private BigDecimal unitPrice;
}

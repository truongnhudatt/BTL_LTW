package com.example.backend_final.payload.request;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderDetailRequest {
    private long bookId;
    private int quantity;
}

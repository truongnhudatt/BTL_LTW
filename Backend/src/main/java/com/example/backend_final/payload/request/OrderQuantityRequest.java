package com.example.backend_final.payload.request;

import lombok.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
public class OrderQuantityRequest {
    private long orderDetailId;
    private int quantity;
}

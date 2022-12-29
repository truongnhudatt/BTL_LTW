package com.example.backend_final.payload.request;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderRequest implements Serializable {
    @NotBlank
    private String username;
    @NotBlank
    private OrderDetailRequest orderDetailRequest;
}

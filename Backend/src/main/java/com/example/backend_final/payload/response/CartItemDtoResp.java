package com.example.backend_final.payload.response;

import com.example.backend_final.dto.CartItemDto;
import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
public class CartItemDtoResp {
    private List<CartItemDto> cartItemDto;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

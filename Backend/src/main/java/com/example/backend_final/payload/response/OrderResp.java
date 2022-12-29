package com.example.backend_final.payload.response;

import com.example.backend_final.dto.OrderDto;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
public class OrderResp implements Serializable {
    private  List<OrderDto> orderDtoList;

    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

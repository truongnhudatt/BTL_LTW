package com.example.backend_final.dto;


import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@ToString
public class OrderDto implements Serializable {
    private long id;
    private String username;
    private List<OrderDetailDto> orderDetailDtoList;
}

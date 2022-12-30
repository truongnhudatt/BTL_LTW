package com.example.backend_final.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Setter
@Getter
@NoArgsConstructor
@ToString
public class BillDto {
    private long id;
    private UserDto userDto;
    private String phone;
    private String address;
    private List<OrderDetailDto> orderDetailDto;
    private float totalPrice;
    private Date created;
    private String billStatus;
}

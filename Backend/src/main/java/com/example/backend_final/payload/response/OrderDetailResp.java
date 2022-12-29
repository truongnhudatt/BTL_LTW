package com.example.backend_final.payload.response;

import com.example.backend_final.dto.OrderDetailDto;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Setter
@Getter
@NoArgsConstructor
@ToString
public class OrderDetailResp implements Serializable {
    private List<OrderDetailDto> orderDetailDtoList;

    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

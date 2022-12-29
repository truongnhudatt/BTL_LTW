package com.example.backend_final.payload.response;


import com.example.backend_final.dto.OrderDto;
import com.example.backend_final.dto.ReviewDto;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
public class ReviewResp implements Serializable {
    private List<ReviewDto> reviewDtoList;

    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

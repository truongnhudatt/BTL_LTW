package com.example.backend_final.payload.response;

import com.example.backend_final.dto.BillDto;
import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BillResp {
    private List<BillDto> billDtoList;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

package com.example.backend_final.payload.response;

import com.example.backend_final.dto.BookDto;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookResp implements Serializable {
    private List<BookDto> bookDtoList;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

package com.example.backend_final.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReviewDto implements Serializable {
    private long id;
    private UserDto userDto;
    private BookDto bookDto;
    private float score;
    private String comment;
}

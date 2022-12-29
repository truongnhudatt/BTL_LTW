package com.example.backend_final.payload.request;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Setter
@Getter
@ToString
@NoArgsConstructor
public class ReviewRequest {
    @NotBlank
    private String username;
    @NotBlank
    private long bookId;
    @NotBlank
    private float score;
    @NotBlank
    private String comment;
}

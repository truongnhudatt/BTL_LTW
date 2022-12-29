package com.example.backend_final.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BookDto implements Serializable {
    private long id;
    @NotBlank
    private String title;
    @NotBlank
    private String author;
    @NotBlank
    private String typeBook;
    @NotBlank
    private String description;
    private Date dateRelease;
    @NotNull
    private int totalPage;
    @NotNull
    private float price;
    @NotBlank
    private List<ImageDto> imageList;
    private float rating;
}

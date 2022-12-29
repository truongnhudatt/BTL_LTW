package com.example.backend_final.dto;

import lombok.*;

import java.io.Serializable;

@Data
@Setter
@Getter
@NoArgsConstructor
@ToString
public class ImageDto implements Serializable {
    private long id;
    private String fileName;

    public ImageDto(String fileName) {
        this.fileName = fileName;
    }
}

package com.example.backend_final.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest implements Serializable {
    private long id;
    @Valid
    @NotBlank(message = "Vui lòng nhập tiêu đề")
    private String title;
    @Valid
    @NotBlank(message = "Vui lòng nhập tác giả")
    private String author;
    @Valid
    @NotBlank(message = "Vui lòng nhập thể loại sách")
    private String typeBook;
    @Valid
    @NotBlank(message = "Vui lòng nhập mô tả")
    private String description;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateRelease;
    @Valid
    @Min(value = 10, message = "Nhập số trang hợp lệ")
    private int totalPage;
    @Valid
    @Min(value = 1000, message = "Nhập giá hợp lệ")
    private float price;
//    @Valid
//    @NotNull(message = "Vui lòng thêm ảnh bìa")
//    private MultipartFile[] images;
}

package com.example.backend_final.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Data
@Getter

public class Login implements Serializable {
    @NotBlank(message = "Vui lòng nhập tên người dùng")
    private String username;
    @NotBlank(message = "Vui lòng nhập mật khẩu")
    private String password;
}

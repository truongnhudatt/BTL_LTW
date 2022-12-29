package com.example.backend_final.payload.request;


import com.example.backend_final.util.Role;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Setter
@Getter
public class SignUp implements Serializable {
    @Valid
    @NotBlank(message = "Vui lòng nhập họ")
    private String firstName;
    @Valid
    @NotBlank(message = "Vui lòng nhập tên")
    private String lastName;
    @Valid
    @NotBlank(message = "Vui lòng nhập tên người dùng")
    private String username;
    @Valid
    @NotBlank(message = "Vui lòng nhập email")
    @Email(message = "Vui lòng nhập email hợp lệ")
    private String email;
    @Valid
    @NotBlank(message = "Vui lòng nhập mật khẩu")
    @Size(min = 8,message = "Mật khẩu trên 8 kí tự")
    private String password;
//    @NotBlank
    private Role role = Role.USER;
}

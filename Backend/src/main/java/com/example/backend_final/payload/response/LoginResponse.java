package com.example.backend_final.payload.response;

import com.example.backend_final.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@AllArgsConstructor
@ToString
public class LoginResponse implements Serializable {
    private String token;
    private String type = "Bearer";
    private UserDto userDto;

    public LoginResponse(String token, UserDto userDto) {
        this.token = token;
        this.userDto = userDto;
    }
}

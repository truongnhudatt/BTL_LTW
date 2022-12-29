package com.example.backend_final.dto;

import com.example.backend_final.util.Role;
import lombok.*;

import java.io.Serializable;

@Data
@Getter
public class UserDto implements Serializable {
    private long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Role role;
}

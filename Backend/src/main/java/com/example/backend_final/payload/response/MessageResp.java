package com.example.backend_final.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResp implements Serializable {
    private HttpStatus status;
    private String message;
    private Object data;
}

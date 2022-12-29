package com.example.backend_final.payload.response;


import com.example.backend_final.dto.UserDto;
import com.example.backend_final.util.Role;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserResp implements Serializable {
    private List<UserDto> listOfUsers;

    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}

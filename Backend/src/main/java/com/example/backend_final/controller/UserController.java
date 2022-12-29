package com.example.backend_final.controller;

import com.example.backend_final.dto.UserDto;
import com.example.backend_final.model.User;
import com.example.backend_final.payload.request.Login;
import com.example.backend_final.payload.request.SignUp;
import com.example.backend_final.payload.response.LoginResponse;
import com.example.backend_final.payload.response.MessageResp;
import com.example.backend_final.payload.response.UserResp;
import com.example.backend_final.security.config.JwtUtils;
import com.example.backend_final.service.UserService;
import com.example.backend_final.util.Mapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private Mapper mapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                          @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                          @RequestParam(value = "sortBy",defaultValue = "username") String sortBy){
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<User> userPage = userService.findAll(pageable);
        List<User> userList = userPage.getContent();

        List<UserDto> userDtoList = userList.stream().map(user -> mapper.toUserDto(user)).collect(Collectors.toList());
        UserResp userResp = new UserResp();
        userResp.setListOfUsers(userDtoList);
        userResp.setPageNo(userPage.getNumber());
        userResp.setPageSize(userPage.getSize());
        userResp.setTotalElements(userPage.getTotalElements());
        userResp.setTotalPages(userPage.getTotalPages());
        userResp.setLast(userPage.isLast());
        return ResponseEntity.ok(userResp);
    }

    @GetMapping("/detail/{username}")
    public ResponseEntity<UserDto> getDetailUser(@PathVariable("username") String username){
        Optional<User> userTmp = userService.findByUsername(username);
        if(userTmp.isPresent())
            return ResponseEntity.ok(mapper.toUserDto(userTmp.get()));
        else
            return ResponseEntity.noContent().build();
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUp signUp){
        if(userService.existsByUsername(signUp.getUsername()) && userService.existsByEmail(signUp.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST, "Validation Failed", "Tên người dùng hoặc email đã tồn tại"));
        }
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"User registered successfully!", mapper.toUserDto(userService.userSignup(signUp))));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageResp> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(new MessageResp(HttpStatus.BAD_REQUEST,"Validation Failed", errors));
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody Login login){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(user);
        System.out.println(jwt);
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"Login successfully!",new LoginResponse(jwt,mapper.toUserDto(user))));
    }

}

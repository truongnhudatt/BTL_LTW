package com.example.backend_final.valid;

import com.example.backend_final.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class BookUniqueValidator implements ConstraintValidator<Unique,String> {

    @Autowired
    private BookService bookService;


    @Override
    public void initialize(Unique constraintAnnotation) {
        constraintAnnotation.message();
//        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String title, ConstraintValidatorContext context) {
        if(bookService != null && bookService.existsByTitle(title)){
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}

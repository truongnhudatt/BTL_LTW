package com.example.backend_final.controller;


import com.example.backend_final.dto.ReviewDto;
import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.Review;
import com.example.backend_final.payload.request.ReviewRequest;
import com.example.backend_final.payload.response.ReviewResp;
import com.example.backend_final.service.ReviewService;
import com.example.backend_final.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private Mapper mapper;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest request) throws BookNotFoundException {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getReviewByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(reviewService.getReviewByUsername(username));
    }

    @GetMapping("/book/{id}")
    public ResponseEntity<?> getReviewByBookId(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(reviewService.getReviewByBookId(id).stream().map(item -> mapper.toReviewDto(item)).collect(Collectors.toList()));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                         @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                         @RequestParam(value = "sortBy",defaultValue = "score") String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Review> reviewPage = reviewService.findAll(pageable);
        List<Review> reviewList = reviewPage.getContent();

        List<ReviewDto> reviewDtoList = reviewList.stream().map(rv -> mapper.toReviewDto(rv)).collect(Collectors.toList());
        ReviewResp reviewResp = new ReviewResp();
        reviewResp.setReviewDtoList(reviewDtoList);
        reviewResp.setPageNo(reviewPage.getNumber());
        reviewResp.setPageSize(reviewPage.getSize());
        reviewResp.setTotalElements(reviewPage.getTotalElements());
        reviewResp.setTotalPages(reviewPage.getTotalPages());
        reviewResp.setLast(reviewPage.isLast());
        return ResponseEntity.ok(reviewResp);
    }
}

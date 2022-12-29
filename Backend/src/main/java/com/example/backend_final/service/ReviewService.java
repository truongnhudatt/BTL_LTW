package com.example.backend_final.service;


import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.Review;
import com.example.backend_final.payload.request.ReviewRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public interface ReviewService {
    Optional<Review> createReview(ReviewRequest request) throws BookNotFoundException;

    List<Review> getReviewByBookId(Long bookId);

    Optional<Review> getReviewByUsername(String username);

    Optional<Review> findById(Long aLong);

    Page<Review> findAll(Pageable pageable);
}

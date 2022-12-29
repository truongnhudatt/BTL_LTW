package com.example.backend_final.service.Impl;

import com.example.backend_final.error.BookNotFoundException;
import com.example.backend_final.model.Book;
import com.example.backend_final.model.Review;
import com.example.backend_final.model.User;
import com.example.backend_final.payload.request.ReviewRequest;
import com.example.backend_final.repository.ReviewRepo;
import com.example.backend_final.service.BookService;
import com.example.backend_final.service.ReviewService;
import com.example.backend_final.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Override
    public Optional<Review> createReview(ReviewRequest request) throws BookNotFoundException {
        User user = userService.findByUsername(request.getUsername())
                                                .orElseThrow(
                                                        () ->
                                                                new UsernameNotFoundException("Can not found user with username: "+ request.getUsername()));
        Book book = bookService.findById(request.getBookId())
                                                .orElseThrow(() ->
                                                                    new BookNotFoundException("Can not found book with bookId: " + request.getBookId()));
        Optional<Review> reviewTmp = reviewRepo.findReviewToUpdate(request.getBookId(), request.getUsername());
        Review review;
        if(reviewTmp.isPresent()){
            review = reviewTmp.get();
            review.setScore(request.getScore());
            review.setComment(request.getComment());
//            review.setUser(user);
//            review.setBook(book);
            book.setRating((float) book.getReviewList().stream().mapToDouble(Review::getScore).average().getAsDouble());
        }
        else{
            review = new Review();
            review.setUser(user);
            review.setBook(book);
            review.setScore(request.getScore());
            review.setComment(request.getComment());
            user.getReviewList().add(review);
            book.getReviewList().add(review);
            book.setRating((float) book.getReviewList().stream().mapToDouble(Review::getScore).average().getAsDouble());
        }
        return Optional.of(reviewRepo.save(review));
    }

    @Override
    public List<Review> getReviewByBookId(Long bookId){
        return reviewRepo.findReviewByBookId(bookId);
    }

    @Override
    public Optional<Review> getReviewByUsername(String username){
        return reviewRepo.findReviewByUsername(username);
    }

    @Override
    public Optional<Review> findById(Long aLong) {
        return reviewRepo.findById(aLong);
    }

    @Override
    public Page<Review> findAll(Pageable pageable) {
        return reviewRepo.findAll(pageable);
    }
}

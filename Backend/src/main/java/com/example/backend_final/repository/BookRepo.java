package com.example.backend_final.repository;

import com.example.backend_final.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface BookRepo extends JpaRepository<Book, Long> {

    boolean existsByTitle(String title);

    @Query("SELECT b FROM Book b WHERE b.title like %:keyword%")
    Page<Book> findBookByKeyword(@Param("keyword")String keyword, Pageable pageable);
}

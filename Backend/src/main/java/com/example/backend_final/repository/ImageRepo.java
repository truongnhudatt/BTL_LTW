package com.example.backend_final.repository;

import com.example.backend_final.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface ImageRepo extends JpaRepository<Image,Long> {

    @Modifying
    @Query("DELETE FROM Image i where i.book.id = ?1")
    void deleteImageBook(Long id);

}

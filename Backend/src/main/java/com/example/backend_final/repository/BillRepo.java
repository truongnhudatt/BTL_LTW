package com.example.backend_final.repository;

import com.example.backend_final.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;

@Transactional
@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {

    @Query(value = "SELECT b FROM Bill b JOIN b.user u WHERE u.username = ?1")
    Page<Bill> findAllByUsername(String username, Pageable pageable);
}

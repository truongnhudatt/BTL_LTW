package com.example.backend_final.repository;

import com.example.backend_final.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {
}

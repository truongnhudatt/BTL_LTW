package com.example.backend_final.service;


import com.example.backend_final.model.Bill;
import com.example.backend_final.payload.request.BillRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public interface BillService {
    Bill createBill(BillRequest billRequest);

    Optional<Bill> findById(Long aLong);

    boolean existsById(Long aLong);

    long count();

    void deleteById(Long aLong);

    void delete(Bill entity);

    Page<Bill> findAll(Pageable pageable);


    @Query("SELECT b FROM Bill b JOIN b.user u WHERE u.username = ?1")
    Page<Bill> findAllByUsername(String username, Pageable pageable);
}

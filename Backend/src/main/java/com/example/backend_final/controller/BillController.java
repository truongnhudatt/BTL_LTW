package com.example.backend_final.controller;


import com.example.backend_final.dto.BillDto;
import com.example.backend_final.model.Bill;
import com.example.backend_final.payload.request.BillRequest;
import com.example.backend_final.payload.response.BillResp;
import com.example.backend_final.payload.response.MessageResp;
import com.example.backend_final.service.BillService;
import com.example.backend_final.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/bills")
@CrossOrigin
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private Mapper mapper;

    @PostMapping("/create")
    public ResponseEntity<?> createBill(@RequestBody BillRequest billRequest){
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"Created bill successfully!", mapper.toBillDto(billService.createBill(billRequest)) ));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBills(@RequestParam(value = "pageNo",defaultValue = "0") Integer pageNo,
                                         @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                                         @RequestParam(value = "sortBy",defaultValue = "create") String sortBy){
        Pageable paging = PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        Page<Bill> billPage = billService.findAll(paging);
        List<Bill> billList = billPage.getContent();

        List<BillDto> billDtoList = billList.stream().map(b -> mapper.toBillDto(b)).collect(Collectors.toList());
        BillResp billResp = new BillResp();
        billResp.setBillDtoList(billDtoList);
        billResp.setPageNo(billPage.getNumber());
        billResp.setPageSize(billPage.getSize());
        billResp.setTotalElements(billPage.getTotalElements());
        billResp.setTotalPages(billPage.getTotalPages());
        billResp.setLast(billPage.isLast());
        return ResponseEntity.ok().body(new MessageResp(HttpStatus.OK,"Query execute successfully!", billResp));
    }

}

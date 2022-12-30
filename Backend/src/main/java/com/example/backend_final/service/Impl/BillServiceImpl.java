package com.example.backend_final.service.Impl;

import com.example.backend_final.model.Bill;
import com.example.backend_final.model.CartItem;
import com.example.backend_final.model.OrderDetail;
import com.example.backend_final.model.User;
import com.example.backend_final.payload.request.BillRequest;
import com.example.backend_final.repository.BillRepo;
import com.example.backend_final.repository.CartItemRepo;
import com.example.backend_final.repository.OrderDetailRepo;
import com.example.backend_final.service.BillService;
import com.example.backend_final.service.OrderService;
import com.example.backend_final.service.UserService;
import com.example.backend_final.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderDetailRepo orderDetailRepo;

    @Autowired
    private CartItemRepo cartItemRepo;

    @Override
    public Bill createBill(BillRequest billRequest){
        Bill bill = new Bill();
        User user = userService.findByUsername(billRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Can not found user"));
        bill.setUser(user);
        bill.setPhone(billRequest.getPhone());
        bill.setAddress(billRequest.getAddress());
        bill.setOrderDetailList(billRequest.getListOrderDetailId().stream().map(idx -> orderDetailRepo.findById(idx).orElseThrow()).collect(Collectors.toList()));
        bill.setCreated(new Date());
        bill.setTotalPrice(bill.getOrderDetailList().stream().map(OrderDetail::getUnitPrice).reduce(BigDecimal.ZERO, BigDecimal::add));
        bill.getOrderDetailList().forEach(b -> b.setBill(bill));
        bill.setBillStatus(OrderStatus.DELIVERED);
        user.getBillList().add(bill);
        Bill rp = billRepo.save(bill);
        List<CartItem> itemList = billRequest.getListOrderDetailId().stream().map(idx -> cartItemRepo.findById(idx).orElseThrow()).collect(Collectors.toList());
        itemList.forEach(it -> cartItemRepo.deleteCartItem(it.getId()));
        return rp;
    }

    @Override
    public Optional<Bill> findById(Long aLong) {
        return billRepo.findById(aLong);
    }

    @Override
    public boolean existsById(Long aLong) {
        return billRepo.existsById(aLong);
    }

    @Override
    public long count() {
        return billRepo.count();
    }

    @Override
    public void deleteById(Long aLong) {
        billRepo.deleteById(aLong);
    }

    @Override
    public void delete(Bill entity) {
        billRepo.delete(entity);
    }

    @Override
    public Page<Bill> findAll(org.springframework.data.domain.Pageable pageable) {
        return null;
    }



    @Override
    @Query("SELECT b FROM Bill b JOIN b.user u WHERE u.username = ?1")
    public Page<Bill> findAllByUsername(String username, Pageable pageable) {
        return billRepo.findAllByUsername(username, pageable);
    }
}

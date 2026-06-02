package com.flashfood.controller;

import com.flashfood.model.Order;
import com.flashfood.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Order order) {
        Order saved = orderService.create(order);
        return ResponseEntity.ok(saved);
    }
}
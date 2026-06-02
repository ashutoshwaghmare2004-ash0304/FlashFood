package com.flashfood.service;

import com.flashfood.model.Order;
import com.flashfood.model.User;
import com.flashfood.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public Order create(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }
}
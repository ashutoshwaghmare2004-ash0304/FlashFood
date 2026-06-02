package com.flashfood.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Restaurant restaurant;
    
    private Double totalAmount;
    private String status;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate = LocalDateTime.now();
}
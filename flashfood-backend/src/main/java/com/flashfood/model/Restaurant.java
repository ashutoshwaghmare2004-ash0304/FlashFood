package com.flashfood.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "restaurants")
@Data
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String cuisine;
    private String city;
    private Double rating;
    private Integer priceForTwo;
    private String address;
}
package com.flashfood.controller;

import com.flashfood.model.Restaurant;
import com.flashfood.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    
    private final RestaurantService restaurantService;
    
    @GetMapping
    public List<Restaurant> getAll() {
        return restaurantService.getAll();
    }
    
    @GetMapping("/city/{city}")
    public List<Restaurant> getByCity(@PathVariable String city) {
        return restaurantService.getByCity(city);
    }
}
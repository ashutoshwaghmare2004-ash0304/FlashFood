package com.flashfood.service;

import com.flashfood.model.Restaurant;
import com.flashfood.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    
    private final RestaurantRepository restaurantRepository;
    
    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }
    
    public List<Restaurant> getByCity(String city) {
        return restaurantRepository.findByCity(city);
    }
}
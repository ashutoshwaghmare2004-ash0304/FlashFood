package com.flashfood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class FlashFoodApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlashFoodApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "🍔 FlashFood API is running!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
package com.papermind.paper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PaperApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaperApplication.class, args);
    }
}

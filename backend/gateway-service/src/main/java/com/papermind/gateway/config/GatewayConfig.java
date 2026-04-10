package com.papermind.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("paper-service", r -> r.path("/papers/**")
                        .uri("lb://paper-service"))
                .route("ai-engine", r -> r.path("/ai/**")
                        .uri("lb://ai-engine"))
                .route("user-service", r -> r.path("/users/**")
                        .uri("lb://user-service"))
                .build();
    }
}

package com.papermind.paper.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;

@FeignClient(name = "ai-engine")
public interface AiEngineFeignClient {

    @PostMapping("/ai/analyze/{paperId}")
    Map<String, Object> analyzePaper(@PathVariable("paperId") Long paperId);
}

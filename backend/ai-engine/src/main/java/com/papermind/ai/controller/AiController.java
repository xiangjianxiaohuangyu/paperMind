package com.papermind.ai.controller;

import com.papermind.ai.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/analyze/{paperId}")
    public ResponseEntity<Map<String, Object>> analyzePaper(@PathVariable Long paperId) {
        Map<String, Object> result = aiService.analyzePaper(paperId);
        return ResponseEntity.ok(result);
    }
}

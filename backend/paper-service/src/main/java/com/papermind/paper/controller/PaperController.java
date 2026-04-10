package com.papermind.paper.controller;

import com.papermind.paper.entity.Paper;
import com.papermind.paper.service.PaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/papers")
public class PaperController {

    @Autowired
    private PaperService paperService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadPaper(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam(value = "abstractText", required = false) String abstractText) {
        try {
            Paper paper = paperService.uploadPaper(file, title, author, abstractText);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", paper);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<List<Paper>> getPaperList() {
        return ResponseEntity.ok(paperService.getPaperList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paper> getPaperById(@PathVariable Long id) {
        Paper paper = paperService.getPaperById(id);
        if (paper == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(paper);
    }

    @PostMapping("/{id}/analyze")
    public ResponseEntity<Map<String, Object>> analyzePaper(@PathVariable Long id) {
        Map<String, Object> result = paperService.analyzePaper(id);
        if (result == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Paper not found");
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", result);
        return ResponseEntity.ok(response);
    }
}

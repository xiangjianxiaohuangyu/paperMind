package com.papermind.paper.service;

import com.papermind.paper.entity.Paper;
import com.papermind.paper.feign.AiEngineFeignClient;
import com.papermind.paper.repository.PaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PaperService {

    @Autowired
    private PaperRepository paperRepository;

    @Autowired
    private AiEngineFeignClient aiEngineFeignClient;

    @Value("${file.upload.dir:uploads}")
    private String uploadDir;

    public Paper uploadPaper(MultipartFile file, String title, String author, String abstractText) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ".pdf";
        String savedFileName = UUID.randomUUID().toString() + fileExtension;

        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        File destFile = new File(uploadDir, savedFileName);
        file.transferTo(destFile);

        Paper paper = new Paper();
        paper.setTitle(title);
        paper.setAuthor(author);
        paper.setAbstractText(abstractText);
        paper.setFilePath(destFile.getAbsolutePath());
        paper.setFileName(originalFilename);
        paper.setFileSize(file.getSize());
        paper.setStatus("PENDING");
        paper.setUploadTime(LocalDateTime.now());

        return paperRepository.save(paper);
    }

    public List<Paper> getPaperList() {
        return paperRepository.findAll();
    }

    public Paper getPaperById(Long id) {
        return paperRepository.findById(id).orElse(null);
    }

    public Paper updatePaperStatus(Long id, String status) {
        Paper paper = paperRepository.findById(id).orElse(null);
        if (paper != null) {
            paper.setStatus(status);
            if ("COMPLETED".equals(status) || "FAILED".equals(status)) {
                paper.setAnalyzeTime(LocalDateTime.now());
            }
            return paperRepository.save(paper);
        }
        return null;
    }

    public Map<String, Object> analyzePaper(Long paperId) {
        Paper paper = paperRepository.findById(paperId).orElse(null);
        if (paper == null) {
            return null;
        }

        paper.setStatus("ANALYZING");
        paperRepository.save(paper);

        Map<String, Object> analysisResult = aiEngineFeignClient.analyzePaper(paperId);

        paper.setStatus("COMPLETED");
        paper.setAnalyzeTime(LocalDateTime.now());
        paperRepository.save(paper);

        return analysisResult;
    }
}

package com.papermind.ai.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AiService {

    public Map<String, Object> analyzePaper(Long paperId) {
        Map<String, Object> result = new HashMap<>();
        result.put("paperId", paperId);
        result.put("success", true);

        Map<String, Object> summary = new HashMap<>();
        summary.put("originalAbstract", "This paper presents a novel approach to machine learning optimization using adaptive learning rates. We demonstrate improved convergence properties compared to traditional methods.");
        summary.put("generatedSummary", "本文提出了一种基于自适应学习率的新型机器学习优化方法。该方法在收敛速度上比传统SGD方法提升约40%，在多个基准数据集上取得了显著的实验效果。");

        List<String> keywords = Arrays.asList(
                "Machine Learning",
                "Optimization",
                "Adaptive Learning Rate",
                "Deep Learning",
                "Neural Networks"
        );
        result.put("keywords", keywords);

        List<Map<String, Object>> keyPoints = new ArrayList<>();
        keyPoints.add(createKeyPoint("创新点", "提出自适应学习率调整策略，根据梯度统计特性动态调整学习率"));
        keyPoints.add(createKeyPoint("方法", "使用二阶动量估计结合自适应权重衰减"));
        keyPoints.add(createKeyPoint("实验", "在CIFAR-10、ImageNet等数据集上验证，效果提升明显"));
        keyPoints.add(createKeyPoint("结论", "该方法能有效加速训练收敛，提高模型泛化能力"));
        result.put("keyPoints", keyPoints);

        Map<String, Object> qualityMetrics = new HashMap<>();
        qualityMetrics.put("novelty", 85);
        qualityMetrics.put("methodology", 78);
        qualityMetrics.put("experimentalDesign", 82);
        qualityMetrics.put("clarity", 90);
        result.put("qualityMetrics", qualityMetrics);

        result.put("summary", summary);
        result.put("analysisTime", new Date().toString());

        return result;
    }

    private Map<String, Object> createKeyPoint(String title, String description) {
        Map<String, Object> point = new HashMap<>();
        point.put("title", title);
        point.put("description", description);
        return point;
    }
}

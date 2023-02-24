package com.pre007.server.question.controller;

import com.pre007.server.question.dto.QuestionPatchDto;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.dto.QuestionResponseDto;
import com.pre007.server.question.service.QuestionService;
import com.pre007.server.user.dto.UserCreatedDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // 전체 조회
    @GetMapping
    public List<QuestionResponseDto> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // 단일 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getQuestion(id));
    }

    // 생성
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionPostDto dto) {
        Long id = questionService.createQuestion(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity updateQuestion(@PathVariable("question-id") @Positive Long id,
                                         @RequestBody @Valid QuestionPatchDto dto) {
        dto.setQuestionId(id);
        questionService.updateQuestion(dto);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }



}

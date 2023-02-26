package com.pre007.server.question.controller;

import com.pre007.server.globaldto.ResponseDto;
import com.pre007.server.question.dto.QuestionPage;
import com.pre007.server.question.dto.QuestionPatchDto;
import com.pre007.server.question.dto.QuestionPostDto;
import com.pre007.server.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // 생성
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionPostDto dto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(questionService.createQuestion(dto), 200));
    }

    // 페이지별 조회
    @GetMapping // @RequestParam QuestionPage questionPage
    public ResponseEntity getQuestionsByPage(@RequestParam("page") int page){
        QuestionPage questionPage = new QuestionPage(page);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(questionService.getQuestionsByQuestionPage(questionPage), 200));
    }


    // 단일 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(questionService.getQuestion(id), 200));
    }

    // 수정
    @PatchMapping("/{question-id}")
    public ResponseEntity updateQuestion(@PathVariable("question-id") @Positive Long id,
                                         @RequestBody @Valid QuestionPatchDto dto) {

        questionService.updateQuestion(dto, id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(dto, 200));
    }

    // 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }



}

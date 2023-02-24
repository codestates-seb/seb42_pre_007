package com.pre007.server.answer.controller;

import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.dto.ResponseDto;
import com.pre007.server.answer.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/question/{question-id}/answer/submit")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // Create a new answer -> Post
    @PostMapping()
    public ResponseEntity createAnswer(@Valid @RequestBody AnswerCreateDto requestDto,
                                                          @PathVariable("question-id") @Positive Long questionId){
        // Answer answer = answerService.createAnswer(requestDto, questionId);
        answerService.createAnswer(requestDto, questionId);

        return new ResponseEntity<>(new ResponseDto(questionId, 200), HttpStatus.CREATED);
    }
    // Update an existing answer -> Patch
    @PatchMapping("/{answer-id}")
    public ResponseEntity updateAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                                          @Valid @RequestBody AnswerUpdateDto requestDto,
                                                          @PathVariable("question-id") @Positive Long questionId){
        answerService.updateAnswer(answerId, requestDto);
        return new ResponseEntity<>(new ResponseDto(questionId, 200), HttpStatus.OK);
    }

    // Delete an existing answer -> Delete
    @DeleteMapping("/{answer-id}}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId,
                                             @PathVariable("question-id") Long questionId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(new ResponseDto(questionId, 200),HttpStatus.OK);
    }

}

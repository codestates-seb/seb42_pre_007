package com.pre007.server.answer.controller;

import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.dto.AnswerResponseDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.repository.AnswerRepository;
import com.pre007.server.answer.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@Validated
@RequestMapping("/question/{question-id}/answer")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // Create a new answer -> Post
    @PostMapping("/submit")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerResponseDto> createAnswer(@Valid @RequestBody AnswerCreateDto requestDto,
                                                          @PathVariable("question-id") String questionId){
        Answer answer = answerService.createAnswer(requestDto.getUser());
        AnswerResponseDto responseDto = new AnswerResponseDto(answer);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);

    }
    // Update an existing answer -> Patch
    @PatchMapping("/submit/{answer-id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<AnswerResponseDto> updateAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                                          @Valid @RequestBody AnswerUpdateDto requestDto,
                                                          @PathVariable("question-id") @Positive Long questionId){
        Answer answer = answerService.updateAnswer(answerId, requestDto);
        AnswerResponseDto responseDto = new AnswerResponseDto(answer);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // Delete an existing answer -> Delete
    @DeleteMapping("/submit/{answerId}}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long answerId,
                                             @PathVariable("question-id") String questionId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

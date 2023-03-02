package com.pre007.server.answer.controller;

import com.pre007.server.answer.dto.AnswerCreateDto;
import com.pre007.server.answer.dto.AnswerUpdateDto;
import com.pre007.server.answer.service.AnswerService;
import com.pre007.server.globaldto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/questions/{question-id}/answer/submit")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    // Create a new answer -> Post
    @PostMapping
    public ResponseEntity createAnswer(@Valid @RequestBody AnswerCreateDto requestDto,
                                       @PathVariable("question-id") @Positive Long questionId){
        answerService.createAnswer(requestDto, questionId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseDto(questionId, 200));
    }
    // Update an existing answer -> Patch
    @PatchMapping("/{answer-id}")
    public ResponseEntity updateAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                       @Valid @RequestBody AnswerUpdateDto requestDto,
                                       @PathVariable("question-id") @Positive Long questionId){
        answerService.updateAnswer(answerId, requestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseDto(questionId, 200));
    }

    // Delete an existing answer -> Delete
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId,
                                       @PathVariable("question-id") Long questionId){
        answerService.deleteAnswer(answerId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new ResponseDto(questionId, 200));
    }

    /**
     * votes
     */
    @PostMapping("/{answer-id}/votes/up")
    public ResponseEntity postVoteUp(@PathVariable("question-id") @Positive Long questionId,
                                     @PathVariable("answer-id") @Positive Long id,
                                     @AuthenticationPrincipal String email) {
        answerService.addVote(id, email, 1);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(questionId, 200));
    }

    @PostMapping("/{answer-id}/votes/down")
    public ResponseEntity postVoteDown(@PathVariable("question-id") @Positive Long questionId,
                                       @PathVariable("answer-id") @Positive Long id,
                                       @AuthenticationPrincipal String email) {
        answerService.addVote(id, email, -1);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(questionId, 200));
    }

    @PatchMapping("/{answer-id}/selection")
    public ResponseEntity selectionAnswer(@PathVariable("question-id") @Positive Long questionId,
                                          @PathVariable("answer-id") @Positive Long id,
                                          @AuthenticationPrincipal String email) {
        answerService.selectionAnswer(questionId, email, id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(questionId, 200));
    }
}

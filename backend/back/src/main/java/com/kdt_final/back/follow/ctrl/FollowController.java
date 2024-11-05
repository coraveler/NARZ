package com.kdt_final.back.follow.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.follow.domain.FollowRequestDTO;
import com.kdt_final.back.follow.service.FollowService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/save")
    public ResponseEntity<Void> saveFollow(@RequestBody FollowRequestDTO params) {
        System.out.println(params);
        followService.saveFollow(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/check")
    public ResponseEntity<Integer> checkFollow(@RequestParam Integer followerId, @RequestParam Integer followedId) {
        FollowRequestDTO params = new FollowRequestDTO();
        params.setFollowerId(followerId);
        params.setFollowedId(followedId);
        Integer result = followService.checkFollow(params);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFollow(@RequestBody FollowRequestDTO params) {
        followService.deleteFollow(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}

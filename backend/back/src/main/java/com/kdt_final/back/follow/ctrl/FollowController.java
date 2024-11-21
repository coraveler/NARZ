package com.kdt_final.back.follow.ctrl;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.PathVariable;

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

    @GetMapping("/getFollowers/{userId}")
    public ResponseEntity<List<Integer>> getFollowers(@PathVariable("userId") Integer userId) {
        List<Integer> result = followService.getFollowers(userId);
        return new ResponseEntity<List<Integer>>(result, HttpStatus.OK);
    }

    @GetMapping("/getFollowings/{userId}")
    public ResponseEntity<List<Integer>> getFollowings(@PathVariable("userId") Integer userId) {
        List<Integer> result = followService.getFollowings(userId);
        return new ResponseEntity<List<Integer>>(result, HttpStatus.OK);
    }

    @GetMapping("/countFollower/{userId}")
    public ResponseEntity<Integer> countFollower(@PathVariable("userId") Integer userId) {
        Integer result = followService.countFollower(userId);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }

    @GetMapping("/countFollowing/{userId}")
    public ResponseEntity<Integer> countFollowing(@PathVariable("userId") Integer userId) {
        Integer result = followService.countFollowing(userId);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }
    푸쉬
    
}

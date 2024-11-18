package com.kdt_final.back.chat.ctrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.chat.domain.ChatRequestDTO;
import com.kdt_final.back.chat.domain.ChatResponseDTO;
import com.kdt_final.back.chat.domain.exitchatrommtime.ChatExitRoomTimeRequestDTO;
import com.kdt_final.back.chat.service.ChatService;


@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/saveLastChat")
    public ResponseEntity<Void> saveLastChat(@RequestBody ChatRequestDTO params) {
        chatService.saveLastChat(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/getLastChat/{loginId}/{channelId}")
    public ResponseEntity<ChatResponseDTO> getLastChat(@PathVariable("loginId") String loginId, @PathVariable("channelId") String channelId) {
        ChatRequestDTO params = new ChatRequestDTO();
        params.setLoginId(loginId);
        params.setChannelId(channelId);
        ChatResponseDTO result = chatService.getLastChat(params);
        return new ResponseEntity<ChatResponseDTO>(result,HttpStatus.OK);
    }
    
    @PostMapping("/saveTotalUnread")
    public ResponseEntity<Void> saveTotalUnread(@RequestBody ChatRequestDTO params) {
        chatService.saveTotalUnread(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/getTotalUnread/{loginId}")
    public ResponseEntity<Integer> getTotalUnread(@PathVariable("loginId") String loginId) {
        Integer result = chatService.getTotalUnread(loginId);
        return new ResponseEntity<Integer>(result,HttpStatus.OK);
    }

    @GetMapping("/getUserId/{loginId}")
    public ResponseEntity<ChatResponseDTO> getUserId(@PathVariable("loginId") String loginId) {
        ChatResponseDTO result = chatService.getUserId(loginId);
        return new ResponseEntity<ChatResponseDTO>(result,HttpStatus.OK);
    }

    @PostMapping("/saveExitChatRoomTime")
    public ResponseEntity<Void> saveExitChatRoomTime(@RequestBody ChatExitRoomTimeRequestDTO params) {
        chatService.saveExitChatRoomTime(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/getExitChatRoomTime/{loginId}/{channelId}")
    public ResponseEntity<String> getExitChatRoomTime(@PathVariable("loginId") String loginId, @PathVariable("channelId") String channelId) {
        ChatExitRoomTimeRequestDTO params = new ChatExitRoomTimeRequestDTO();
        params.setLoginId(loginId);
        params.setChannelId(channelId);
        String result = chatService.getExitChatRoomTime(params);
        return new ResponseEntity<String>(result,HttpStatus.OK);
    }

    @DeleteMapping("/deleteExitChatRoomTime")
    public ResponseEntity<Void> deleteExitChatRoomTime(@RequestParam("loginId") String loginId, @RequestParam("channelId") String channelId) {
        ChatExitRoomTimeRequestDTO params = new ChatExitRoomTimeRequestDTO();
        params.setLoginId(loginId);
        params.setChannelId(channelId);
        System.out.println(params);
        chatService.deleteExitChatRoomTime(params);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    
}

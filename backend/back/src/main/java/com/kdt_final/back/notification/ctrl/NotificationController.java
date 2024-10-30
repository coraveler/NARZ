package com.kdt_final.back.notification.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.kdt_final.back.notification.domain.NotificationMsgRequestDTO;
import com.kdt_final.back.notification.domain.NotificationMsgResponseDTO;
import com.kdt_final.back.notification.service.NotificationService;


@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamSseMvc(@RequestParam("userId") String userId) {
        return notificationService.getScheduleList(userId);
    }

    @PostMapping("/notificationMessage")
    public ResponseEntity<NotificationMsgRequestDTO> saveMsg(@RequestBody NotificationMsgRequestDTO params) {
        NotificationMsgRequestDTO messageInfo = notificationService.saveMsg(params);
        return new ResponseEntity(messageInfo, HttpStatus.OK);
    }

    @GetMapping("/notificationMessage")
    public ResponseEntity<List<NotificationMsgResponseDTO>> getMsg(@RequestParam("userId") String userId) {
        List<NotificationMsgResponseDTO> list = notificationService.getMsg(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @DeleteMapping("/notificationMessage")
    public ResponseEntity<Void> deleteMsg(@RequestParam("msgId") int msgId){
        notificationService.deleteMsg(msgId);
        return new ResponseEntity(HttpStatus.OK);
    }
    
    
}

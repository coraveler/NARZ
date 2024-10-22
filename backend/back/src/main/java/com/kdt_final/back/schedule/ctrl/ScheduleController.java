package com.kdt_final.back.schedule.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kdt_final.back.schedule.domain.ScheduleRequestDTO;
import com.kdt_final.back.schedule.domain.ScheduleResponseDTO;
import com.kdt_final.back.schedule.service.ScheduleService;



@RestController
@RequestMapping("/api")
public class ScheduleController {
    
    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("/schedule")
    public ResponseEntity<Void> saveSchedule(@RequestBody ScheduleRequestDTO params) {
        
        scheduleService.saveSchedule(params);
        
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleResponseDTO>> getSchedule(@RequestParam("userId") String userId) {

        List<ScheduleResponseDTO> result = scheduleService.getSchedule(userId);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @DeleteMapping("/schedule")
    public ResponseEntity<Void> deleteSchedule(@RequestParam("id") int id){

        scheduleService.deleteSchedule(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/schedule/{id}")
    public ResponseEntity<ScheduleResponseDTO> getScheduleInfo(@PathVariable("id") int id) {

        ScheduleResponseDTO obj = scheduleService.getScheduleInfo(id);

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PatchMapping("/schedule")
    public ResponseEntity<Void> updateSchedule(@RequestBody ScheduleRequestDTO params){

        scheduleService.updateSchedule(params);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}

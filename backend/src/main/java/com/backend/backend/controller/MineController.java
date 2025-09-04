package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.dto.MineChatRequest;
import com.backend.backend.dto.MineRequest;
import com.backend.backend.dto.MineResponse;
import com.backend.backend.service.MineService;

@RestController
@RequestMapping("/api/mine")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.PATCH}, exposedHeaders = "*", maxAge = 3600) // Allow all requests from any origin
public class MineController {

    @Autowired
    private MineService mineService;
    
    @PostMapping("/analyze")
    public ResponseEntity<MineResponse> analyzeMineHazards(@RequestBody MineRequest request) {
        if (request.getProvinces() == null || request.getProvinces().isEmpty()) {
            return ResponseEntity.badRequest().body(
                MineResponse.builder()
                    .success(false)
                    .error("Maden bilgileri gereklidir")
                    .build()
            );
        }
        
        MineResponse response = mineService.analyzeMineHazards(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/chat")
    public ResponseEntity<MineResponse> chat(@RequestBody MineChatRequest request) {
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(
                MineResponse.builder()
                    .success(false)
                    .error("Mesaj içeriği gereklidir")
                    .build()
            );
        }
        
        MineResponse response = mineService.generateChatResponse(request.getMessage());
        return ResponseEntity.ok(response);
    }
}

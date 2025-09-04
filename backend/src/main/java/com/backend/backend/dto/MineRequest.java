package com.backend.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MineRequest {
    private List<Province> provinces;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Province {
        private String il;
        private List<Mine> madenler;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Mine {
        private String isim;
        private String tip;
        private String isletici;
        private String durum;
        private String notlar;
    }
}

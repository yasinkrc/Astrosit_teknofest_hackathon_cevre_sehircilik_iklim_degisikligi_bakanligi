package com.backend.backend.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.backend.backend.dto.MineRequest;
import com.backend.backend.dto.MineResponse;
import com.theokanning.openai.completion.chat.ChatCompletionChoice;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.service.OpenAiService;

import jakarta.annotation.PostConstruct;

@Service
public class MineService {
    
    private OpenAiService openAiService;
    
    @Value("${openai.api.key}")
    private String apiKey;
    
    private static final String MODEL = "gpt-3.5-turbo";
    
    @PostConstruct
    public void init() {
        // Timeout süresi artırılmış OpenAI istemcisi oluştur
        this.openAiService = new OpenAiService(apiKey, Duration.ofSeconds(120));
    }
    
    public MineResponse analyzeMineHazards(MineRequest request) {
        try {
            List<com.theokanning.openai.completion.chat.ChatMessage> messages = new ArrayList<>();
            
            // System message with mine safety instructions
            messages.add(new com.theokanning.openai.completion.chat.ChatMessage(
                "system",
                "Sen bir maden güvenliği uzmanısın. Verilen maden bilgilerine göre o madenlerde oluşabilecek gaz tehlikeleri, " +
                "güvenlik riskleri ve alınması gereken önlemler hakkında detaylı bilgi vermelisin. " +
                "Her maden tipi için spesifik tehlikeleri, özellikle gaz tehlikelerini açıkla. " +
                "Yanıtın şu bölümleri içermeli: " +
                "1. Maden tipine göre olası gaz tehlikeleri (metan, karbonmonoksit, hidrojen sülfür, vb.) " +
                "2. Bu gazların oluşum nedenleri ve tehlike seviyeleri " +
                "3. Gaz izleme ve erken uyarı sistemleri " +
                "4. Acil durum protokolleri ve tahliye prosedürleri " +
                "5. Yasal düzenlemeler ve güvenlik standartları " +
                "Yanıtın uzun ve detaylı olabilir, bilgi sınırlaması yoktur. Bilimsel ve teknik detayları içerebilirsin."
            ));
            
            // Maden bilgilerini formatlayarak kullanıcı mesajı oluştur
            StringBuilder userMessageBuilder = new StringBuilder();
            userMessageBuilder.append("Aşağıdaki madenlerde oluşabilecek gaz tehlikeleri ve güvenlik riskleri hakkında detaylı bilgi ver:\n\n");
            
            for (MineRequest.Province province : request.getProvinces()) {
                userMessageBuilder.append("İl: ").append(province.getIl()).append("\n");
                
                for (MineRequest.Mine mine : province.getMadenler()) {
                    userMessageBuilder.append("- Maden: ").append(mine.getIsim()).append("\n");
                    userMessageBuilder.append("  Tip: ").append(mine.getTip()).append("\n");
                    userMessageBuilder.append("  İşletici: ").append(mine.getIsletici()).append("\n");
                    userMessageBuilder.append("  Durum: ").append(mine.getDurum()).append("\n");
                    
                    if (mine.getNotlar() != null && !mine.getNotlar().isEmpty()) {
                        userMessageBuilder.append("  Notlar: ").append(mine.getNotlar()).append("\n");
                    }
                    
                    userMessageBuilder.append("\n");
                }
            }
            
            // User message
            messages.add(new com.theokanning.openai.completion.chat.ChatMessage(
                "user", 
                userMessageBuilder.toString()
            ));
            
            // Create completion request with increased token limit
            ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .messages(messages)
                .model(MODEL)
                .temperature(0.7)
                .maxTokens(3000) // Uzun yanıtlar için token limitini artır
                .build();
            
            // Call OpenAI API
            ChatCompletionChoice choice = openAiService.createChatCompletion(completionRequest).getChoices().get(0);
            
            // Create response
            return MineResponse.builder()
                .message(choice.getMessage().getContent())
                .success(true)
                .error(null)
                .build();
            
        } catch (Exception e) {
            return MineResponse.builder()
                .message(null)
                .success(false)
                .error("Maden güvenliği analizi yapılırken bir hata oluştu: " + e.getMessage())
                .build();
        }
    }
    
    public MineResponse generateChatResponse(String userMessage) {
        try {
            List<com.theokanning.openai.completion.chat.ChatMessage> messages = new ArrayList<>();
            
            // System message with mine safety expert instructions
            messages.add(new com.theokanning.openai.completion.chat.ChatMessage(
                "system",
                "Sen bir maden güvenliği uzmanısın. Madencilik, maden güvenliği, gaz tehlikeleri, " +
                "iş sağlığı ve güvenliği, maden kazaları, risk değerlendirmesi, acil durum yönetimi, " +
                "maden havalandırması ve maden mevzuatı konularında uzmansın. " +
                "Kullanıcının sorularına bilimsel ve teknik açıdan doğru, detaylı ve anlaşılır yanıtlar ver. " +
                "Bilmediğin konularda dürüst ol ve yanlış bilgi verme. " +
                "Yanıtların uzun ve detaylı olabilir, bilgi sınırlaması yoktur."
            ));
            
            // User message
            messages.add(new com.theokanning.openai.completion.chat.ChatMessage(
                "user", 
                userMessage
            ));
            
            // Create completion request with increased token limit
            ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .messages(messages)
                .model(MODEL)
                .temperature(0.7)
                .maxTokens(2000) // Uzun yanıtlar için token limitini artır
                .build();
            
            // Call OpenAI API
            ChatCompletionChoice choice = openAiService.createChatCompletion(completionRequest).getChoices().get(0);
            
            // Create response
            return MineResponse.builder()
                .message(choice.getMessage().getContent())
                .success(true)
                .error(null)
                .build();
            
        } catch (Exception e) {
            return MineResponse.builder()
                .message(null)
                .success(false)
                .error("Maden chatbot yanıtı oluşturulurken bir hata oluştu: " + e.getMessage())
                .build();
        }
    }
}

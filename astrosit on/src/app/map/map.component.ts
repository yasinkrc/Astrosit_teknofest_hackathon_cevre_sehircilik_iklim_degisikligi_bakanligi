import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { MineDataService } from '../services/mine-data.service';
import { environment } from '../../environments/environment';

type MineType = 'gold' | 'coal';
type MineData = any;
type Mine = any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('tooltipContainer') tooltipContainer!: ElementRef;
  @ViewChild('chatMessages') chatMessagesElement!: ElementRef;
  
  svgElement: SVGSVGElement | null = null;
  loading = true;
  selectedMineType: 'gold' | 'coal' = 'gold';
  goldMineData: { [key: string]: Mine[] } = {};
  coalMineData: { [key: string]: Mine[] } = {};
  mineProvinceData: { [key: string]: Mine[] } = {};
  sourceInfo: any = null;
  provincesWithMines: string[] = []; // Add the missing property
  
  // Popup related properties
  selectedProvince: string | null = null;
  selectedProvinceMines: Mine[] | null = null;
  
  private subscriptions: Subscription[] = [];
  
  // Chatbot properties
  userMessage = '';
  chatMessages: ChatMessage[] = [];
  chatLoading = false;
  
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private mineDataService: MineDataService
  ) {}
  
  ngOnInit(): void {
    this.loadSVGMap();
    this.loadMineData();
  }
  
  ngAfterViewInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  onMineTypeChange(event: Event): void {
    this.loading = true;
    
    // Clear previous data
    this.mineProvinceData = {};
    this.provincesWithMines = [];
    
    // Load the selected mine type data
    if (this.selectedMineType === 'gold' && this.goldMineData) {
      // Use cached gold data if available
      this.updateMineDataForType('gold', { iller: this.goldMineData });
    } else if (this.selectedMineType === 'coal' && this.coalMineData) {
      // Use cached coal data if available
      this.updateMineDataForType('coal', { iller: this.coalMineData });
    } else {
      // Otherwise load from service
      this.mineDataService.getMineData(this.selectedMineType).subscribe({
        next: (data: MineData) => {
          if (this.selectedMineType === 'gold') {
            this.goldMineData = data.iller;
          } else {
            this.coalMineData = data.iller;
          }
          this.updateMineDataForType(this.selectedMineType, data);
        },
        error: (error) => {
          console.error(`Error loading ${this.selectedMineType} mine data:`, error);
          this.loading = false;
        }
      });
    }
  }
  
  loadMineData(): void {
    this.loading = true;
    
    // Load gold mine data
    this.mineDataService.getMineData('gold').subscribe({
      next: (data: MineData) => {
        if (data && data.iller) {
          this.goldMineData = data.iller;
          
          // If gold is selected, update the UI
          if (this.selectedMineType === 'gold') {
            this.updateMineDataForType('gold', data);
          }
        }
      },
      error: (error) => {
        console.error('Error loading gold mine data:', error);
        this.loading = false;
      }
    });
    
    // Load coal mine data
    this.mineDataService.getMineData('coal').subscribe({
      next: (data: MineData) => {
        if (data && data.iller) {
          this.coalMineData = data.iller;
          
          // If coal is selected, update the UI
          if (this.selectedMineType === 'coal') {
            this.updateMineDataForType('coal', data);
          }
        }
      },
      error: (error) => {
        console.error('Error loading coal mine data:', error);
        this.loading = false;
      }
    });
  }
  
  updateMineDataForType(type: MineType, data: MineData): void {
    this.mineProvinceData = {};
    this.provincesWithMines = [];
    
    if (data && data.iller) {
      // Process the data
      data.iller.forEach((province: any) => {
        if (province.il && province.madenler && province.madenler.length > 0) {
          // Skip summary entries like "Other_provinces_summary" or "Diger_iller_genel_ozet"
          if (!province.il.includes('_')) {
            this.mineProvinceData[province.il] = province.madenler;
            this.provincesWithMines.push(province.il);
          }
        }
      });
      
      console.log(`${type} mine data loaded:`, this.mineProvinceData);
      console.log(`Provinces with ${type} mines:`, this.provincesWithMines);
      
      // Set source info for display
      this.sourceInfo = {
        uyari: data.uyari || '',
        kaynaklar: data.kaynaklar || {},
        kaynak_notu: data.kaynak_notu || ''
      };
      
      this.updateMapColors();
    } else {
      console.error('Invalid mine data format:', data);
    }
    this.loading = false;
  }
  
  getSourcesArray(): string[] {
    return this.sourceInfo && this.sourceInfo.kaynaklar ? this.sourceInfo.kaynaklar : [];
  }
  
  loadSVGMap(): void {
    fetch('assets/turkey-map.svg')
      .then(response => response.text())
      .then(svgContent => {
        if (this.mapContainer) {
          this.mapContainer.nativeElement.innerHTML = svgContent;
          this.svgElement = this.mapContainer.nativeElement.querySelector('svg');
          
          if (this.svgElement) {
            // Set default color for all provinces directly
            const provinces = this.svgElement.querySelectorAll('g[data-plakakodu]');
            provinces.forEach(province => {
              const paths = province.querySelectorAll('path, polygon');
              paths.forEach(path => {
                path.setAttribute('fill', '#e0e0e0'); // Light gray default
                path.setAttribute('stroke', '#ffffff');
                path.setAttribute('stroke-width', '0.5');
              });
            });
            
            // Add event listeners to all city paths
            const cityGroups = this.svgElement.querySelectorAll('g[data-plakakodu]');
            cityGroups.forEach(cityGroup => {
              cityGroup.addEventListener('mouseenter', (event) => this.onCityMouseEnter(event as MouseEvent, cityGroup));
              cityGroup.addEventListener('mouseleave', () => this.onCityMouseLeave());
              cityGroup.addEventListener('mousemove', (event) => this.onCityMouseMove(event as MouseEvent));
              cityGroup.addEventListener('click', () => this.onCityClick(event as MouseEvent, cityGroup));
            });
            
            // Update map colors based on initial data
            this.updateMapColors();
          }
        }
      })
      .catch(error => {
        console.error('Error loading SVG map:', error);
      });
  }

  updateMapColors(): void {
    if (!this.svgElement) {
      return;
    }

    console.log('Updating map colors...');
    
    // Reset all provinces to default color (light gray)
    const provinces = this.svgElement.querySelectorAll('g[data-plakakodu]');
    console.log('Found provinces:', provinces.length);
    
    provinces.forEach((province) => {
      const paths = province.querySelectorAll('path, polygon');
      paths.forEach(path => {
        path.setAttribute('fill', '#e0e0e0'); // Light gray default
      });
    });

    // Only color provinces that actually have mines
    console.log('Provinces with mines:', this.provincesWithMines);
    
    this.provincesWithMines.forEach(provinceName => {
      const provinceElement = this.findProvinceElement(provinceName);
      if (provinceElement) {
        console.log('Coloring province:', provinceName);
        const paths = provinceElement.querySelectorAll('path, polygon');
        const fillColor = this.selectedMineType === 'gold' ? '#FFD700' : '#666666';
        
        paths.forEach(path => {
          path.setAttribute('fill', fillColor);
        });
      } else {
        console.warn('Province not found:', provinceName);
      }
    });
  }

  findProvinceElement(provinceName: string): SVGElement | null {
    if (!this.svgElement) {
      return null;
    }
    
    const normalizedName = this.normalizeName(provinceName);
    
    // Try to find by ID first
    let provinceElement = this.svgElement.querySelector(`g[id="${normalizedName}"]`) as SVGElement | null;
    
    // If not found by ID, try to find by data-iladi attribute
    if (!provinceElement) {
      // Get all province elements
      const provinces = this.svgElement.querySelectorAll('g[data-iladi]');
      
      // Find the one that matches our province name
      for (let i = 0; i < provinces.length; i++) {
        const province = provinces[i];
        const provinceDataName = province.getAttribute('data-iladi');
        
        if (provinceDataName) {
          const normalizedDataName = this.normalizeName(provinceDataName);
          
          // Check if the normalized names match or if one contains the other
          if (normalizedDataName === normalizedName || 
              normalizedDataName.includes(normalizedName) || 
              normalizedName.includes(normalizedDataName)) {
            provinceElement = province as SVGElement;
            break;
          }
        }
      }
    }
    
    // If still not found, try with plate code
    if (!provinceElement && /^\d+$/.test(normalizedName)) {
      provinceElement = this.svgElement.querySelector(`g[data-plakakodu="${normalizedName}"]`) as SVGElement | null;
    }
    
    return provinceElement;
  }

  normalizeName(name: string): string {
    if (!name) return '';
    
    // Convert to lowercase
    let normalized = name.toLowerCase();
    
    // Remove any text after a slash (for compound names like "Erzurum / Gümüşhane hattı")
    if (normalized.includes('/')) {
      normalized = normalized.split('/')[0].trim();
    }
    
    // Remove "çevresi", "hattı", etc.
    const wordsToRemove = ['çevresi', 'hattı', 'bölgesi', 'civarı', 've', 'ili'];
    wordsToRemove.forEach(word => {
      normalized = normalized.replace(word, '').trim();
    });
    
    // Replace Turkish characters
    normalized = normalized
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/İ/g, 'i');
    
    return normalized.trim();
  }

  getMineDataForProvince(provinceName: string): Mine[] {
    if (!provinceName || !this.mineProvinceData) {
      return [];
    }
    
    const normalizedProvinceName = this.normalizeName(provinceName);
    
    // Try direct match first
    if (this.mineProvinceData[provinceName]) {
      return this.mineProvinceData[provinceName];
    }
    
    // Find all matching provinces with more flexible matching
    const matchingProvinces = Object.keys(this.mineProvinceData).filter(province => {
      const normalizedProvince = this.normalizeName(province);
      return normalizedProvince.includes(normalizedProvinceName) || 
             normalizedProvinceName.includes(normalizedProvince) ||
             this.levenshteinDistance(normalizedProvince, normalizedProvinceName) <= 2; // Allow for small typos
    });
    
    // Collect all mines from matching provinces
    let allMines: Mine[] = [];
    matchingProvinces.forEach(province => {
      allMines = allMines.concat(this.mineProvinceData[province]);
    });
    
    return allMines;
  }
  
  // Helper function to calculate Levenshtein distance between two strings
  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    const matrix = [];
  
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }

  onCityMouseEnter(event: MouseEvent, cityGroup: Element): void {
    const provinceName = cityGroup.getAttribute('data-iladi') || cityGroup.getAttribute('id');
    if (!provinceName) return;
    
    const mines = this.getMineDataForProvince(provinceName);
    if (!mines || mines.length === 0) return;
    
    const tooltip = this.tooltipContainer.nativeElement;
    
    // Create tooltip content
    let tooltipContent = `
      <h3>${provinceName}</h3>
      <div class="mine-count">${mines.length} ${this.selectedMineType === 'gold' ? 'Altın' : 'Kömür'} Madeni</div>
    `;
    
    if (mines.length > 0) {
      tooltipContent += '<div class="mine-list">';
      mines.slice(0, 3).forEach(mine => {
        tooltipContent += `
          <div class="mine-item">
            <h4>${mine.isim || 'İsimsiz Maden'}</h4>
            ${mine.isletici ? `<p><strong>İşletici:</strong> ${mine.isletici}</p>` : ''}
            ${mine.tip ? `<p><strong>Tip:</strong> ${mine.tip}</p>` : ''}
            ${mine.durum ? `<p><strong>Durum:</strong> ${mine.durum}</p>` : ''}
          </div>
        `;
      });
      
      if (mines.length > 3) {
        tooltipContent += `
          <div class="mine-item">
            <p>Ve ${mines.length - 3} maden daha...</p>
            <p class="click-info"><i class="fas fa-info-circle"></i> Tüm detaylar için tıklayın</p>
          </div>
        `;
      }
      
      tooltipContent += '</div>';
    }
    
    tooltip.innerHTML = tooltipContent;
    tooltip.style.display = 'block';
    
    // Position tooltip
    const x = event.clientX;
    const y = event.clientY;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  onCityMouseLeave(): void {
    const tooltip = this.tooltipContainer.nativeElement;
    tooltip.style.display = 'none';
  }

  onCityMouseMove(event: MouseEvent): void {
    const tooltip = this.tooltipContainer.nativeElement;
    const x = event.clientX;
    const y = event.clientY;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }
  
  onCityClick(event: MouseEvent, cityGroup: Element): void {
    const provinceName = cityGroup.getAttribute('data-iladi') || cityGroup.getAttribute('id');
    if (!provinceName) return;
    
    const mines = this.getMineDataForProvince(provinceName);
    
    // Set selected province data for the popup
    this.selectedProvince = provinceName;
    this.selectedProvinceMines = mines;
    
    // Hide the tooltip when showing the popup
    const tooltip = this.tooltipContainer.nativeElement;
    tooltip.style.display = 'none';
  }
  
  closeProvinceDetail(): void {
    this.selectedProvince = null;
    this.selectedProvinceMines = null;
  }

  analyzeMine(mine: Mine): void {
    if (!this.selectedProvince) return;
    
    // Create province data object for API in the exact format required
    const provinceData = {
      provinces: [
        {
          il: this.selectedProvince,
          madenler: [mine]
        }
      ]
    };
    
    // Set loading state
    this.chatLoading = true;
    
    // Add user action message to chat
    const userActionMessage: ChatMessage = {
      content: `"${mine.isim || 'İsimsiz Maden'}" madeni için güvenlik analizi istendi.`,
      sender: 'user',
      timestamp: new Date()
    };
    this.chatMessages.push(userActionMessage);
    
    // Add loading message to chat
    const loadingMessage: ChatMessage = {
      content: `"${mine.isim || 'İsimsiz Maden'}" madeni analiz ediliyor, lütfen bekleyin...`,
      sender: 'bot',
      timestamp: new Date()
    };
    this.chatMessages.push(loadingMessage);
    this.scrollToBottom();
    
    // Close the province detail modal
    this.closeProvinceDetail();
    
    // Send analysis request to API
    this.http.post<ChatResponse>(`${environment.apiUrl}/mine/analyze`, provinceData)
      .subscribe({
        next: (response) => {
          // Remove the loading message
          this.chatMessages = this.chatMessages.filter(msg => msg !== loadingMessage);
          
          // Add bot response to chat
          const botMessage: ChatMessage = {
            content: response.message,
            sender: 'bot',
            timestamp: new Date()
          };
          this.chatMessages.push(botMessage);
          this.chatLoading = false;
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error analyzing mine:', error);
          // Remove the loading message
          this.chatMessages = this.chatMessages.filter(msg => msg !== loadingMessage);
          
          // Add error message to chat
          const errorMessage: ChatMessage = {
            content: 'Üzgünüm, maden analizi yapılırken bir hata oluştu. Lütfen tekrar deneyin.',
            sender: 'bot',
            timestamp: new Date()
          };
          this.chatMessages.push(errorMessage);
          this.chatLoading = false;
          this.scrollToBottom();
        }
      });
  }
  
  // Helper method to get additional fields from mine data
  getAdditionalFields(mine: any): {key: string, value: any}[] {
    if (!mine) return [];
    
    // Standard fields we already display explicitly
    const standardFields = ['isim', 'isletici', 'tip', 'durum', 'notlar', 'kaynaklar'];
    
    return Object.entries(mine)
      .filter(([key]) => !standardFields.includes(key))
      .map(([key, value]) => ({ key, value }));
  }
  
  // Format field name for display (convert camelCase or snake_case to Title Case)
  formatFieldName(fieldName: string): string {
    if (!fieldName) return '';
    
    // Replace underscores with spaces and capitalize first letter of each word
    return fieldName
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Chatbot methods
  sendMessage(): void {
    if (!this.userMessage.trim()) return;
    
    // Add user message to chat
    const userChatMessage: ChatMessage = {
      content: this.userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    this.chatMessages.push(userChatMessage);
    
    // Clear input field
    const messageToSend = this.userMessage;
    this.userMessage = '';
    
    // Set loading state
    this.chatLoading = true;
    
    // Send message to API
    this.http.post<ChatResponse>(`${environment.apiUrl}/mine/chat`, { message: messageToSend })
      .subscribe({
        next: (response) => {
          // Add bot response to chat
          const botMessage: ChatMessage = {
            content: response.message,
            sender: 'bot',
            timestamp: new Date()
          };
          this.chatMessages.push(botMessage);
          this.chatLoading = false;
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error sending message:', error);
          // Add error message to chat
          const errorMessage: ChatMessage = {
            content: 'Üzgünüm, mesajınızı işlerken bir hata oluştu. Lütfen tekrar deneyin.',
            sender: 'bot',
            timestamp: new Date()
          };
          this.chatMessages.push(errorMessage);
          this.chatLoading = false;
          this.scrollToBottom();
        }
      });
  }
  
  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatMessagesElement) {
        const element = this.chatMessagesElement.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }
}

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  success: boolean;
  error: string | null;
}
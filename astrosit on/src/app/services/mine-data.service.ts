import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Mine {
  isim: string;
  tip: string;
  isletici?: string;
  durum: string;
  notlar?: string;
}

export interface MineProvince {
  il: string;
  madenler: Mine[];
  kaynaklar?: string[];
}

export interface MineData {
  ulke: string;
  konu: string;
  son_derleme: string;
  uyari: string;
  ozet_sayilar_tahmin: {
    kapsanan_iller: number;
    isimli_maden_girdi_sayisi: number;
    notlar: string;
  };
  iller: MineProvince[];
  kaynaklar?: any;
  kaynak_notu?: string;
  oneri?: string;
}

export type MineType = 'gold' | 'coal';

@Injectable({
  providedIn: 'root'
})
export class MineDataService {
  private currentMineTypeSubject = new BehaviorSubject<MineType>('coal');
  currentMineType$ = this.currentMineTypeSubject.asObservable();

  private goldMineData: MineData | null = null;
  private coalMineData: MineData | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Get mine data based on type (alias for loadMineData for backward compatibility)
   */
  getMineData(type: MineType): Observable<MineData> {
    return this.loadMineData(type);
  }

  /**
   * Load mine data based on type
   */
  loadMineData(type: MineType): Observable<MineData> {
    // Check if we already have the data cached
    if (type === 'gold' && this.goldMineData) {
      return of(this.goldMineData);
    } else if (type === 'coal' && this.coalMineData) {
      return of(this.coalMineData);
    }

    // Otherwise load from file
    const fileName = type === 'gold' ? './assets/altinmadenveri.json' : './assets/komurmadenveri.json';
    
    return this.http.get<any>(fileName).pipe(
      map(data => {
        // Normalize data to handle both Turkish and ASCII field names
        const normalizedData: MineData = {
          ulke: data.ulke || data.ülke || 'Turkiye',
          konu: data.konu || '',
          son_derleme: data.son_derleme || '',
          uyari: data.uyari || data.uyarı || '',
          ozet_sayilar_tahmin: {
            kapsanan_iller: data.ozet_sayilar_tahmin?.kapsanan_iller || 
                            data.özet_sayılar_tahmin?.kapsanan_iller || 0,
            isimli_maden_girdi_sayisi: data.ozet_sayilar_tahmin?.isimli_maden_girdi_sayisi || 
                                       data.özet_sayılar_tahmin?.isimli_maden_girdi_sayısı || 0,
            notlar: data.ozet_sayilar_tahmin?.notlar || 
                    data.özet_sayılar_tahmin?.notlar || ''
          },
          iller: this.normalizeProvinceData(data.iller || []),
          kaynaklar: data.kaynaklar || {},
          kaynak_notu: data.kaynak_notu || ''
        };

        // Cache the normalized data
        if (type === 'gold') {
          this.goldMineData = normalizedData;
        } else {
          this.coalMineData = normalizedData;
        }
        
        return normalizedData;
      }),
      catchError(error => {
        console.error(`Error loading ${type} mine data:`, error);
        return of(this.getDefaultMineData(type));
      })
    );
  }

  /**
   * Normalize province data to handle Turkish characters in field names
   */
  private normalizeProvinceData(provinces: any[]): MineProvince[] {
    return provinces.map(province => {
      const normalizedProvince: MineProvince = {
        il: province.il || '',
        madenler: (province.madenler || []).map((mine: any) => {
          return {
            isim: mine.isim || '',
            tip: mine.tip || '',
            isletici: mine.isletici || mine.işletici || '',
            durum: mine.durum || '',
            notlar: mine.notlar || mine.not || ''
          };
        }),
        kaynaklar: province.kaynaklar || []
      };
      return normalizedProvince;
    });
  }

  /**
   * Set the current mine type
   */
  setMineType(type: MineType): void {
    this.currentMineTypeSubject.next(type);
  }

  /**
   * Get mine data for a specific province
   */
  getProvinceData(provinceName: string, type: MineType): Observable<MineProvince | null> {
    return this.loadMineData(type).pipe(
      map(data => {
        // Handle provinces with multiple names (e.g., "Canakkale / Balikesir / Izmir yoresi")
        const province = data.iller.find(p => {
          const provinceNames = p.il.split('/').map(name => name.trim().toLowerCase());
          return provinceNames.includes(provinceName.toLowerCase());
        });
        
        return province || null;
      })
    );
  }

  /**
   * Get all provinces with mines
   */
  getAllProvinces(type: MineType): Observable<string[]> {
    return this.loadMineData(type).pipe(
      map(data => {
        // Filter out summary entries like "Other_provinces_summary" or "Diger_iller_genel_ozet"
        return data.iller
          .filter(p => !p.il.includes('_'))
          .map(p => p.il);
      })
    );
  }

  /**
   * Get sources information
   */
  getSources(type: MineType): Observable<any> {
    return this.loadMineData(type).pipe(
      map(data => {
        return {
          kaynaklar: data.kaynaklar || {},
          kaynak_notu: data.kaynak_notu || '',
          uyari: data.uyari || ''
        };
      })
    );
  }

  /**
   * Get default mine data in case of error
   */
  private getDefaultMineData(type: MineType): MineData {
    return {
      ulke: 'Turkiye',
      konu: type === 'gold' ? 'Altin madenleri' : 'Komur madenleri',
      son_derleme: new Date().toISOString().split('T')[0],
      uyari: 'Veri yuklenemedi. Varsayilan veriler gosteriliyor.',
      ozet_sayilar_tahmin: {
        kapsanan_iller: 0,
        isimli_maden_girdi_sayisi: 0,
        notlar: 'Veri yuklenemedi.'
      },
      iller: []
    };
  }
}

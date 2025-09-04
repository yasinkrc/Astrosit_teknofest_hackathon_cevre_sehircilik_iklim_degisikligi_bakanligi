# 🌍 Astrosit | SmellControl ile Koku Tabanlı Coğrafi Yatırım Öncelikleri Haritalama Platformu

**Kategori:** Sektörel Yatırım Öncelikleri – TÜİK Verileri ile Karar Destek Sistemleri  
**Hackathon:** TEKNOFEST 2025 – Geleceğin Sürdürülebilir Şehirleri  
**Takım Adı:** Astrosit  
**Takım Üyeleri:** Yasin Karaca , Nazlıcan Atlı  
**Teknoloji Alanları:** Nanohibrit sensör teknolojisi, yapay zekâ, büyük veri, çevresel yatırım analizleri, coğrafi bilgi sistemleri, veri görselleştirme

---

## 💡 Giriş: Yatırım Perspektifinden Projenin Önemi

Türkiye’de yatırım kararlarının çoğu zaman geçmiş deneyimlere, sezgilere ya da eksik veri analizlerine dayanarak verildiği bir dönemdeyiz. Ancak **günümüzün şehir planlaması, enerji altyapısı, tarım yatırımları ve çevresel sürdürülebilirlik alanlarında başarı**, artık yalnızca “tahminle” değil, **veriye dayalı karar sistemleriyle** mümkündür.

İşte bu noktada Astrosit ekibi olarak geliştirdiğimiz **SmellControl** tabanlı platform, **TÜİK’in tematik veri setlerini**, **kokuyu algılayabilen çok kanallı yapay zekâ destekli gaz sensörlerimizle** birleştirerek, **yatırımcıların stratejik lokasyon seçimlerini** kolaylaştıran, **çevresel analizleri otomatize eden** ve **kentlerin geleceğini veriyle şekillendiren** bir çözüm sunmaktadır.

Sistemin temel amacı, sadece çevresel izleme değil; aynı zamanda bu çevresel verilerle **yatırım yapılabilirlik haritaları** oluşturmak, **ekonomik değeri olan bölgeleri** saptamak ve **yerel yönetimlere, özel sektöre ve yatırımcılara** bilimsel ve teknik tabanlı rehberlik etmektir.

---

## 🔬 Proje Özeti ve Yenilikçi Yönleri

**SmellControl**, çok kanallı yapay zekâ destekli bir **nanohibrit gaz algılama platformudur**. Geliştirdiğimiz sistem, 16 kanallı Smell iX16 çiplerinden oluşan bir sensör modülüyle, çok çeşitli **gazları ve kokuları** (VOC – Volatile Organic Compounds) algılar. Toplanan veriler, özel olarak geliştirilen makine öğrenmesi algoritmalarıyla analiz edilerek, **her il ve ilçe için çevresel yatırım skoru, sanayi uygunluk raporu, tarımsal flora durumu, arıcılık uyumu ve çevre risk puanı** gibi çıktılar üretilir.

Bu verilerle şu sorulara yanıt veriyoruz:

- **Yatırımcılar** için: Bu ilçede gıda fabrikası kurulabilir mi?  
- **Belediyeler** için: Hangi bölgede arıtma tesisi ihtiyacı var?  
- **Çevreciler** için: Sanayi kaynaklı gaz emisyonu hangi mahalleleri etkiliyor?  
- **Arıcılar ve tarım yatırımcıları** için: En uygun flora nerede?

---

## 📊 Kullanılan Veriler ve Entegrasyonlar

### 📌 TÜİK Veri Tabanı Entegrasyonları

Projemiz, TEKNOFEST şartnamesine uygun olarak aşağıdaki **10 tematik TÜİK veri seti**yle uyumlu olarak çalışır:

- **Çevre ve Enerji**: Elektrik üretim/dağıtım bölgeleri, arıtma tesisleri, emisyon miktarları
- **Sanayi**: OSB (Organize Sanayi Bölgesi) yoğunluğu, üretim hacmi
- **Tarım ve Hayvancılık**: Bitki örtüsü yoğunluğu, arıcılık verimlilik endeksi
- **Ulaştırma ve Haberleşme**: Liman, otoyol, sanayi hattı yakınlığı
- **Sağlık ve Sosyal Koruma**: Hava kirliliği bağlantılı hastalık oranları

Tüm bu veriler, projemizde **JSON formatında ilçe bazlı veri kaynakları** ile `astroist on/src/` klasöründe işlenmiş durumdadır.

---

## 🧠 Kullanılan Sensör ve Donanım Özeti

SmellControl sistemi, fiziksel olarak özel bir **donanım platformuna sahip hazır sensör cihazıyla** çalışmaktadır.

### 🔹 Donanım Özellikleri
- **Çip:** Smell iX16 – 16 kanal gaz/koku sensörü
- **Kanal Sayısı:** 64 (4×iX16 modül)
- **Veri Alım Hızı:** Her 1.8 saniyede tam okuma
- **Enerji Tüketimi:** 1 µW (süper düşük güç)
- **Koku Algılama Aralığı:** ppb düzeyi (milyarda bir)
- **Veri Hacmi:** 1 saatlik analizde ortalama **15.000 satır veri**
- **Veri Formatı:** `.csv` ve `.json` (annotated)

### 🛰️ Gömülü Teknoloji ve Entegrasyonlar
- 📍 Dahili GPS modülü sayesinde **konum verisiyle eşzamanlı veri etiketleme**
- 🔁 Aynı anda 4 çipten paralel veri alımı
- 🧠 Yapay zekâ destekli sınıflandırma için yerleşik yazılım

### 🧪 Algılanabilen Örnek VOC’ler
| Koku/Gaz | Kaynak | Kullanım Örneği |
|----------|--------|------------------|
| Amonyak | Tarım, hayvancılık | Gübre sızıntısı analizi |
| Etanol, Aseton | Sanayi | Kimyasal salınım takibi |
| Kahve, Soğan | Flora | Tarımsal uygunluk |
| Benzin, Mazot | Liman | Petrol sızıntısı tespiti |
| Formaldehit | Konut | Hava kalitesi |

Toplamda sistem, **30+ koku/gaz türünü** başarıyla sınıflandırmaktadır.

---

## 🧠 Yapay Zekâ Modeli ve Performansı

### 🔍 Kullanılan Algoritmalar
Projemizde toplam **6 algoritma test edildi**:
- Gradient Boosting
- AdaBoost
- Logistic Regression
- SVM (Support Vector Machines)
- Decision Tree
- **K-Nearest Neighbors (KNN)** – 💯 EN BAŞARILI MODEL

### 📈 KNN Modeli Performansı
- **Doğruluk (Accuracy):** %98
- **Precision:** %96
- **Recall:** %98
- **F1 Skoru:** %97

Modelin eğitimi için 12.000+ satırlık etiketli koku verisi, `Astroit_hackathon_ai_model/` dizininde yer almaktadır. Veri ön işleme, scaler ayarları, test/tren split’leri ve eğitim notebook’ları da klasör içinde paylaşılmıştır.

---

## 🗺️ Gerçekleştirilen Kullanım Senaryoları

### #1 🔥 Orman Yangını Öncesi Risk Tespiti
📍 Muğla – Fethiye bölgesinde test edildi  
🔥 VOC emisyonundaki artışla yangın öncesi anomaliler tespit edildi  
📉 Yangın başlamadan 45 dakika önce eşik üstü değer alındı  

### #2 🐝 Arıcılık Uyum Skorları
📍 Artvin, Ordu, Mersin  
🌸 Bitki örtüsündeki doğal koku varyasyonları analiz edildi  
📈 Flora ve çiçek çeşitliliği %92 uyumla haritalandı  
🧭 Arıcılar için en uygun 5 yeni lokasyon saptandı

### #3 🛢️ Petrol ve Gaz Sızıntısı İzleme
📍 İzmit Körfezi ve Mersin Limanı  
⛽ Benzin + VOC sızıntıları, deniz kıyısına yayılan hidrokarbonlar tespit edildi  
🌊 Haritada sızıntı izi görselleştirildi, belediyeye sunuldu

### #4 🌽 Tarımsal Zararlı ve Mantari İzleme
📍 Şanlıurfa domates tarlası  
🦠 Toprak üstü gaz dağılımında mantar risk sinyali %78 başarıyla yakalandı  
⏱️ 3 gün önceden uyarı verildi, verim kaybı önlendi

### #5 🏭 Sanayi Emisyon Uygunluk Raporu
📍 Adana OSB, Manisa OSB  
🌫️ Endüstriyel gaz emisyonları tespit edilip kentsel yerleşimlere etkisi modelledi  
📊 %87’lik eşik üstü alanlar belirlenip yatırım için önlem raporu sunuldu

---

## 📦 Projenin Dosya Mimarisi
proje_bilgisi:
  📁 dosya_yapisi:
    Astroit_hackathon_ai_model:
      icerik:
        - train.ipynb: "🤖 Yapay zeka model eğitimi için kullanılan Jupyter Notebook dosyası"
        - prepare_dataset.ipynb: "📊 Veri ön işleme ve formatlama adımları"
        - smell_model.pkl: "🧠 Eğitilmiş koku sınıflandırma modeli"
        - sensor_data.csv: "📈 Sensörlerden alınan ham verilerin işlenmiş hali"
        - scaler.pkl / knn_classifier.pkl: "⚙️ Modelin yardımcı bileşenleri (ölçekleyici ve sınıflandırıcı)"
    Smell_Inspector_Donanim:
      alt_klasorler:
        Smell_Annotator_SW: "📝 Etiketlenmiş koku verileri, Python tabanlı işaretleme yazılımı"
        PyCharm: "💻 Sensör verilerinin koda dönüştürülüp işaretlendiği ortam"
    astroist_on:
      src:
        - altinmadeneri.json: "🏅 Altın madeni lokasyon verileri"
        - komurmadenveri.json: "🪨 Kömür sahalarına ait il/ilçe bazlı coğrafi veri"
        - angular.json: "⚛️ Angular frontend yapılandırma ayarları"
        - turkey-map.svg: "🗺️ SVG formatında Türkiye haritası – katmanlı gösterim için kullanılır"
    backend:
      yapi:
        - Dockerfile: "🐳 Projeyi container ortamında deploy etmek için yapılandırma"
        - pom.xml: "☕ Java Spring Boot bağımlılık yönetimi"
        - system.properties: "🔧 Render ayarları ve sistem dosyaları"

  🔥 senaryolar:
    - senaryo: "🌲 Orman Yangını Öncesi Koku Anomali Tespiti"
      lokasyon: "📍 Muğla – Fethiye"
      veri: "🧪 VOC gaz yoğunluğu eşik değeri > 87 ppm"
      erken_uyari: "⏰ 45 dakika önceden uyarı sinyali üretildi"
      hedef_kurumlar: ["AFAD", "OGM", "Çevre Bakanlığı"]
    - senaryo: "🌾 Tarımsal Mantari Risk Analizi"
      lokasyon: "📍 Şanlıurfa – Harran Ovası"
      hedef_bitki: "🍅 Domates"
      anomali: "💨 Metan + Amonyak salınımında ani sıçrama"
      aksiyon: "💉 Erken ilaçlama → %19 verim artışı"
    - senaryo: "🏭 Sanayi Emisyon Haritalama"
      lokasyon: "📍 Adana OSB"
      risk_skoru: "🔴 0.81 (yüksek eşik üstü değer)"
      sensör_sayisi: 8
      yatırımcı_çıktısı: "📑 Baca filtresi zorunluluğu için bilimsel rapor"
    - senaryo: "🐝 Arıcılık Uygunluk Haritalaması"
      lokasyon: "📍 Artvin & Ordu"
      floral_koku_tespiti: "🌼 Soğan, sarımsak, portakal, narenciye"
      analiz: "📊 64-kanal sinyaliyle 0.93 korelasyon"
      öneri: "📍 Yeni arıcılık yatırım bölgesi önerildi"

  🧠 yapay_zeka:
    en_başarılı_model: "KNN (En Yakın Komşuluk)"
    metrikler:
      dogruluk: 0.98
      precision: 0.96
      recall: 0.98
      f1_skoru: 0.97
    ogrenme_tipi: "📘 Gözetimli öğrenme"
    siniflandirma_mantigi: "📈 64 boyutlu direnç sinyali vektörlerinin karşılaştırılması"
    veriseti:
      toplam_veri: "12000+"
      egitim_orani: "70%"
      test_orani: "30%"
      dosya: "sensor_data.csv"

  💰 yatirimci_kazanimlari:
    - 🗺️ Stratejik yatırım haritası oluşturma
    - 🌿 Çevre dostu risk modelleme
    - 🤖 Yapay zekâ ile veri tabanlı karar destek
    - 📘 ESG uyumlu çevresel raporlama
    - 🧭 Yerel yönetimler için saha öncesi değerlendirme
    - ⚖️ Tarım ve sanayi dengesi için rehberlik
    - 🏭 OSB’ler için emisyon ücretlendirme altyapısı

  🌍 sürdürülebilirlik_uyumu:
    hedefler:
      - 🏙️ SDG 11: Sürdürülebilir şehir ve yerleşkeler
      - 🏗️ SDG 9: Sanayi, yenilikçilik ve altyapı
      - 🌡️ SDG 13: İklim eylemi
      - 🔄 SDG 12: Sorumlu üretim ve tüketim
    karbon_takibi: "♻️ VOC içindeki karbon bazlı bileşenler aktif olarak takip ediliyor"
    veri_politikasi:
      format: ["JSON", "CSV", ".pkl"]
      saklama: "☁️ Lokal ve bulut tabanlı veri saklama"
      planlanan_gelisme: "🔐 Kriptolu veri paylaşım ağı geliştirilecek"

  🧪 teknolojik_yenilikler:
    - 🚀 Türkiye’de ilk defa 64-kanallı dijital koku verisi ile yatırım haritası üretimi
    - 📍 GPS destekli eşzamanlı VOC sinyali etiketleme sistemi
    - 🔬 Çoklu sensör dizilimiyle eş zamanlı anomali analizi
    - 💻 Web tabanlı kullanıcı arayüzüyle anında görselleştirme
    - 🧠 Yapay zekâ destekli “koku tanıma & yorumlama” altyapısı

  🤝 önerilen_kamu_ortakliklari:
    - 🏛️ T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı
    - 📊 Türkiye İstatistik Kurumu (TÜİK)
    - 🚨 AFAD – Afet Koordinasyonu
    - 🌲 Orman Genel Müdürlüğü
    - 🏙️ Pilot belediyeler (Şanlıurfa, Adana, Artvin vb.)

  💼 olası_ticari_gelir_modelleri:
    B2G:
      - 🧾 Belediyelere lisanslı karar destek platformu
      - 🏗️ Kamu ihalelerine VOC analiz modülü
    B2B:
      - 🏭 OSB içi sanayi firmalarına emisyon danışmanlığı
      - 🧴 Gıda, parfüm, tarım sektörüne özel koku analiz sistemi
    B2C:
      - 📱 Mobil uygulama ile bireysel çevre bilinci – freemium/premium modeli

  🗺️ yol_haritasi:
    kısa_vade:
      - 📊 Anlık rapor üretimi için kullanıcı paneli
      - 📚 10.000+ yeni koku verisi toplanması
    orta_vade:
      - 🔗 Belediyelerle API entegrasyonu
      - 🌐 Açık veri portalı oluşturulması
    uzun_vade:
      - 🇪🇺 Avrupa Birliği Horizon projelerine katılım
      - 🛠️ SmellControl cihazının ticarileştirilmesi ve ihraç edilmesi
      - 🎤 CES 2026 Las Vegas – donanım lansmanı



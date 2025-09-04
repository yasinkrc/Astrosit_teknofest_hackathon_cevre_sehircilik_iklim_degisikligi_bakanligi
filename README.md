# 🌍 Astrosit | SmellControl ile Koku Tabanlı Coğrafi Yatırım Öncelikleri Haritalama Platformu

**Kategori:** Sektörel Yatırım Öncelikleri – TÜİK Verileri ile Karar Destek Sistemleri  
**Hackathon:** TEKNOFEST 2025 – Geleceğin Sürdürülebilir Şehirleri  
**Takım Adı:** Astrosit  
**Takım Üyeleri:** Yasin Karaca, Nazlıcan Atlı  
**Teknoloji Alanları:** Nanohibrit sensör teknolojisi, yapay zekâ, büyük veri, çevresel yatırım analizleri, coğrafi bilgi sistemleri, veri görselleştirme

---

## 💡 Giriş: Yatırım Perspektifinden Projenin Önemi

Türkiye’de yatırım kararlarının çoğu zaman geçmiş deneyimlere, sezgilere ya da eksik veri analizlerine dayanarak verildiği bir dönemdeyiz. Ancak günümüzün şehir planlaması, enerji altyapısı, tarım yatırımları ve çevresel sürdürülebilirlik alanlarında başarı, artık yalnızca “tahminle” değil, veriye dayalı karar sistemleriyle mümkündür.

İşte bu noktada Astrosit ekibi olarak geliştirdiğimiz **SmellControl tabanlı platform**, TÜİK’in tematik veri setlerini, kokuyu algılayabilen çok kanallı yapay zekâ destekli gaz sensörlerimizle birleştirerek, yatırımcıların stratejik lokasyon seçimlerini kolaylaştıran, çevresel analizleri otomatize eden ve kentlerin geleceğini veriyle şekillendiren bir çözüm sunmaktadır.

Sistemin temel amacı, sadece çevresel izleme değil; aynı zamanda bu çevresel verilerle yatırım yapılabilirlik haritaları oluşturmak, ekonomik değeri olan bölgeleri saptamak ve yerel yönetimlere, özel sektöre ve yatırımcılara bilimsel ve teknik tabanlı rehberlik etmektir.

---

## 🔬 Proje Özeti ve Yenilikçi Yönleri

**SmellControl**, çok kanallı yapay zekâ destekli bir nanohibrit gaz algılama platformudur.  
Sensör modülü: **Smell iX16** çipi (16 kanal)  
Veriler işlenerek aşağıdaki çıktılar oluşturulur:

- Çevresel yatırım skoru  
- Sanayi uygunluk raporu  
- Tarımsal flora durumu  
- Arıcılık uyumu  
- Çevre risk puanı

### Yanıt Verdiğimiz Sorular:

- **Yatırımcılar için:** Bu ilçede gıda fabrikası kurulabilir mi?  
- **Belediyeler için:** Hangi bölgede arıtma tesisi ihtiyacı var?  
- **Çevreciler için:** Sanayi kaynaklı gaz emisyonu hangi mahalleleri etkiliyor?  
- **Arıcılar/Tarım Yatırımcıları için:** En uygun flora nerede?

---

## 📊 Kullanılan Veriler ve Entegrasyonlar

### 📌 TÜİK Veri Tabanı Entegrasyonları (10 Tematik Set)

- **Çevre ve Enerji:** Elektrik üretim/dağıtım bölgeleri, arıtma tesisleri, emisyon miktarları  
- **Sanayi:** OSB yoğunluğu, üretim hacmi  
- **Tarım:** Bitki örtüsü yoğunluğu, arıcılık verimlilik endeksi  
- **Ulaştırma:** Liman, otoyol, sanayi hattı yakınlığı  
- **Sağlık:** Hava kirliliği bağlantılı hastalık oranları  

JSON formatında **ilçe bazlı veri kaynakları**, `astroist_on/src/` klasöründe.

---

## 🧠 Kullanılan Sensör ve Donanım Özeti

### 🔹 Donanım Özellikleri

- **Çip:** Smell iX16 – 16 kanal gaz/koku sensörü  
- **Kanal Sayısı:** 64 (4x iX16 modül)  
- **Veri Alım Hızı:** Her 1.8 saniyede tam okuma  
- **Enerji Tüketimi:** 1 µW  
- **Koku Algılama Aralığı:** ppb düzeyi  
- **Veri Formatı:** `.csv`, `.json` (annotated)  

### 🛰️ Gömülü Teknoloji

- Dahili **GPS** modülü  
- Aynı anda 4 çipten paralel veri alımı  
- Yerleşik yazılım ile yapay zekâ destekli sınıflandırma

---

## 🧪 Algılanabilen Örnek VOC’ler

| Koku/Gaz       | Kaynak & Kullanım Örneği                           |
|----------------|-----------------------------------------------------|
| Amonyak        | Tarım: Gübre sızıntısı                              |
| Etanol/Aseton  | Sanayi: Kimyasal salınım                            |
| Kahve/Soğan    | Flora: Tarımsal uygunluk analizi                    |
| Benzin/Mazot   | Liman: Petrol sızıntısı                             |
| Formaldehit    | Konut: İç hava kalitesi                             |

> Toplamda 30+ gaz/koku sınıflandırılabilir.

---

## 🧠 Yapay Zekâ Modeli ve Performansı

### 🔍 Kullanılan Algoritmalar

- Gradient Boosting  
- AdaBoost  
- Logistic Regression  
- SVM  
- Decision Tree  
- **K-Nearest Neighbors (KNN)** ✅ En başarılı model

### 📈 KNN Modeli Performansı

- **Doğruluk:** %98  
- **Precision:** %96  
- **Recall:** %98  
- **F1 Skoru:** %97  

Veri seti: 12.000+ etiketli satır  
Dizin: `Astroit_hackathon_ai_model/`

---

## 🗺️ Gerçekleştirilen Kullanım Senaryoları

### #1 🔥 Orman Yangını Öncesi Risk Tespiti
- **Lokasyon:** Muğla – Fethiye  
- Yangın öncesi VOC anomalisi  
- **Uyarı süresi:** 45 dakika önce

### #2 🐝 Arıcılık Uyum Skorları
- **Lokasyon:** Artvin, Ordu, Mersin  
- Flora analizleri, %92 eşleşme  
- 5 yeni yatırım lokasyonu önerildi

### #3 🛢️ Petrol ve Gaz Sızıntısı İzleme
- **Lokasyon:** İzmit Körfezi, Mersin Limanı  
- Deniz kıyısında hidrokarbon sızıntısı tespiti

### #4 🌽 Tarımsal Zararlı ve Mantar İzleme
- **Lokasyon:** Şanlıurfa domates tarlası  
- %78 başarı oranıyla mantar sinyali

### #5 🏭 Sanayi Emisyon Uygunluk Raporu
- **Lokasyon:** Adana OSB, Manisa OSB  
- %87 eşik üstü alanlar belirlendi

---

## 📦 Projenin Dosya Mimarisi

### `Astroit_hackathon_ai_model/`

- `train.ipynb`: 🤖 Yapay zeka model eğitimi  
- `prepare_dataset.ipynb`: 📊 Veri ön işleme  
- `smell_model.pkl`: 🧠 Eğitilmiş model  
- `sensor_data.csv`: 📈 Sensör verisi  
- `scaler.pkl`, `knn_classifier.pkl`: ⚙️ Yardımcı bileşenler

### `Smell_Inspector_Donanim/Smell_Annotator_SW/`

- 📝 Etiketleme yazılımı  
- 💻 PyCharm entegrasyonu

### `astroist_on/src/`

- `altinmadeneri.json`: 🏅 Altın madeni verisi  
- `komurmadenveri.json`: 🪨 Kömür madeni verisi  
- `angular.json`: ⚛️ Frontend ayarları  
- `turkey-map.svg`: 🗺️ SVG Türkiye haritası

### `backend/`

- `Dockerfile`: 🐳 Deployment  
- `pom.xml`: ☕ Spring Boot bağımlılıkları  
- `system.properties`: 🔧 Render ayarları

---

## 💰 Yatırımcı Kazanımları

- 🗺️ Stratejik yatırım haritası  
- 🌿 Çevre dostu risk modelleme  
- 🤖 Yapay zekâ ile karar destek  
- 📘 ESG uyumlu çevresel raporlama  
- ⚖️ Tarım ve sanayi dengesi için rehberlik  
- 🏭 OSB’ler için emisyon ücretlendirme

---

## 🌍 Sürdürülebilirlik Uyumu

- **SDG 11:** Sürdürülebilir şehirler  
- **SDG 9:** Sanayi, yenilik ve altyapı  
- **SDG 13:** İklim eylemi  
- **SDG 12:** Sorumlu üretim/tüketim  
- **VOC Karbon Takibi**: Aktif  

---

## 🧪 Teknolojik Yenilikler

- 🚀 64-kanallı dijital koku verisi ile yatırım haritası  
- 📍 GPS destekli VOC etiketleme  
- 🔬 Çoklu sensör dizilimi  
- 💻 Web arayüzü ile anlık görselleştirme  
- 🧠 AI tabanlı koku tanıma

---

## 🤝 Önerilen Kamu Ortaklıkları

- 🏛️ T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı  
- 📊 TÜİK  
- 🚨 AFAD  
- 🌲 Orman Genel Müdürlüğü  
- 🏙️ Pilot belediyeler (Şanlıurfa, Adana, Artvin)

---

## 💼 Olası Ticari Gelir Modelleri

### **B2G**  
- 🧾 Belediyelere lisanslı karar destek platformu  
- 🏗️ Kamu ihalelerine VOC analiz modülü

### **B2B**  
- 🏭 OSB’lere emisyon danışmanlığı  
- 🧴 Gıda, parfüm, tarım sektörüne özel sistem

### **B2C**  
- 📱 Mobil uygulama ile bireysel çevre bilinci  
- 🔐 Freemium/Premium modeli

---

## 🗺️ Yol Haritası

### Kısa Vade  
- 📊 Kullanıcı paneli  
- 📚 Yeni 10.000+ koku verisi

### Orta Vade  
- 🔗 Belediye API entegrasyonu  
- 🌐 Açık veri portalı

### Uzun Vade  
- 🇪🇺 Horizon AB projeleri  
- 🛠️ SmellControl cihazı ihracatı  
- 🎤 CES 2026 Las Vegas lansmanı

---

## 🧾 Sonuç ve Genel Değerlendirme

**SmellControl ile Koku Tabanlı Coğrafi Yatırım Öncelikleri Haritalama Platformu**, veri odaklı şehircilik, çevresel planlama ve stratejik yatırım karar süreçlerinde **devrim niteliğinde bir dönüşüm** sunmaktadır.

TÜİK’in tematik veri setleriyle entegre çalışan bu sistem, koku bazlı çevresel sinyalleri gerçek zamanlı analiz ederek;  
– **yatırımcılara yön veren**,  
– **yerel yönetimlere stratejik içgörüler sunan**,  
– **OSB’lere emisyon analiz hizmeti sağlayan**,  
– **tarım ve arıcılık yatırımları için bilimsel öneriler üreten**  
bütünsel bir karar destek altyapısı oluşturur.

Bu platform sadece teknolojik bir ürün değil; aynı zamanda **sürdürülebilir kalkınma hedefleri ile uyumlu**,  
**veriye dayalı gelecek inşasına hizmet eden** bir sistemdir.

Türkiye’nin sahip olduğu zengin coğrafi kaynaklar, doğru analiz edilip haritalandığında yatırımcılar için **önemli kapılar açabilir**.  
Bu bağlamda SmellControl:

- 📈 TÜİK verilerinin sadece “arşiv” değil, **yatırıma dönüştürülebilir birer analiz çıktısı** olarak kullanılmasını sağlar.  
- 📍 Yerli ve milli sensör donanımıyla coğrafi bölgelerdeki **çevresel yatırım fırsatlarını görünür kılar**.  
- 🧠 Yapay zekâ destekli sistem ile karar alma süreçlerini hızlandırır ve daha adil hale getirir.

Veriye dayalı bu yaklaşım, “sezgisel yatırım” döneminden “bilimsel yatırım yönlendirme” çağına geçişin önemli bir örneğidir.  
Projemiz, yalnızca bir hackathon prototipi değil; aynı zamanda **gerçek hayatta uygulanabilir**, genişletilebilir ve ticarileştirilebilir bir altyapıya sahiptir.

---

## 🙏 Teşekkürler

### 🌱 Kurumsal ve Teknik Destek İçin:
- **Türkiye Teknoloji Takımı Vakfı (T3 Vakfı)**  
- **Sanayi ve Teknoloji Bakanlığı**  
- **TEKNOFEST 2025 Ekibi**  
- **Coder Space Ailesi**  
- **Twinup & Slack Mentorları**

### 👨‍🏫 Bireysel Mentörlük İçin:
- **Ali Bey** – teknik ve stratejik yönlendirmeleriyle  
- **TwinUp platformu** – sensör ve modelleme desteği  
- **Slack/Bakanlık mentör kanalları** – hızlı çözüm, ileri vizyon katkıları

### 🤝 Ekip Ruhu İçin:
- **Nazlıcan Atlı** – analitik, yazılım, saha katkıları  
- **Tüm destekçilerimiz** – doğrudan ya da dolaylı katkı sağlayan herkes

---

## 📄 Lisans Bilgisi

Bu proje **lisanslı bir teknolojidir**.  
Geliştirilen tüm donanım ve yazılım bileşenleri, **Astrosit takımı** bünyesinde tescillenmiştir.

Lütfen detaylı lisans koşulları ve kullanım izinleri için proje içerisindeki `LICENSE.md` dosyasını inceleyiniz.  
Ticari kullanım ve iş birliği talepleri için ulaşabilirsiniz .


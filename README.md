🌍 Astrosit_SmellControl:
  kategori: "Sektörel Yatırım Öncelikleri – TÜİK Verileri ile Karar Destek Sistemleri"
  hackathon: "TEKNOFEST 2025 – Geleceğin Sürdürülebilir Şehirleri"
  takım_adı: "Astrosit"
  takım_üyeleri:
    - "Yasin Karaca"
    - "Nazlıcan Atlı"
  teknoloji_alanları:
    - "Nanohibrit sensör teknolojisi"
    - "yapay zekâ"
    - "büyük veri"
    - "çevresel yatırım analizleri"
    - "coğrafi bilgi sistemleri"
    - "veri görselleştirme"

  💡_Giriş:
    yatırım_perspektifi: >
      Türkiye’de yatırım kararlarının çoğu zaman geçmiş deneyimlere, sezgilere ya da eksik veri analizlerine dayanarak verildiği bir dönemdeyiz. Ancak günümüzün şehir planlaması, enerji altyapısı, tarım yatırımları ve çevresel sürdürülebilirlik alanlarında başarı, artık yalnızca “tahminle” değil, veriye dayalı karar sistemleriyle mümkündür. İşte bu noktada Astrosit ekibi olarak geliştirdiğimiz SmellControl tabanlı platform, TÜİK’in tematik veri setlerini, kokuyu algılayabilen çok kanallı yapay zekâ destekli gaz sensörlerimizle birleştirerek, yatırımcıların stratejik lokasyon seçimlerini kolaylaştıran, çevresel analizleri otomatize eden ve kentlerin geleceğini veriyle şekillendiren bir çözüm sunmaktadır. Sistemin temel amacı, sadece çevresel izleme değil; aynı zamanda bu çevresel verilerle yatırım yapılabilirlik haritaları oluşturmak, ekonomik değeri olan bölgeleri saptamak ve yerel yönetimlere, özel sektöre ve yatırımcılara bilimsel ve teknik tabanlı rehberlik etmektir.

  🔬_Proje_Özeti_ve_Yenilikçi_Yönleri:
    sistem_adi: "SmellControl"
    tanım: >
      SmellControl, çok kanallı yapay zekâ destekli bir nanohibrit gaz algılama platformudur. Geliştirdiğimiz sistem, 16 kanallı Smell iX16 çiplerinden oluşan bir sensör modülüyle, çok çeşitli gazları ve kokuları (VOC – Volatile Organic Compounds) algılar. Toplanan veriler, özel olarak geliştirilen makine öğrenmesi algoritmalarıyla analiz edilerek, her il ve ilçe için çevresel yatırım skoru, sanayi uygunluk raporu, tarımsal flora durumu, arıcılık uyumu ve çevre risk puanı gibi çıktılar üretilir.
    örnek_sorular:
      yatırımcılar: "Bu ilçede gıda fabrikası kurulabilir mi?"
      belediyeler: "Hangi bölgede arıtma tesisi ihtiyacı var?"
      çevreciler: "Sanayi kaynaklı gaz emisyonu hangi mahalleleri etkiliyor?"
      arıcılar_ve_tarım: "En uygun flora nerede?"

  📊_Kullanılan_Veriler_ve_Entegrasyonlar:
    TUIK_Verisetleri:
      - "Elektrik üretim/dağıtım bölgeleri"
      - "arıtma tesisleri"
      - "emisyon miktarları"
      - "OSB (Organize Sanayi Bölgesi) yoğunluğu"
      - "üretim hacmi"
      - "bitki örtüsü yoğunluğu"
      - "arıcılık verimlilik endeksi"
      - "liman, otoyol, sanayi hattı yakınlığı"
      - "hava kirliliği bağlantılı hastalık oranları"
    format: "JSON"
    işleme_dizini: "astroist_on/src/"

  🧠_Donanım_Özeti:
    cihaz:
      çip: "Smell iX16 – 16 kanal gaz/koku sensörü"
      kanal_sayısı: "64 (4×iX16 modül)"
      veri_alım_hızı: "Her 1.8 saniyede tam okuma"
      enerji_tüketimi: "1 µW (süper düşük güç)"
      algılama_aralığı: "ppb düzeyi (milyarda bir)"
      veri_hacmi: "1 saatlik analizde ortalama 15.000 satır veri"
      formatlar: [".csv", ".json (annotated)"]
    özellikler:
      gps: true
      paralel_chip_okuma: true
      yerleşik_ai: true

  🧪_Algılanabilen_VOC_Örnekleri:
    - koku_gaz: "Amonyak"
      kullanım: "Tarım, hayvancılık"
      örnek: "Gübre sızıntısı analizi"
    - koku_gaz: "Etanol, Aseton"
      kullanım: "Sanayi"
      örnek: "Kimyasal salınım takibi"
    - koku_gaz: "Kahve, Soğan"
      kullanım: "Flora"
      örnek: "Tarımsal uygunluk"
    - koku_gaz: "Benzin, Mazot"
      kullanım: "Liman"
      örnek: "Petrol sızıntısı tespiti"
    - koku_gaz: "Formaldehit"
      kullanım: "Konut"
      örnek: "Hava kalitesi"

  🧠_Yapay_Zeka_Modeli:
    algoritmalar:
      test_edilen:
        - "Gradient Boosting"
        - "AdaBoost"
        - "Logistic Regression"
        - "SVM (Support Vector Machines)"
        - "Decision Tree"
        - "K-Nearest Neighbors (KNN)"
      en_başarılı: "KNN"
    performans:
      doğruluk: "%98"
      precision: "%96"
      recall: "%98"
      f1_skoru: "%97"
    veri_seti:
      satır: "12.000+"
      eğitim_oranı: "70%"
      test_oranı: "30%"
      dizin: "Astroit_hackathon_ai_model/"

  🗺️_Senaryolar:
    - senaryo: "Orman Yangını Öncesi Risk Tespiti"
      lokasyon: "Muğla – Fethiye"
      detay: "VOC emisyonundaki artışla yangın öncesi anomaliler tespit edildi"
      eşik_değer: "> 87 ppm"
      uyarı_süresi: "45 dakika önce"
    - senaryo: "Arıcılık Uyum Skorları"
      lokasyon: ["Artvin", "Ordu", "Mersin"]
      flora_analizi: "%92 uyumla haritalandı"
    - senaryo: "Petrol ve Gaz Sızıntısı İzleme"
      lokasyon: ["İzmit Körfezi", "Mersin Limanı"]
      yöntem: "VOC sızıntıları, hidrokarbon tespiti"
    - senaryo: "Tarımsal Zararlı ve Mantari İzleme"
      lokasyon: "Şanlıurfa domates tarlası"
      başarı: "%78"
      erken_uyarı: "3 gün önceden"
    - senaryo: "Sanayi Emisyon Uygunluk Raporu"
      lokasyon: ["Adana OSB", "Manisa OSB"]
      eşik_üzeri_oran: "%87"

  📦_Dosya_Mimarisi:
    proje_bilgisi:
      Astroit_hackathon_ai_model:
        - "train.ipynb"
        - "prepare_dataset.ipynb"
        - "smell_model.pkl"
        - "sensor_data.csv"
        - "scaler.pkl"
        - "knn_classifier.pkl"
      Smell_Inspector_Donanim:
        - "Smell_Annotator_SW"
        - "PyCharm"
      astroist_on/src/:
        - "altinmadeneri.json"
        - "komurmadenveri.json"
        - "angular.json"
        - "turkey-map.svg"
      backend:
        - "Dockerfile"
        - "pom.xml"
        - "system.properties"

  💰_Yatırımcı_Kazanımları:
    - "🗺️ Stratejik yatırım haritası oluşturma"
    - "🌿 Çevre dostu risk modelleme"
    - "🤖 Yapay zekâ ile veri tabanlı karar destek"
    - "📘 ESG uyumlu çevresel raporlama"
    - "🧭 Yerel yönetimler için saha öncesi değerlendirme"
    - "⚖️ Tarım ve sanayi dengesi için rehberlik"
    - "🏭 OSB’ler için emisyon ücretlendirme altyapısı"

  🌍_Sürdürülebilirlik_Uyumu:
    hedefler:
      - "🏙️ SDG 11: Sürdürülebilir şehir ve yerleşkeler"
      - "🏗️ SDG 9: Sanayi, yenilikçilik ve altyapı"
      - "🌡️ SDG 13: İklim eylemi"
      - "🔄 SDG 12: Sorumlu üretim ve tüketim"
    karbon_takibi: "♻️ VOC içindeki karbon bazlı bileşenler aktif olarak takip ediliyor"

  📂_Veri_Politikası:
    format: ["JSON", "CSV", ".pkl"]
    saklama: "☁️ Lokal ve bulut tabanlı veri saklama"
    planlanan_gelişme: "🔐 Kriptolu veri paylaşım ağı geliştirilecek"

  🧪_Teknolojik_Yenilikler:
    - "🚀 Türkiye’de ilk defa 64-kanallı dijital koku verisi ile yatırım haritası üretimi"
    - "📍 GPS destekli eşzamanlı VOC sinyali etiketleme sistemi"
    - "🔬 Çoklu sensör dizilimiyle eş zamanlı anomali analizi"
    - "💻 Web tabanlı kullanıcı arayüzüyle anında görselleştirme"
    - "🧠 Yapay zekâ destekli “koku tanıma & yorumlama” altyapısı"

  🤝_Önerilen_Kamu_Ortaklıkları:
    - "🏛️ T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı"
    - "📊 Türkiye İstatistik Kurumu (TÜİK)"
    - "🚨 AFAD – Afet Koordinasyonu"
    - "🌲 Orman Genel Müdürlüğü"
    - "🏙️ Pilot belediyeler (Şanlıurfa, Adana, Artvin vb.)"

  💼_Ticari_Model:
    B2G:
      - "🧾 Belediyelere lisanslı karar destek platformu"
      - "🏗️ Kamu ihalelerine VOC analiz modülü"
    B2B:
      - "🏭 OSB içi sanayi firmalarına emisyon danışmanlığı"
      - "🧴 Gıda, parfüm, tarım sektörüne özel koku analiz sistemi"
    B2C:
      - "📱 Mobil uygulama ile bireysel çevre bilinci – freemium/premium modeli"

  🗺️_Yol_Haritasi:
    kısa_vade:
      - "📊 Anlık rapor üretimi için kullanıcı paneli"
      - "📚 10.000+ yeni koku verisi toplanması"
    orta_vade:
      - "🔗 Belediyelerle API entegrasyonu"
      - "🌐 Açık veri portalı oluşturulması"
    uzun_vade:
      - "🇪🇺 Avrupa Birliği Horizon projelerine katılım"
      - "🛠️ SmellControl cihazının ticarileştirilmesi ve ihraç edilmesi"
      - "🎤 CES 2026 Las Vegas – donanım lansmanı"

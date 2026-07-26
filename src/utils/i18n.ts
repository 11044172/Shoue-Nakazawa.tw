export const languages = ["ja", "zh-tw", "en"] as const;
export type Lang = (typeof languages)[number];
export type Localized = { ja?: string; zhTw?: string; en?: string };

export const langKey = (lang: Lang) => (lang === "zh-tw" ? "zhTw" : lang);

export function t(value: Localized | undefined, lang: Lang): string {
  if (!value) return "";
  const selected = value[langKey(lang)];
  return selected || value.ja || value.zhTw || value.en || "";
}

export function withBase(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\/+/, "");
  return `${base}/${clean}`.replace(/\/{2,}/g, "/");
}

export const ui = {
  ja: {
    about:"プロフィール", experience:"職務経験", education:"学歴", projects:"プロジェクト", skills:"主要な強み", story:"My Story", memories:"思い出", achievements:"実績", contact:"お問い合わせ",
    viewProjects:"代表プロジェクトを見る", viewStory:"My Storyを見る", viewCv:"CVを見る", contactMe:"連絡する", current:"現在地", next:"次のステップ", future:"これから", selected:"代表", viewAll:"すべて見る", technology:"使用技術", status:"状態", period:"期間", challenge:"課題", solution:"解決方法", features:"主な機能", role:"担当範囲", noItems:"公開中の項目はありません。", filterAll:"すべて", menu:"メニュー", theme:"表示テーマを切り替える", skip:"本文へ移動", close:"閉じる", previous:"前へ", nextImage:"次へ", archiveLead:"幼少期から現在まで、学び・仕事・趣味・挑戦を年代順に残しています。", memoriesLead:"写真を中心に、学校・台湾・スポーツ・音楽・旅の記憶を整理しています。", profile:"プロフィール", capabilities:"主要な強み", bridge:"日本 × 台湾", starting:"2026年9月 入学予定", expected:"2028年修了予定", caseStudy:"詳細を見る", certificates:"証明書を見る", contactLead:"Web制作、AIを活用したサービス開発、日台に関わるプロジェクトについて、お気軽にご連絡ください。", filterLabel:"表示するカテゴリ", timelineLabel:"中澤祥慧の人生年表"
  },
  "zh-tw": {
    about:"個人簡介", experience:"工作經歷", education:"學歷", projects:"專案", skills:"核心能力", story:"人生故事", memories:"回憶", achievements:"成就", contact:"聯絡",
    viewProjects:"查看代表專案", viewStory:"查看人生故事", viewCv:"查看 CV", contactMe:"聯絡我", current:"目前位置", next:"下一步", future:"未來", selected:"精選", viewAll:"查看全部", technology:"使用技術", status:"狀態", period:"期間", challenge:"課題", solution:"解決方法", features:"主要功能", role:"負責範圍", noItems:"目前沒有公開項目。", filterAll:"全部", menu:"選單", theme:"切換顯示主題", skip:"跳到主要內容", close:"關閉", previous:"上一張", nextImage:"下一張", archiveLead:"依照時間順序，保存從童年到現在的學習、工作、興趣與挑戰。", memoriesLead:"以照片為中心，整理學校、台灣、運動、音樂與旅行的回憶。", profile:"個人簡介", capabilities:"核心能力", bridge:"日本 × 台灣", starting:"預計 2026 年 9 月入學", expected:"預計 2028 年畢業", caseStudy:"查看詳情", certificates:"查看證書", contactLead:"歡迎聯絡我討論 Web 製作、AI 服務開發，以及日本與台灣相關的專案。", filterLabel:"選擇顯示類別", timelineLabel:"中澤祥慧的人生年表"
  },
  en: {
    about:"Profile", experience:"Experience", education:"Education", projects:"Projects", skills:"Core capabilities", story:"My Story", memories:"Memories", achievements:"Achievements", contact:"Contact",
    viewProjects:"View featured projects", viewStory:"View my story", viewCv:"View CV", contactMe:"Get in touch", current:"Current", next:"Next step", future:"Looking ahead", selected:"Featured", viewAll:"View all", technology:"Technology", status:"Status", period:"Period", challenge:"Challenge", solution:"Solution", features:"Key features", role:"Responsibilities", noItems:"No published items yet.", filterAll:"All", menu:"Menu", theme:"Toggle color theme", skip:"Skip to content", close:"Close", previous:"Previous", nextImage:"Next", archiveLead:"A chronological archive of learning, work, interests, and challenges from childhood to the present.", memoriesLead:"A photo-led archive of school, Taiwan, sports, music, and travel memories.", profile:"Profile", capabilities:"Core capabilities", bridge:"Japan × Taiwan", starting:"Starting September 2026", expected:"Expected 2028", caseStudy:"View case study", certificates:"View certificate", contactLead:"Feel free to reach out about Web projects, AI-powered services, or work connecting Japan and Taiwan.", filterLabel:"Filter displayed categories", timelineLabel:"Shoue Nakazawa life timeline"
  }
} as const;

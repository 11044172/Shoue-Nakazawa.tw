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
    about:"About", experience:"Experience", education:"Education", projects:"Projects", skills:"Skills", story:"My Story", memories:"Memories", achievements:"Achievements", contact:"Contact",
    viewProjects:"Projectsを見る", viewStory:"My Storyを見る", viewCv:"CVを見る", contactMe:"Contact", current:"現在", next:"次のステップ", future:"研究関心", selected:"Selected", viewAll:"すべて見る", technology:"使用技術", status:"状態", period:"期間", challenge:"課題", solution:"解決方法", features:"主な機能", role:"担当範囲", noItems:"公開中の項目はありません。", filterAll:"すべて", menu:"メニュー", theme:"表示テーマを切り替える", skip:"本文へ移動", close:"閉じる", previous:"前へ", nextImage:"次へ", archiveLead:"幼少期から現在まで、学び・仕事・趣味・挑戦を年代順に残しています。", memoriesLead:"写真を中心に、学校・台湾・スポーツ・音楽・旅の記憶を整理しています。"
  },
  "zh-tw": {
    about:"關於我", experience:"經歷", education:"學歷", projects:"專案", skills:"技能", story:"人生故事", memories:"回憶", achievements:"成就", contact:"聯絡",
    viewProjects:"查看專案", viewStory:"查看人生故事", viewCv:"查看 CV", contactMe:"聯絡我", current:"現在", next:"下一步", future:"研究興趣", selected:"精選", viewAll:"查看全部", technology:"使用技術", status:"狀態", period:"期間", challenge:"課題", solution:"解決方法", features:"主要功能", role:"負責範圍", noItems:"目前沒有公開項目。", filterAll:"全部", menu:"選單", theme:"切換顯示主題", skip:"跳到主要內容", close:"關閉", previous:"上一張", nextImage:"下一張", archiveLead:"依照時間順序，保存從童年到現在的學習、工作、興趣與挑戰。", memoriesLead:"以照片為中心，整理學校、台灣、運動、音樂與旅行的回憶。"
  },
  en: {
    about:"About", experience:"Experience", education:"Education", projects:"Projects", skills:"Skills", story:"My Story", memories:"Memories", achievements:"Achievements", contact:"Contact",
    viewProjects:"View projects", viewStory:"View my story", viewCv:"View CV", contactMe:"Contact", current:"Now", next:"Next step", future:"Research interests", selected:"Selected", viewAll:"View all", technology:"Technology", status:"Status", period:"Period", challenge:"Challenge", solution:"Solution", features:"Key features", role:"Responsibilities", noItems:"No published items yet.", filterAll:"All", menu:"Menu", theme:"Toggle color theme", skip:"Skip to content", close:"Close", previous:"Previous", nextImage:"Next", archiveLead:"A chronological archive of learning, work, interests, and challenges from childhood to the present.", memoriesLead:"A photo-led archive of school, Taiwan, sports, music, and travel memories."
  }
} as const;

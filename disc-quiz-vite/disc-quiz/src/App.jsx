import React, { useState } from "react";

const questions = [
  {
    q: "當遇到新挑戰時，你通常會：",
    options: [
      "立刻採取行動",
      "和大家一起討論",
      "仔細觀察再決定",
      "遵循規則與流程",
    ],
  },
  {
    q: "在團隊合作中，你傾向於：",
    options: [
      "主導並推動大家",
      "鼓勵氣氛、帶動情緒",
      "關心成員的想法與需求",
      "關注細節與進度",
    ],
  },
  {
    q: "當面對壓力時，你會：",
    options: [
      "迎難而上，快速解決問題",
      "用幽默舒緩氣氛",
      "尋求支持與協助",
      "更加謹慎、小心執行",
    ],
  },
  {
    q: "你覺得自己在溝通中最常：",
    options: [
      "直接明確地表達",
      "熱情友善地互動",
      "耐心傾聽並關懷",
      "條理分明地說明",
    ],
  },
  {
    q: "你希望別人怎麼看你？",
    options: [
      "有決斷力的人",
      "有魅力的人",
      "好相處的人",
      "可靠有條理的人",
    ],
  },
  {
    q: "遇到意見分歧時，你通常：",
    options: [
      "堅持己見，尋求勝出",
      "和稀泥，保持氣氛和諧",
      "試圖讓大家都滿意",
      "找出標準流程來判斷",
    ],
  },
  {
    q: "你做決定時，主要依據：",
    options: [
      "直覺與經驗",
      "感覺與氣氛",
      "他人的建議",
      "資料與事實",
    ],
  },
  {
    q: "同事描述你時最常提到：",
    options: [
      "具領導力，行動派",
      "外向樂觀，很有人緣",
      "親切溫和，善解人意",
      "細心負責，有條理",
    ],
  },
  {
    q: "當工作有變化時，你會：",
    options: [
      "覺得興奮、有挑戰",
      "順其自然，接受新鮮事",
      "希望大家能彼此照顧",
      "需要明確說明與計畫",
    ],
  },
  {
    q: "你認為最重要的價值觀是：",
    options: [
      "成效與效率",
      "樂趣與人際關係",
      "和諧與關懷",
      "準確與穩定",
    ],
  },
];

const resultMap = [
  {
    key: "D",
    title: "D（支配型 Dominance）",
    desc: "行動力強、果斷直接、重視效率與目標，適合主導決策與帶領團隊，溝通上偏重結果。",
  },
  {
    key: "I",
    title: "I（影響型 Influence）",
    desc: "熱情外向、樂於社交、擅長鼓舞與說服他人，善於建立良好人際關係，溝通充滿活力與感染力。",
  },
  {
    key: "S",
    title: "S（穩定型 Steadiness）",
    desc: "溫和親切、注重和諧、重視團隊氛圍，耐心傾聽與支持他人，溝通時重視關懷與合作。",
  },
  {
    key: "C",
    title: "C（謹慎型 Compliance）",
    desc: "謹慎負責、注重細節、重視規範與品質，追求精確和正確，溝通偏向條理與邏輯。",
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const typeMap = ["D", "I", "S", "C"];

  const handleChoose = (idx) => {
    setAnswers((prev) => [...prev, idx]);
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const countTypes = () => {
    const counts = { D: 0, I: 0, S: 0, C: 0 };
    answers.forEach((ans) => {
      counts[typeMap[ans]]++;
    });
    return counts;
  };

  const renderResult = () => {
    const typeCount = countTypes();
    const max = Math.max(...Object.values(typeCount));
    const maxTypes = Object.keys(typeCount).filter((k) => typeCount[k] === max);
    return (
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <h2>你的溝通風格：</h2>
        {maxTypes.map((k) => {
          const info = resultMap.find((r) => r.key === k);
          return (
            <div key={k} style={{
              margin: "20px auto", padding: 16, borderRadius: 12,
              border: "2px solid #ddd", background: "#fafbfc", maxWidth: 350
            }}>
              <h3 style={{ margin: 8 }}>{info.title}</h3>
              <div>{info.desc}</div>
            </div>
          );
        })}
        <div style={{ color: "#999", fontSize: 12, marginTop: 18 }}>
          本測驗僅供參考，建議搭配實際行為觀察或專業測評。
        </div>
        <button
          style={{
            marginTop: 24, padding: "8px 32px", borderRadius: 8,
            border: "none", background: "#2563eb", color: "#fff", fontSize: 16, cursor: "pointer"
          }}
          onClick={() => { setStep(0); setAnswers([]); setShowResult(false); }}
        >再測一次</button>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f4f6fb"
    }}>
      <div style={{
        background: "#fff", padding: 36, borderRadius: 20, boxShadow: "0 2px 24px #0001", maxWidth: 480, width: "100%"
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 18 }}>
          DISC 溝通風格線上測驗
        </h1>
        {!showResult ? (
          <>
            <div style={{ fontSize: 18, marginBottom: 18 }}>題目 {step + 1} / {questions.length}</div>
            <div style={{ fontSize: 20, marginBottom: 28 }}>{questions[step].q}</div>
            <div>
              {questions[step].options.map((o, idx) => (
                <button
                  key={o}
                  onClick={() => handleChoose(idx)}
                  style={{
                    width: "100%", textAlign: "left", marginBottom: 14, padding: "12px 18px",
                    borderRadius: 12, border: "2px solid #e5e7eb", background: "#f1f5f9",
                    fontSize: 18, cursor: "pointer"
                  }}
                >
                  {String.fromCharCode(65 + idx)}. {o}
                </button>
              ))}
            </div>
          </>
        ) : (
          renderResult()
        )}
      </div>
    </div>
  );
}

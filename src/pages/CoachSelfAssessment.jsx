import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const questions = {
  A: {
    title: "지도형 코치 (Guidance-Oriented Coach)",
    color: "green",
    items: [
      "나는 팀원에게 명확한 목표와 기준을 설정해준다.",
      "팀원이 실수하거나 혼란스러워할 때, 내가 방향을 제시한다.",
      "나는 팀원들의 업무에 대해 자주 피드백을 제공한다.",
      "팀원들이 실행 단계에서 헤매지 않도록 구체적 방법을 알려준다.",
      "팀이 흔들릴 때 중심을 잡아주는 역할을 자처한다."
    ]
  },
  B: {
    title: "촉진형 코치 (Facilitation-Oriented Coach)",
    color: "yellow",
    items: [
      "나는 팀원들에게 스스로 해결할 수 있는 여지를 준다.",
      "내가 답을 주기보다는 질문을 던져 팀의 사고를 유도한다.",
      "팀원들의 생각을 경청하고, 그 안에서 해답을 찾게 돕는다.",
      "다양한 의견을 모으고 팀이 자체적으로 방향을 정하도록 유도한다.",
      "나는 회의나 토론에서 중재자 역할을 자주 한다."
    ]
  },
  C: {
    title: "고무형 코치 (Inspiration-Oriented Coach)",
    color: "blue",
    items: [
      "나는 팀원들에게 그들의 잠재력에 대한 믿음을 표현한다.",
      "나는 팀원들에게 더 큰 비전이나 목표를 보여주려 노력한다.",
      "나는 도전을 회피하기보다는 기회로 여기도록 격려한다.",
      "나는 팀원들이 스스로 성장하고 변화할 수 있도록 자극한다.",
      "나는 감정적으로 팀에 에너지와 방향성을 불어넣는다."
    ]
  }
};

const getInterpretation = (score) => {
  if (score >= 21) return "매우 강하게 사용하는 경향이 있습니다.";
  if (score >= 16) return "비교적 자주 사용하는 코칭 스타일입니다.";
  if (score >= 11) return "때때로 사용하는 수준입니다.";
  if (score >= 6) return "사용 빈도가 낮습니다. 보완이 필요할 수 있습니다.";
  return "거의 사용하지 않습니다. 상황별 활용 가능성을 검토하세요.";
};

export default function CoachSelfAssessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (section, index, value) => {
    const key = `${section}${index}`;
    setAnswers({ ...answers, [key]: Number(value) });
  };

  const calculateResults = () => {
    const scores = { A: 0, B: 0, C: 0 };
    Object.keys(answers).forEach((key) => {
      const section = key[0];
      scores[section] += answers[key];
    });
    return scores;
  };

  const results = calculateResults();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🧭 코치 유형 자가진단</h1>

      {!submitted && (
        <form className="space-y-6">
          {Object.entries(questions).map(([section, { title, items }]) => (
            <Card key={section} className="p-4">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              {items.map((q, i) => (
                <div key={`${section}${i}`} className="flex items-center gap-2 py-1">
                  <label className="flex-1">{q}</label>
                  <select
                    className="border rounded p-1"
                    onChange={(e) => handleChange(section, i, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>점수</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              ))}
            </Card>
          ))}
          <Button onClick={() => setSubmitted(true)} className="mt-4">
            진단 결과 보기
          </Button>
        </form>
      )}

      {submitted && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🧾 진단 결과</h2>
          {Object.entries(results).map(([section, score]) => (
            <Card key={section} className="p-4">
              <CardContent>
                <p className="font-semibold text-lg">{questions[section].title}</p>
                <p>평균 점수: {(score / 5).toFixed(2)}점 (총점: {score}점)</p>
                <p className="text-sm text-gray-600 mt-1">해석: {getInterpretation(score)}</p>
              </CardContent>
            </Card>
          ))}
          <Button onClick={() => window.location.reload()}>다시 진단하기</Button>
        </div>
      )}
    </div>
  );
}

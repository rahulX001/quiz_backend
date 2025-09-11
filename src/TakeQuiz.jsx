import React, { useEffect, useState, useRef } from "react";

export default function TakeQuiz({ quiz }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  const q = quiz.questions[index];

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [index]);

  function startTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(60);
    setShowAnswer(false);
    setSelected(null);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setShowAnswer(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  function handleSelect(op) {
    setSelected(op);
    setShowAnswer(true);
    clearInterval(timerRef.current);
  }

  function goNext() {
    if (index < quiz.questions.length - 1) {
      setIndex((i) => i + 1);
    }
  }

  function goPrev() {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  }

  return (
    <div
      style={{
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2>
        {quiz.title} — Question {index + 1} / {quiz.questions.length}
      </h2>

      <p style={{ fontSize: "1.2rem", margin: "10px 0" }}>{q.question}</p>

      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: 500 }}>
        {q.options.map((op, i) => {
          let bg = "#f0f0f0";
          if (showAnswer && selected === op) {
            bg = op === q.answer ? "lightgreen" : "salmon";
          } else if (showAnswer && op === q.answer) {
            bg = "lightgreen";
          }

          return (
            <li
              key={i}
              onClick={() => !showAnswer && handleSelect(op)}
              style={{
                margin: "8px 0",
                padding: "10px",
                border: "1px solid gray",
                borderRadius: 8,
                cursor: showAnswer ? "default" : "pointer",
                background: bg,
              }}
            >
             {op}
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 15, fontWeight: "bold" }}>
        ⏳ Timer: {timeLeft}s
      </div>

      {showAnswer && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid gray",
            borderRadius: 10,
            background: "#fafafa",
            width: "100%",
            maxWidth: 500,
            textAlign: "left",
          }}
        >
          <p>
            ✅ <strong>Correct Answer:</strong> {q.answer}
          </p>
          <p>
            💡 <strong>Explanation:</strong> {q.explanation}
          </p>
        </div>
      )}

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button
          onClick={goPrev}
          disabled={index === 0}
          style={{
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            background: index === 0 ? "#ccc" : "#007bff",
            color: "white",
            cursor: index === 0 ? "not-allowed" : "pointer",
          }}
        >
          ⬅ Prev
        </button>

        <button
          onClick={goNext}
          disabled={index === quiz.questions.length - 1}
          style={{
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            background:
              index === quiz.questions.length - 1 ? "#ccc" : "#28a745",
            color: "white",
            cursor:
              index === quiz.questions.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

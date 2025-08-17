import { useState } from "react";

function ToDoList() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState(""); // ✅ 검색어 상태

  const handleChange = (e) => setInputText(e.target.value);

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text) return;
    setList((prev) => [...prev, { text, completed: false }]);
    setInputText("");
  };

  const handleClick = handleSubmit;

  const handleDelete = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // ✅ Filter.jsx 와 동일한 로직(대소문자 무시 포함)
  const matchesQuery = (text) => {
    const q = query.trim().toLowerCase();
    return q ? text.toLowerCase().includes(q) : true;
  };

  return (
    <div>
      {/* 입력 + 추가 */}
      <div>
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={handleClick}>추가</button>
      </div>

      {/* ✅ 검색 입력창 */}
      <div style={{ marginTop: 8 }}>
        <input
          placeholder="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 목록 */}
      <div>
        <ul>
          {list.map((item, index) => {
            // ✅ 원본 인덱스를 유지하기 위해 map에서 조건부 렌더링
            if (!matchesQuery(item.text)) return null;

            return (
              <li
                key={index}
                onDoubleClick={() => handleDelete(index)}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "#888" : "inherit",
                  }}
                >
                  {item.text}
                </span>
                <button onClick={() => toggleCompleted(index)}>
                  {item.completed ? "미완료" : "완료"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;

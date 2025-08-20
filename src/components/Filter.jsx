import { useState } from "react";

function ToDoList() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => setInputText(e.target.value);

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text) return;
    setList((prev) => [...prev, { text, completed: false }]);
    setInputText(""); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

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

  
  const matchesQuery = (text) => {
    const q = inputText.trim().toLowerCase();
    return q ? text.toLowerCase().includes(q) : true;
  };

  return (
    <div>
      {}
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="입력/검색"
        />
        <button onClick={handleSubmit}>추가</button>
      </div>

      <div style={{ marginTop: 8 }}>
        <ul>
          {list.map((item, index) => {
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

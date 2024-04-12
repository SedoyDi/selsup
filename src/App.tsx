import { useState } from "react";

interface ParamProps {
  id: number;
  name: string;
  value: string;
  updateParamValue: (paramIdToUpdate: number, newValue: string) => void;
}
function Param({ id, value,
  updateParamValue, name }: ParamProps): JSX.Element {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  return (
    <li style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}>
      <label style={{ fontSize: "20px", fontWeight: "bold", minWidth: "150px" }}>{name}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            updateParamValue(id, inputValue);
          }
        }}
      />

    </li>

  );
}

function App(): JSX.Element {
  const params: { id: number; name: string }[] = [
    {
      id: 1,
      name: "Назначение",
    },
    {
      id: 2,
      name: "Длина",
    },
  ];
  const paramValues: { paramId: number, value: string }[] = [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ]
  const [paramsStore, setParamsStore] = useState(paramValues);

  const updateParamValue = (paramIdToUpdate: number, newValue: string) => {
    setParamsStore((params) =>
      params.map((param) =>
        param.paramId === paramIdToUpdate
          ? { ...param, value: newValue }
          : param
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        margin: "80px auto",
        padding: "20px",
        maxWidth: "800px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {paramsStore.map((param) => (
          <Param
            key={param.paramId}
            name={(params.find((p) => p.id === param.paramId) || { name: "" }).name}
            value={param.value}
            id={param.paramId}
            updateParamValue={updateParamValue}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
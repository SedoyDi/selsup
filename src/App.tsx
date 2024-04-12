import { useState } from "react";


interface ParamValueProps {
  paramId: number;
  value: string;
  updateParamValue: (paramIdToUpdate: number, newValue: string) => void;
}
interface ParamNameProps {
  name: string
}
// компонент имени изменяемого значения
function ParamName({ name }: ParamNameProps): JSX.Element {
  return (
    <li>
      <h2 style={{ margin: 0 }}>{name}</h2>
    </li>

  );
}

// компонент изменяемого значения
function ParamValue({
  paramId,
  value,
  updateParamValue,
}: ParamValueProps): JSX.Element {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <li>
      <input
        className="app__paramValue"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            updateParamValue(paramId, inputValue);
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

  const [paramValues, setParamValues] = useState([
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ]);

  const updateParamValue = (paramIdToUpdate: number, newValue: string) => {
    setParamValues((prevParamValues) =>
      prevParamValues.map((param) =>
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
          justifyContent: "end",
          gap: "8px",
        }}
      >
        {params.map((param) => (
          <ParamName key={param.id} name={param.name} />
        ))}
      </ul>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          marginBottom: "5px",
          gap: "13px",
        }}
      >
        {paramValues.map((paramValue) => (
          <ParamValue
            key={paramValue.paramId}
            paramId={paramValue.paramId}
            updateParamValue={updateParamValue}
            value={paramValue.value}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

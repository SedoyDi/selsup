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
            gap: "20px",
        }}>
            <h2 style={{ margin: 0, minWidth: "150px" }}>{name}</h2>
            <input
                className="app__paramValue"
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
    const params: { id: number; name: string, value: string }[] = [
        {
            id: 1,
            name: "Назначение",
            value: "повседневное",
        },
        {
            id: 2,
            name: "Длина",
            value: "макси",
        },
    ];

    const [paramsStore, setParamsStore] = useState(params);

    const updateParamValue = (paramIdToUpdate: number, newValue: string) => {
        setParamsStore((params) =>
            params.map((param) =>
                param.id === paramIdToUpdate
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
                        key={param.id}
                        name={param.name}
                        value={param.value}
                        id={param.id}
                        updateParamValue={updateParamValue}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
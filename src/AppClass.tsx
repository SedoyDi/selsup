import React, { Component } from 'react';

interface ParamProps {
    id: number;
    name: string;
    value: string;
    updateParamValue: (paramIdToUpdate: number, newValue: string) => void;
}
class Param extends Component<ParamProps> {
    state = {
        inputValue: this.props.value,
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value });
    };

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.props.updateParamValue(this.props.id, this.state.inputValue);
        }
    };

    render() {

        const { name } = this.props;
        const { inputValue } = this.state;

        return (
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label style={{ fontSize: "20px", fontWeight: "bold", minWidth: "150px" }}>{name}</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}

class App extends Component {
    state = {
        paramsStore: [
            {
                paramId: 1,
                value: "повседневное",
            },
            {
                paramId: 2,
                value: "макси",
            },
        ],
        params: [
            {
                id: 1,
                name: "Назначение",
            },
            {
                id: 2,
                name: "Длина",
            },
        ]
    };

    updateParamValue = (paramIdToUpdate: number, newValue: string) => {
        this.setState({
            paramsStore: this.state.paramsStore.map((param) => {
                if (param.paramId === paramIdToUpdate) {
                    return { ...param, value: newValue };
                }
                return param;
            })
        });
    };

    render() {
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
                    {this.state.paramsStore.map((param) => (
                        <Param
                            key={param.paramId}
                            name={
                                (this.state.params.find((p) => p.id === param.paramId) || { name: "" }).name
                            }
                            value={param.value}
                            id={param.paramId}
                            updateParamValue={this.updateParamValue}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
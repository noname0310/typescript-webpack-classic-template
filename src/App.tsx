import React from "react";
import { TodoList } from "./TodoList";

function randomString(length: number): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
}

// remove follow duplicate code

function useStringDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function useNumberDebounce(value: number, delay: number): number {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

interface StringListItem {
    id: number;
    value: string;
}
const veryLongList: StringListItem[] = Array.from({ length: 30000 }, (_, i) => ({
    id: i,
    value: randomString(30),
}));

interface NumberListItem {
    id: number;
    value: number;
}
const veryLongNumberList: NumberListItem[] = Array.from({ length: 30000 }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 1000),
}));

export function App(): JSX.Element {
    const [query, setQuery] = React.useState("");
    const debouncedQuery = useStringDebounce(query, 500);
    const filteredList = React.useMemo(() => {
        return veryLongList.filter((item) => item.value.toLowerCase().includes(debouncedQuery.toLowerCase()));
    }, [debouncedQuery]);

    const [numberQuery, setNumberQuery] = React.useState(0);
    const debouncedNumberQuery = useNumberDebounce(numberQuery, 500);
    const filteredNumberList = React.useMemo(() => {
        return veryLongNumberList.filter((item) => item.value.toString().includes(debouncedNumberQuery.toString()));
    }, [debouncedNumberQuery]);

    return (
        <div style={
            {
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "space-evenly",
                height: "100vh",
                padding: "20px",
            }
        }>
            <div style={{ width: "300px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: "100%" }}
                />
                <ul>
                    {filteredList.map((item) => (
                        <li key={item.id}>{item.value}</li>
                    ))}
                </ul>
            </div>
            <div style={{ width: "300px" }}>
                <input
                    type="number"
                    value={numberQuery}
                    onChange={(e) => setNumberQuery(Number(e.target.value))}
                    style={{ width: "100%" }}
                />
                <ul>
                    {filteredNumberList.map((item) => (
                        <li key={item.id}>{item.value}</li>
                    ))}
                </ul>
            </div>
            <TodoList />
        </div>
    );
}

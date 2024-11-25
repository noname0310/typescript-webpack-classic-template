import React from "react";

const enum TodoKind {
    Detailed,
    Simple,
}

const enum TodoStatus {
    Todo,
    Done,
}

interface TodoItem {
    id: number;
    name: string;
    kind: TodoKind;
    status: TodoStatus;
    description?: string;
    createdAt?: Date;
}

interface TodoCreationFormProps {
    onCreate: (todo: TodoItem) => void;
}

function TodoCreationForm(props: TodoCreationFormProps): JSX.Element {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (description === "") {
                    props.onCreate({
                        id: Math.floor(Math.random() * 1000),
                        name,
                        kind: TodoKind.Simple,
                        status: TodoStatus.Todo,
                    });
                    setName("");
                } else {
                    props.onCreate({
                        id: Math.floor(Math.random() * 1000),
                        name,
                        kind: TodoKind.Detailed,
                        status: TodoStatus.Todo,
                        description,
                        createdAt: new Date(),
                    });
                    setName("");
                    setDescription("");
                };
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
}

export function TodoList(): JSX.Element {
    const [todos, setTodos] = React.useState<TodoItem[]>([]);

    return (
        <div>
            <TodoCreationForm
                onCreate={(todo) => setTodos([...todos, todo])}
            />
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.status === TodoStatus.Done ? "line-through" : "none",
                            userSelect: "none",
                        }}
                        onClick={() => {
                            setTodos(todos.map((t) => t.id === todo.id
                                ? { ...t, status: t.status === TodoStatus.Done ? TodoStatus.Todo : TodoStatus.Done }
                                : t));
                        }
                    }>
                        <h3>{todo.name}</h3>
                        {todo.kind === TodoKind.Detailed && (
                            <>
                                {/* remove follow null assertion */}
                                <p>{todo.createdAt!.toLocaleTimeString()}</p>
                                <p>{todo.description}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

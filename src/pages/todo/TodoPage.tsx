import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { List } from "./components/List";
import { Title } from "./components/Title";
import { Todo } from "./components/Todo";
import { Trashcan } from "./components/Trashcan";
import { LISTS, TASKS } from "./utils/constants";
import { IItem, IList, ITask } from "./utils/types";
import { TextInputButton } from "../../components/TextInputButton";
import styled from "styled-components";

const StyledHeader = styled.div`
    input {
        background-color: white;
    }
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export function TodoPage() {
    const [lists, setLists] = useState<IList[]>(LISTS);
    const [tasks, setTasks] = useState<ITask[]>(TASKS);

    function handleCreateList(newList: string) {
        if (newList.trim() === "") {
            alert("New list names should not be empty");
            return;
        }

        setLists((lists) => [
            ...lists,
            { id: uuidv4(), name: newList, type: "List" },
        ]);
    }

    function handleCreateTask(name: string, listId: string) {
        if (name.trim() !== "") {
            setTasks((tasks) => [
                ...tasks,
                {
                    listId,
                    name,
                    id: uuidv4(),
                    type: "Task",
                },
            ]);
        }
    }

    function handleMoveTask(droppedTask: ITask, destinationListId: string) {
        setTasks((tasks) => [
            ...tasks.filter((task) => task.id !== droppedTask.id),
            {
                ...droppedTask,
                listId: destinationListId,
            },
        ]);
    }

    function handleDeleteItem(item: IItem) {
        if (item.type === "List") {
            setLists((lists) => [
                ...lists.filter((list) => list.id !== item.id),
            ]);
        } else if (item.type === "Task") {
            setTasks((tasks) => [
                ...tasks.filter((task) => task.id !== item.id),
            ]);
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <StyledHeader>
                <Title />
                <TextInputButton
                    label="Create List"
                    onConfirm={(newlist) => handleCreateList(newlist)}
                />
            </StyledHeader>
            <Trashcan handleDeleteItem={handleDeleteItem} />
            <div className="lists-grid" style={{ margin: "50px" }}>
                {lists.map((list) => (
                    <List
                        key={list.id}
                        list={list}
                        handleCreateTask={handleCreateTask}
                        handleMoveTask={handleMoveTask}
                    >
                        {tasks
                            .filter((task) => task.listId === list.id)
                            .map((task) => (
                                <div className="task-and-hr" key={task.id}>
                                    <Todo task={task} />
                                    <hr />
                                </div>
                            ))}
                    </List>
                ))}
            </div>
        </DndProvider>
    );
}

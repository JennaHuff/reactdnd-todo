import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { AddList } from "./components/Forms";
import { List } from "./components/List";
import { Title } from "./components/Title";
import { Todo } from "./components/Todo";
import { Trashcan } from "./components/Trashcan";
import { ITask } from "./utils/types";

export function TodoPage() {
    const [lists, setLists] = useState([
        "To do",
        "Completed",
        "Throw Me Away Too!",
    ]);

    const [tasks, setTasks] = useState<ITask[]>([
        { list: "To do", name: "Drag me to another list", id: uuidv4() },
        { list: "To do", name: "Throw me away", id: uuidv4() },
    ]);

    function handleCreateList(newList: string, cleanFunction: () => void) {
        if (newList.trim() === "") {
            alert("New list names should not be empty");
            return;
        }

        if (lists.includes(newList)) {
            alert("This list already exists");
            return;
        }

        setLists((lists) => [...lists, newList]);
        cleanFunction();
    }

    function handleCreateTask(newItem: string, list: string) {
        if (newItem.trim() !== "") {
            setTasks((tasks) => [
                ...tasks,
                {
                    list: list,
                    name: newItem,
                    id: uuidv4(),
                },
            ]);
        }
    }

    function handleDropTask(droppedTask: ITask, destinationList: string) {
        setTasks((tasks) => [
            ...tasks.filter((task) => task.id !== droppedTask.id),
            {
                list: destinationList,
                name: droppedTask.name,
                id: uuidv4(),
            },
        ]);
    }

    function handleDeleteTask(taskToDelete: ITask) {
        setTasks((tasks) => [
            ...tasks.filter((task) => task.id !== taskToDelete.id),
        ]);
    }

    function handleDeleteList(listToDelete: string) {
        setLists((lists) => [...lists.filter((list) => list !== listToDelete)]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Trashcan
                handleDeleteTask={handleDeleteTask}
                handleDeleteList={handleDeleteList}
            />
            <Title />
            <AddList handleCreateList={handleCreateList}></AddList>
            <div className="lists-grid">
                {lists.map((list) => (
                    <List
                        key={uuidv4()}
                        thisList={list}
                        handleCreateTask={handleCreateTask}
                        handleDropTask={handleDropTask}
                    >
                        {tasks
                            .filter((task) => task.list === list)
                            .map((task) => (
                                <>
                                    <Todo key={task.id} task={task} />
                                    <hr key={uuidv4()} />
                                </>
                            ))}
                    </List>
                ))}
            </div>
        </DndProvider>
    );
}

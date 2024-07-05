import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { ITodo } from "../../lib/types";
import { text } from "../../lang";
import { TodoCheckedIcon, TodoIcon } from "../icons";
import { cn } from "../../lib/utils";
import Chip from "../chip";
import Modal from "../modal";
import { GripVertical, Plus } from "lucide-react";

type Inputs = { todoBody: string };
type TodosProps = {
  items: ITodo[];
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setItems: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

export default function Todos({
  items,
  setItems,
  todos,
  setTodos,
}: TodosProps) {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [todoModal, setTodoModal] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ todoBody }) => {
    if (todoBody) {
      const newTodo: ITodo = { id: uuidv4(), todoBody, isCompleted: false };
      if (todos.length === 0) {
        setTodos([newTodo]);
      } else {
        setTodos([...todos, newTodo]);
      }
      reset();
      setTodoModal(false);
    }
  };

  const handleClose = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      setTodos(todos.filter((el) => el.id !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (confirm(`${text.delete[language]}?`) === true) {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      setTodos(filteredTodos);
    }
  };

  return (
    <section>
      {todoModal && (
        <Modal setOpen={setTodoModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("todoBody", { required: true })}
              placeholder={text.todo[language]}
              autoComplete="off"
              spellCheck={"false"}
              className="bg-transparent text-lg"
              onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
              autoFocus
            />

            <div className="mt-4 flex justify-end gap-2 items-center">
              {todos.filter((todo) => todo.isCompleted).length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="btn bg-app-red/10 text-app-red"
                >
                  {text.addCompletedTodos[language]}
                </button>
              )}
              <button type="submit" className="btn w-20 bg-app-blue/20">
                OK
              </button>
            </div>
          </form>

          {todos.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn("", todo.isCompleted && "opacity-80 grayscale")}
                >
                  <Chip
                    id={todo.id}
                    label={todo.todoBody}
                    onClose={handleClose}
                  />
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      <>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col px-5"
        >
          {items.map((todo) => (
            <TodoItem key={todo.id} todo={todo} items={items} />
          ))}
        </Reorder.Group>

        <button
          onClick={() => setTodoModal(true)}
          className={cn(
            "ml-5 h-[40px] min-w-14 pl-3 pr-5 flex gap-3 items-center justify-center rounded-2xl select-none bg-app-blue/15 text-lg",
            todos.length > 0 && "mt-5"
          )}
        >
          <Plus />
          {text.addTodo[language]}
        </button>
      </>
    </section>
  );
}

type TodoItemProps = {
  todo: ITodo;
  items: ITodo[];
};

function TodoItem({ items, todo }: TodoItemProps) {
  const controls = useDragControls();
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [isSelected, setIsSelected] = useState(todo.isCompleted);

  const handleChange = (todoId: string) => {
    setIsSelected(!isSelected);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  return (
    <Reorder.Item
      key={todo.id}
      value={todo}
      onDragEnd={() => setTodos(items)}
      dragListener={false}
      dragControls={controls}
      className="h-[48px] -ml-px flex items-center justify-between text-lg touch-none select-none relative"
    >
      <div className="flex items-center gap-3">
        <button className="z-10" onClick={() => handleChange(todo.id)}>
          {todo.isCompleted ? <TodoCheckedIcon /> : <TodoIcon />}
        </button>

        <span
          className={cn(
            "z-10",
            todo.isCompleted ? "line-through text-app-gray-200" : ""
          )}
        >
          {todo.todoBody}
        </span>

        <div className="h-[24px] bg-gradient-to-t from-white via-white to-transparent absolute top-0 w-full z-0" />
        <div className="h-[24px] bg-gradient-to-b from-white via-white to-transparent absolute top-1/2 w-full z-0" />
      </div>
      <div
        onPointerDown={(e) => controls.start(e)}
        className="-mr-5 h-[48px] w-[48px] flex items-center justify-center z-10"
      >
        <GripVertical className="cursor-grab active:cursor-grabbing" />
      </div>
    </Reorder.Item>
  );
}

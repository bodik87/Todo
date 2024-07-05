import { Link } from "react-router-dom";
import { SettingsIcon } from "../components/icons";
import Todos from "../components/home-page/todos";
import Snippets from "../components/home-page/snippets";
import Progress from "../components/progress";
import { useLocalStorage } from "usehooks-ts";
import { ITodo } from "../lib/types";
import { useEffect, useState } from "react";

const BLUE = "#1368C4";
// const GRAY = "#989B9E";

export default function HomePage() {
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [todos]);
  const itemsLength = todos.length;
  const completedItemsLength = todos.filter((el) => el.isCompleted).length;
  const percentage = Math.round((completedItemsLength / itemsLength) * 100);
  return (
    <section className="max-w-md w-full mx-auto flex flex-col min-h-dvh pt-3 pb-6">
      <div className="p-5 h-[40px] mb-4 w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <Progress
            percentage={itemsLength === 0 ? 0 : percentage}
            bgColor={BLUE}
            accentColor="white"
            size={14}
            padding={2}
          />
          <b className="text-2xl text-app-blue">TODO</b>
        </div>

        <div className="flex items-center gap-2">
          <Snippets />
          <Link
            className="h-[40px] min-w-14 -mr-5 px-3.5 flex gap-2 items-center justify-center rounded-2xl select-none"
            to={"/user"}
          >
            <SettingsIcon />
          </Link>
        </div>
      </div>

      <Todos
        items={items}
        setItems={setItems}
        todos={todos}
        setTodos={setTodos}
      />
    </section>
  );
}

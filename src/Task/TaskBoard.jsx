/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn react such that i can treat it like my slave and make it do whatever i want to do",
    tags: ["web", "react", "python"],
    priority: "High",
    isFavourite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false); //ekta component show hbe ki hbe na seita state er moddhe rekhe update kora uchit
  const [taskToUpdate, setTaskToUpdate] = useState(null); //task list thke jei task ta update korte hbe seita k ei state er moddhe rekhe modal k pathano hoyche
  function handleAddEditTask(newTask, isAdd) {
    //newTask ta holo submit button click kore naton jei task ta add kori
    if (isAdd) {
      setTasks([...tasks, newTask]); //eita execute hbe jdi naton kico add kori,jdi edit kori tahole else e jabe
    } else {
      //eita tkhn e kaj hobe jokhn existing tasks er proti ta task.id er sthe click kora newTask.id ta mile jay
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask; //existing task.id er sthe naton add kora id er sthe jdi mile tkhn setTask kore dibo naton task ta ke.
          }
          return task; //na hole setTask hobe ager task ta
        })
      );
    }
    setShowAddModal(false);
  }
  function handleEditTask(task) {
    setTaskToUpdate(task); //edit button click korar pore data gula state e set kore jeno modal a pathate pari ajno
    setShowAddModal(true); // eita pore aslo karon holo age data ta state e save hobe then modal open hbe edit er smoy
  }
  function handleCloseClick() {
    setShowAddModal(false); //modal ta jeno close hoye jay
    setTaskToUpdate(null); //type korar pore jdi save na kore close kore dei tahole jeno next add/edit e ager gula na ase
  }
  function handleDelete(id) {
    const taskAfterDelete = tasks.filter((task) => task.id != id);
    setTasks(taskAfterDelete);
  }
  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }
  function handleFav(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavourite = !newTasks[taskIndex].isFavourite;
    setTasks(newTasks);
  }
  function handleSearch(searchTerm) {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  }
  return (
    <>
      <section className="mb-20" id="tasks">
        <div className="container">
          {showAddModal && (
            <AddTaskModal
              taskToUpdate={taskToUpdate}
              onCloseClick={handleCloseClick}
              onSave={handleAddEditTask}
            />
          )}
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearch} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onDeleteAll={handleDeleteAll}
              onAddClick={() => setShowAddModal(true)}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDelete}
                onFav={handleFav}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

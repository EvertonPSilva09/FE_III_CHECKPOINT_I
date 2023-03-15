import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");

  const [todoList, setTodoList] = useState([]);

  function addTask(event) {
    event.preventDefault();

    if (title === "" || category === "" || date === "" || description === "") {
      alert("Preencha todas as informações");
      return;
    }

    if (id) {
      const copyListTasksString = JSON.stringify(todoList);

      const copyListTasks = JSON.parse(copyListTasksString);

      const indexPosition = copyListTasks.findIndex((item) => item.id === id);

      copyListTasks[indexPosition].title = title;
      copyListTasks[indexPosition].category = category;
      copyListTasks[indexPosition].date = date;
      copyListTasks[indexPosition].description = description;

      setTodoList(copyListTasks);
    } else {
      setTodoList([
        ...todoList,
        {
          id: Date.now(),
          title: title,
          category: category,
          date: date,
          description: description,
        },
      ]);
    }
    setTitle("");
    setCategory("");
    setDate("");
    setDescription("");
    setId("");
  }

  function deleteTask(id) {
    if (confirm("Deseja realmente apagar a tarefa?")) {
      const result = todoList.filter((item) => item.id !== id);
      setTodoList(result);
    }
  }

  function fillFields(item) {
    setTitle(item.title);
    setCategory(item.category);
    setDate(item.date);
    setDescription(item.description);
    setId(item.id);
  }

  return (
    <div className="app">
      <div className="container">
        <div className="container_form">
          <form className="form" onSubmit={addTask}>
            <p className="title">Cadastrar Tarefa</p>
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Titulo"
            />
            <br />
            <br />
            <select
              name=""
              id=""
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Categoria</option>
              <option value="Atividade Física">Atividade Física</option>
              <option value="Trabalhar">Trabalhar</option>
              <option value="Estudar">Estudar</option>
              <option value="Lazer">Lazer</option>
              <option value="Outros">Outros</option>
            </select>
            <br />
            <br />
            <input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Data"
            />
            <br />
            <br />
            <input
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrição"
            />
            <p className="save">
              <input type="submit" value={id ? "Salvar" : "Nova tarefa"} />
            </p>
          </form>
        </div>
      </div>
      <div className="myTasks">
        <div className="container_spans">
          <h3 className="first-line">Minhas tarefas</h3>
          <span>Total: {todoList.length} tarefas</span>
        </div>
        {todoList.length > 0 ? (
          <div className="container_tasks">
            
            <ul>
              {todoList.map((item) => (
                <li key={item.id}>
                  <p>{item.title}</p>
                  <p>{item.category}</p>
                  <p>{item.date}</p>
                  <p>{item.description}</p>
                  <button onClick={() => deleteTask(item.id)}>Apagar</button>
                  <button onClick={() => fillFields(item)}>Editar</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Nenhuma tarefa cadastrada</p>
        )}
      </div>
    </div>
  );
}

export default App;

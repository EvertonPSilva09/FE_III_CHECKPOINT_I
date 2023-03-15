import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");

  const [todoList, setTodoList] = useState([]);

  const converteData = (data) => {
    const ano = data.slice(0, 4);
    const mes = data.slice(5, 7);
    const dia = data.slice(8, 10);
    const formatada = dia + "/" + mes + "/" + ano;
    return formatada;
  };

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
            {title == "" ? <small>Campo obrigatório</small> : ""}
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
      <div className="container_tasks">
        <div className="container_spans">
          <h3 className="first-line">Minhas tarefas</h3>
          <span>
            Total:{" "}
            {todoList.length == 1
              ? todoList.length + " tarefa"
              : todoList.length + " tarefas"}
          </span>
        </div>
        {todoList.length > 0 ? (
          <div className="container_task">
            <ul>
              {todoList.map((item) => (
                <li key={item.id}>
                  <div className="container_border">
                    <div className="container_title_date">
                      <p className="title">{item.title}</p>
                      <p>{converteData(item.date)}</p>
                    </div>
                    <p>{item.category}</p>
                    <div className="container_buttons_tasks">
                      <p>{item.description}</p>
                      <div className="container_buttons">
                        <button onClick={() => fillFields(item)}>
                          <img src="https://cdn-icons-png.flaticon.com/512/6492/6492748.png"></img>
                        </button>
                        <button onClick={() => deleteTask(item.id)}>
                          <img src="https://cdn-icons-png.flaticon.com/512/3363/3363974.png"></img>
                        </button>
                      </div>
                    </div>
                  </div>
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

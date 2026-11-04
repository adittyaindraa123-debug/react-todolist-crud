import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { PlusLg, Search } from "react-bootstrap-icons";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { ...task, id: Date.now(), createdAt: new Date().toISOString() },
    ]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "All" || t.status === filterStatus) &&
      (filterPriority === "All" || t.priority === filterPriority),
  );

  const count = (s) => tasks.filter((t) => t.status === s).length;

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
      <Container className="py-5" style={{ maxWidth: 820 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="fw-bold m-0">Task List</h1>
          <Button
            variant="primary"
            className="rounded-3"
            onClick={handleShowForm}
          >
            <PlusLg className="me-1" /> Add Task
          </Button>
        </div>

        <div className="mb-3 d-flex gap-2 flex-wrap">
          <Badge bg="secondary">To Do: {count("To Do")}</Badge>
          <Badge bg="warning" text="dark">
            In Progress: {count("In Progress")}
          </Badge>
          <Badge bg="success">Done: {count("Done")}</Badge>
        </div>

        <Row className="g-2 mb-4">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Cari tugas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Semua Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">Semua Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Col>
        </Row>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />

        {showForm && (
          <TaskForm
            handleClose={handleCloseForm}
            addTask={addTask}
            editTask={editTask}
            taskToEdit={taskToEdit}
          />
        )}
      </Container>
    </div>
  );
}

export default App;

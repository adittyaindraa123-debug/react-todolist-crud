import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const emptyTask = { name: "", priority: "Medium", status: "To Do" };

const TaskForm = ({ handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState(taskToEdit ?? emptyTask);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name.trim()) return;

    if (taskToEdit) {
      editTask(task);
    } else {
      addTask(task);
    }
    handleClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="taskForm" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Masukkan nama kegiatan..."
              value={task.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="taskForm">
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;

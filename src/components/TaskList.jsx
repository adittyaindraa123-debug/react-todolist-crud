import { Badge, Button, Card } from "react-bootstrap";
import {
  PencilSquare,
  Trash,
  Circle,
  CircleHalf,
  CheckCircleFill,
  Clock,
} from "react-bootstrap-icons";

const priorityBadge = {
  High: { bg: "danger", text: "white" },
  Medium: { bg: "warning", text: "dark" },
  Low: { bg: "success", text: "white" },
};

const statusIcon = (status) => {
  if (status === "Done")
    return <CheckCircleFill size={22} className="text-success" title="Done" />;
  if (status === "In Progress")
    return (
      <CircleHalf size={22} className="text-warning" title="In Progress" />
    );
  return <Circle size={22} className="text-secondary" title="To Do" />;
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-muted py-5">
        Belum ada tugas. Klik "Add Task" untuk menambahkan.
      </p>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <Card className="mb-3 shadow-sm border-0 rounded-4" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div style={{ minWidth: 180, flex: 1 }}>
              <small className="text-muted">Task</small>
              <div
                className={`fw-semibold ${task.status === "Done" ? "text-decoration-line-through text-muted" : ""}`}
              >
                {task.name}
              </div>
              <small className="text-muted d-flex align-items-center gap-1 mt-1">
                <Clock size={12} /> {formatDate(task.createdAt)}
              </small>
            </div>

            <div>
              <small className="text-muted d-block">Priority</small>
              <Badge
                bg={priorityBadge[task.priority].bg}
                text={priorityBadge[task.priority].text}
              >
                {task.priority}
              </Badge>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Badge bg="light" text="dark" className="border">
                {task.status}
              </Badge>
              {statusIcon(task.status)}
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => showEditForm(task)}
                aria-label="Edit"
              >
                <PencilSquare />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete"
              >
                <Trash />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;

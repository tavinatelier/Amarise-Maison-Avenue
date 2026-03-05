/**
 * TASK BOARD — Admin task assignment and workflow management
 * BACKEND HANDOFF: Replace localStorage with task management API
 */

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ClipboardList, Calendar, User, Search } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import tasksData from "@/data/mock/tasks.json";
import teamData from "@/data/mock/team.json";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedUser: string;
  assignedUserName: string;
  deadline: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  category: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "amarise-tasks";

function loadTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return tasksData.tasks as Task[];
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const addAudit = useAdminStore((s) => s.addAudit);

  // New task form
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [newCategory, setNewCategory] = useState("product_listing");

  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
    addAudit("Task status updated", "Tasks", `${id} → ${status}`);
  };

  const createTask = () => {
    if (!newTitle || !newAssignee) return;
    const member = teamData.members.find((m) => m.id === newAssignee);
    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      assignedUser: newAssignee,
      assignedUserName: member ? `${member.firstName} ${member.lastName}` : "Unassigned",
      deadline: newDeadline || new Date(Date.now() + 7 * 86400000).toISOString(),
      status: "pending",
      priority: newPriority,
      category: newCategory,
      createdBy: "user_001",
      createdByName: "Founder",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    addAudit("Task created", "Tasks", task.title);
    setNewTitle(""); setNewDesc(""); setNewAssignee(""); setNewDeadline("");
    setDialogOpen(false);
  };

  const filtered = tasks.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusVariant = (s: string): "default" | "success" | "warning" | "info" => {
    if (s === "completed") return "success";
    if (s === "in_progress") return "info";
    if (s === "pending") return "warning";
    return "default";
  };

  const priorityColor = (p: string) => {
    if (p === "high") return "text-red-600";
    if (p === "medium") return "text-amber-600";
    return "text-muted-foreground";
  };

  const columns: { key: Task["status"]; label: string }[] = [
    { key: "pending", label: "To Do" },
    { key: "in_progress", label: "In Progress" },
    { key: "completed", label: "Done" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Task Board</h1>
            <p className="text-muted-foreground mt-1">{tasks.filter((t) => t.status !== "completed").length} open tasks</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> New Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Task</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="Task title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <Textarea placeholder="Description" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                <Select value={newAssignee} onValueChange={setNewAssignee}>
                  <SelectTrigger><SelectValue placeholder="Assign to..." /></SelectTrigger>
                  <SelectContent>
                    {teamData.members.filter((m) => m.status === "active").map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.firstName} {m.lastName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newPriority} onValueChange={(v) => setNewPriority(v as Task["priority"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {tasksData.categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input type="date" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
                <Button onClick={createTask} className="w-full">Create Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.key} className="space-y-3">
              <h3 className="text-sm font-medium tracking-wider uppercase text-muted-foreground border-b border-border pb-2">
                {col.label} ({filtered.filter((t) => t.status === col.key).length})
              </h3>
              <div className="space-y-3">
                {filtered.filter((t) => t.status === col.key).map((task) => (
                  <div key={task.id} className="border border-border rounded-sm p-4 bg-card hover:bg-muted/30 transition-colors space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
                      <span className={`text-xs font-medium uppercase ${priorityColor(task.priority)}`}>{task.priority}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" /> {task.assignedUserName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {new Date(task.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2 pt-1">
                      {col.key === "pending" && (
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateTaskStatus(task.id, "in_progress")}>Start</Button>
                      )}
                      {col.key === "in_progress" && (
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateTaskStatus(task.id, "completed")}>Complete</Button>
                      )}
                      {col.key !== "completed" && (
                        <Button size="sm" variant="ghost" className="text-xs h-7 text-muted-foreground" onClick={() => updateTaskStatus(task.id, "cancelled")}>Cancel</Button>
                      )}
                    </div>
                  </div>
                ))}
                {filtered.filter((t) => t.status === col.key).length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground border border-dashed border-border rounded-sm">
                    <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    No tasks
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

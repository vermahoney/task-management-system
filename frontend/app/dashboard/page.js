'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { clearToken, getToken } from '../../lib/auth';

const initialFormState = {
  title: '',
  description: '',
  status: 'pending',
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = useMemo(() => getToken(), []);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [router, token]);

  useEffect(() => {
    if (!token) return;
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (editingTaskId) {
        const response = await api.put(`/tasks/${editingTaskId}`, formState);
        setTasks((prev) => prev.map((task) => (task._id === editingTaskId ? response.data.task : task)));
        setMessage('Task updated successfully.');
      } else {
        const response = await api.post('/tasks', formState);
        setTasks((prev) => [response.data.task, ...prev]);
        setMessage('Task created successfully.');
      }
      setFormState(initialFormState);
      setEditingTaskId(null);
    } catch (err) {
      setError(err?.response?.data?.message || 'Task action failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setFormState({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pending',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setMessage('Task deleted successfully.');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
    <main className="container py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage your tasks and stay on track.</p>
        </div>
        <button type="button" onClick={handleLogout} className="button-secondary w-full max-w-xs lg:w-auto">
          Logout
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">{editingTaskId ? 'Edit Task' : 'Create Task'}</h2>
            {editingTaskId && (
              <button
                type="button"
                onClick={() => {
                  setEditingTaskId(null);
                  setFormState(initialFormState);
                  setMessage('');
                  setError('');
                }}
                className="button-secondary text-sm"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <input
                value={formState.title}
                onChange={(event) => handleChange('title', event.target.value)}
                className="input"
                placeholder="Task title"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={formState.description}
                onChange={(event) => handleChange('description', event.target.value)}
                className="input min-h-[120px] resize-none"
                placeholder="Task description"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select
                value={formState.status}
                onChange={(event) => handleChange('status', event.target.value)}
                className="input"
                required
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-slate-700">{message}</p>}
            <button type="submit" className="button w-full" disabled={loading}>
              {loading ? 'Saving...' : editingTaskId ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <span className="text-sm text-slate-500">{tasks.length} tasks</span>
          </div>

          <div className="mt-6 space-y-4">
            {loading && tasks.length === 0 ? (
              <p className="text-sm text-slate-500">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-slate-500">No tasks found. Create one to get started.</p>
            ) : (
              tasks.map((task) => (
                <article key={task._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{task.description}</p>
                    </div>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                      {task.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(task)}
                      className="button-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(task._id)}
                      className="button text-sm bg-rose-600 hover:bg-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

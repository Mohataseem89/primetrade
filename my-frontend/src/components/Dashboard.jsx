import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  User, 
  LogOut,
  Calendar,
  Target,
  Activity,
  TrendingUp,
  X,
  Save
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    }
  };

  const loadStats = async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data.data || {});
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask(newTask);
      setNewTask({ title: '', description: '', priority: 'medium', status: 'pending' });
      setShowCreateForm(false);
      loadTasks();
      loadStats();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await taskAPI.updateTask(taskId, updates);
      loadTasks();
      loadStats();
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        loadTasks();
        loadStats();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      low: '🟢',
      medium: '🟡',
      high: '🟠',
      urgent: '🔴'
    };
    return icons[priority] || '🟡';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      'in-progress': '⚡',
      completed: '✅',
      cancelled: '❌'
    };
    return icons[status] || '⏳';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-500/20 text-green-300 border-green-400/30',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      high: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      urgent: 'bg-red-500/20 text-red-300 border-red-400/30'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-500/20 text-gray-300 border-gray-400/30',
      'in-progress': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      completed: 'bg-green-500/20 text-green-300 border-green-400/30',
      cancelled: 'bg-red-500/20 text-red-300 border-red-400/30'
    };
    return colors[status] || colors.pending;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 text-center">
          <div className="animate-spin text-6xl mb-4">⚡</div>
          <div className="text-white text-2xl">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Task Dashboard</h1>
                <p className="text-white/70">Manage your tasks efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 border border-white/20">
                <User className="w-5 h-5 text-white/80" />
                <div className="text-right">
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-white/60 text-sm">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-white">{stats.byStatus?.['in-progress'] || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.byStatus?.completed || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Overdue</p>
                <p className="text-3xl font-bold text-white">{stats.overdue || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-gray-800">All Status</option>
                  <option value="pending" className="bg-gray-800">Pending</option>
                  <option value="in-progress" className="bg-gray-800">In Progress</option>
                  <option value="completed" className="bg-gray-800">Completed</option>
                  <option value="cancelled" className="bg-gray-800">Cancelled</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-gray-800">All Priority</option>
                  <option value="low" className="bg-gray-800">Low</option>
                  <option value="medium" className="bg-gray-800">Medium</option>
                  <option value="high" className="bg-gray-800">High</option>
                  <option value="urgent" className="bg-gray-800">Urgent</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Task
            </button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
              <p className="text-white/70 mb-6">Create your first task to get started!</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              >
                ✨ Create Your First Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task._id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">{getStatusIcon(task.status)}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{task.title}</h3>
                        <p className="text-white/70">{task.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)} {task.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/20">
                        📅 {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTask(task._id, { status: e.target.value })}
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="pending" className="bg-gray-800">⏳ Pending</option>
                      <option value="in-progress" className="bg-gray-800">⚡ In Progress</option>
                      <option value="completed" className="bg-gray-800">✅ Completed</option>
                      <option value="cancelled" className="bg-gray-800">❌ Cancelled</option>
                    </select>
                    
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 p-2 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Create Task Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">✨ Create New Task</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-white/80 font-medium mb-2">📝 Task Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                  placeholder="What needs to be done?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-2">📄 Description</label>
                <textarea
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                  placeholder="Describe the task details..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-2">🎯 Priority</label>
                <select
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all appearance-none cursor-pointer"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="low" className="bg-gray-800">🟢 Low Priority</option>
                  <option value="medium" className="bg-gray-800">🟡 Medium Priority</option>
                  <option value="high" className="bg-gray-800">🟠 High Priority</option>
                  <option value="urgent" className="bg-gray-800">🔴 Urgent</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

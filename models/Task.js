const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  tasks: [mongoose.Schema.Types.Mixed],
  showHelp: Boolean,
  showQuickHelp: Boolean,
  showToday: Boolean,
  darkMode: Boolean,
  sawTheInput: Boolean,
  taskVisibility: {
    done: Boolean,
    flagged: Boolean,
    wait: Boolean,
    wip: Boolean,
  },
  history: mongoose.Schema.Types.Mixed,
  showSettings: Boolean,
  settings: {
    hintPopup: Boolean,
    stickyInput: Boolean,
    autoDarkMode: Boolean,
  },
  showCustomCSS: Boolean,
  customCSS: String,
  showArchived: Boolean,
  userWantToLogin: Boolean,
  authToken: String,
  userName: String,
  userId: String,
  severUrl: String,
  filterBy: String,
  lastSync: Number,
});

module.exports = mongoose.model('task', TaskSchema)
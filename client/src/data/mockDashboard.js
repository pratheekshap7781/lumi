// Mock data representing what an ACTIVE user's dashboard would show,
// once Learning Path generation exists. Not used by default — see the
// `hasLearningData` flag in Dashboard.jsx. Shaped to resemble real
// future MongoDB documents so swapping this for a real API call later
// should only mean changing where these values come from, not how the
// components consume them.

export const currentLearningPath = {
  id: "dsa",
  title: "Data Structures & Algorithms",
  currentTopic: "Binary Search Trees",
  progress: 72,
  topicsCompleted: 12,
  totalTopics: 16,
};

export const learningPaths = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Arrays, trees, graphs, and the algorithms that run on them.",
    progress: 72,
    topicsCompleted: 12,
    totalTopics: 16,
    lastStudied: "Today",
    icon: "code",
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Processes, scheduling, memory management, and file systems.",
    progress: 48,
    topicsCompleted: 8,
    totalTopics: 17,
    lastStudied: "Yesterday",
    icon: "cpu",
  },
  {
    id: "toc",
    title: "Theory of Computation",
    description: "Automata, formal languages, and computability.",
    progress: 30,
    topicsCompleted: 5,
    totalTopics: 17,
    lastStudied: "2 days ago",
    icon: "network",
  },
];

export const overallStats = {
  topicsCompleted: 24,
  quizzesCompleted: 12,
  studyTimeMinutes: 260,
  overallProgress: 68,
};

export const recentActivity = [
  { id: 1, type: "completed", text: 'Completed "Binary Search Trees"', time: "Today" },
  { id: 2, type: "quiz", text: 'Scored 8/10 on "OS Processes Quiz"', time: "Yesterday" },
  { id: 3, type: "started", text: 'Started "Theory of Computation"', time: "2 days ago" },
  { id: 4, type: "completed", text: 'Completed "Arrays & Strings"', time: "3 days ago" },
];

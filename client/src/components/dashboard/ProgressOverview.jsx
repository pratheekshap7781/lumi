import { Layers, HelpCircle, Clock, TrendingUp } from "lucide-react";
import CircularProgress from "./CircularProgress";
import { formatStudyTime } from "../../utils/formatStudyTime";

// `stats` always has real numeric values — for a brand-new user that
// means zeros, which is the honest, correct thing to show (not a
// separate "empty" message). This shape is ready to be filled from a
// real API response later without changing how the cards render.
export default function ProgressOverview({ stats }) {
  return (
    <section>
      <h2 className="font-semibold mb-3">Your Progress</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Layers} tint="#4C6FFF" label="Topics" value={stats.topicsCompleted} sub="Completed" />
        <StatCard icon={HelpCircle} tint="#4C6FFF" label="Quizzes" value={stats.quizzesCompleted} sub="Completed" />
        <StatCard
          icon={Clock}
          tint="#2FBF88"
          label="Study Time"
          value={formatStudyTime(stats.studyTimeMinutes)}
          sub="This Month"
        />

        <div
          className="rounded-xl border p-4 flex items-center justify-between gap-3"
          style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#F5A62322" }}
              >
                <TrendingUp size={16} style={{ color: "#F5A623" }} />
              </div>
              <span className="text-sm font-medium truncate">Overall Progress</span>
            </div>
            <div>
              <p className="text-xl font-semibold">{stats.overallProgress}%</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Completed
              </p>
            </div>
          </div>
          <CircularProgress percent={stats.overallProgress} size={44} strokeWidth={5} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, tint, label, value, sub }) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col gap-3"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${tint}22` }}
        >
          <Icon size={16} style={{ color: tint }} />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

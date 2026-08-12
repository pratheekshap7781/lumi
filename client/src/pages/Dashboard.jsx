import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import LumiHero from "../components/dashboard/LumiHero";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import CurrentPath from "../components/dashboard/CurrentPath";
import LearningPathsPreview from "../components/dashboard/LearningPathsPreview";
import UploadCard from "../components/dashboard/UploadCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import Footer from "../components/dashboard/Footer";
import { materialsApi } from "../utils/api";
import { currentLearningPath, learningPaths, overallStats, recentActivity } from "../data/mockDashboard";

// A brand-new student has no real learning data, so every stat here
// defaults to an honest zero rather than a hidden "no data" message.
const EMPTY_STATS = { topicsCompleted: 0, quizzesCompleted: 0, studyTimeMinutes: 0, overallProgress: 0 };

// ---------------------------------------------------------------------
// This flag controls mock ("active user") content vs. the real empty
// state. It defaults to false because no Learning Path feature exists
// yet to produce real data — a fresh signup should never see fake
// progress.
//
// TODO (future stage): once Learning Paths are generated and stored in
// MongoDB, replace this with a real check, e.g.:
//   const hasLearningData = learningPaths.length > 0;
// where `learningPaths` comes from an API call instead of mock data.
// ---------------------------------------------------------------------
const hasLearningData = false;

export default function Dashboard() {
  const { user } = useAuth();
  const [latestMaterial, setLatestMaterial] = useState(null);

  // Materials are real (not mock) — fetched regardless of hasLearningData,
  // since a student can have uploaded a file without a path existing yet.
  useEffect(() => {
    materialsApi
      .list()
      .then((data) => setLatestMaterial(data.materials[0] || null))
      .catch(() => setLatestMaterial(null));
  }, []);

  const stats = hasLearningData ? overallStats : EMPTY_STATS;
  const activePath = hasLearningData ? currentLearningPath : null;
  const paths = hasLearningData ? learningPaths : [];
  const activity = hasLearningData ? recentActivity : [];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-10">
        <LumiHero userName={user?.name} hasLearningData={hasLearningData} />
        <ProgressOverview stats={stats} />
        <CurrentPath path={activePath} latestMaterial={activePath ? null : latestMaterial} />
        <LearningPathsPreview paths={paths} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UploadCard />
          <RecentActivity activity={activity} />
        </div>

        <Footer />
      </div>
    </DashboardLayout>
  );
}

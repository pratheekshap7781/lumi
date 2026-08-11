import TopNav from "./TopNav";

// Wraps every authenticated page that should show the top navigation.
// The background is a few very soft, blurred color pools rather than a
// flat fill — subtle enough to stay out of the way of the content.
export default function DashboardLayout({ children }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-bg)",
        backgroundImage: `
          radial-gradient(600px circle at 8% -10%, var(--color-blob-1) 0%, transparent 60%),
          radial-gradient(500px circle at 92% 8%, var(--color-blob-2) 0%, transparent 55%),
          radial-gradient(650px circle at 50% 110%, var(--color-blob-3) 0%, transparent 60%)
        `,
        backgroundAttachment: "fixed",
        color: "var(--color-text)",
      }}
    >
      <TopNav />
      <main>{children}</main>
    </div>
  );
}

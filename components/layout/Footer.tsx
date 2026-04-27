import ViewCounter from "@/components/ui/ViewCounter";

export default function Footer() {
  return (
    <footer className="border-t border-(--border) py-8">
      <div className="flex flex-col items-center gap-6">
        <ViewCounter />
        <p className="text-center text-sm text-(--text-sub) font-body">
          © 2026 김지헌. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

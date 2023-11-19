import { LogTable } from "./_components/log-table";

export default async function Home() {
  return (
    <div className="h-full w-full flex justify-center">
      <LogTable />
    </div>
  );
}

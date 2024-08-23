import Badges from "../ui/badges/badges";
import LastActivities from "../ui/badges/last-activities";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center py-5">
      <LastActivities />
      <Badges />
    </div>
  );
}

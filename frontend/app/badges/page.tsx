import Badges from "../../components/badges/badges";
import LastActivities from "../../components/badges/last-activities";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center py-5">
      <LastActivities />
      <Badges />
    </div>
  );
}

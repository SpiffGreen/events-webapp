import { useParams } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import { useQuery } from "@tanstack/react-query";

function EventPage() {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["eventData-" + id],
    queryFn: () =>
      fetch(
        `https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events/${id}`
      ).then((res) => res.json()),
  });
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg grow border min-w-[300px] h-fit">
        {isPending && <p className="p-4">Loading...</p>}
        {error && <p className="p-4">Error: {error.message}</p>}
        {data && (
          <div className="p-4">
            <h3>{data.title}</h3>
            <p className="text-sm font-light">
              {data.description.slice(0, 60)}
            </p>
            <p className="text-sm font-light">
              {data.location} | {data?.date} | {data?.time}
            </p>

            <p
              className={`text-xs my-2 ${
                data?.petsAllowed ? "text-[#474bff]" : "text-gray-500"
              }`}
            >
              {data?.petsAllowed ? "Pets allowed" : "No pets allowed"}
            </p>

            <p className="font-lgith text-sm">Organized By {data?.organizer}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default EventPage;

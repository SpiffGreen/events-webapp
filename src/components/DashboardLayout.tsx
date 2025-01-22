import { IoIosSearch } from "react-icons/io";
import Nav from "../components/Nav";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { PropsWithChildren, useState } from "react";

interface EventItem {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

const EventCard: React.FC<EventItem> = ({
  id,
  title,
  description,
  location,
  date,
  petsAllowed,
}) => {
  return (
    <Link
      to={`/events/${id}`}
      className="event-card bg-white px-4 py-2 rounded-lg border"
    >
      <h3>{title}</h3>
      <p className="text-sm font-light">{description.slice(0, 60)}</p>
      <p className="text-sm font-light">
        {location} | {date}
      </p>
      <p
        className={`text-xs mt-1 ${
          petsAllowed ? "text-[#474bff]" : "text-gray-500"
        }`}
      >
        {petsAllowed ? "Pets allowed" : "No pets allowed"}
      </p>
    </Link>
  );
};

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["eventsData"],
    queryFn: () =>
      fetch(
        "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events"
      ).then((res) => res.json()),
  });

  const [search, setSearch] = useState("");
  const [petsAllowed, setPetsAllowed] = useState("Any");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav section */}
      <Nav />

      {/* Mini hero section */}
      <section className="relative min-h-[120px] overflow-hidden bg-[#474bff] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <div className="z-10 md:static absolute">
            <h2 className="text-2xl">Find events near you.</h2>
            <p className="font-light">
              Looking for events? Browse our list of upcoming events
            </p>
          </div>
          <div className="pattern absolute -z-0 top-0 right-0 rotate-6 rounded-full w-[400px] h-[400px]"></div>
        </div>
      </section>

      {/* Search and filter section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap gap-4">
          <div className="search-input flex items-center gap-1 border border-gray-300 rounded px-2 py-1 focus-within:border-[#474bff]">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search events..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm min-w-[250px]"
            />
          </div>
          <div className="search-input border border-gray-300 rounded px-2 py-1 focus-within:border-[#474bff]">
            <span className="absolute text-sm mt-[3.5px] text-gray-500">
              Pets Allowed:
            </span>

            <select
              onChange={(e) => setPetsAllowed(e.target.value)}
              className="w-full pl-[5.5rem] text-sm outline-none cursor-pointer"
            >
              <option value="Any">Any</option>
              <option value="Allowed">Allowed</option>
              <option value="Not Allowed">Not Allowed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Display */}
      <main className="bg-gray-100 grow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex gap-4">
          <div className="max-w-[350px]">
            <div className="top">
              <p>Available events</p>
              <p className="font-light text-gray-600 text-sm">
                {data?.length} events available
              </p>
            </div>

            <div className="event-cards flex flex-col gap-2 mt-5">
              {isPending && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {data &&
                data
                  ?.filter((data: EventItem) => {
                    if (search === "") {
                      return data;
                    } else if (
                      data.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return data;
                    }
                  })
                  ?.filter((data: EventItem) => {
                    if (petsAllowed === "Any") {
                      return data;
                    } else if (petsAllowed === "Allowed") {
                      return data.petsAllowed === true;
                    } else if (petsAllowed === "Not Allowed") {
                      return data.petsAllowed === false;
                    }
                  })
                  .map((event: EventItem) => (
                    <EventCard key={event.id} {...event} />
                  ))}
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

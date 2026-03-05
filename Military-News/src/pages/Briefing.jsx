import { useState, useEffect } from "react";
import axios from "axios";
import { Map, Flag } from "lucide-react";

const Briefing = () => {
  const [criticalMissions, setCriticalMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/missions");
        const crits = response.data.filter((m) => m.priority === "Critical");
        setCriticalMissions(crits);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-military-700 border-t-military-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-military-300 gap-6">
      <div className="flex justify-center mb-2">
        <Flag className="text-military-400" size={48} />
      </div>
      <h1 className="text-4xl font-stencil uppercase text-center text-military-100">
        Tactical Briefing
      </h1>

      {criticalMissions.length === 0 ? (
        <div className="bg-military-900 border border-military-600 p-6 rounded-sm text-center">
          <p className="font-mono text-military-400">
            NO CRITICAL DIRECTIVES ACTIVE
          </p>
        </div>
      ) : (
        criticalMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-military-900 border border-military-600 p-6 rounded-sm relative overflow-hidden mb-4"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>

            <h2 className="text-xl font-bold font-mono text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Map size={24} /> {mission.name}
            </h2>

            <p className="font-mono text-sm leading-relaxed mb-4">
              COMMAND DIRECTIVE {mission.mission_id}. All units attached to this
              operation maintain heightened alert status.
            </p>
            <div className="bg-military-950 p-4 border border-military-700">
              <p className="font-mono text-xs text-red-500 font-bold tracking-widest">
                OBJECTIVE: {mission.target}
              </p>
              <p className="font-mono text-xs text-military-400 mt-2">
                ESTIMATED LAUNCH: {mission.date}
              </p>
              <p className="font-mono text-xs text-yellow-500 mt-2">
                STATUS: {mission.status}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Briefing;

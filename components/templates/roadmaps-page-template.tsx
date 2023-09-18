"use client";

import { fetchRoadmaps } from "@/lib/fetchers";
import { Roadmap } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import RoadmapList from "../roadmaps/roadmap-list";
import NoRoadmaps from "../roadmaps/no-roadmaps";

interface RoadmapsPageTemplateProps {
  mentorRoadmaps: Roadmap[];
  menteeRoadmaps: Roadmap[];
  userId: string;
}

export default function RoadmapsPageTemplate({
  mentorRoadmaps,
  menteeRoadmaps,
  userId,
}: RoadmapsPageTemplateProps) {
  const roadmapsQueryKey = ["roadmaps", userId];
  const { data } = useQuery({
    queryKey: roadmapsQueryKey,
    queryFn: fetchRoadmaps,
    initialData: { mentorRoadmaps, menteeRoadmaps },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const noRoadmaps =
    !data?.menteeRoadmaps?.length && !data?.mentorRoadmaps?.length;

  if (noRoadmaps) {
    return <NoRoadmaps />;
  }

  return (
    <div className="lg:flex lg:items-start lg:gap-x-4">
      <RoadmapList type="mentor" roadmaps={data?.mentorRoadmaps} />
      <RoadmapList type="mentee" roadmaps={data?.menteeRoadmaps} />
    </div>
  );
}

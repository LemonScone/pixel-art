import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useFetchArtworksQuery } from "../store";

import GalleryListItem from "../components/GalleryListItem";
import Skeleton from "../components/common/Skeleton";
import GalleryModal from "../components/GalleryModal";
import { Artwork } from "../types/Project";

const Gallery = () => {
  const { data, error, isLoading } = useFetchArtworksQuery();

  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const [project, setProject] = useState<Artwork>({} as Artwork);

  let content;
  if (isLoading) {
    content = (
      <Skeleton
        className="mb-4 flex h-60 w-64 flex-col rounded-lg bg-input-color"
        times={6}
      />
    );
  } else if (error) {
    content = <div>Error loading artworks</div>;
  } else if (data) {
    if (data.length) {
      content = data.map((project) => {
        return (
          <GalleryListItem
            key={project.id}
            project={project}
            onClick={() => {
              setParams({ ...params, modal: "true" });
              setModalOpen(true);
              setProject(project);
            }}
          />
        );
      });
    } else {
      content = <div>No artworks found.</div>;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="masonry sm:masonry-sm md:masonry-md p-10">{content}</div>
      <GalleryModal
        project={project}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Gallery;

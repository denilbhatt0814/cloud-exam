import { IGallery } from "@/models/gallery.model";
import React from "react";
import { Button } from "./ui/button";

const ImageCard = ({ g }: { g: IGallery }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <img
        alt="Image 1"
        className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
        height={300}
        src={g.image}
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button size="sm" variant="outline">
          View
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;

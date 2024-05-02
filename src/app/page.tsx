/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pBGpLJMzeYY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  Drawer,
} from "@/components/ui/drawer";
import ImageCard from "@/components/ImageCard";
import { dbConnect } from "@/lib/dbConnect";
import Gallery from "@/models/gallery.model";
import { PlusIcon } from "lucide-react";

export default async function Component() {
  await dbConnect();
  const galleries = await Gallery.find({});

  return (
    <>
      <div className="grid grid-cols-[240px_1fr] gap-6 p-6 lg:p-10">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Functions</h2>
            <nav className="grid gap-2">
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors bg-green-500 hover:bg-green700"
                href="/upload"
              >
                <div className="flex items-center justify-center">
                  <PlusIcon className="h-3 w-3" />
                  Add new Image
                </div>
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Image Gallery</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Browse through our collection of stunning images.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleries.map((g) => {
              return <ImageCard key={g.id} g={g} />;
            })}
          </div>
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="fixed bottom-4 right-4 z-50">
            <Button size="icon" variant="outline">
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Image Preview</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4">
            <img
              alt="Image Preview"
              className="mx-auto max-h-[80vh] w-full rounded-lg object-contain"
              height={800}
              src="/placeholder.svg"
              style={{
                aspectRatio: "1200/800",
                objectFit: "cover",
              }}
              width={1200}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

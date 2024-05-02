"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Component() {
  const router = useRouter();
  const [image, setImage] = useState<any>({});
  const [form, setForm] = useState<any>({});
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    try {
      const formData = new FormData();

      if (image) {
        formData.append("image", image);
      }

      const repsonse = await axios.post("/api/img-upload", formData);
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Upload an Image
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Select an image file to upload.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label
              className="block mb-1 text-gray-700 dark:text-gray-300"
              htmlFor="image"
            >
              Image
            </Label>
            <Input
              accept="image/*"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:border-primary"
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <Button className="w-full" type="submit">
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
}

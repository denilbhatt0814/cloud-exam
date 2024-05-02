import { dbConnect } from "@/lib/dbConnect";
import { uploadToS3 } from "@/lib/utils";
import Gallery from "@/models/gallery.model";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const formData = await request.formData();
    console.log(formData);

    const imgFile = formData.get("image") as unknown as File;

    const g = new Gallery();

    if (imgFile) {
      const convertedBuffer = await sharp(await imgFile.arrayBuffer())
        .toFormat("webp")
        .toBuffer();

      let result: any = await uploadToS3(
        "denil-exam",
        g._id + ".webp",
        convertedBuffer
      );

      g.image = result.object_url;
    }
    await g.save();

    return NextResponse.json({ gallery: g }, { status: 201 });
  } catch (error: any) {
    console.log("Error creating image: ", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return Response.json({ message: "running" });
}

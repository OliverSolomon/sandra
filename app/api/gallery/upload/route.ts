import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || "anonymous";

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type))
      return NextResponse.json({ error: "Only JPEG, PNG, or WebP are allowed." }, { status: 400 });

    if (file.size > 10 * 1024 * 1024)
      return NextResponse.json({ error: "File too large. Max 10 MB." }, { status: 400 });

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-photos")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("gallery-photos").getPublicUrl(fileName);

    const { data: galleryImage, error: dbError } = await supabase
      .from("gallery_images")
      .insert({ storage_path: fileName, public_url: urlData.publicUrl, alt_text: file.name })
      .select()
      .single();

    if (dbError) console.error("DB insert error:", dbError);

    return NextResponse.json({ success: true, path: fileName, url: urlData.publicUrl, id: galleryImage?.id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId: userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  linkImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      // This code RUNS ON YOUR SERVER after upload
    }),
  messageFile: f(["image", "pdf"])  // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
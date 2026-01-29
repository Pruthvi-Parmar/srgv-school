import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from campus facilities, labs and events at SRVM, Ninat.",
};

// Main gallery images
const mainGallery = [
  { src: "/gallery/main-building.jpeg", title: "School Campus" },
  { src: "/gallery/banner.jpeg", title: "School Banner" },
  { src: "/gallery/playground.jpeg", title: "Playground" },
  { src: "/gallery/basketball.jpeg", title: "Basketball Court" },
  { src: "/gallery/language-lab.jpeg", title: "Language Lab" },
  { src: "/gallery/computer-lab.jpeg", title: "Computer Lab" },
  { src: "/gallery/maths-lab.jpeg", title: "Maths Lab" },
  { src: "/gallery/physics-lab.jpeg", title: "Physics Lab" },
  { src: "/gallery/chemistry-lab.jpeg", title: "Chemistry Lab" },
  { src: "/gallery/bio-lab.jpeg", title: "Biology Lab" },
  { src: "/gallery/sports-lab.jpeg", title: "Sports Lab" },
  { src: "/gallery/library.jpeg", title: "Library" },
  { src: "/gallery/admission.jpeg", title: "Admissions 2026–27" },
];

// Additional images from additinal_images folder (45 images)
const additionalImages = [
  "05c07628-7b3e-49d8-b040-af103810e5e4.JPG",
  "0627bf50-1704-4eb0-bcfa-b46b32787f3a.JPG",
  "06778b91-1ba2-4745-ba1e-3006b81f76b4.JPG",
  "09036113-0540-45a5-bfcc-ea394479048e.JPG",
  "0b06821c-2ca6-4126-b66d-223428385a7c.JPG",
  "0ffd78da-2027-433e-9013-9379abea03d9.JPG",
  "10cab918-8362-45f3-9395-40de25fc3dad.JPG",
  "165d8314-bd1a-4bf3-b719-57a958d08097.JPG",
  "1f10924b-9b32-4319-ad40-7217c94d286c.JPG",
  "24a657c4-4ea9-4d1d-bc3e-8b1a71e6461a.JPG",
  "24b03537-2105-479b-83c7-0ba394edbcf9.JPG",
  "3326b923-246e-4a3a-839f-0146c27c1bd3.JPG",
  "35013d9b-e4be-4f3c-8b8d-e61a410a156e.JPG",
  "417168c6-4ec1-401d-aa88-319ae39e2e1d.JPG",
  "4803438b-dae8-4ae8-9f4e-0a8e33dc4024.JPG",
  "49949260-e8ae-42f0-83c3-89bd85cef543.JPG",
  "4a8e8384-ea47-446a-9d1a-644dfa52e581.JPG",
  "4fd076eb-397a-45bb-9f08-5185a111df8a.JPG",
  "58b905b4-ae9b-47a0-9b64-469f956efeed.JPG",
  "6300d5ea-f444-44d7-9c2a-48d4db991905.JPG",
  "65a9b5ae-f3bf-4c51-9cc3-1bb1e928fd7e.JPG",
  "70d44a3c-36ce-424d-9f33-277cc647a3f0.JPG",
  "773abb10-2f67-4576-a04c-f1c199df4890.JPG",
  "798f8580-6e65-49af-bfb9-705f049a9490.JPG",
  "7b94dfa1-30dc-4eeb-9c43-ae812b97f096.JPG",
  "81adf763-d617-4729-bec5-6810f30e39fa.JPG",
  "836add70-122d-4957-92bd-d9389df22f12.JPG",
  "842fc792-0ab2-4e83-846b-177450dafec4.JPG",
  "89525357-0adc-4073-8014-251533c79e48.JPG",
  "8cd28a6b-a985-46a0-8d34-de9015d9f5fb.JPG",
  "901a361e-26ad-4e0e-931e-03762bbb818b.JPG",
  "945c3030-8e41-4580-a1da-f6ff7913c3f5.JPG",
  "951f3e34-dce2-4173-bc0d-8d1c5aec3e8f.JPG",
  "9f69fab1-d87a-4496-bc56-fb128d177dbb.JPG",
  "ab5fb22b-7d8b-40c0-acd3-c812473fb34b.JPG",
  "accde1ab-aa9b-4bcb-9da6-8a7d888177d3.JPG",
  "b1786b60-fbf4-49b9-bace-8235c2b8cc01.JPG",
  "b1a042ac-e555-4b4b-b531-e43ca9ff2598.JPG",
  "b46f479d-6779-4802-b4e3-064323932cfb.JPG",
  "bbe30ae1-eb33-43aa-bcef-069af2b86362.JPG",
  "c61d19e7-a7f4-4e54-b032-85affd7a2fa4.JPG",
  "cb75a7ff-032e-4a69-8e9c-05c3c74c03ab.JPG",
  "ece1d24a-5224-40b3-b635-e5a5e0053616.JPG",
  "ee9dae3e-7c9c-4b94-be1c-09d98026344a.JPG",
  "f76d81de-a7e4-4aea-a0e6-adfda6cb5cba.JPG",
].map((filename) => ({
  src: `/additinal_images/${filename}`,
  title: `Campus Photo ${filename.split("-")[0]}`,
}));

const gallery = [...mainGallery, ...additionalImages];

export default function GalleryPage() {
  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Gallery</h1>
          <p className="mt-3 text-sm text-slate-600">
            Glimpses of our campus, classrooms, laboratories, sports facilities and student life.
          </p>
        </div>
      </div>

      <GalleryGrid items={gallery} />
    </div>
  );
}



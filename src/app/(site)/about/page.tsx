import type { Metadata } from "next";
import { TeachersSection } from "@/components/TeachersSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our school's vision, messages, values and journey.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">About Us</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Founded in 2008, Shri Radha Govind Vidya Mandir stands as a symbol of quality education, strong
          values, and all-round student development. Established under the vision of our respected founder,
          Late Shri Govindbhai Maganji Patel, the institution was built with the aim of providing meaningful
          education to children of rural areas.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Message from Management</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Dear Students, Parents and Teachers,
              <br />
              <br />
              We welcome you to another promising academic year at “Shri Radhagovind Vidyamandir, Ninat”. We
              are committed to provide a nurturing safe environment where students can grow intellectually,
              emotionally and culturally.
              <br />
              <br />
              Education is a journey of curiosity and discovery and we encourage our students to embrace
              learning with enthusiasm and determination. We motivate students to remove stage fear and
              parallelly to showcase their ability in sports. Our result reflects both in education and
              sports.
              <br />
              <br />
              Parents, your support and collaboration play a vital role in shaping the future of our
              students under the guidance of our principal and experienced staff.
              <br />
              <br />
              Our school was founded by our late chairman “Shri Govindbhai Makanji Patel” with the intent to
              provide English medium CBSE school education to the children of rural areas. His motto was
              “Quality education at an Affordable fees” and we are committed to it.
              <br />
              <br />
              Let us work together to foster a culture of discipline, respect and lifelong learning. May
              this year also be filled with achievements, growth and success for all!
              <br />
              <br />
              JAI SHRI KRISHNA
              <br />
              “SHRI RADHAGOVIND EDUCATION AND CHARITABLE TRUST”
            </p>
          </section>

          <section id="principal" className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Message from the Principal</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              It is rightly said that “The whole purpose of education is to teach a child to think and not
              what to think.” Shree Radhagovind Vidyamandir is a symbol of progressive and quality education.
              It has always been the endeavour of the school to instill right values in its students so that
              they develop a holistic personality and can meet the future challenges.
              <br />
              <br />
              Our motto “We build the citizens of tomorrow” captures the essence of our spirit. In our
              school, children gain an all-round education and achieve their potential not just in academics
              but also in sports and creative arts.
              <br />
              <br />
              We strive to instill core values of Respect, Integrity, Compassion and Excellence, supported
              by dedicated and qualified staff who stand as role models for our students.
              <br />
              <br />
              We welcome every parent&apos;s interest in all aspects of our educational progress.
            </p>
          </section>

          <TeachersSection />
        </div>
      </div>
    </div>
  );
}




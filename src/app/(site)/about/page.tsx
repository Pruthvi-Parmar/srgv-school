import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SRVM, Ninat — our journey, campus, facilities and commitment.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">About Us</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Founded in 2008, Shri Radha Govind Vidya Mandir stands as a symbol of quality education, strong
          values, and all-round student development. Established under the vision of our respected founder,
          Late Shri Govindbhai Makanji Patel, the institution was built with the noble aim of providing
          meaningful education that shapes not only intelligent minds but also responsible human beings.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Over the years, the school has grown into a vibrant educational campus where learning is combined
          with discipline, culture, innovation, and personal growth.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">A Campus Designed for Growth</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Our school is built on a spacious and well-developed campus that provides an ideal environment
              for learning and development. The atmosphere encourages students to explore their talents,
              build confidence, and grow in a safe and inspiring setting.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Our Commitment</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We are committed to nurturing knowledgeable, confident, and value-driven individuals who are
              prepared to succeed in life. Shri Radha Govind Vidya Mandir continues to carry forward the
              vision of its founder by providing an education that balances knowledge, culture, discipline,
              and modern learning.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Academic & Learning Facilities</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We believe strong concepts create strong futures. To support practical and experiential
              learning, the school is equipped with well-maintained laboratories, including:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              <li>Physics Laboratory</li>
              <li>Chemistry Laboratory</li>
              <li>Biology Laboratory</li>
              <li>Computer Laboratory</li>
              <li>Mathematics Lab</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              These facilities help students move beyond theoretical learning and gain real-world
              understanding.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Beyond Academics – Holistic Development</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              At Shri Radha Govind Vidya Mandir, education extends beyond the classroom. We offer a variety
              of skill-enhancing and creative activities such as:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              <li>Dance</li>
              <li>Karate</li>
              <li>Music</li>
              <li>Skating</li>
              <li>Phonics</li>
              <li>Abacus</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              These programs help students develop confidence, coordination, creativity, and mental
              sharpness.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Sports & Physical Development</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Physical fitness is an essential part of our education system. The school provides:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              <li>A dedicated Basketball Court</li>
              <li>A large playground area for sports and outdoor activities</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We encourage teamwork, sportsmanship, and healthy competition.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Facilities for Comfort & Safety</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              To ensure convenience and security for students, the school offers:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              <li>Transportation Facility</li>
              <li>Hostel Facility</li>
              <li>A safe, disciplined, and well-managed environment</li>
            </ul>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Discipline is one of the core strengths of our institution. Students are guided to develop
              respect, responsibility, and strong moral character alongside academic success.
            </p>
          </section>
        </div>

        <div className="mt-10 space-y-4">
          <details id="management" className="group rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-4">
                <span>Message from Management</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] group-open:hidden">View</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] hidden group-open:inline">Hide</span>
              </div>
              <p className="mt-2 text-sm font-normal text-slate-600">
                Click to read the message from &quot;Shri Radhagovind Education and Charitable Trust&quot;.
              </p>
            </summary>
            <div className="mt-4 text-sm leading-7 text-slate-600">
              <p>
                Dear Students, Parents and Teachers.
                <br />
                <br />
                We welcome to another promising academic year! at &quot;Shri Radhagovind Vidyamandir, NINAT&quot;. We are
                committed to provide a nurturing safe environment where students can grow intellectually,
                emotionally and culturally.
                <br />
                <br />
                Education is a journey of curiosity and discovery and we encourage our students to embrace
                learning with enthusiasm and determination. We motivate students to remove stage fear and
                parallelly to showcase their ability in sports. Our result reflects both in Education and
                Sports.
                <br />
                <br />
                Parents your support and collaboration play a vital role in shaping the future of our
                students under the guidance of our principal and most stable and experienced staff.
                <br />
                <br />
                As our school was founded by our late chairman &quot;Shri Govindbhai Makanji Patel&quot; with the intense
                to provide English medium CBSE school Education to the children of rural areas was established
                in 2008. His moto was &quot;Quality education at an Affordable fees&quot; and we are committed to it.
                <br />
                <br />
                Let us work together to foster a culture of discipline, respect and lifelong learning. May
                this year also be filled with Achievements, Growth and Sucess for all!
                <br />
                <br />
                JAI SHRI KRISHNA
                <br />
                &quot;SHRI RADHAGOVIND EDUCATION AND CHARITABLE TRUST&quot;
              </p>
            </div>
          </details>

          <details id="principal" className="group rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-4">
                <span>Message from the Principal</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] group-open:hidden">View</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] hidden group-open:inline">Hide</span>
              </div>
              <p className="mt-2 text-sm font-normal text-slate-600">Click to read the Principal&apos;s message.</p>
            </summary>
            <div className="mt-4 text-sm leading-7 text-slate-600">
              <p>
                It is rightly said that &quot;The whole purpose of education is to teach to child to think and not
                what to think?&quot; Shree Radhagovind Vidyamandir is a symbol of progressive and quality education.
                It has always been the endeavour of the school to instill right values in its students so that
                they develop a holistic personality and can meet the future challenges.
                <br />
                <br />
                Our motto &quot;We build the citizens of tomorrow&quot; captures the essence of our sprit. In our school
                the children will gain an all round education and achieve their potential not just in the
                academic field but also in the field of sports and creative arts.
                <br />
                <br />
                We have set out an elevating and stimulative journey with an aim of providing our children an
                exclusive learning through exploration and experimentation with a plethora of extra curricular
                activities. We help students in developing their logical, analytical and creative skills. We
                also strive to instill the core values of Respect, Integrity, compassion and Excellence in our
                students so that they can meet ever changing global challenges.
                <br />
                <br />
                Our dedicated and highly qualified staff who are committed for the welfare of our children,
                stand an exemplary role models for our students.
                <br />
                <br />
                Our aim importantly is to make education a funfilled, enjoyable, learning and growing
                experience on the solid foundation of values. We believe to create an environment were
                students look eagerly forward to come to school.
                <br />
                <br />
                We welcome every parent&apos;s interest in all aspects of our educational progress.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

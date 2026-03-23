const skills = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "HTML",
  "CSS",
  "Git"
];

export default function Skills() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <h2 className="text-4xl text-center mb-10">Skills</h2>

      <div className="grid md:grid-cols-4 gap-6 px-10">
        {skills.map((skill,i)=>(
          <div
          key={i}
          className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
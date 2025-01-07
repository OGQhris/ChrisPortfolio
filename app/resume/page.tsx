export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-8">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Chris Marvel</h1>
            <p className="text-lg text-gray-600">Student & Aspiring Developer</p>
          </div>

          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
            <div className="ml-4">
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900">Blue Valley High School</h3>
                <p className="text-gray-600">Expected Graduation: 2025</p>
                <p className="text-gray-600">GPA: 4.0</p>
              </div>
            </div>
          </section>

          {/* Activities & Leadership Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Activities & Leadership</h2>
            <div className="ml-4">
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900">Drum Major</h3>
                <p className="text-gray-600">Blue Valley High School Marching Band</p>
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  <li>Lead and conduct the marching band during performances</li>
                  <li>Coordinate with section leaders to ensure quality performances</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-900">Tennis Team</h3>
                <p className="text-gray-600">Varsity Tennis Player</p>
                <ul className="list-disc ml-6 mt-2 text-gray-600">
                  <li>Compete in varsity tennis matches and tournaments</li>
                  <li>Practice leadership and teamwork skills</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technical Skills</h2>
            <div className="ml-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Programming Languages</h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>JavaScript/TypeScript</li>
                    <li>HTML/CSS</li>
                    <li>Python</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Technologies</h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>Tailwind CSS</li>
                    <li>Git</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
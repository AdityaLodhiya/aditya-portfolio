import SectionHeader from '../components/ui/SectionHeader'

// ============================================
// CONTACT LINKS — EDIT THESE VALUES
// ============================================
const contactInfo = {
  email: "adityalodhiya111@gmail.com",
  github: "https://github.com/AdityaLodhiya",
  linkedin: "https://www.linkedin.com/in/aditya-lodhiya",
  resume: "https://drive.google.com/file/d/1O3npZpZbKhJO7_YTSP5-yGbCoh78j9tw/view?usp=sharing"
};

const isConfigured = (value) => value && !value.includes("YOUR_");

function ContactLink({ label, value, type }) {
  const configured = isConfigured(value);

  if (!configured) {
    return (
      <div className="mb-6 last:mb-0">
        <div className="font-mono text-[10px] tracking-widest text-[#737373] uppercase mb-1">
          {label}
        </div>
        <div className="font-mono text-sm text-[#444] italic">
          Not configured
        </div>
      </div>
    );
  }

  const href = type === 'email'
    ? `mailto:${value}`
    : (value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`);
  const isExternal = type !== 'email';
  const displayValue = type === 'resume'
    ? 'View Resume →'
    : value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <div className="mb-6 last:mb-0">
      <div className="font-mono text-[10px] tracking-widest text-[#737373] uppercase mb-1">
        {label}
      </div>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="font-mono text-sm text-[#e5e5e5] hover:text-[#00ff9d] transition-colors"
      >
        {displayValue}
      </a>
    </div>
  );
}

export default function Contact() {
  const mailtoHref = isConfigured(contactInfo.email)
    ? `mailto:${contactInfo.email}`
    : "#";

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        <SectionHeader
          number={6}
          title="CONTACT"
          description="Looking for opportunities to learn, build, and contribute."
        />

        {/* Main Layout */}
        <div className="mt-14 border border-[#222] p-8 sm:p-12 relative">
          {/* subtle corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#555] -mt-px -ml-px" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#555] -mt-px -mr-px" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#555] -mb-px -ml-px" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#555] -mb-px -mr-px" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

            {/* Left side */}
            <div>
              <h2 className="font-mono text-[11px] tracking-[0.15em] text-[#e5e5e5] uppercase mb-6">
                LET'S CONNECT
              </h2>
              <div className="space-y-5 text-[#a3a3a3] text-sm leading-relaxed">
                <p>
                  I'm a Computer Science student focused on building practical software across full-stack development, data, machine learning, and backend systems.
                </p>
                <p>
                  I'm currently looking for internship opportunities where I can learn from real engineering teams, contribute to meaningful projects, and strengthen my problem-solving skills.
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="md:pl-12">
              <h2 className="font-mono text-[11px] tracking-[0.15em] text-[#e5e5e5] uppercase mb-6 md:opacity-0 hidden md:block select-none">
                CONTACT
              </h2>
              <div className="flex flex-col">
                <ContactLink label="EMAIL" value={contactInfo.email} type="email" />
                <ContactLink label="GITHUB" value={contactInfo.github} type="link" />
                <ContactLink label="LINKEDIN" value={contactInfo.linkedin} type="link" />
                <ContactLink label="RESUME" value={contactInfo.resume} type="resume" />
              </div>
            </div>

          </div>
        </div>

        {/* Currently section */}
        <div className="mt-20">
          <h2 className="font-mono text-[10px] tracking-[0.18em] text-[#737373] uppercase mb-8">
            CURRENTLY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-[#555]">01</span>
                <h3 className="font-mono text-[11px] tracking-widest text-[#e5e5e5] uppercase">
                  LOOKING FOR
                </h3>
              </div>
              <div className="text-[#a3a3a3] text-sm leading-relaxed pl-7">
                Software / Data / ML internships
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-[#555]">02</span>
                <h3 className="font-mono text-[11px] tracking-widest text-[#e5e5e5] uppercase">
                  LEARNING
                </h3>
              </div>
              <div className="text-[#a3a3a3] text-sm leading-relaxed pl-7">
                DSA · Java · Full Stack · Python · Machine Learning
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-[#555]">03</span>
                <h3 className="font-mono text-[11px] tracking-widest text-[#e5e5e5] uppercase">
                  INTERESTED IN
                </h3>
              </div>
              <div className="text-[#a3a3a3] text-sm leading-relaxed pl-7">
                Backend systems · Data · ML · Full Stack development
              </div>
            </div>
          </div>
        </div>

        <div className="my-20 border-t border-[#1a1a1a]" />

        {/* CTA */}
        <div className="max-w-2xl">
          <h2 className="font-mono text-[11px] tracking-[0.15em] text-[#e5e5e5] uppercase mb-4">
            HAVE SOMETHING INTERESTING IN MIND?
          </h2>
          <p className="text-[#a3a3a3] text-sm leading-relaxed mb-8 max-w-lg">
            I'm always open to discussing projects, internships, technical ideas, or opportunities to build something useful.
          </p>
          <a
            href={mailtoHref}
            onClick={(e) => {
              if (!isConfigured(contactInfo.email)) {
                e.preventDefault();
                alert("Email is not configured yet. Please check back later.");
              }
            }}
            className="inline-flex items-center gap-3 border border-[#333] hover:border-[#00ff9d] text-[#e5e5e5] hover:text-[#00ff9d] px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
          >
            <span>GET IN TOUCH</span>
            <span className="text-lg leading-none mt-[-2px] hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Footer Status */}
        <div className="mt-32 flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#737373] uppercase">
            STATUS: LOOKING FOR INTERNSHIP OPPORTUNITIES
          </span>
        </div>

      </div>
    </div>
  )
}

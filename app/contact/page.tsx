import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24 w-full">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#e63329] mb-6">Contact</p>
          <h1 className="text-5xl font-black tracking-tighter text-[#0a0a0a] mb-8 leading-tight">
            Let&apos;s work<br />together.
          </h1>
          <p className="text-[1.05rem] text-[#666] leading-relaxed mb-12 max-w-md">
            Open to product design roles in London and remote. Best reached by email.
          </p>

          <div className="space-y-6">
            <a
              href="mailto:jedblankson17@gmail.com"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-2xl px-8 py-6 hover:border-[#0a0a0a] hover:bg-[#0a0a0a] transition-all duration-200"
            >
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#999] group-hover:text-white/50 mb-1 transition-colors">Email</p>
                <p className="text-lg font-semibold text-[#0a0a0a] group-hover:text-white transition-colors">jedblankson17@gmail.com</p>
              </div>
              <span className="text-2xl text-[#ccc] group-hover:text-white transition-colors">↗</span>
            </a>

            <a
              href="https://linkedin.com/in/jedblankson"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-2xl px-8 py-6 hover:border-[#0a0a0a] hover:bg-[#0a0a0a] transition-all duration-200"
            >
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#999] group-hover:text-white/50 mb-1 transition-colors">LinkedIn</p>
                <p className="text-lg font-semibold text-[#0a0a0a] group-hover:text-white transition-colors">linkedin.com/in/jedblankson</p>
              </div>
              <span className="text-2xl text-[#ccc] group-hover:text-white transition-colors">↗</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

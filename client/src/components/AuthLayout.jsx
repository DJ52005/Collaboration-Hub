import { Link } from "react-router-dom";

const AuthLayout = ({
  children,
  title,
  subtitle,
  sideTitle,
  sideText,
  image,
  bottomText,
  bottomLink,
  bottomLinkText,
}) => {
  return (
    <div className="min-h-screen bg-[#070B1A] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-7xl rounded-[32px] overflow-hidden border border-white/10 bg-[#0B1023] shadow-2xl">

        {/* LOGO */}
        <div className="flex items-center gap-4 px-10 py-8 border-b border-white/10">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
            ✦
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              Campus Hub
            </h1>

            <p className="text-slate-400">
              Collaborate & Connect
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative p-14 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),transparent_40%)] border-r border-white/10 flex flex-col justify-between">

            <div>

              <h2 className="text-5xl font-bold text-white leading-tight">
                {sideTitle}
              </h2>

              <p className="text-slate-400 text-lg mt-6 leading-relaxed">
                {sideText}
              </p>

            </div>

            <div className="flex justify-center mt-16">

              <img
                src={image}
                alt="illustration"
                className="w-[85%] drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]"
              />

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-14 flex flex-col justify-center bg-white/[0.02] backdrop-blur-xl">

            <div className="max-w-md mx-auto w-full">

              <h2 className="text-4xl font-bold text-white">
                {title}
              </h2>

              <p className="text-slate-400 mt-3 mb-10">
                {subtitle}
              </p>

              {children}

              <div className="text-center mt-10 text-slate-400">

                {bottomText}

                <Link
                  to={bottomLink}
                  className="text-purple-400 ml-2 hover:text-pink-400 transition"
                >
                  {bottomLinkText}
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;
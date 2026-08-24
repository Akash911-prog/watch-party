import Navbar from './components/navbar';
import HeroImg from './assets/hero/3.jpg';
import { Link } from '@tanstack/react-router';

function App() {
  return (
    <main className="app relative w-screen">
      <nav className="navbar sticky top-0 z-50">
        <Navbar />
      </nav>

      {/* hero section  */}
      <section className="hero relative h-screen w-full -mt-16.25 ">
        <img
          src={HeroImg}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover -z-10 blur-xs"
        />
        <div className="md:grid grid-cols-3 grid-rows-4 overflow-hidden h-full pt-20">
          <span className="text-main col-span-3 min-w-0 pl-15 font-bold">
            WATCH
          </span>
          <span className="text-main col-span-3 justify-self-center min-w-0 font-bold">
            WITH
          </span>
          <span className="text-main col-span-3 justify-self-end min-w-0 pr-15 font-bold">
            SYNC
          </span>
          <p className="text-neutral-200 pl-10 pt-22">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            dicta nulla nihil doloremque reprehenderit impedit, officiis
            voluptas expedita dignissimos doloribus! Laborum, necessitatibus
            impedit!
          </p>
        </div>
      </section>

      {/* about section  */}
      <section className="about h-screen w-full">
        <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
          <span className="block size-4 rounded-full bg-white"></span>
          <span className="text-lg">HOW IT WORKS</span>
        </div>
        <div className="grid grid-cols-[450px_1fr_1fr] grid-rows-3 h-[90%] mt-10">
          <div className="col-span-1 row-span-3 self-center flex flex-col gap-5 pl-9">
            <p className="text-md font-semibold w-[80%]">
              Three steps between you and movie night with friends, wherever
              they are.
            </p>
            <p className="text-sm text-neutral-500 w-[80%]">
              No downloads, no waiting for someone to catch up. Set it up once
              and let the sync handle the rest.
            </p>
          </div>
          <div className="col-span-2 row-span-3 grid grid-cols-2 grid-rows-2 mr-9 gap-2.75">
            <div className="bg-neutral-700"></div>
            <div className="bg-neutral-700 row-span-2"></div>
            <div className="bg-neutral-700"></div>
          </div>
        </div>
      </section>

      <section className="features h-screen">
        <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
          <span className="block size-4 rounded-full bg-white"></span>
          <span className="text-lg">WHY US?</span>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 h-[90%] gap-2.75 mx-10 mt-10">
          <div className="bg-neutral-700 col-span-2 row-span-2"></div>
          <div className="bg-neutral-700 col-span-2"></div>
          <div className="bg-neutral-700"></div>
          <div className="bg-neutral-700"></div>
        </div>
      </section>

      <section className="cta h-screen w-screen">
        <div className="relative w-fit h-fit mx-auto top-1/2 -translate-y-1/2">
          <div className="w-fit h-fit text-9xl tracking-tight leading-tight">
            LIGHTS DOWN,
          </div>
          <div className="w-fit h-fit text-9xl tracking-tight leading-tight">
            ROLL THE TAPE
          </div>
          <button className="relative left-1/2 -translate-x-1/2 bg-neutral-300 text-black font-semibold rounded-xl w-62.5 h-15 mt-4">
            <Link to="/dashboard" className="text-lg">
              Get Started
            </Link>
          </button>
        </div>
      </section>
      <footer></footer>
    </main>
  );
}

export default App;

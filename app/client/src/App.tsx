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
      <section className="hero relative h-screen w-full -mt-16.25">
        <img
          src={HeroImg}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover -z-10 blur-xs"
        />
        <div className="grid grid-cols-3 grid-rows-[auto_auto_auto_1fr] md:grid-rows-4 h-screen md:pt-40 md:pb-10 pb-3 pt-[70%] gap-y-2">
          <span className="md:text-main text-5xl col-span-3 min-w-0 pl-6 md:pl-15 font-bold">
            WATCH
          </span>
          <span className="md:text-main text-5xl col-span-3 justify-self-center min-w-0 font-bold">
            WITH
          </span>
          <span className="md:text-main text-5xl col-span-3 justify-self-end min-w-0 pr-6 md:pr-15 font-bold">
            SYNC
          </span>
          <p className="col-span-3 self-end px-6 md:px-10 md:pl-10 text-sm w-[460px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            dicta nulla nihil doloremque
          </p>
        </div>
      </section>

      {/* about section  */}
      <section className="about h-screen w-full">
        <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
          <span className="block size-4 rounded-full bg-white"></span>
          <span className="text-lg">HOW IT WORKS</span>
        </div>
        <div className="md:grid grid-cols-[450px_1fr_1fr] grid-rows-3 h-[90%] md:mt-10 mt-4">
          <div className="col-span-1 row-span-3 self-center flex flex-col md:gap-5 md:pl-9 gap-3 ml-2 mr-4 mb-5 md:mb-0">
            <p className="text-md font-semibold md:w-[80%]">
              Three steps between you and movie night with friends, wherever
              they are.
            </p>
            <p className="text-sm text-neutral-500 md:w-[80%]">
              No downloads, no waiting for someone to catch up. Set it up once
              and let the sync handle the rest.
            </p>
          </div>
          <div className="col-span-2 row-span-3 grid grid-cols-2 grid-rows-2 md:mr-9 gap-1.25 md:gap-2.75 h-[75%] md:h-full md:m-0 mx-2">
            <div className="bg-neutral-700 col-span-2 md:col-span-1"></div>
            <div className="bg-neutral-700 md:row-span-2"></div>
            <div className="bg-neutral-700"></div>
          </div>
        </div>
      </section>

      <section className="features h-screen">
        <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
          <span className="block size-4 rounded-full bg-white"></span>
          <span className="text-lg">WHY US?</span>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 grid-rows-2 h-[90%] md:gap-2.75 gap-1.25 md:mx-10 mx-2 mt-10">
          <div className="bg-neutral-700 md:col-span-2 md:row-span-2"></div>
          <div className="bg-neutral-700 md:col-span-2"></div>
          <div className="bg-neutral-700"></div>
          <div className="bg-neutral-700"></div>
        </div>
      </section>

      <section className="cta h-screen w-screen">
        <div className="relative w-fit h-fit mx-auto top-1/2 -translate-y-1/2">
          <div className="w-fit h-fit md:text-9xl text-5xl tracking-tight leading-tight">
            LIGHTS DOWN,
          </div>
          <div className="w-fit h-fit md:text-9xl text-5xl tracking-tight leading-tight">
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

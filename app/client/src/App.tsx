import Navbar from './components/navbar';

function App() {
  return (
    <main>
      <nav className="navbar sticky">
        <Navbar />
      </nav>
      <section className="hero"></section>
      <section className="about"></section>
      <section className="features"></section>
      <section className="cta"></section>
      <footer></footer>
    </main>
  );
}

export default App;

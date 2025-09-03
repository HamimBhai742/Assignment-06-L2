import HeroBanner from "../../components/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div >
      <section id="home">
        <HeroBanner />
      </section>

      {/* Demo sections for sticky navbar testing */}
      <section id="about" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Section</h2>
          <p className="text-xl text-gray-600">Scroll to see the sticky navbar in action</p>
        </div>
      </section>

      <section id="services" className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Section</h2>
          <p className="text-xl text-gray-600">Notice how the navbar changes appearance</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Section</h2>
          <p className="text-xl text-gray-600">Responsive design works on all devices</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsContentSection from "./NewsContentSection";

const News = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '100vh', background: '#000000', paddingTop: '80px', paddingBottom: '80px' }}>
      <NewsContentSection />
    </main>
    <Footer />
  </>
);

export default News;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const News = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '100vh', background: '#000000', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#ffffff', letterSpacing: '-1.5px',
        }}>News</h1>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: '17px', color: 'rgba(255,255,255,0.45)', marginTop: '16px', lineHeight: 1.6,
        }}>Updates and announcements from AUTOBIT. Coming soon.</p>
      </div>
    </main>
    <Footer />
  </>
);

export default News;

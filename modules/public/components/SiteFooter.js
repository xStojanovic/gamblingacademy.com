import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">GO</span><span>OpsAcademy <b>Academy</b></span></div>
          <p className="muted">Professional education for people and teams working across the regulated operations industry.</p>
        </div>
        <div><h4>Learn</h4><Link href="/courses">Courses</Link><Link href="/learning-paths">Learning Paths</Link><Link href="/certifications">Certificates</Link><Link href="/resources">Resource Library</Link><Link href="/knowledge">Knowledge Hub</Link></div>
        <div><h4>Companies</h4><Link href="/for-companies">Corporate Training</Link><Link href="/company-academy">Company Academy</Link><Link href="/for-companies#pilot">30-Day Pilot</Link><Link href="/company">Admin Demo</Link><Link href="/pricing">Pricing</Link></div>
        <div><h4>Network</h4><Link href="/community">Professional Community</Link><Link href="/careers">Career Hub</Link><Link href="/skills-assessment">Skills Assessment</Link><Link href="/experts">Faculty</Link><Link href="/about">About</Link></div>
        <div><h4>Product</h4><Link href="/dashboard">Learner Demo</Link><Link href="/dashboard/tutor">Ask OpsAcademy</Link><Link href="/certifications/verify">Verify Credential</Link><Link href="/admin">Owner Admin Demo</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 OpsAcademy</span>
        <span>Professional industry education. Not intended for players or minors.</span>
      </div>
    </footer>
  );
}

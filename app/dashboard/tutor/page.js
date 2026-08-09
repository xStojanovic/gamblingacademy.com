import DashboardNav from '@/modules/learner/components/DashboardNav';
import TutorClient from '@/modules/learner/components/TutorClient';
export default function TutorPage(){return <section className="section"><div className="container"><div className="dashboard-shell"><DashboardNav active="tutor"/><div className="dashboard-content"><div className="eyebrow">AI Study Assistant</div><h2>Ask OpsAcademy</h2><p className="muted">Ask questions against approved Academy learning content and trace the answer back to the source lesson.</p><TutorClient/></div></div></div></section>}

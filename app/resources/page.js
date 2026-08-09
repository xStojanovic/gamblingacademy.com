import ResourceLibrary from '@/modules/learner/components/ResourceLibrary';
import {resources} from '@/modules/learning/data/catalog';
export const metadata={title:'Resource Library — OpsAcademy'};
export default function ResourcesPage(){return <><section className="page-hero"><div className="container"><div className="eyebrow">Professional Resources</div><h1>Templates you can use at work.</h1><p className="lead">Operational, product, project and management templates designed to turn course concepts into repeatable professional workflows.</p></div></section><section className="section"><div className="container"><ResourceLibrary resources={resources}/></div></section></>}

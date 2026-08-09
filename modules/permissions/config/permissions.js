export const permissionGroups={
 learning:['courses.read','courses.write','courses.publish','assessments.manage','credentials.manage','resources.manage'],
 customers:['companies.read','companies.write','learners.manage','support.manage','billing.read'],
 commercial:['billing.manage','plans.manage','coupons.manage','invoices.manage','revenue.read'],
 website:['pages.manage','seo.manage','branding.manage','communications.manage'],
 platform:['roles.manage','integrations.manage','audit.read','settings.manage','feature_flags.manage','data.export'],
 enterprise:['sso.manage','api_keys.manage','webhooks.manage','imports.manage']
};
export const roleDefinitions={
 super_admin:{label:'Super Admin',permissions:['*']},
 content_admin:{label:'Content Admin',permissions:[...permissionGroups.learning,'pages.manage','seo.manage','communications.manage']},
 reviewer:{label:'Expert Reviewer',permissions:['courses.read','assessments.manage']},
 commercial_admin:{label:'Commercial Admin',permissions:[...permissionGroups.customers,...permissionGroups.commercial]},
 customer_success:{label:'Customer Success',permissions:['companies.read','companies.write','learners.manage','support.manage','billing.read','data.export']},
 support_admin:{label:'Support Admin',permissions:['companies.read','learners.manage','support.manage','audit.read']},
 finance_admin:{label:'Finance Admin',permissions:['billing.read','billing.manage','plans.manage','invoices.manage','revenue.read']},
 technical_admin:{label:'Technical Admin',permissions:[...permissionGroups.platform,...permissionGroups.enterprise]}
};
export const companyRoleDefinitions={
 company_owner:{label:'Company Owner',permissions:['*']},
 learning_admin:{label:'HR / L&D Admin',permissions:['employees.manage','teams.manage','learning.assign','reports.read','academy.manage','credentials.read']},
 team_manager:{label:'Team Manager',permissions:['team.read','learning.assign_team','reports.team','onboarding.manage_team']},
 instructor:{label:'Instructor',permissions:['academy.author','assessment.review']},
 reporter:{label:'Reporter',permissions:['reports.read','credentials.read']},
 employee:{label:'Employee',permissions:['learning.consume','profile.manage']}
};
export function hasPermission(role,key,scope='admin'){const defs=scope==='company'?companyRoleDefinitions:roleDefinitions;const set=defs[role]?.permissions||[];return set.includes('*')||set.includes(key)}

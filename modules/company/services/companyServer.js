import {dbSelect} from '@/modules/infrastructure/services/supabaseRest';
export async function getCompanyContext(session){
  const userId=session?.user?.id;if(!userId)return null;
  const memberships=await dbSelect('company_users',`user_id=eq.${userId}&select=company_id,company_role,team_id&limit=1`);
  const membership=memberships.data?.[0];if(!membership)return null;
  const companies=await dbSelect('companies',`id=eq.${membership.company_id}&select=*&limit=1`);
  const company=companies.data?.[0];if(!company)return null;
  return {companyId:company.id,company,membership};
}

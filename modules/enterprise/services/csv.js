export function parseCsv(text){
 const lines=text.trim().split(/\r?\n/).filter(Boolean); if(!lines.length)return [];
 const headers=split(lines[0]); return lines.slice(1).map(line=>{const values=split(line);return Object.fromEntries(headers.map((h,i)=>[h.trim(),(values[i]||'').trim()]))});
}
function split(line){let out=[],cur='',quote=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quote&&line[i+1]==='"'){cur+='"';i++}else quote=!quote}else if(c===','&&!quote){out.push(cur);cur=''}else cur+=c}out.push(cur);return out}
export function toCsv(rows){if(!rows?.length)return '';const headers=Object.keys(rows[0]);const esc=v=>`"${String(v??'').replaceAll('"','""')}"`;return [headers.map(esc).join(','),...rows.map(r=>headers.map(h=>esc(r[h])).join(','))].join('\n')}
export function downloadCsv(filename,rows){const blob=new Blob([toCsv(rows)],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();URL.revokeObjectURL(a.href)}

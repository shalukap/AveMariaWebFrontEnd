import { createClient } from "@supabase/supabase-js"
const anon_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHJyYXFtdHB1bHJqdG1vem53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNTI1NTYsImV4cCI6MjA1NTcyODU1Nn0.-AArFsLmvy3dT2n6KWJQPEXia76odJRiGzMv4qchVA8"

const supabaseUrl="https://quxrraqmtpulrjtmoznw.supabase.co"

const supabase= createClient(supabaseUrl,anon_key)

export default function uploadMedia(file){
    return new Promise((resolve,reject)=>{
        if (!file){
            reject('No file found')
        }
        const timestamp=new Date().getTime()
        const fileName=timestamp+file.name
        supabase.storage.from('images').upload(fileName,file,{
            cacheControl:'3600',
            upsert:false
        }).then(()=>{
            const public_url=supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl
            resolve(public_url);
            
        }).catch(()=>{
            reject('Error uploading file')
        })
    })
}
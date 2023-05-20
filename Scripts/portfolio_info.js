import 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'
const { createClient } = supabase
// Create a single supabase client for interacting with your database
const _supabase = createClient('https://zcdxtvqumrhlbnzlohzv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjZHh0dnF1bXJobGJuemxvaHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MDU1OTcsImV4cCI6MTk5OTk4MTU5N30.iCmc-OwXj_g9A60y3YzYpKvUXdrnOGHptmAAgnWt--I');
//Projects
var a = 0;
const { data:projects, error:p } = await _supabase.from("projects").select('*');
function displayProjectInfo(index){
document.getElementById('project_name').innerHTML = {data:projects}["data"][index]["Name"];
document.getElementById('project_details').innerHTML = {data:projects}["data"][index]["Description"];
document.getElementById('project_link').href = {data:projects}["data"][index]["Link"];
}
displayProjectInfo(a);
document.getElementById('left_button').onclick = function() {
    if(a == 0){
        a = {data:projects}.length -1 ;
    }
    else{
    a -= 1;}
    displayProjectInfo(a);
}
document.getElementById('right_button').onclick = function() {
    if(a == {data:projects}.length-1){
        a = 0 ;
    }
    else{
    a += 1;}
    displayProjectInfo(a);
}
//Certificates
const { data:accomplishments, error:acc } = await _supabase.from("accomplishments").select('*');
var inhtml = '';
for(var i = 0;i< {data:accomplishments}["data"].length;i++)
{
    inhtml += '<li><a href = \' '+{data:accomplishments}["data"][i]["Certificate Link"]+'\'>'+{data:accomplishments}["data"][i]["Name"]+'</a></li>';
}
document.getElementById("certi").innerHTML = inhtml;
//Work History
const { data:workHist, error:wh } = await _supabase.from("workHist").select('*');
var inhtml = '';
for(var i = 0;i< {data:workHist}["data"].length;i++)
{
    inhtml += '<h3>'+{data:workHist}["data"][i]["position name"]+'</h3><h4>'+{data:workHist}["data"][i]["company name"]+'</h4><h4>'+{data:workHist}["data"][i]["date"]+'</h4><p>' + {data:workHist}["data"][i]["description"]+'</p><a href = \"'+{data:workHist}["data"][i]["certification"]+'\">Certificate Link</a>'
}
console.log({data:workHist});
document.getElementById("workHist").innerHTML = inhtml;
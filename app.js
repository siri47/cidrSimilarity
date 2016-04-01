/*
Similarity Exercise
Overview
Use a programming language of your choice to implement a data analysis algorithm.
We realize that doing this assignment may require you to learn new technologies. A lot of what our team does on a daily basis involves learning
new technologies, concepts and techniques and applying them to our product. This assignment is designed to demonstrate that you can write
code that performs analysis on a well defined set of data. Do your best and don’t give up.


Assignment
Read and understand the CIDR notation - http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation
Assume you're given n sets of CIDR blocks. For example {10.10.0.0/16, 10.20.0.0/16, 192.168.5.0/24} and {10.0.0.0/8,
192.168.5.127/25}.
Return a matrix, which indicates the degree of interaction between the sets, for example the first two in the first block, are contained
within the first element of the second block.
The algorithm needs to offer speed over precision, we want to know if two set are intersecting, contained, adjacent or none rather than if
they intersect at 95.6%.
Suggest a method to present the data. For example, a venn diagram http://en.wikipedia.org/wiki/Venn_diagram. Explain why you chose
this option and its limitations.
Preferred languages are java or Javascript (using node.js as a runtime). If you chose to use a different environment please explain why.

Submit
Send us the following via email:
Please provide samples of runs with sufficient data.
Check in code and data into Github and provide us the link.
Provide enough instructions to build and run the code ourselves. 
*/

function getIPRange( a)
{
    asplit=a.split("/");
    if (asplit.length==2){
        pow=32-asplit[1];
        //console.log(pow);
        fields=asplit[0].split(".");
        i=3;
        p=pow;
        q=parseInt(pow/8);
        r=pow%8;
        var low=Object.assign([],fields),high=Object.assign([],fields);
        //console.log(low,high);
        while(q>=0 && pow!==0){
        if (q===0 || pow===8)   ex=pow;
        else if (q>=1 || pow!==8) ex=8;

            low[i]=parseInt(fields[i]);
            high[i]=parseInt(fields[i])+Math.pow(2,ex)-1;
        //console.log(q,pow,low,high);
        pow-=8;
        i--;
        q--;
        }
        //low[4]=Math.pow(2,p);
        //console.log(low,high);
        return [low,high];            
        
    }
}

function checkRelation(ipRange,actualIP){
    var chkIP=actualIP.split(".");
    var i=0,count=0;
    for (var k=0 in chkIP){
        //console.log(chkIP[k],ipRange[0][i],ipRange[1][i]);
        if (parseInt(chkIP[k])>=parseInt(ipRange[0][i]) && parseInt(chkIP[k])<=parseInt(ipRange[1][i])){
            count++;i++;
        }
    }
    if(count===4) return true; //IP falls within the range 
    else return false;
    
}

function compareCIDR(cidr1,cidr2){
var ip1=[],ip2=[];
var actualIP1=cidr1.split("/")[0];
var actualIP2=cidr2.split("/")[0];
ip1=getIPRange(cidr1);
ip2=getIPRange(cidr2); 
console.log(ip1[0],ip1[1]);
console.log(ip2[0],ip2[1]); 
if (checkRelation(ip1,actualIP2)===true){
    console.log("ip2 in cidr1");
}
else{
    console.log("ip2 not in cidr1");
}
if (checkRelation(ip2,actualIP1)===true){
console.log("ip1 in cidr2");
}
else{
    console.log("ip1 not in cidr2");
}
}

function getSetRelation(){
var set1=new Set(["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"]);
var set2=new Set(["10.0.0.0/8","192.168.5.127/25"]);
for (var cidr1 of set1){
    for (var cidr2 of set2){
        compareCIDR(cidr1,cidr2); //cidr1,cidr2
    }
}
}
    
getSetRelation();
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
var mat;

function getIPRange(a)
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

function checkRelation1(ipRange,actualIP){
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

function lessThan(ip1,ip2){
    var IP1=ip1;//.split(".");    
    var IP2=ip2;//.split("."); 
    var k=0,count=0;
    while (k<4){
        //console.log(chkIP[k],ipRange[0][i],ipRange[1][i]);
        if (parseInt(IP1[k])<parseInt(IP2[k]) ){
            count++;k++;
        }else return false;
    }
    if(count===4) return true;  
    else return false;
}

function lessThanEquals(ip1,ip2){
    var IP1=ip1;//.split(".");    
    var IP2=ip2;//.split("."); 
    var k=0,count=0;
    while (k<4){
        //console.log(chkIP[k],ipRange[0][i],ipRange[1][i]);
        if (parseInt(IP1[k])<=parseInt(IP2[k]) ){
            count++;k++;
        }else break;
    }
    if(count===4) return true;  
    else return false;
}

function checkRelation(ipRange1,ipRange2){
    console.log("for cidrs");
    console.log(ipRange1[0],ipRange1[1],ipRange2[0],ipRange2[1]);
    //Check all cases for the relation between the 2 ranges 
    if (lessThanEquals(ipRange1[0],ipRange2[0]) && lessThanEquals(ipRange2[1],ipRange1[1])){
        //CIDR1 contains CIDR2
        console.log("CIDR1 contains CIDR2");
    }
    else if(lessThanEquals(ipRange2[0],ipRange1[0]) && lessThanEquals(ipRange1[1],ipRange2[1])){
        //CIDR2 contains CIDR1
        console.log("CIDR2 contains CIDR1");
    }
    else if(lessThan(ipRange2[0],ipRange1[0]) && lessThan(ipRange2[1],ipRange1[1])){
        
        if(lessThan(ipRange1[0],ipRange2[1])){
            console.log("CIDR1 intersects CIDR2");
            //CIDR2 intersects CIDR1
        }else{
            //None or Adjacent
            var c=0;
            for(var i=0;i<3;i++){
            if(parseInt(ipRange1[0][i])===parseInt(ipRange2[1][i])) c++;
            }
            if((c===3) && (parseInt(ipRange1[0][i])===(parseInt(ipRange2[1][i])+1))) {//adjacent
                console.log("adjacent CIDR2+1 = CIDR1");            
            }
            else{ //None
                console.log("NONE 1");            
            }
        }
    }
    else if(lessThan(ipRange1[0],ipRange2[0]) && lessThan(ipRange1[1],ipRange2[1])){
        
        if(lessThan(ipRange2[0],ipRange1[1])){
            //CIDR2 intersects CIDR1
            console.log("CIDR2 intersects CIDR1 ----");
        }else{
            //None or Adjacent            
            var c=0;
            for(var i=0;i<3;i++){
            if(parseInt(ipRange2[0][i])===parseInt(ipRange1[1][i])) c++;
            }
            if((c===3) && (parseInt(ipRange2[0][i])===(parseInt(ipRange1[1][i])+1))) {//adjacent
                console.log("adjacent CIDR1+1 = CIDR2");            
            }
            else{ //None
                console.log("NONE 2");            
            }            
        }
    }
    
}

function compareCIDR(cidr1,cidr2){
var ip1=[],ip2=[];
var actualIP1=cidr1.split("/")[0];
var actualIP2=cidr2.split("/")[0];
ipRange1=getIPRange(cidr1);
ipRange2=getIPRange(cidr2); 
//console.log(ipRange1[0],ipRange1[1]);
//console.log(ipRange2[0],ipRange2[1]); 
checkRelation(ipRange1,ipRange2);
}

function getSetRelation(){
mat=new Array(2);
for (var i = 0; i < 2; i++) {
  mat[i] = new Array(3);
}
var set1=new Set(["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"]);
var set2=new Set(["10.0.0.0/8","192.168.5.127/25"]);
for (var cidr1 of set1){
    for (var cidr2 of set2){
        compareCIDR(cidr1,cidr2); //cidr1,cidr2
    }
}
}
    
getSetRelation();

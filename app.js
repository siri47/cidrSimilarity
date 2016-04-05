var res=[];

function getIPRange(a)
{
    asplit=a.split("/");
    if (asplit.length==2){
        num=parseInt(asplit[1]);
        pow=32-asplit[1];
        fields=asplit[0].split(".");
        var k=0,ip=[];
        p=parseInt(pow);
        for (var i in fields){
        ip.push(parseInt(fields[i]));
        }
        var wildcard=[0,0,0,0];
        while(k<num){
            wildcard[parseInt(k/8)]=wildcard[parseInt(k/8)]+(1 << (7 - k % 8));
            k++;
        }
        var low=[ip[0]&wildcard[0],ip[1]&wildcard[1],ip[2]&wildcard[2],ip[3]&wildcard[3]]; 
        high=low.slice(0);
        k=0;
        while(k<p){
            high[3-parseInt(k/8)]=high[3-parseInt(k/8)]+(1 << (k % 8));
            k++;
        }        
        return [low,high];                  
    }
}

function lessThan(ip1,ip2){
    var IP1=ip1; 
    var IP2=ip2;
    var k=0,count=0;
    while (k<4){
        if ((IP1[k])==(IP2[k]) ){
            count++;k++;
        }else if((IP1[k])<(IP2[k]) ) return true;
        else return false;
    }
    if(count>=1) return true;  
    else return false;
}

function checkRelation(ipRange1,ipRange2){
    //Check all cases for the relation between the 2 ranges 
    if (lessThan(ipRange1[0],ipRange2[0]) && lessThan(ipRange2[1],ipRange1[1])){
        //CIDR1 contains CIDR2
        return "contains";
    }
    else if(lessThan(ipRange2[0],ipRange1[0]) && lessThan(ipRange1[1],ipRange2[1])){
        //CIDR1 is contained in CIDR2
        return "contained in";
    }
    else if(lessThan(ipRange2[0],ipRange1[0]) && lessThan(ipRange2[1],ipRange1[1])){
        
        if(lessThan(ipRange1[0],ipRange2[1])){
            return "intersect";
            //CIDR2 intersects CIDR1
        }else{
            //None or Adjacent
            var c=0;
            for(var i=0;i<3;i++){
            if((ipRange1[0][i])===(ipRange2[1][i])) c++;
            }
            if((c===3) && ((ipRange1[0][i])===((ipRange2[1][i])+1))) {//adjacent
                return "adjacent";
            }
            else{ //None
                return "none";
            }
        }
    }
    else if(lessThan(ipRange1[0],ipRange2[0]) && lessThan(ipRange1[1],ipRange2[1])){
        
        if(lessThan(ipRange2[0],ipRange1[1])){
            //CIDR2 intersects CIDR1
            return "intersect";
            
        }else{
            //None or Adjacent
            var c=0;
            for(var i=0;i<3;i++){
            if((ipRange2[0][i])===(ipRange1[1][i])) c++;
            }
            if((c===3) && ((ipRange2[0][i])===((ipRange1[1][i])+1))) {//adjacent
                return "adjacent";
            }
            else{ //None
                return "none";
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
    return checkRelation(ipRange1,ipRange2);
}

function getSetRelation(list1,list2){
    res = [];
    var set1=new Set(list1);
    var set2=new Set(list2);
    var i=0,j=0;
    i=0;j=0;
    for (var cidr1 of set1){
        res.push([]);
        for (var cidr2 of set2){
            result=compareCIDR(cidr1,cidr2); //cidr1,cidr2
            res[i].push(result);
        }
        i++;
    }
    console.log("Matrix");
    console.log(res);
    console.log("\n");
    
}

l2=["10.0.0.0/8","192.168.5.127/25"];
l1=["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"];
console.log("\n--------------------CIDR SIMILARITY------------------------\n");
console.log("SET1: ",l1);
console.log("SET2: ",l2);
getSetRelation(l1,l2);

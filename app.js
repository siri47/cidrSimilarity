var res=[];

function getIPRange(a)
{
    asplit=a.split("/");
    if (asplit.length==2){
        pow=32-asplit[1];
        fields=asplit[0].split(".");
        i=3;
        p=pow;
        q=parseInt(pow/8);
        r=pow%8;
        var low=Object.assign([],fields),high=Object.assign([],fields);
        while(q>=0 && pow!==0){
        if (q===0 || pow===8)   ex=pow;
        else if (q>=1 || pow!==8) ex=8;

            low[i]=parseInt(fields[i]);
            high[i]=parseInt(fields[i])+Math.pow(2,ex)-1;
        pow-=8;
        i--;
        q--;
        }
        return [low,high];            
        
    }
}

function lessThan(ip1,ip2){
    var IP1=ip1; 
    var IP2=ip2;
    var k=0,count=0;
    while (k<4){
        if (parseInt(IP1[k])==parseInt(IP2[k]) ){
            count++;k++;
        }else if(parseInt(IP1[k])<parseInt(IP2[k]) ) return true;
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
            if(parseInt(ipRange1[0][i])===parseInt(ipRange2[1][i])) c++;
            }
            if((c===3) && (parseInt(ipRange1[0][i])===(parseInt(ipRange2[1][i])+1))) {//adjacent
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
            if(parseInt(ipRange2[0][i])===parseInt(ipRange1[1][i])) c++;
            }
            if((c===3) && (parseInt(ipRange2[0][i])===(parseInt(ipRange1[1][i])+1))) {//adjacent
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
    
l1=["10.0.0.0/8","192.168.5.127/25"];
l2=["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"];
console.log("\n--------------------CIDR SIMILARITY------------------------\n");
console.log("SET1: ",l1);
console.log("SET2: ",l2);
getSetRelation(l1,l2);

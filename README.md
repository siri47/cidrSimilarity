CIDR Set Relation
==============================

   The CIDRs in the given 2 sets are compared for similarity. 

   https://cdn.rawgit.com/ranji2612/cidrSimilarity/master/index.html
   
   
Approach
==============================

An IP range is obtained from both the CIDRs that need to be compared.

2 CIDRs are compared for the relation of "contains","intersect","none" or "adjacent" by passing the low and high IP addresses of CIDR.

Once the comparison is finished, the mxn matrix is updated to hold the values "contains","contained in","intersect","none" or "adjacent". Where m and n is the number of elements in set1 and set2 respectively. 

For sets [A,B,C] and [D,E], the following output means  'A contains D','B contains D','C and D have no relation', 'A and E have no relation', 'B and E have no relation', 'C is contained in E' or 'E contains C'.

[ [ 'contains', 'contains', 'none' ],

  [ 'none', 'none', 'contained in' ] ]

Steps to run
==============================
1. See the live demo here: https://cdn.rawgit.com/ranji2612/cidrSimilarity/master/index.html
                           https://jsfiddle.net/3w5kwocg/4/
                         
2. Copy-paste the entire app.js code in https://repl.it/languages/javascript 
and call it : getSetRelation(list1,list2)
for example, getSetRelation(["10.0.0.0/8","192.168.5.127/25"],["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"]) to compare the 2 lists ["10.0.0.0/8","192.168.5.127/25"] and ["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"].
3. Copy-paste the entire app.js code in node REPL window and call it : getSetRelation(list1,list2)
for example, getSetRelation(["10.0.0.0/8","192.168.5.127/25"],["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"]) to compare the 2 lists ["10.0.0.0/8","192.168.5.127/25"] and ["10.10.0.0/16", "10.20.0.0/16", "192.168.5.0/24"].

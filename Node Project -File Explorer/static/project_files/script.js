// console.log('hello');
// console.log([1,5,3].sort());

// console.log(['a','c','b'].sort());

// //for ascending order
// console.log([{name:'john',age:33},
//             {name:'john',age:33},
//             {name:'john',age:33}
// ].sort((person1 , person2)=>{
//     const name1= person1.name.toUpperCase();
//     const name2= person2.name.toUpperCase();
//     if(name1<name2){
//         return -1;
//     }
//     if(name1>name2){
//         return 1;
//     }
//     //equal names
//     return 0;
// }));

//for desending order
// console.log([{name:'john',age:33},
//             {name:'john',age:33},
//             {name:'john',age:33}
// ].sort((person1 , person2)=>{
//     const name1= person1.name.toUpperCase();
//     const name2= person2.name.toUpperCase();
//     if(name1<name2){
//         return -1;
//     }
//     if(name1>name2){
//         return 1;
//     }
//     //equal names
//     return 0;
// }).reverse());==========> descending

//loop through children of tbody
const children = $('tbody').children();
console.log(children.forEach);

//convert children to an array
let children_array = [];
for(let i=0; i<children.length ; i++ ){
    children_array.push(children[i]);
}
console.log(children_array);

//build an array of object
const items = [];   
children_array.forEach(element =>{
    console.log(element.outerHTML);
    console.log(element.getAttribute('data-name'));
    const rowDetails = {
        name:element.getAttribute('data-name'),
        size:parseInt(element.getAttribute('data-size')),
        last_modified:parseInt(element.getAttribute('data-time')) ,
        html:element.outerHTML
    };
    items.push(rowDetails);
});
console.log(items);

const sortStatus = {
    name:'none',//none , up , down
    size:'none',//none , up , down
    time:'none',//none , up , down
}

const sort = (items,option,type) =>{
   items.sort((item1 , item2)=>{
    let value1 , value2;
    if(type === 'name'){
         value1= item1.name.toUpperCase();
     value2= item2.name.toUpperCase();
    }
    else if(type === 'size'){
    value1 = item1.size;
    value2 = item2.size;
    }else{
        value1 = item1.time;
        value2 = item2.time;
    }
    if(value1 < value2){
        if(value1<value2){
            return -1;
        }
        if(value1>value2){
            return 1;
        }
        //equal names
        return 0;
    }
}   );
//reverse the array if arrow is down
  if(option == 'down'){
    items.reverse();
  }
} ;

// sort_name_up(items);
// console.log(items);

//sort status

// const sort_name_down = items =>{
//     sort_name_up(items);
//     items.reverse();
// }
// sort_name_down(items);
// console.log(items);

//fill table body with items
const fill_table_body = items => {
const content = items.map(element=>element.html).join('');
console.log(content);
$('tbody').html(content);
}
    
//event listeners 
document.getElementById('table_head_row').addEventListener('click',event =>{
    if(event.target){
        //clear icons
        $('ion-icon').remove(); 
        if(['none','down'].includes(sortStatus[event.target.id])){
            //sort in ascending order
            sort(items,'up',event.target.id);
            sortStatus[event.target.id]  = 'up';
            //add icon 
            event.target.innerHTML += '<ion-icon name="caret-up-circle"></ion-icon>';
        }
        else if(sortStatus[event.target.id]=== 'up'){
            //sort in ascending order
            sort(items,'down',event.target.id);
            sortStatus[event.target.id]  = 'down';
            //add icon
            event.target.innerHTML += '<ion-icon name="caret-down-circle"></ion-icon>';
        }
            

             fill_table_body(items);    
        
    }
})

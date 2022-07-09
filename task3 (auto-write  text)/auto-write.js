const text=`Lets Create a Website With Auto Typing Text Effect Using 
HTML CSS JavaScript, step-by-step in a very easy`;

let index=0;
function autoWrite(){
    document.body.innerText=text.slice(0,index);
    index++;
    if(index>text.length){
        index=0;
    }
}
setInterval(autoWrite,100)

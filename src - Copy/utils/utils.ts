import {get,type Writable} from "svelte/store"
import {wrongCount,wrongIndex,wrongSequence,caretPos,line_count,word_count,remaining_time,prev_word_start_position,prev_word_end_position}from "../store/store"
export function process_key_stroke(event:KeyboardEvent,key,target:HTMLDivElement,characters:string){
switch (true){
    case key=="Escape":
      remaining_time.set(0)
      return
    case key=="Backspace":
      break;
    // if next character is newline space or tab and user hits none of those return;
    case (characters[get(caretPos) ] ==" " && key!=" "):
    case characters[get(caretPos) ] =="\n" && key!="Enter":
    case characters[get(caretPos) ] =="\t" && key!="Tab":
    return
     // if next character is newline space or tab and user hits correct key means new word start;
    case characters[get(caretPos) ] ==" " && characters[get(caretPos)+1 ] !=" ":
      case characters[get(caretPos) ] =="\n" && characters[get(caretPos)+1 ] !=" ":
      case characters[get(caretPos) ] =="\t" && characters[get(caretPos)+1 ] !=" " :
      get(wrongSequence) &&  wrongCount.update(old=>++old)
      wrongSequence.set(false);
      word_count.update(old=>++old)
      prev_word_start_position.set(get(prev_word_end_position)+1)
      prev_word_end_position.set(get(caretPos))
    
  }

    








    
  if (key=="Tab"){
    
    if(!get(wrongSequence)){  
      wrongSequence.set((characters[get(caretPos) ]=="\t" ?false:true));
      
    }
  
    !get(wrongSequence) ? target.children[get(caretPos) ].classList.add("right"):target.children[get(caretPos) ].classList.add("wrong")
    caretPos.update(old=>++old)
  }else if (key=="Enter"){
    
   wrongSequence.set((characters[get(caretPos) ]=="\n" ?false:true));
    
   !get(wrongSequence) ? target.children[get(caretPos) ].classList.add("right"):target.children[get(caretPos) ].classList.add("wrong")
    caretPos.update(old=>++old)
    !get(wrongSequence) && line_count.update(old=>++old)
  }  
  else if (key=="Backspace"){
    if(!is_prev_word_wrong(target)&&[" ","\t"].includes(characters[get(caretPos) -1]) || characters[get(caretPos) -1] == "\n"){
      return
    }
    get(caretPos)  > 0 && caretPos.update(old=>--old)
    if(get(caretPos) <= get(wrongIndex))wrongSequence.set(false);
    target.children[get(caretPos) ].classList.remove("right","wrong")
    if(event.ctrlKey){

    
    while(true){
      if([" ","\n","\t"].includes(characters[get(caretPos) -1]) || get(caretPos)==0)  break
      get(caretPos)  > 0 && caretPos.update(old=>--old)
      if(get(caretPos) <= get(wrongIndex))wrongSequence.set(false);
      target.children[get(caretPos) ].classList.remove("right","wrong")
    }
  }
  } 
  else if(!["F12","Control","Delete","Shift","Alt","ArrowLeft","ArrowUp","ArrowRight","ArrowDown","Home","End","PageUp","PageDown","CapsLock"].includes(key)){
 
    
    if(!get(wrongSequence))  wrongSequence.set((characters[get(caretPos) ]==key ?false:true));
    
    !get(wrongSequence) ? target.children[get(caretPos) ].classList.add("right"):target.children[get(caretPos) ].classList.add("wrong")
    // console.log(wrongSequence,characters[get(caretPos) ],key)
    caretPos.update(old=>++old)
  }


}





function is_prev_word_wrong(writer:HTMLDivElement){
return [...writer.children].slice(get(prev_word_start_position),get(prev_word_end_position)).some(char=>char.classList.contains("wrong"))

}
export function clickOutside(node: HTMLElement, func: () => void){

    $effect(() => {
        function internalFunc(e: Event){
            console.log("Ran")
            if(!node.contains(e.target as Node)){
                func();
            }
        }
        
        document.addEventListener('click', internalFunc, true)

        return () => {
            document.removeEventListener('click', internalFunc, true)
        }
    });
}
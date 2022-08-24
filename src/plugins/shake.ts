export default async function shake(element: HTMLElement, delay: number = 275){
   await new Promise(resolve => {setTimeout(resolve, delay)})
   element.classList.add("shake");
   await new Promise(resolve => {setTimeout(resolve, 300)})
   element.classList.remove("shake")
}

import "../../globals.css"
import { redirect } from 'next/navigation'
import DataList from "./components/dataList";



async function page({params}:{params:Promise<{id:string[]}>}) {
  const paramsShouldBeAwaitedBeforeUsingItsProperty = await params;
  const id = paramsShouldBeAwaitedBeforeUsingItsProperty.id;
  if (paramsShouldBeAwaitedBeforeUsingItsProperty.id==undefined||id.length<6) {
    redirect("/lists/200/0/0/4/0/0");
  }
  
  return (
    <DataList data={paramsShouldBeAwaitedBeforeUsingItsProperty.id} />
  )
}

export default page
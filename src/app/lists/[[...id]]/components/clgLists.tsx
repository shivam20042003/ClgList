'use client'

import React,{useState} from 'react'

function ClgLists(props: { dataProp: {
    AcademicProgramName:string,
    ClosingRank:number|string,
    Gender:string,
    Institute:string,
    OpeningRank:number|string,
    Quota:string,
    SeatType:string
}[]; }) {
    const [model,setModel] = useState(false);
    const allClg:Array<string> = [];
    props.dataProp.map((y)=>{allClg.push(y.Institute)});
    const nonRepeateClgList = Array.from(new Set(allClg));
    const styleOfButton = (x:boolean) =>{
        if (x) {
            return 'helloButton'
        } else {
            return 'byeButton'
        }
    }
    const listBgColor = (y:string) => {
        const institute =  y.slice(0, 30);
        if (institute=="Indian Institute of Technology") {
          const iit:string = "IIT"
          return iit
        } else {
          const nonIit:string = "nonIIT"
          return nonIit
        }
      }
  return (
    <div className='kyaReHelloWorld'>
        <button className={styleOfButton(!model)} onClick={()=>{setModel(!model)}}>{!model?("<"):(">")}</button>
    {model&&<table className="clgTable">
            <thead>
                <tr>
                    <th>Institute Names</th>
                </tr>
            </thead>{nonRepeateClgList.map((y)=>{
        return(
            <tbody  key={y}>
                <tr>
                    <td> <input defaultChecked type="checkbox" value={y} onChange={(e)=>{console.log(e.target.checked)}} id={y} /> <label className={listBgColor(y)} htmlFor={y}>{y}</label></td>
                </tr>
            </tbody>
        )
      })}
      </table>}
      </div>
  )
}

export default ClgLists
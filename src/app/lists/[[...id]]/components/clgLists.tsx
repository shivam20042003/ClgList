'use client'

import { useDataStore } from '@/store/list';
import React from 'react';
import { useModelStore } from '@/store/list';

function ClgLists(props: { dataProp: {
    AcademicProgramName:string,
    ClosingRank:number|string,
    Gender:string,
    Institute:string,
    OpeningRank:number|string,
    Quota:string,
    SeatType:string
}[],bigDataProp:{
    AcademicProgramName:string,
    ClosingRank:number|string,
    Gender:string,
    Institute:string,
    OpeningRank:number|string,
    Quota:string,
    SeatType:string
}[] }) {
    const model = useModelStore((state)=>state.model);
    const setModel = useModelStore((state)=>state.setModel);
    const recFun = useDataStore((state)=>state.clgSelectionTweeking); 


    const allClg:Array<string> = [];
    props.dataProp.map((y)=>{allClg.push(y.Institute)});
    const nonRepeateClgList = Array.from(new Set(allClg));


    const allClgBig:Array<string> = [];
    props.bigDataProp.map((y)=>{allClgBig.push(y.Institute)});
    const nonRepeateClgBigList = Array.from(new Set(allClgBig));

    const diffClgList = nonRepeateClgBigList.filter(n=>!nonRepeateClgList.includes(n));

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
      const RanFun = (valCheck:boolean,val:string) =>{
        recFun(valCheck,val);
      }
  return (
    <div className='kyaReHelloWorld'>
        <button className={styleOfButton(!model)} onClick={()=>{setModel()}}>{!model?("<"):(">")}</button>
    {model&&<table className="clgTable">
            <thead>
                <tr>
                    <th>Institute Names</th>
                </tr>
            </thead>{diffClgList.map((y)=>{
        return(
            <tbody  key={y}>
                <tr>
                    <td> <input type="checkbox" value={y} onChange={(e)=>{RanFun(e.target.checked,e.target.value)}} id={y} /> <label className={listBgColor(y)} htmlFor={y}>{y}</label></td>
                </tr>
            </tbody>
        )
      })}
            {nonRepeateClgList.map((y)=>{
        return(
            <tbody  key={y}>
                <tr>
                    <td> <input defaultChecked type="checkbox" value={y} onChange={(e)=>{RanFun(e.target.checked,e.target.value)}} id={y} /> <label className={listBgColor(y)} htmlFor={y}>{y}</label></td>
                </tr>
            </tbody>
        )
      })}
      </table>}
      </div>
  )
}

export default ClgLists
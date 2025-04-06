"use client"
import React from 'react'
import Controller from './controller';
import ClgLists from './clgLists';
import { useDataStore } from '@/store/list';
import jsssData from "../../../../../public/Jossa list.json"

function DataList(params : {data:string[]}) {
    const catagoryList = ["EWS","EWS (PwD)","OBC-NCL","OBC-NCL (PwD)","OPEN","OPEN (PwD)","SC","SC (PwD)","ST","ST (PwD)"];
    const quotaList = ["AI","GO","HS","JK","LA","OS"];
    const genderQuotaList = ["Gender-Neutral","Female-only (including Supernumerary)"];
    const id = params.data;
    const elementsPerPage = parseInt(id[0]);
    const JEEMains = parseInt(id[1]);
    const JEEAdvance = parseInt(id[2]);
    const categoryID = parseInt(id[3]);
    const genderQuotaID = parseInt(id[4]);
    const stateQuotaID = parseInt(id[5]);
    const category = catagoryList[categoryID];
    const genderQuota = genderQuotaList[genderQuotaID];
    const stateQuota = quotaList[stateQuotaID];
    const data = useDataStore((state)=>state.jossaData);
    const filteredDataOnRankBased = data.filter((y)=>{
      const closingRank: number = typeof y.ClosingRank === "string" ? parseFloat(y.ClosingRank) : y.ClosingRank;
      const institute = y.Institute.slice(0,30);
      return (closingRank>=JEEMains&&institute!="Indian Institute of Technology")||(closingRank>=JEEAdvance&&institute=="Indian Institute of Technology");
    });
    const filteredDataOnCategoryBased = filteredDataOnRankBased.filter((y)=>{
      return y.SeatType == category &&  y.Gender == genderQuota && y.Quota == stateQuota
    });
    const displayListOnCurrentPage = filteredDataOnCategoryBased.filter((y)=>{
      if(id[6]){
        const z = filteredDataOnCategoryBased.indexOf(y)<elementsPerPage+elementsPerPage*parseInt(id[6])&&filteredDataOnCategoryBased.indexOf(y)>=elementsPerPage*parseInt(id[6])
        return z;
      }
      const z = filteredDataOnCategoryBased.indexOf(y)<elementsPerPage&&filteredDataOnCategoryBased.indexOf(y)>=0
      return z
    })
    const allFiltersFunction = (metaData: {
        AcademicProgramName:string,
        ClosingRank:number|string,
        Gender:string,
        Institute:string,
        OpeningRank:number|string,
        Quota:string,
        SeatType:string
    }[]) => {
        const filteredDataOnRankBased = metaData.filter((y)=>{
            const closingRank: number = typeof y.ClosingRank === "string" ? parseFloat(y.ClosingRank) : y.ClosingRank;
            const institute = y.Institute.slice(0,30);
            return (closingRank>=JEEMains&&institute!="Indian Institute of Technology")||(closingRank>=JEEAdvance&&institute=="Indian Institute of Technology");
          });
          const filteredDataOnCategoryBased = filteredDataOnRankBased.filter((y)=>{
            return y.SeatType == category &&  y.Gender == genderQuota && y.Quota == stateQuota
          });
          return filteredDataOnCategoryBased;
    }
    const xxnx = allFiltersFunction(jsssData);
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
      <div className="all">
        <Controller dataProp={filteredDataOnCategoryBased} disPerPage={elementsPerPage} ids={id} />
        <div className='helloWorld'>
            <table>
                <thead>
                    <tr>
                        <th>Institute</th>
                        <th>Academic Program Name</th>
                        <th>Quota</th>
                        <th>Seat Type</th>
                        <th>Gender</th>
                        <th>Opening Rank</th>
                        <th>Closing Rank</th>
                    </tr>
                </thead>
            {
            displayListOnCurrentPage.map((y)=>{
                return (
                <tbody className={listBgColor(y.Institute)} key={data.indexOf(y)}>
                    <tr>
                        <td>{y.Institute}</td>
                        <td>{y.AcademicProgramName}</td>
                        <td>{y.Quota}</td>
                        <td>{y.SeatType}</td>
                        <td>{y.Gender}</td>
                        <td>{y.OpeningRank}</td>
                        <td>{y.ClosingRank}</td>
                    </tr>
                </tbody>
                )
            })}
            </table>
            <ClgLists dataProp={filteredDataOnCategoryBased} bigDataProp={xxnx} />
        </div>
      </div>
    )
}

export default DataList;
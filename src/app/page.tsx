'use client'
import data from "../../public/Jossa list.json"
import React,{ useState, useEffect } from "react";
import "./globals.css"
export default function Home() {
  
  const [sortedData,setSortedData] = useState(data.sort((a,b)=>{
    const l: number = typeof a.ClosingRank === "string" ? parseFloat(a.ClosingRank) : a.ClosingRank;
    const m: number = typeof b.ClosingRank === "string" ? parseFloat(b.ClosingRank) : b.ClosingRank;
    return l - m;
  }))
  const [i,setI] = useState(0);
  const [rank,setRank] = useState(0);
  const [advance,setAdvance] = useState(0);
  const [catagory,setCatagory] = useState("OPEN");
  const [displaySpace,setDisplaySpace] = useState(200);
  const catagoryList = ["EWS","EWS (PwD)","OBC-NCL","OBC-NCL (PwD)","OPEN","OPEN (PwD)","SC","SC (PwD)","ST","ST (PwD)"]
  const [gender,setGender] = useState("Gender-Neutral");
  const [quota,setQuota] = useState("AI");
  const quotaList = ["AI","GO","HS","JK","LA","OS"];
  const initialSortedList = sortedData.filter((y)=>{
    const z = sortedData.indexOf(y)<displaySpace&&sortedData.indexOf(y)>=0
    return z
  })
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
  const [list,setList] = useState(initialSortedList);
  useEffect(()=>{
    const displayData = sortedData.filter((y)=>{
      const z = sortedData.indexOf(y)<displaySpace+i&&sortedData.indexOf(y)>=i
      return z
    })
    setList(displayData);
  },[i,displaySpace,sortedData])
  useEffect(()=>{
    setI(0);
  },[displaySpace,sortedData])
  const rankChange = () => {
    const tempSortedData = data.filter((y)=>{
      const m: number = typeof y.ClosingRank === "string" ? parseFloat(y.ClosingRank) : y.ClosingRank;
      const institute = y.Institute.slice(0,30);
      return (m>=rank&&institute!="Indian Institute of Technology")||(m>=advance&&institute=="Indian Institute of Technology");
    })
    const tempSortedData2 = tempSortedData.filter((y)=>{
      return y.SeatType == catagory &&  y.Gender == gender && y.Quota == quota
    })
    setSortedData(tempSortedData2);
  }

  useEffect(()=>{
    const tempSortedData = data.filter((y)=>{
      const m: number = typeof y.ClosingRank === "string" ? parseFloat(y.ClosingRank) : y.ClosingRank;
      const institute = y.Institute.slice(0,30);
      return (m>=rank&&institute!="Indian Institute of Technology")||(m>=advance&&institute=="Indian Institute of Technology");
    })
    const tempSortedData2 = tempSortedData.filter((y)=>{
      return y.SeatType == catagory &&  y.Gender == gender && y.Quota == quota
    })
    setSortedData(tempSortedData2);
  },[catagory,gender,quota]);
  
  return (
    <>
    <select defaultValue={200} onChange={(e)=>{setDisplaySpace(parseInt(e.target.value))}} name="displayList">
      <option value={50}>50</option>
      <option value={100}>100</option>
      <option value={200}>200</option>
    </select>
     <button onClick={()=>{if(i-displaySpace>=0)setI(i-displaySpace)}}>-</button>
     <button onClick={()=>{if(sortedData.length>i+displaySpace) setI(i+displaySpace)}}>+</button>
     <input placeholder="JEE Mains Rank" type="number" onChange={(e)=>{setRank(parseInt(e.target.value))}} /> 
     <input placeholder="JEE Advance Rank" type="number" onChange={(e)=>{setAdvance(parseInt(e.target.value))}} /> 
     <button onClick={()=>{rankChange()}}>Check with Rank</button>
     <select defaultValue="OPEN" onChange={(e)=>{setCatagory(e.target.value)}} name="catagory">
      {catagoryList.map((val)=>{
        return (
          <option key={val} value={val}>{val}</option>
        )
      })}
    </select>
    <select name="gender" defaultValue="Gender-Neutral" onChange={(e)=>{setGender(e.target.value)}}>
      <option value="Gender-Neutral">Gender-Neutral</option>
      <option value="Female-only (including Supernumerary)">Female-only including Supernumerary</option>
    </select>
    <select name="Quota" defaultValue="AI" onChange={(e)=>{setQuota(e.target.value)}}>
      {quotaList.map((val)=>{
        return (
          <option key={val} value={val}>{val}</option>
        )
      })}
    </select>
      <table>
        <thead>
        <tr>
          <th>So.</th>
          <th>Institute</th>
          <th>Academic Program Name</th>
          <th>Quota</th>
          <th>Seat Type</th>
          <th>Gender</th>
          <th>Opening Rank</th>
          <th>Closing Rank</th>
        </tr>
        </thead>
        {list.map((y)=>{
          return (
            <tbody className={listBgColor(y.Institute)} key={data.indexOf(y)}>
              <tr>
                <th>{data.indexOf(y)+1}</th>
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
    </>
  );
}

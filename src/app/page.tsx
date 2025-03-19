'use client'
import data from "../../public/Jossa list.json"
import React,{ useState, useEffect } from "react";

export default function Home() {
  
  const [sortedData,setSortedData] = useState(data.sort((a,b)=>{
    const l: number = typeof a.ClosingRank === "string" ? parseFloat(a.ClosingRank) : a.ClosingRank;
    const m: number = typeof b.ClosingRank === "string" ? parseFloat(b.ClosingRank) : b.ClosingRank;
    return l - m;
  }))
  const [i,setI] = useState(0);
  const [rank,setRank] = useState(0);
  const [displaySpace,setDisplaySpace] = useState(200);
  const initialSortedList = sortedData.filter((y)=>{
    const z = sortedData.indexOf(y)<displaySpace&&sortedData.indexOf(y)>=0
    return z
  })
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
      return m>=rank;
    })
    setSortedData(tempSortedData);
  }
  
  return (
    <>
    <select defaultValue={200} onChange={(e)=>{setDisplaySpace(parseInt(e.target.value))}} name="displayList">
      <option value={50}>50</option>
      <option value={100}>100</option>
      <option value={200}>200</option>
    </select>
     <button onClick={()=>{if(i-displaySpace>=0)setI(i-displaySpace)}}>-</button>
     <button onClick={()=>{if(sortedData.length>i+displaySpace) setI(i+displaySpace)}}>+</button>
     <input placeholder="JEE Mains Rank" type="number" onChange={(e)=>{setRank(parseInt(e.target.value))}} /> <button onClick={()=>{rankChange()}}>Check with Rank</button>
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
            <tbody key={data.indexOf(y)}>
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

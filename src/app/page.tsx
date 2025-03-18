'use client'
import data from "../../public/Jossa list.json"
import React,{ useState } from "react";

export default function Home() {
  const x = data;
  const [i,setI] = useState(0);
  const h = x.filter((y)=>{
    const z = data.indexOf(y)<100+i&&data.indexOf(y)>=i
    return z
  });
  
  return (
    <>
     <button onClick={()=>{setI(i-100)}}>-</button>
     <button onClick={()=>{setI(i+100)}}>+</button>
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
        {h.map((y)=>{
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


import data from "../../../../public/Jossa list.json"
import "../../globals.css"
import { redirect } from 'next/navigation'
import ClgLists from './components/clgLists';
import Controller from "./components/controller";


async function page({params}:{params:Promise<{id:string[]}>}) {
  const catagoryList = ["EWS","EWS (PwD)","OBC-NCL","OBC-NCL (PwD)","OPEN","OPEN (PwD)","SC","SC (PwD)","ST","ST (PwD)"];
  const quotaList = ["AI","GO","HS","JK","LA","OS"];
  const genderQuotaList = ["Gender-Neutral","Female-only (including Supernumerary)"];
  const paramsShouldBeAwaitedBeforeUsingItsProperty = await params;
  const id = paramsShouldBeAwaitedBeforeUsingItsProperty.id;
  if (paramsShouldBeAwaitedBeforeUsingItsProperty.id==undefined||id.length<6) {
    redirect("/lists/200/0/0/4/0/0");
  }
  const elementsPerPage = parseInt(id[0]);
  const JEEMains = parseInt(id[1]);
  const JEEAdvance = parseInt(id[2]);
  const categoryID = parseInt(id[3]);
  const genderQuotaID = parseInt(id[4]);
  const stateQuotaID = parseInt(id[5]);
  const category = catagoryList[categoryID];
  const genderQuota = genderQuotaList[genderQuotaID];
  const stateQuota = quotaList[stateQuotaID];
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
        {displayListOnCurrentPage.map((y)=>{
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
      <ClgLists dataProp={filteredDataOnCategoryBased} />
    </div>
    </div>
  )
}

export default page
import data from "../../public/Jossa list.json"

export default function Home() {
  const x = data;
  
  const h = x.filter((y)=>{return data.indexOf(y)<=100});
  
  return (
    <>
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

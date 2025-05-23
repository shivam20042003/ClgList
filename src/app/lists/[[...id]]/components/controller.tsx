'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'

function Controller(props: { dataProp: {
    AcademicProgramName:string,
    ClosingRank:number|string,
    Gender:string,
    Institute:string,
    OpeningRank:number|string,
    Quota:string,
    SeatType:string
}[],disPerPage:number ,ids:string[] }) {
    const catagoryList = ["EWS","EWS (PwD)","OBC-NCL","OBC-NCL (PwD)","OPEN","OPEN (PwD)","SC","SC (PwD)","ST","ST (PwD)"]
    const quotaList = ["AI","GO","HS","JK","LA","OS"];
    const pages = props.dataProp.length/props.disPerPage;
    const [mainsRank,setMainsRank] = useState<number>();
    const [advanceRank,setAdvanceRank] = useState<number>();
    const [gender,setGender] = useState("Gender-Neutral");
    const [quota,setQuota] = useState("AI");
    const [catagory,setCatagory] = useState("OPEN");
    const sixId = props.ids[6] ? props.ids[6] : "0" ;
    
    const onSearch = () => {
        const strMainsRank = mainsRank?.toString();
        const strAdvanceRank = advanceRank?.toString();
        const strGender = gender == "Gender-Neutral" ? "0" : "1";
        const strQuota = quota.indexOf(quota).toString();
        const strCatagory = catagoryList.indexOf(catagory).toString();
        redirect(`/lists/${props.ids[0]}/${strMainsRank}/${strAdvanceRank}/${strCatagory}/${strGender}/${strQuota}`);
    }

    const onDec = () => {
        if(sixId=="0"){
            return
        }
        redirect(`/lists/${props.ids[0]}/${props.ids[1]}/${props.ids[2]}/${props.ids[3]}/${props.ids[4]}/${props.ids[5]}/${parseInt(sixId)-1}`)
    }

    const onInc = () => {
        if(parseInt(sixId)==Math.ceil(pages)-1){
            return
        }
        redirect(`/lists/${props.ids[0]}/${props.ids[1]}/${props.ids[2]}/${props.ids[3]}/${props.ids[4]}/${props.ids[5]}/${parseInt(sixId)+1}`)
    }
    
    return (
        <div className='controller-full'>
            <h2>College Filter</h2>
            
            <div className="controller-filters">
                <div className="filter-group">
                    <label htmlFor="displayList">Items per Page</label>
                    <select 
                        id='displayList' 
                        defaultValue={props.disPerPage} 
                        onChange={(e)=>{redirect(`/lists/${e.target.value}/${props.ids[1]}/${props.ids[2]}/${props.ids[3]}/${props.ids[4]}/${props.ids[5]}`);}} 
                        name="displayList"
                    >
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="mainsRank">JEE Mains Rank</label>
                    <input 
                        id="mainsRank"
                        placeholder="Mains rank" 
                        type="number" 
                        onChange={(e)=>{setMainsRank(parseInt(e.target.value))}} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="advanceRank">JEE Advanced Rank</label>
                    <input 
                        id="advanceRank"
                        placeholder="Advanced rank" 
                        type="number" 
                        onChange={(e)=>{setAdvanceRank(parseInt(e.target.value))}} 
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select 
                        id="category"
                        defaultValue="OPEN" 
                        name="catagory" 
                        onChange={(e)=>{setCatagory(e.target.value)}}
                    >
                        {catagoryList.map((val)=>{
                            return (
                                <option key={val} value={val}>{val}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="gender">Gender</label>
                    <select 
                        id="gender"
                        name="gender" 
                        defaultValue="Gender-Neutral" 
                        onChange={(e)=>{setGender(e.target.value)}}
                    >
                        <option value="Gender-Neutral">Gender-Neutral</option>
                        <option value="Female-only (including Supernumerary)">Female-only</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="quota">Quota</label>
                    <select 
                        id="quota"
                        name="Quota" 
                        defaultValue="AI" 
                        onChange={(e)=>{setQuota(e.target.value)}}
                    >
                        {quotaList.map((val)=>{
                            return (
                                <option key={val} value={val}>{val}</option>
                            )
                        })}
                    </select>
                </div>

                <button 
                    className="search-button"
                    onClick={onSearch}
                >
                    Search
                </button>
            </div>

            <div className="pagination">
                <button 
                    onClick={onDec}
                    className="pagination-button"
                    disabled={sixId === "0"}
                    aria-label="Previous page"
                >
                    {"<"}
                </button>
                {Array.from({ length: Math.ceil(pages) }, (_, i) => {
                    const pageChange = () => {
                        redirect(`/lists/${props.ids[0]}/${props.ids[1]}/${props.ids[2]}/${props.ids[3]}/${props.ids[4]}/${props.ids[5]}/${i}`);
                    };
                    return (
                        <button 
                            key={i} 
                            onClick={pageChange}
                            className={`pagination-button ${i === parseInt(sixId) ? 'active' : ''}`}
                            aria-label={`Page ${i + 1}`}
                            aria-current={i === parseInt(sixId) ? 'page' : undefined}
                        >
                            {i + 1}
                        </button>
                    );
                })}
                <button 
                    onClick={onInc}
                    className="pagination-button"
                    disabled={parseInt(sixId) === Math.ceil(pages)-1}
                    aria-label="Next page"
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default Controller
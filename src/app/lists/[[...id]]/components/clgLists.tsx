'use client'

import { useDataStore } from '@/store/list';
import React, { useState } from 'react';
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
    const deSelecterAll = useDataStore((state)=>state.deselectAll);
    const selectAll = useDataStore((state)=>state.selectAll);
    const [animatingColleges, setAnimatingColleges] = useState<{[key: string]: 'adding' | 'removing'}>({});

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

    const handleCollegeSelection = (valCheck: boolean, val: string) => {
        setAnimatingColleges(prev => ({
            ...prev,
            [val]: valCheck ? 'adding' : 'removing'
        }));
        
        setTimeout(() => {
            recFun(valCheck, val);
            setAnimatingColleges(prev => {
                const newState = { ...prev };
                delete newState[val];
                return newState;
            });
        }, 300);
    }

    const handleSelectAll = () => {
        const allColleges = [...nonRepeateClgList, ...diffClgList];
        allColleges.forEach(college => {
            setAnimatingColleges(prev => ({
                ...prev,
                [college]: 'adding'
            }));
        });
        
        setTimeout(() => {
            selectAll();
            setAnimatingColleges({});
        }, 300);
    }

    const handleDeselectAll = () => {
        const allColleges = [...nonRepeateClgList, ...diffClgList];
        allColleges.forEach(college => {
            setAnimatingColleges(prev => ({
                ...prev,
                [college]: 'removing'
            }));
        });
        
        setTimeout(() => {
            deSelecterAll();
            setAnimatingColleges({});
        }, 300);
    }

    return (
        <div className={`kyaReHelloWorld ${!model ? 'closed' : ''}`}>
            <button 
                className={styleOfButton(!model)} 
                onClick={()=>{setModel()}}
                aria-label={!model ? "Show colleges" : "Hide colleges"}
            >
                {!model?("<"):(">")}
            </button>
            
            {model && (
                <div className='clgTable'>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Available Colleges</h3>
                        <div className="space-x-2">
                            <button 
                                onClick={handleDeselectAll}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                Deselect all
                            </button>
                            <button 
                                onClick={handleSelectAll}
                                className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                            >
                                Select all
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[calc(80vh-6rem)]">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-3 bg-gray-50">Institute Names</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diffClgList.map((y) => (
                                    <tr 
                                        key={y} 
                                        className={`hover:bg-gray-50 ${animatingColleges[y] || ''}`}
                                    >
                                        <td className="p-3">
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    value={y} 
                                                    onChange={(e)=>{handleCollegeSelection(e.target.checked,e.target.value)}} 
                                                    id={y}
                                                    className="mr-3 h-4 w-4"
                                                />
                                                <label 
                                                    htmlFor={y} 
                                                    className={`${listBgColor(y)} cursor-pointer`}
                                                >
                                                    {y}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {nonRepeateClgList.map((y) => (
                                    <tr 
                                        key={y} 
                                        className={`hover:bg-gray-50 ${animatingColleges[y] || ''}`}
                                    >
                                        <td className="p-3">
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    value={y} 
                                                    defaultChecked
                                                    onChange={(e)=>{handleCollegeSelection(e.target.checked,e.target.value)}} 
                                                    id={y}
                                                    className="mr-3 h-4 w-4"
                                                />
                                                <label 
                                                    htmlFor={y} 
                                                    className={`${listBgColor(y)} cursor-pointer`}
                                                >
                                                    {y}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ClgLists
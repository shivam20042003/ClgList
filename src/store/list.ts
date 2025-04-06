import { create } from 'zustand'
import data from '../../public/Jossa list.json'

const allClg:Array<string> = [];
data.map((y)=>{allClg.push(y.Institute)});
const nonRepeateClgList = Array.from(new Set(allClg));

const ifelseProblemFix = (val1: boolean, val2: string[], val3: string): string[] => {
    if (!val1) {
        // Fast removal without mutation
        if (!val2.includes(val3)) return val2;
        return val2.filter(y => y !== val3);
    } else {
        // Avoid unshift and create a new array instead
        return [val3, ...val2];
    }
};

export type dataState = {
    jossaData:{
        AcademicProgramName:string,
        ClosingRank:number|string,
        Gender:string,
        Institute:string,
        OpeningRank:number|string,
        Quota:string,
        SeatType:string
    }[],
    NRCL: string[],
}

export type dataAction = {
    clgSelectionTweeking: (checker:boolean,clgName:string) => void,
    deselectAll: () => void,
    selectAll: () => void
}

export type modelState = {
    model:boolean
}
export type modelAction = {
    setModel : () => void
}

export const useDataStore = create<dataState & dataAction>()((set)=>({
    jossaData: data,
    NRCL: nonRepeateClgList,
    clgSelectionTweeking: (checker:boolean,clgName:string) => set((state)=>({
            NRCL: ifelseProblemFix(checker,state.NRCL,clgName),
            jossaData: data.filter((y)=>{
                const x = ifelseProblemFix(checker,state.NRCL,clgName);
                return x.includes(y.Institute);
            })
    })),
    deselectAll: () => set(()=>({
            NRCL: [],
            jossaData:[]
    })),
    selectAll: () => set(()=>({
            NRCL: nonRepeateClgList,
            jossaData: data
    }))
}))

export const useModelStore = create<modelState & modelAction>()((set)=>({
    model:false,
    setModel: () => set((state)=>({
        model:!state.model
    }))
}))
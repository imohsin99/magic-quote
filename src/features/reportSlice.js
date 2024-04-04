import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    reports: [
        {
            id: '1',
            quoteId: '1',
            authorId: '1',
            authorName: 'mohsin',
            userId: '2',
            username: 'ahmad',
            description: 'Bad'
        }
    ]
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        addReport: (state, action) => {
            const newReport = {...action.payload}
            newReport.id = nanoid();
            state.reports.push(newReport);
        },
        removeReport: (state, action) => {
            state.reports = state.reports.filter((report) => report.quoteId !== action.payload);
        }
    }
})

export const { addReport, removeReport } = reportSlice.actions;
export default reportSlice.reducer;
